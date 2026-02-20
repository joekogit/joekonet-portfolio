import logo from '@/assets/209030329c349a917bbabb16de1552f7ce7c3476.png';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex items-center justify-between">
        <a 
          href="#top" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#6BA3D0] focus:ring-offset-2 rounded"
          aria-label="Scroll to top"
        >
          <img 
            src={logo} 
            alt="joeko.net" 
            className="h-8 md:h-10 w-auto -ml-2" 
          />
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="text-sm hover:text-[#6BA3D0] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6BA3D0] focus:ring-offset-2 rounded px-2 py-1">About</a>
          <a href="#work" onClick={(e) => handleNavClick(e, '#work')} className="text-sm hover:text-[#6BA3D0] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6BA3D0] focus:ring-offset-2 rounded px-2 py-1">Work</a>
          <a href="#skills" onClick={(e) => handleNavClick(e, '#skills')} className="text-sm hover:text-[#6BA3D0] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6BA3D0] focus:ring-offset-2 rounded px-2 py-1">Skills</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="text-sm hover:text-[#6BA3D0] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6BA3D0] focus:ring-offset-2 rounded px-2 py-1">Contact</a>
        </nav>

        {/* Mobile/Tablet Hamburger */}
        <button 
          className="md:hidden p-2 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#6BA3D0] focus:ring-offset-2 rounded"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile/Tablet Dropdown Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
            <a 
              href="#about" 
              onClick={(e) => handleNavClick(e, '#about')} 
              className="text-sm hover:text-[#6BA3D0] transition-colors py-2"
            >
              About
            </a>
            <a 
              href="#work" 
              onClick={(e) => handleNavClick(e, '#work')} 
              className="text-sm hover:text-[#6BA3D0] transition-colors py-2"
            >
              Work
            </a>
            <a 
              href="#skills" 
              onClick={(e) => handleNavClick(e, '#skills')} 
              className="text-sm hover:text-[#6BA3D0] transition-colors py-2"
            >
              Skills
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, '#contact')} 
              className="text-sm hover:text-[#6BA3D0] transition-colors py-2"
            >
              Contact
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}