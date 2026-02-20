import { Mail, Linkedin, MapPin, Globe } from 'lucide-react';
import footerLogo from 'figma:asset/06b6e3de21288b7b6c88d251e9dd1f8719ab13b8.png';

export function Footer() {
  return (
    <footer id="contact" className="relative bg-[#6BA3D0] text-white overflow-hidden scroll-mt-[126px]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Let's Connect - Left side */}
          <div>
            <h2 className="text-3xl lg:text-5xl font-light mb-6" style={{ fontFamily: 'var(--font-family-base)' }}>
              Let's Connect
            </h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              I'm always interested in discussing design systems, UX engineering, 
              and opportunities to create impactful digital experiences.
            </p>
          </div>
          
          {/* Contact Info - Right side */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium mb-1">Email</p>
                <a 
                  href="mailto:joe.kocovsky@gmail.com" 
                  className="text-white/90 hover:text-white transition-colors"
                >
                  joe.kocovsky@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Linkedin className="w-5 h-5 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium mb-1">LinkedIn</p>
                <a 
                  href="https://www.linkedin.com/in/joekocovsky/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  linkedin.com/in/joekocovsky
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium mb-1">Location</p>
                <p className="text-white/90">New York, NY 11102</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Globe className="w-5 h-5 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium mb-1">Website</p>
                <a 
                  href="https://joeko.net" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  https://joeko.net
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-white/20 text-center text-sm text-white/70">
          <p>© {new Date().getFullYear()} Joe Kocovsky. All rights reserved.</p>
        </div>
        
        {/* Logo centered at the very bottom */}
        <div className="mt-8 flex justify-center">
          <img 
            src={footerLogo} 
            alt="" 
            className="w-32 lg:w-48 h-auto opacity-20"
          />
        </div>
      </div>
    </footer>
  );
}