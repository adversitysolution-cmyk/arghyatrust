import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import logoImage from '../../assets/logooo.png';

export function Header() {
  const { t, language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/donate', label: t('nav.donate') },
    { path: '/events', label: t('nav.events') },
    { path: '/gallery', label: t('nav.gallery') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logoImage} 
              alt="Arghya Trust Logo" 
              className="h-12 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium transition-colors hover:text-[#50b94b] ${
                  location.pathname === link.path
                    ? 'text-[#50b94b]'
                    : 'text-gray-700'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#50b94b]" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={toggleLanguage}
              className="hidden md:inline-flex border-[#50b94b] text-[#50b94b] hover:bg-green-50"
            >
              {language === 'en' ? 'ಕನ್ನಡ' : 'English'}
            </Button>

            {/* Donate Button */}
            <Link to="/donate" className="hidden md:block">
              <Button className="bg-[#50b94b] hover:bg-[#45a340] text-white px-6">
                {t('common.donate')}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-[#50b94b]"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 bg-white">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2 font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-[#50b94b] bg-green-50'
                      : 'text-gray-700 hover:text-[#50b94b] hover:bg-green-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/donate"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mx-4 mt-2"
              >
                <Button className="w-full bg-[#50b94b] hover:bg-[#45a340] text-white">
                  {t('common.donate')}
                </Button>
              </Link>
              <button
                type="button"
                onClick={() => {
                  toggleLanguage();
                  setIsMobileMenuOpen(false);
                }}
                className="mx-4 mt-2 rounded-lg border border-[#50b94b] px-4 py-2 font-medium text-[#50b94b] hover:bg-green-50"
              >
                {language === 'en' ? 'ಕನ್ನಡ' : 'English'}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}


