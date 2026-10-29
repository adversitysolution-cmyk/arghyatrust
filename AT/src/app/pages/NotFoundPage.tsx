import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Compass, Calendar, BookOpen, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import sectionBackground from '../../assets/back.jpg';
import { useLanguage } from '../contexts/LanguageContext';

export function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <div
      className="min-h-screen pt-28 pb-20 flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${sectionBackground})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="max-w-2xl w-full bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#50b94b]/10 text-[#50b94b] text-sm font-semibold mb-4">
          404 Error
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#123c7c] mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed max-w-lg mx-auto">
          The page you are looking for may have been moved, renamed, or is temporarily unavailable. Explore our key sections below to find what you need.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left">
          <Link
            to="/about"
            className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-200 hover:border-[#50b94b] hover:bg-green-50/50 transition-all text-gray-700"
          >
            <Compass className="w-5 h-5 text-[#50b94b] flex-shrink-0" />
            <div>
              <div className="font-semibold text-sm text-[#123c7c]">{t('nav.about')}</div>
              <div className="text-xs text-gray-500">Vision, Mission & 3S Philosophy</div>
            </div>
          </Link>

          <Link
            to="/events"
            className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-200 hover:border-[#50b94b] hover:bg-green-50/50 transition-all text-gray-700"
          >
            <Calendar className="w-5 h-5 text-[#50b94b] flex-shrink-0" />
            <div>
              <div className="font-semibold text-sm text-[#123c7c]">{t('nav.events')}</div>
              <div className="text-xs text-gray-500">Upcoming Gatherings & Workshops</div>
            </div>
          </Link>

          <Link
            to="/blog"
            className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-200 hover:border-[#50b94b] hover:bg-green-50/50 transition-all text-gray-700"
          >
            <BookOpen className="w-5 h-5 text-[#50b94b] flex-shrink-0" />
            <div>
              <div className="font-semibold text-sm text-[#123c7c]">{t('nav.blog')}</div>
              <div className="text-xs text-gray-500">Insights, Articles & Field Stories</div>
            </div>
          </Link>

          <Link
            to="/contact"
            className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-200 hover:border-[#50b94b] hover:bg-green-50/50 transition-all text-gray-700"
          >
            <Mail className="w-5 h-5 text-[#50b94b] flex-shrink-0" />
            <div>
              <div className="font-semibold text-sm text-[#123c7c]">{t('nav.contact')}</div>
              <div className="text-xs text-gray-500">Reach Our Team & Volunteer</div>
            </div>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/">
            <Button className="bg-[#50b94b] hover:bg-[#45a340] text-white px-6">
              <Home className="w-4 h-4 mr-2" />
              Return to Homepage
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

