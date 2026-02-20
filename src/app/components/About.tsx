export function About() {
  return (
    <section id="about" className="pt-6 md:pt-8 pb-20 px-6 lg:px-12 bg-gradient-to-b from-white to-gray-50 scroll-mt-[126px]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-5xl font-light mb-12" style={{ fontFamily: 'var(--font-family-base)' }}>
          About Me
        </h2>
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-gray-700 leading-relaxed text-lg">
            I'm a design systems leader who bridges the gap between design and engineering. With over a decade 
            of experience, I've specialized in transforming complex digital ecosystems into cohesive, scalable 
            experiences that empower teams and delight users.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            My expertise lies in building and scaling enterprise-grade design systems that serve as strategic 
            products. I've led multi-brand theming initiatives, established token architectures, and created 
            governance frameworks that ensure consistency across global platforms while maintaining the flexibility 
            teams need to innovate.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            What drives me is the intersection of design craft and technical implementation. I believe the best 
            design systems emerge when we deeply understand both the creative vision and the engineering constraints, 
            creating solutions that are not just beautiful, but buildable and maintainable at scale.
          </p>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-light mb-6">Education</h3>
            <div>
              <p className="font-medium text-gray-900">Bachelor of Fine Arts, Magna Cum Laude</p>
              <p className="text-gray-600">The Art Institute of Atlanta, Atlanta, GA</p>
              <p className="text-sm text-[#6BA3D0] mt-1">Awarded Best Portfolio for Web Design and Interactive Media</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}