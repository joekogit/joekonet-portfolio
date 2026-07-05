export function Skills() {
  const skillCategories = [
    {
      title: "AI & Agentic Systems",
      skills: [
        "AI Solution Architecture",
        "Agentic AI Systems",
        "LangChain",
        "CrewAI",
        "LangGraph",
        "MCP-Based Tooling",
        "Claude Code",
        "AI-Assisted Prototyping",
        "AI Adoption Roadmaps",
        "Agentic Process Design"
      ]
    },
    {
      title: "Enterprise Integration & Architecture",
      skills: [
        "Enterprise Integration (iPaaS)",
        "API Architecture",
        "Data Pipelines",
        "Integration Patterns",
        "Solution Lifecycle Ownership",
        "Technical Discovery",
        "Find, Prove, Deliver Engagement Model"
      ]
    },
    {
      title: "Design Systems & UX Engineering",
      skills: [
        "Design Tokens",
        "Multi-Brand Theming",
        "Component Libraries",
        "Figma Variables & Code Connect",
        "Rapid Functional Prototyping",
        "HTML/CSS/JS",
        "WCAG 2.1 AA Accessibility",
        "Design QA",
        "Design-to-Production Alignment"
      ]
    },
    {
      title: "Executive Engagement & Leadership",
      skills: [
        "C-Suite Stakeholder Engagement",
        "Executive Visioning Sessions",
        "Innovation Workshops",
        "Roadmap Planning",
        "Team Leadership",
        "Mentorship",
        "Cross-Functional Collaboration",
        "Knowledge Documentation"
      ]
    }
  ];

  return (
    <section id="skills" className="pt-8 pb-20 px-6 lg:px-12 scroll-mt-[126px] transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-5xl font-light mb-16" style={{ fontFamily: 'var(--font-family-base)' }}>
          Core Skills & Expertise
        </h2>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white dark:bg-[#1a1a1a] p-8 border border-gray-200 dark:border-gray-700 hover:border-[#6BA3D0] dark:hover:border-[#6BA3D0] transition-colors">
              <h3 className="text-xl font-medium mb-6 text-[#2c2c2c] dark:text-gray-100">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-gray-50 dark:bg-[#242424] text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-[#6BA3D0] hover:bg-[#6BA3D0]/5 dark:hover:border-[#6BA3D0] dark:hover:bg-[#6BA3D0]/10 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
