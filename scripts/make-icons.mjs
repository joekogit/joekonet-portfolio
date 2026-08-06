/**
 * Renders the icon drawings in this folder to the files browsers and home screens read.
 *
 *   node scripts/make-icons.mjs
 *
 * Two drawings, deliberately, because a tab icon and a home-screen icon are different
 * pictures rather than one picture at two sizes:
 *
 *   favicon-source.svg  the two slashes alone, flat, on a solid field. The full mark's
 *                       dots measure ~1.3px at 16px and rasterise to grey mush; the
 *                       slashes hold at ~4px. Checked on a magnified contact sheet.
 *   icon-source.svg     the whole mark, lit, for 180px and up where there is room.
 *
 * Rendered through Chromium rather than an image converter so gradients and filters
 * rasterise exactly as a browser will. Playwright is not a dependency of this project —
 * it is used from a global install, the same one the arcade's icon script uses.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { execSync } from 'node:child_process'

const here = dirname(fileURLToPath(import.meta.url))
const pub = join(here, '../public')

/**
 * Local install first, then the global one. Node does not search global node_modules on
 * its own, so the global path has to be asked for and handed over as a file URL.
 */
async function loadPlaywright() {
  try {
    return await import('playwright')
  } catch {}
  try {
    const root = execSync('npm root -g', { encoding: 'utf8' }).trim()
    const entry = join(root, 'playwright/index.mjs')
    if (existsSync(entry)) return await import(pathToFileURL(entry).href)
  } catch {}
  console.error('Playwright not found. Install it: npm i -g playwright')
  process.exit(1)
}

const { chromium } = await loadPlaywright()

/** The page background, so no transparent edge shows through an OS mask. */
const FIELD = '#111111'

/** Packs PNGs into a .ico — a 6-byte header plus a 16-byte entry per image. */
function packIco(images) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(images.length, 4)
  let offset = 6 + images.length * 16
  const entries = images.map(({ size, data }) => {
    const e = Buffer.alloc(16)
    e.writeUInt8(size, 0)
    e.writeUInt8(size, 1)
    e.writeUInt16LE(1, 4)
    e.writeUInt16LE(32, 6)
    e.writeUInt32LE(data.length, 8)
    e.writeUInt32LE(offset, 12)
    offset += data.length
    return e
  })
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)])
}

const browser = await chromium.launch()

async function render(source, size, inset = 1) {
  // Android may crop a maskable icon to a circle, so that variant is inset to 78% and
  // everything that matters stays inside the safe zone.
  const svg =
    inset === 1
      ? source
      : source
          .replace(
            /<svg([^>]*)>/,
            `<svg$1><g transform="translate(${(512 * (1 - inset)) / 2} ${(512 * (1 - inset)) / 2}) scale(${inset})">`,
          )
          .replace(/<\/svg>\s*$/, '</g></svg>')
  const tab = await browser.newPage({ viewport: { width: size, height: size } })
  await tab.setContent(
    `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:${FIELD}}svg{display:block;width:100vw;height:100vh}</style>${svg}`,
    { waitUntil: 'load' },
  )
  await tab.waitForTimeout(120) // filters and gradients need a frame to settle
  const png = await tab.screenshot()
  await tab.close()
  return png
}

const touch = readFileSync(join(here, 'icon-source.svg'), 'utf8')
const flat = readFileSync(join(here, 'favicon-source.svg'), 'utf8')

mkdirSync(join(pub, 'icons'), { recursive: true })

// The favicon stays vector — the one place an SVG is the better answer.
writeFileSync(join(pub, 'icon.svg'), flat)
writeFileSync(
  join(pub, 'favicon.ico'),
  packIco(await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await render(flat, size) })))),
)
console.log('icon.svg + favicon.ico      16/32/48')

// 180 is the current @3x home-screen size and the only one iOS reads. Both spellings are
// written because iOS probes the -precomposed name when it cannot use the <link> tag.
const touch180 = await render(touch, 180)
for (const name of ['apple-touch-icon.png', 'apple-touch-icon-precomposed.png']) {
  writeFileSync(join(pub, name), touch180)
}
writeFileSync(join(pub, 'icons/apple-touch-icon.png'), touch180)
console.log('apple-touch-icon.png       180x180')

for (const [file, size, inset] of [
  ['icons/icon-192.png', 192, 1],
  ['icons/icon-512.png', 512, 1],
  ['icons/icon-maskable-512.png', 512, 0.78],
]) {
  writeFileSync(join(pub, file), await render(touch, size, inset))
  console.log(`${file.padEnd(26)} ${size}x${size}`)
}

await browser.close()
