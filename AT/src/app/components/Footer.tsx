import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import logoImage from '../../assets/footerlogo.png';
import { submitNewsletter, trackCta } from '../lib/api';
import { FormEvent, useState } from 'react';

export function Footer() {
  const { t, language } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterResult, setNewsletterResult] = useState('');

  const quickLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/donate', label: t('nav.donate') },
    { path: '/events', label: t('nav.events') },
    { path: '/gallery', label: t('nav.gallery') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const socialLinks = [
    { icon: Facebook, url: 'https://facebook.com/arghyatrust', label: 'Facebook' },
    { icon: Instagram, url: 'https://instagram.com/arghyatrust', label: 'Instagram' },
    { icon: Linkedin, url: 'https://www.linkedin.com/company/arghya-trust', label: 'LinkedIn' },
    { icon: Youtube, url: 'https://youtube.com/@arghyatrust', label: 'YouTube' },
  ];

  async function handleNewsletterSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNewsletterSubmitting(true);
    setNewsletterResult('');
    try {
      await submitNewsletter({ email: newsletterEmail, sourcePage: 'footer' });
      setNewsletterResult(t('footer.newsletterSuccess'));
      setNewsletterEmail('');
      trackCta({
        page: 'global',
        section: 'footer-newsletter',
        action: 'submit',
        label: 'subscribe',
      });
    } catch (error) {
      setNewsletterResult(error instanceof Error ? error.message : t('footer.newsletterFailed'));
    } finally {
      setNewsletterSubmitting(false);
    }
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 max-w-[1200px] py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <img src={logoImage} alt="Arghya Trust" className="h-16 w-auto" />
            <p className="text-gray-300 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#50b94b] flex items-center justify-center transition-all hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-[#50b94b] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.connect')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#50b94b] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm space-y-2">
                  <span className="block">
                    <span className="font-semibold text-white">{t('footer.address.headOffice')}:</span>{' '}
                    {language === 'kn'
                      ? "ವಿವೇಕ ಕುಟೀರ, ಸಿ/ಓ ವಿದ್ಯಾ ಉಮೇಶ್, ಸೀತಾ ನಿಲಯದ ಹಿಂದೆ, ಓಲ್ಡ್ ಪೋಸ್ಟ್ ಆಫೀಸ್ ರಸ್ತೆ, ಶ್ರೀರಂಗಪಟ್ಟಣ, ಮಂಡ್ಯ - 571438"
                      : 'Viveka Kutira, C/o Vidya Umesh, Behind Seetha Nilaya, Old Post Office Road, Srirangapatna, Mandya - 571438'}
                  </span>
                  <span className="block">
                    <span className="font-semibold text-white">{t('footer.address.mysuruOffice')}:</span>{' '}
                    {language === 'kn'
                      ? 'ಸಿ/ಓ VGKK TRC, ಜೆಎಸ್‌ಎಸ್ ಕಾಲೇಜಿನ ಪಕ್ಕದಲ್ಲಿ, ಊಟಿ ರಸ್ತೆ, ಚಾಮುಂಡಿಪುರಂ, ಮೈಸೂರು - 570004'
                      : 'C/o VGKK TRC, Next to JSS College, Ooty Road, Chamundipuram, Mysuru - 570004'}
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#50b94b] flex-shrink-0" />
                <a href="tel:+917448441972" className="text-gray-300 hover:text-[#50b94b] text-sm">
                  +91 744 844 1972
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#50b94b] flex-shrink-0" />
                <a href="mailto:contact@arghyatrust.org" className="text-gray-300 hover:text-[#50b94b] text-sm">
                  contact@arghyatrust.org
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.newsletter')}</h3>
            <p className="text-gray-300 text-sm mb-4">{t('footer.newsletterDesc')}</p>
            <form className="space-y-2" onSubmit={handleNewsletterSubmit}>
              <Input
                type="email"
                placeholder={t('contact.email')}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <Button className="w-full bg-[#50b94b] hover:bg-[#45a340] text-white" disabled={newsletterSubmitting}>
                {newsletterSubmitting ? t('footer.newsletterSubmitting') : t('common.subscribe')}
              </Button>
              {newsletterResult && <p className="text-xs text-gray-300">{newsletterResult}</p>}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 max-w-[1200px] py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>{t('footer.copyright')}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#50b94b] transition-colors">{t('footer.privacy')}</a>
              <a href="#" className="hover:text-[#50b94b] transition-colors">{t('footer.terms')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


