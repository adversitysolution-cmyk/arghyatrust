import { HeroSlider } from '../components/HeroSlider';
import { Section } from '../components/Section';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, MapPin, Activity, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';
import CountUp from 'react-countup';
import { useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { getPublicEvents, type PublicEvent } from '../lib/api';

import galleryF1 from '../../assets/F1.jpg';
import galleryF2 from '../../assets/F2.jpg';
import galleryF5 from '../../assets/F5.jpg';
import gallery1H from '../../assets/1H.jpg';
import gallery2H from '../../assets/2H.jpg';
import gallery10 from '../../assets/1O.jpg';
import sustainabilityImg from '../../assets/Sustainability.png';
import spiritualityImg from '../../assets/Spirituality.png';
import selfExcellenceImg from '../../assets/Self-Excellence.png';
import swacchImg from '../../assets/10.jpg';
import beMakeImg from '../../assets/20.jpeg';
import sustainabilityCirclesImg from '../../assets/30.jpg';
import deviiImg from '../../assets/devii.jpg';
import durgaJapaPdf from '../../assets/DurgaJapa.pdf';
import sectionBackground from '../../assets/back.jpg';

export function HomePage() {
  const { t } = useLanguage();
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true });
  const [featuredEvents, setFeaturedEvents] = useState<PublicEvent[]>([]);

  const pillars = [
    {
      image: selfExcellenceImg,
      titleKey: 'pillars.selfExcellence',
      descKey: 'pillars.selfExcellence.desc',
      color: '#ec1d23',
      bgColor: 'bg-[#fff1f4]',
    },
    {
      image: sustainabilityImg,
      titleKey: 'pillars.sustainability',
      descKey: 'pillars.sustainability.desc',
      color: '#50b94b',
      bgColor: 'bg-[#effbf4]',
    },
    {
      image: spiritualityImg,
      titleKey: 'pillars.spirituality',
      descKey: 'pillars.spirituality.desc',
      color: '#77371b',
      bgColor: 'bg-[#fff8e8]',
    },
  ];

  const programCards = [
    {
      title: 'Swacch Manas',
      description:
        'An after-school program blending civic awareness, cleanliness, life skills, soft skills, and career counseling for holistic child development. In Mangaluru in association with Ramakrishna Mission Swacch Mangaluru Abhiyan.',
      image: swacchImg,
      alt: 'Swacch Manas students posing together',
    },
    {
      title: 'Be & Make (Youth Workshop)',
      description:
        'In association with Mangalore University Swami Vivekananda Study Centre, this program equips youth with personality development, leadership, financial literacy, industry-based training, and nation-building spirit. It also functions as an after-college program.',
      image: beMakeImg,
      alt: 'Youth celebrating at Be & Make workshop',
    },
    {
      title: 'Sustainability Circles',
      description:
        'Sustainability Circles in schools and colleges inspire and empower youth to adopt eco-sensitive living. Through interactive sessions on waste management, cleanliness, and green practices, students learn to become responsible citizens and environmental stewards, fostering a culture of sustainability and collective action for a cleaner, greener future.',
      image: sustainabilityCirclesImg,
      alt: 'Workshop session for Sustainability Circles',
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      roleKey: 'testimonials.priya.role',
      textKey: 'testimonials.priya.text',
    },
    {
      name: 'Rakesh Kumar',
      roleKey: 'testimonials.rakesh.role',
      textKey: 'testimonials.rakesh.text',
    },
    {
      name: 'Anita Rao',
      roleKey: 'testimonials.anita.role',
      textKey: 'testimonials.anita.text',
    },
    {
      name: 'Mohan Bhat',
      roleKey: 'testimonials.mohan.role',
      textKey: 'testimonials.mohan.text',
    },
    {
      name: 'Sunita Nayak',
      roleKey: 'testimonials.sunita.role',
      textKey: 'testimonials.sunita.text',
    },
    {
      name: 'Vijay Shetty',
      roleKey: 'testimonials.vijay.role',
      textKey: 'testimonials.vijay.text',
    },
  ];

  const galleryImages = [
    galleryF1,
    galleryF2,
    galleryF5,
    gallery1H,
    gallery2H,
    gallery10,
  ];

  useEffect(() => {
    let active = true;

    getPublicEvents()
      .then((events) => {
        if (!active) return;
        const featured = events
          .filter((event) => event.featured)
          .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0))
          .slice(0, 2);
        setFeaturedEvents(featured);
      })
      .catch(() => {
        if (!active) return;
        setFeaturedEvents([]);
      });

    return () => {
      active = false;
    };
  }, []);

  const fallbackFeaturedEvents: PublicEvent[] = [
    {
      _id: 'fallback-1',
      title: 'Shri Durga Japa Yagna Abhiyana - 2026',
      description:
        'To participate in the Shri Durga JapaYagna Abhiyana - 2026 click the link below and complete your registration 🙏',
      date: 'Ongoing Registration',
      location: 'Multiple Locations',
      category: 'Spirituality',
      status: 'Upcoming',
      imageUrl: deviiImg,
      brochureUrl: durgaJapaPdf,
      registrationLink: '/contact',
      featured: true,
      sortOrder: 1,
    },
  ];
  const featuredCards = (featuredEvents.length > 0 ? featuredEvents : fallbackFeaturedEvents)
    .filter((event) => !/shatachandi|durga\s*japa/i.test(event.title))
    .slice(0, 2);

  const pageBackgroundStyle = {
    backgroundImage: `url(${sectionBackground})`,
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  } as const;

  const transparentSectionClass = '!bg-transparent';

  return (
    <div className="min-h-screen" style={pageBackgroundStyle}>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Impact Stats */}
      <Section
        eyebrow="Measuring Change"
        title="Creating Measurable Impact"
        centered
        background="gray"
        className={transparentSectionClass}
      >
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: t('impact.districts'), value: 4, icon: MapPin, suffix: '' },
            { label: t('impact.activities'), value: 5, icon: Activity, suffix: '' },
            { label: t('impact.volunteers'), value: 25, icon: UserCheck, suffix: '+' },
            { label: t('impact.beneficiaries'), value: 5000, icon: Users, suffix: '+' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-[#50b94b]" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-[#50b94b] mb-2">
                {isStatsInView && <CountUp end={stat.value} duration={2} suffix={stat.suffix} />}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* About Section */}
      <Section
        eyebrow={t('home.about.eyebrow')}
        title={t('home.about.title')}
        description={t('home.about.desc')}
        centered
        background="white"
        className={transparentSectionClass}
      >
        {null}
      </Section>

      {/* Core Pillars */}
      <Section
        eyebrow={t('pillars.subtitle')}
        title={t('pillars.title')}
        centered
        background="green"
        className={transparentSectionClass}
      >
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className={`home-card p-8 text-center h-full hover:shadow-xl transition-all hover:scale-105 border-2 ${pillar.bgColor} border-transparent hover:border-green-300`}>
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mx-auto mb-6 overflow-hidden">
                  <img
                    src={pillar.image}
                    alt={t(pillar.titleKey)}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t(pillar.titleKey)}</h3>
                <p className="text-gray-600 leading-relaxed">{t(pillar.descKey)}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Programs & Initiatives */}
      <Section
        eyebrow="Key Focus Areas"
        title="Initiatives That Drive Change"
        centered
        background="white"
        className={transparentSectionClass}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {programCards.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="home-card overflow-hidden h-full shadow-sm transition-all">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-bold text-[#123c7c] mb-3 leading-tight">
                    {program.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    {program.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {featuredCards.map((event) => (
            <Card key={event._id} className="home-card p-6 text-center hover:shadow-xl transition-all flex flex-col h-full">
              <h3 className="text-3xl md:text-4xl font-bold text-[#c20000] mb-4">
                {event.title}
              </h3>
              <div className="flex justify-center mb-6">
                <div className="overflow-hidden w-full max-w-sm aspect-[3/4]">
                  <img
                    src={event.imageUrl || deviiImg}
                    alt={event.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <p className="text-center text-lg text-gray-600 leading-relaxed mb-6">
                {event.description}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-auto">
                {event.brochureUrl ? (
                  <a
                    href={event.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="px-6 py-3 rounded-full bg-white text-[#123c7c] font-semibold border border-[#123c7c] shadow hover:shadow-md hover:-translate-y-0.5 transition"
                  >
                    Download Invitation
                  </a>
                ) : (
                  <span className="px-6 py-3 rounded-full bg-white text-gray-400 font-semibold border border-gray-300">
                    Invitation Not Available
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Link
            to="/events"
            className="px-8 py-3 rounded-full border border-[#123c7c] text-[#123c7c] font-semibold shadow hover:bg-gray-50 hover:-translate-y-0.5 transition"
          >
            View All Projects & Activites
          </Link>
        </div>
      </Section>

      {/* Gallery */}
      <Section
        eyebrow={t('home.gallery.eyebrow')}
        title={t('home.gallery.title')}
        centered
        background="white"
        className={transparentSectionClass}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.35 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl group shadow-sm bg-gray-50"
              style={{ aspectRatio: '1 / 1' }}
            >
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link
            to="/gallery"
            className="px-8 py-3 rounded-full border border-[#123c7c] text-[#123c7c] font-semibold shadow hover:bg-gray-50 hover:-translate-y-0.5 transition"
          >
            View More
          </Link>
        </div>
      </Section>

      {/* Testimonials */}
      <Section
        eyebrow={t('home.testimonials.eyebrow')}
        title={t('home.testimonials.title')}
        centered
        background="green"
        className={transparentSectionClass}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="home-card p-6 h-full hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{t(testimonial.roleKey)}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic leading-relaxed">"{t(testimonial.textKey)}"</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Banner */}
      <Section background="white" className={transparentSectionClass}>
        <div className="relative overflow-hidden rounded-3xl border border-[#50b94b]/20 bg-gradient-to-br from-[#50b94b]/40 to-[#45a340]/40 p-12 md:p-16 text-center text-white shadow-[0_18px_50px_rgba(80,185,75,0.14)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.cta.title')}</h2>
            <p className="text-lg mb-8 text-green-50 max-w-2xl mx-auto">
              {t('home.cta.desc')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-[#50b94b] hover:bg-gray-100 px-8">
                  {t('common.volunteer')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/donate">
                <Button size="lg" className="bg-white text-[#50b94b] hover:bg-gray-100 px-8">
                  {t('common.donate')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
