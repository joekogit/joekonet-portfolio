export function Experience() {
  const experiences = [
    {
      title: "Principal AI Field Architect",
      company: "Boomi",
      location: "Remote (NYC)",
      period: "Jun 2026 — Present",
      highlights: [
        "Lead technical visionary for Boomi's most strategic enterprise AI engagements, partnering with C-suite stakeholders (CIO, CTO, CDO) to shape long-term AI adoption roadmaps",
        "Run executive visioning sessions and innovation workshops that connect autonomous AI capabilities to real business problems",
        "Architect flagship solutions for complex, high-stakes accounts, including net-new agentic processes built on Boomi's integration and automation platform",
        "Serve as technical authority across the full solution lifecycle, from initial discovery through delivery by Forward Deployed Engineering teams",
        "Relay field insights to product and engineering to shape the agent inventory and product roadmap, and mentor Solutions Consultants and Forward Deployed Engineers on the Find, Prove, Deliver engagement model"
      ]
    },
    {
      title: "Senior Design Engineer – Commerce Product",
      company: "Peacock (NBCUniversal)",
      location: "New York, NY",
      period: "Jun 2023 — Dec 2025",
      highlights: [
        "Led design systems as a product, scaling multi-brand commerce systems across web, mobile, and TV",
        "Expanded Atlas Design System from single-brand to multi-brand, growing components from 50 to 150+ and enabling rapid international rollout",
        "Engineered tiered Variables-based token architecture separating design intent from brand theming, reducing design-to-development translation time by 30–50%",
        "Standardized component APIs, variants, and interactive states to bridge Figma designs to production UI",
        "Established contribution pathways, Design QA standards, and governance workflows to maintain consistent production-ready UI across global markets",
        "Applied AI-assisted workflows to accelerate prototyping, iteration, and product decision-making"
      ]
    },
    {
      title: "Manager, Design Systems Engineering",
      company: "Amount",
      location: "Chicago, IL",
      period: "Jan 2020 — Mar 2023",
      highlights: [
        "Led and scaled the Design Systems Engineering team, owning roadmap, governance, and adoption",
        "Spearheaded accessibility and UX standards, mentoring engineers, and driving Particle UI as an internal platform product",
        "Authored multi-cycle roadmap and Shape Up pitches, defining scope, success criteria, and sequencing",
        "Initiated design system governance, aligning Figma with production, defining ownership and scalable operational practices"
      ]
    },
    {
      title: "Manager, UI Development",
      company: "Avant",
      location: "Chicago, IL",
      period: "Nov 2016 — Dec 2019",
      highlights: [
        "Directed front-end design strategy and UI development team, building scalable component libraries and white-label theming systems",
        "Designed a white-label component system for partner applications, enabling seamless brand theming and adoption",
        "Standardized CSS architecture using BEM/SASS methodologies, improving maintainability and developer efficiency"
      ]
    },
    {
      title: "Senior Front-End Developer, Technical Lead",
      company: "Studio 424",
      location: "Chicago, IL",
      period: "Aug 2015 — Nov 2016",
      highlights: [
        "Led cross-disciplinary teams delivering user-centered branding and digital programs",
        "Served as technical lead for high-profile clients including Nike, The Joyce Foundation, and Clean Energy Trust, overseeing front-end architecture and component standardization",
        "Built reusable component libraries and coding standards to improve maintainability and cross-project efficiency"
      ]
    },
    {
      title: "Senior Front-End Developer",
      company: "VSA Partners",
      location: "Chicago, IL",
      period: "Sep 2013 — Aug 2015",
      highlights: [
        "Crafted data-driven web experiences for leading consumer brands, converting wireframes and prototypes into pixel-perfect, production-ready marketing websites",
        "Constructed reusable templates, standardized component libraries, and accessible front-end patterns, applying early design systems principles"
      ]
    },
    {
      title: "Senior Front-End Developer",
      company: "Crate and Barrel",
      location: "Chicago, IL",
      period: "Dec 2012 — Sep 2013",
      highlights: [
        "Led the responsive redesign of Crate and Barrel's desktop website and extended the experience to CB2 and Land of Nod",
        "Engineered mobile-first, adaptive front-end code and established responsive frameworks for a unified, scalable multi-brand digital experience"
      ]
    }
  ];

  return (
    <section id="work" className="pt-6 md:pt-8 pb-20 px-6 lg:px-12 bg-gray-50 dark:bg-[#161616] scroll-mt-[126px] transition-colors duration-200">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl lg:text-5xl font-light mb-16" style={{ fontFamily: 'var(--font-family-base)' }}>
          Career Experience
        </h2>
        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8 border-l-2 border-[#6BA3D0]">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#6BA3D0]"></div>
              <div className="mb-4">
                <h3 className="text-xl lg:text-2xl font-normal mb-2">{exp.title}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-600 dark:text-gray-400">
                  <span className="font-medium">{exp.company}</span>
                  <span>{exp.location}</span>
                  <span className="text-[#6BA3D0]">{exp.period}</span>
                </div>
              </div>
              <ul className="space-y-3">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#6BA3D0]">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}