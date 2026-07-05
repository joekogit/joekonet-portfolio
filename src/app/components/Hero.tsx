import photo from '@/assets/joe-kocovsky-headshot.jpg';

export function Hero() {
  return (
    <section className="pt-40 pb-20 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="lg:grid lg:grid-cols-2 lg:gap-20 lg:items-center">
        <div>
          <h1 className="text-4xl lg:text-6xl font-light mb-6 leading-tight" style={{ fontFamily: 'var(--font-family-base)' }}>
            Joe Kocovsky
          </h1>
          <p className="text-xl lg:text-2xl text-[#6BA3D0] mb-8 font-light">
            Principal AI Field Architect at Boomi
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
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              I lead technical strategy for Boomi's most complex enterprise AI engagements — partnering with C-suite
              stakeholders to shape AI adoption roadmaps and architecting agentic solutions on Boomi's intelligent
              integration and automation platform.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              I bring 20 years at the intersection of design and engineering to this work: I prototype fast, think in
              systems, and translate fluently between executives and builders.
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
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 hover:border-[#6BA3D0] hover:text-[#6BA3D0] dark:hover:border-[#9BC4E2] dark:hover:text-[#9BC4E2] dark:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-[#6BA3D0] focus:ring-offset-2"
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