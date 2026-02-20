import photo from 'figma:asset/08388ff8071b36d1fedcb3b0bd9ab14a8222d318.png';

export function Hero() {
  return (
    <section className="pt-40 pb-20 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="lg:grid lg:grid-cols-2 lg:gap-20 lg:items-center">
        <div>
          <h1 className="text-4xl lg:text-6xl font-light mb-6 leading-tight" style={{ fontFamily: 'var(--font-family-base)' }}>
            Joe Kocovsky
          </h1>
          <p className="text-xl lg:text-2xl text-[#6BA3D0] mb-8 font-light">
            Design Systems & UX Engineering Leader
          </p>
          
          {/* Photo floats right on mobile/tablet, wraps description text */}
          <div className="relative float-right ml-6 mb-4 lg:hidden">
            <div className="absolute -inset-4 bg-[#6BA3D0] opacity-10 blur-2xl"></div>
            <img 
              src={photo} 
              alt="Joe Kocovsky" 
              className="relative w-[195px] rounded-full shadow-2xl"
            />
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-relaxed mb-6">
              Strategic and dynamic Senior Design Technologist with extensive experience owning design systems as a product, 
              transforming complex digital ecosystems into cohesive, scalable, user-centered experiences.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Specialized in enterprise design systems, multi-brand theming, scalable token architectures, and cross-platform 
              design governance. Expert in bridging Figma, tokens, prototypes, and production-ready UI.
            </p>
          </div>
          <div className="flex gap-4 mt-8 clear-both">
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector('#contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="inline-flex items-center px-6 py-3 bg-[#6BA3D0] text-white hover:bg-[#5a92bf] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6BA3D0] focus:ring-offset-2"
            >
              Get in Touch
            </a>
            <a 
              href="https://www.linkedin.com/in/joekocovsky/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-gray-300 hover:border-[#6BA3D0] hover:text-[#6BA3D0] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6BA3D0] focus:ring-offset-2"
            >
              LinkedIn
            </a>
          </div>
        </div>
        
        {/* Desktop photo */}
        <div className="hidden lg:flex justify-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-[#6BA3D0] opacity-10 blur-2xl"></div>
            <img 
              src={photo} 
              alt="Joe Kocovsky" 
              className="relative w-full max-w-md mx-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}