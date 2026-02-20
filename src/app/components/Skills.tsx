export function Skills() {
  const skillCategories = [
    {
      title: "Design Systems & Governance",
      skills: [
        "Design Tokens",
        "Multi-Brand Theming",
        "Component Libraries",
        "Variant Standardization",
        "Token Strategy",
        "Governance Frameworks",
        "Operational Workflows",
        "Design-to-Production Alignment",
        "Figma-to-UI Integration",
        "Functional Prototyping"
      ]
    },
    {
      title: "UX & Accessibility",
      skills: [
        "High-Fidelity UI Design",
        "User Experience Design",
        "Interaction Design",
        "Responsive Layouts",
        "Edge-Case Handling",
        "Accessibility Program Leadership",
        "WCAG 2.1 AA Compliance",
        "Design QA"
      ]
    },
    {
      title: "Design–Engineering Integration",
      skills: [
        "Production-Ready UI Alignment",
        "HTML/CSS/JS",
        "Figma Variables",
        "Dev Mode",
        "Code-Connect Workflows",
        "Cross-Platform Consistency"
      ]
    },
    {
      title: "Collaboration & Delivery",
      skills: [
        "Jira Workflow Design",
        "Roadmap Planning",
        "Cross-Functional Collaboration",
        "Team Leadership",
        "Mentorship",
        "Design System Evangelism",
        "Knowledge Documentation",
        "Scalable Adoption"
      ]
    }
  ];

  return (
    <section id="skills" className="pt-8 pb-20 px-6 lg:px-12 scroll-mt-[126px]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-5xl font-light mb-16" style={{ fontFamily: 'var(--font-family-base)' }}>
          Core Skills & Expertise
        </h2>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white p-8 border border-gray-200 hover:border-[#6BA3D0] transition-colors">
              <h3 className="text-xl font-medium mb-6 text-[#2c2c2c]">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1.5 bg-gray-50 text-sm text-gray-700 border border-gray-200 hover:border-[#6BA3D0] hover:bg-[#6BA3D0]/5 transition-colors"
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