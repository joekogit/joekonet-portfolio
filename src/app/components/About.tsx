export function About() {
  return (
    <section id="about" className="pt-6 md:pt-8 pb-20 px-6 lg:px-12 bg-gradient-to-b from-white to-gray-50 dark:from-[#111111] dark:to-[#161616] scroll-mt-[126px] transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-5xl font-light mb-12" style={{ fontFamily: 'var(--font-family-base)' }}>
          About Me
        </h2>
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            I started in the browser. Responsive layouts for Crate and Barrel back when responsive was still an
            argument you had to win. Front-end architecture for Nike and the Joyce Foundation at agencies in Chicago.
            Hand-written CSS, real accessibility work, the unglamorous parts. I never stopped doing them.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            Leading UI and design systems teams at Avant and Amount taught me the hard part was never the code. It was
            getting fifty people to agree on what a button is, then keeping that agreement alive through three roadmap
            cycles. Systems work is mostly diplomacy with a component library attached.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            At Peacock I ran design systems as a product. We took Atlas from one brand to many — 50 components to over
            150 — and rebuilt the token architecture so design intent and brand theming stopped fighting each other.
            Translation time between design and development dropped by a third. The metric I liked better was that
            teams stopped relitigating the same decisions every sprint.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            Then AI stopped being a demo. I went deep on agent frameworks, MCP-based tooling, and the integration
            patterns that connect autonomous systems to real business data, and found the same problem in different
            clothes. Anyone can build one impressive agent. Very few people have made a hundred of them coherent,
            governable, and worth trusting. That's the work now, as Principal AI Field Architect at Boomi: sitting
            with CIOs and CTOs to decide what's actually worth building, then architecting the systems that prove it.
          </p>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-light mb-6">Education</h3>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">Bachelor of Fine Arts, Magna Cum Laude</p>
              <p className="text-gray-600 dark:text-gray-400">The Art Institute of Atlanta, Atlanta, GA</p>
              <p className="text-sm text-[#6BA3D0] mt-1">Awarded Best Portfolio for Web Design and Interactive Media</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
