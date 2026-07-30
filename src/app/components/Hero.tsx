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
          
          {/* Photo floats right on mobile/tablet, wraps description text.
              Rounded square matches the desktop treatment. */}
          <div className="relative float-right ml-5 mb-4 w-[45%] max-w-[300px] sm:ml-8 lg:hidden">
            <div className="absolute -inset-4 bg-[#6BA3D0] opacity-10 blur-2xl"></div>
            <img
              src={photo}
              alt="Joe Kocovsky"
              className="relative w-full rounded-lg shadow-2xl"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              I've spent the better part of two decades on the parts of software nobody is supposed to notice. A button
              that behaves identically in six countries. A color that means the same thing to a designer in Figma and a
              compiler in production. I'm drawn to the layer underneath, where a thousand small agreements either hold
              or quietly come apart.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              At Peacock I rebuilt that layer for a streaming service in the middle of going global. Now I do it for AI,
              sitting across from CIOs whose agent demos all work beautifully and don't yet add up to a system. The
              demos are the easy part. The question I care about is the one underneath: what happens when there are a
              hundred of them, and someone has to trust the answer.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-8 clear-both">
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