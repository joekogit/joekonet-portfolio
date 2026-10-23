# joeko.net

Joe Kocovsky's portfolio. One HTML page, one stylesheet, one script, no framework.

The page is laid out like a small design-system doc: the business card is the
component, the controls edit real CSS custom properties, and the career is the
changelog. Everything is in `index.html`, `src/styles/site.css`, and `src/main.js`.

## Running it

```
npm install
npm run dev      # local server
npm run build    # writes dist/, which Netlify publishes
npm run icons    # regenerate favicon and touch icons from scripts/*.svg
```

The previous React version is tagged `v1-react` if it is ever needed again.
