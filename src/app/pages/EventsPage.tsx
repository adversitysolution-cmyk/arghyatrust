import { Section } from '../components/Section';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, MapPin, Users, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import durgaImg from '../../assets/devii.jpg';
import shatachandiImg from '../../assets/devii1.jpg';
import cardImg1 from '../../assets/1U.jpg';
import cardImg2 from '../../assets/2U.jpg';
import cardImg3 from '../../assets/3U.jpg';
import swacchImg from '../../assets/10.jpg';
import beMakeImg from '../../assets/20.jpeg';
import sustainabilityCirclesImg from '../../assets/30.jpg';
import sectionBackground from '../../assets/back.jpg';

export function EventsPage() {
  const { t } = useLanguage();
  const pageBackgroundStyle = {
    backgroundImage: `url(${sectionBackground})`,
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  } as const;
  const transparentSectionClass = '!bg-transparent';

  const upcomingEvents = [
    {
      title: 'Shri Durga Japa Yagna Abhiyana - 2026',
      date: 'Ongoing Registration',
      location: 'Multiple Locations',
      description: 'Collective spiritual effort rooted in devotion and discipline.',
      image: durgaImg,
      registrationLink: '/contact',
      featured: true,
    },
    {
      title: 'Shatachandi Maha Yagna – January 2026',
      date: 'January 2026',
      location: 'Sri Ramakrishna Tapovana, Polali',
      description: 'Experience the sacred Shatachandi Maha Yagna and offer your devotion.',
      image: shatachandiImg,
      registrationLink: '/contact',
      featured: true,
    },
    {
      title: 'Swachha Biligiri (BR Hills Cleanliness Campaign)',
      date: 'Upcoming',
      location: 'BR Hills, Karnataka',
      description: 'Holistic cleanliness and sustainability initiative in Biligiri Rangan Hills.',
      image: cardImg1,
    },
    {
      title: 'Mandira Uttana Yojana (Temple Rejuvenation Program)',
      date: 'Upcoming',
      location: 'Karnataka',
      description: 'Temple rejuvenation with preservation, awareness, and community participation.',
      image: cardImg2,
    },
    {
      title: 'Residential School (Integrated Education Model)',
      date: 'Upcoming',
      location: 'Mangaluru',
      description: 'Integrated education model nurturing clarity, compassion, and leadership.',
      image: cardImg3,
    },
  ];

  const upcomingList = upcomingEvents.slice(2);

  const pastEvents = [
    {
      title: 'Swacch Manas',
      date: 'Upcoming',
      location: 'Mangaluru',
      participants: 150,
      image: swacchImg,
      description:
        'An after-school program blending civic awareness, cleanliness, life skills, soft skills, and career counseling for holistic child development. In Mangaluru in association with Ramakrishna Mission Swacch Mangaluru Abhiyan.',
    },
    {
      title: 'Be & Make (Youth Workshop)',
      date: 'Upcoming',
      location: 'Mangalore University',
      participants: 120,
      image: beMakeImg,
      description:
        'Personality development, leadership, financial literacy, industry-based training, and nation-building spirit in association with Mangalore University Swami Vivekananda Study Centre.',
    },
    {
      title: 'Sustainability Circles',
      date: 'Upcoming',
      location: 'Schools & Colleges',
      participants: 100,
      image: sustainabilityCirclesImg,
      description:
        'Interactive sessions on waste management, cleanliness, and green practices to build responsible citizens and environmental stewards.',
    },
  ];

  const participantTestimonials = [
    {
      name: 'Arun Kumar',
      event: 'Be & Make Workshop',
      textKey: 'events.testimonials.arun.text',
    },
    {
      name: 'Meera Shetty',
      event: 'Shatachandi Maha Yagna',
      textKey: 'events.testimonials.meera.text',
    },
  ];

  return (
    <div className="min-h-screen pt-20" style={pageBackgroundStyle}>
      {/* Hero Section */}
      <Section background="green" className={`${transparentSectionClass} py-24 md:py-32`}>
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6"
          >
            <Calendar className="w-10 h-10 text-[#50b94b]" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {t('events.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-gray-700 leading-relaxed"
          >
            {t('events.hero.desc')}
          </motion.p>
        </div>
      </Section>

      {/* Upcoming Events */}
      <Section
        eyebrow={t('events.upcoming.eyebrow')}
        title={t('events.upcoming')}
        centered
        background="gray"
        className={transparentSectionClass}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingList.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="events-card overflow-hidden hover:shadow-xl transition-all group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <Badge className="absolute top-4 right-4 bg-[#50b94b] text-white">
                    {t(event.categoryKey)}
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{event.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-[#50b94b]" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-[#50b94b]" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-[#50b94b] text-[#50b94b] hover:bg-green-50">
                    {t('common.learnMore')}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Past Events */}
      <Section
        eyebrow={t('events.past.eyebrow')}
        title={t('events.past')}
        centered
        background="white"
        className={transparentSectionClass}
      >
        <div className="grid md:grid-cols-3 gap-6">
          {pastEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="events-card overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
                <div className="relative h-44 md:h-48">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold mb-2 text-lg">{event.title}</h3>
                  <p className="text-gray-700 text-base leading-relaxed mb-4 flex-1">{event.description}</p>
                  <div className="flex items-center justify-between text-base text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{event.participants} {t('events.participants')}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link to="/gallery">
            <Button variant="outline" className="px-6 border-[#123c7c] text-[#123c7c] hover:bg-gray-50">
              View Gallery
            </Button>
          </Link>
        </div>
      </Section>

      {/* Impact Through Events */}
      <Section
        eyebrow={t('events.impact.eyebrow')}
        title={t('events.impact.title')}
        centered
        background="green"
        className={transparentSectionClass}
      >
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="events-card p-6 text-center">
            <div className="text-4xl font-bold text-[#50b94b] mb-2">800+</div>
            <div className="text-gray-700 font-medium">{t('events.impact.metric.participants')}</div>
          </Card>
          <Card className="events-card p-6 text-center">
            <div className="text-4xl font-bold text-[#50b94b] mb-2">15+</div>
            <div className="text-gray-700 font-medium">{t('events.impact.metric.events')}</div>
          </Card>
          <Card className="events-card p-6 text-center">
            <div className="text-4xl font-bold text-[#50b94b] mb-2">5+</div>
            <div className="text-gray-700 font-medium">{t('events.impact.metric.partners')}</div>
          </Card>
        </div>
      </Section>

      {/* Participant Testimonials */}
      <Section
        eyebrow={t('events.testimonials.eyebrow')}
        title={t('events.testimonials.title')}
        centered
        background="white"
        className={transparentSectionClass}
      >
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {participantTestimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.event}</div>
                </div>
              </div>
              <p className="text-gray-600 italic">"{t(testimonial.textKey)}"</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section background="gray" className={transparentSectionClass}>
        <div className="text-center rounded-3xl border border-[#50b94b]/20 bg-gradient-to-br from-[#50b94b]/40 to-[#45a340]/40 p-12 text-white shadow-[0_18px_50px_rgba(80,185,75,0.14)]">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('events.participate')}</h2>
          <p className="text-lg mb-8 text-green-50 max-w-2xl mx-auto">
            {t('events.cta.desc')}
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-[#50b94b] hover:bg-gray-100 px-8">
              {t('events.cta.button')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}
