export function About() {
  return (
    <section id="about" className="pt-6 md:pt-8 pb-20 px-6 lg:px-12 bg-gradient-to-b from-white to-gray-50 dark:from-[#111111] dark:to-[#161616] scroll-mt-[126px] transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-5xl font-light mb-12" style={{ fontFamily: 'var(--font-family-base)' }}>
          About Me
        </h2>
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            As Principal AI Field Architect at Boomi, I lead technical strategy for our most complex enterprise
            engagements. I work with C-level stakeholders to shape AI adoption roadmaps, architect agentic solutions
            on Boomi's intelligent integration and automation platform, and guide engagements from the first
            visioning session through delivery. I also mentor Solutions Consultants and Forward Deployed Engineers,
            helping scale how we deliver AI solutions in the field.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            I bring 20 years at the intersection of design and engineering to this work — scaling multi-brand design
            systems at Peacock, leading design systems engineering teams at Amount and Avant, and shipping for brands
            like Nike and Crate &amp; Barrel. That background means I prototype fast, think in systems, and translate
            fluently between executives and builders.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            Along the way I've gone deep on the agentic development ecosystem: agent frameworks like LangChain,
            CrewAI, and LangGraph, MCP-based tooling, Claude Code, and the enterprise integration patterns — APIs,
            iPaaS, data pipelines — that connect autonomous AI capabilities to real business problems.
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
