import { HeroSlider } from '../components/HeroSlider';
import { Section } from '../components/Section';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Users, Sparkles, ArrowRight, MapPin, Activity, UserCheck, Leaf } from 'lucide-react';
import { motion } from 'motion/react';
import CountUp from 'react-countup';
import { useInView } from 'motion/react';
import { useRef } from 'react';

import galleryF1 from '../../assets/F1.jpg';
import galleryF2 from '../../assets/F2.jpg';
import galleryF5 from '../../assets/F5.jpg';
import gallery1H from '../../assets/1H.jpg';
import gallery2H from '../../assets/2H.jpg';
import gallery10 from '../../assets/1O.jpg';
import shatachandiImg from '../../assets/F6.jpg';
import logoEnglish from '../../assets/logo3s.jpg';
import logoKannada from '../../assets/Logokan.jpg';
import logoMeaning from '../../assets/meaning.jpg';
import sustainabilityImg from '../../assets/Sustainability.jpg';
import spiritualityImg from '../../assets/Spirituality.png';
import selfExcellenceImg from '../../assets/Self-Excellence.jpg';
import swacchImg from '../../assets/10.jpg';
import beMakeImg from '../../assets/20.jpeg';
import sustainabilityCirclesImg from '../../assets/30.jpg';
import deviiImg from '../../assets/devii.jpg';
import deviiImgTwo from '../../assets/devii1.jpg';
import durgaJapaPdf from '../../assets/DurgaJapa.pdf';
import shatachandiPdf from '../../assets/Shatachandi.pdf';

export function HomePage() {
  const { t } = useLanguage();
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true });

  const pillars = [
    {
      image: sustainabilityImg,
      titleKey: 'pillars.sustainability',
      descKey: 'pillars.sustainability.desc',
      color: '#50b94b',
      bgColor: 'bg-green-50',
    },
    {
      image: spiritualityImg,
      titleKey: 'pillars.spirituality',
      descKey: 'pillars.spirituality.desc',
      color: '#77371b',
      bgColor: 'bg-amber-50',
    },
    {
      image: selfExcellenceImg,
      titleKey: 'pillars.selfExcellence',
      descKey: 'pillars.selfExcellence.desc',
      color: '#ec1d23',
      bgColor: 'bg-red-50',
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

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <HeroSlider />

      {/* About Section */}
      <Section
        eyebrow={t('home.about.eyebrow')}
        title={t('home.about.title')}
        description={t('home.about.desc')}
        centered
        background="white"
      >
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="home-card p-6 border-2 border-green-100 hover:border-green-300 transition-all hover:shadow-lg">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('home.about.spiritual.title')}</h3>
            <p className="text-gray-600">{t('home.about.spiritual.desc')}</p>
          </Card>
          <Card className="home-card p-6 border-2 border-green-100 hover:border-green-300 transition-all hover:shadow-lg">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('home.about.selfDev.title')}</h3>
            <p className="text-gray-600">{t('home.about.selfDev.desc')}</p>
          </Card>
          <Card className="home-card p-6 border-2 border-green-100 hover:border-green-300 transition-all hover:shadow-lg">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('home.about.sustainability.title')}</h3>
            <p className="text-gray-600">{t('home.about.sustainability.desc')}</p>
          </Card>
        </div>
      </Section>

     

      {/* Core Pillars */}
      <Section
        eyebrow={t('pillars.subtitle')}
        title={t('pillars.title')}
        centered
        background="green"
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
                <div className={`w-20 h-20 rounded-full ${pillar.bgColor} flex items-center justify-center mx-auto mb-6 overflow-hidden`}>
                  <img
                    src={pillar.image}
                    alt={t(pillar.titleKey)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t(pillar.titleKey)}</h3>
                <p className="text-gray-600 leading-relaxed">{t(pillar.descKey)}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="bg-white/90 rounded-3xl shadow-md border border-gray-200 p-8 md:p-12 mt-10 space-y-6">
          <h3 className="text-3xl font-extrabold text-[#123c7c] text-center mb-2">Trust Logo</h3>
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed text-center">
            The logo of <span className="font-semibold">Arghya Trust</span> beautifully integrates the three core values — <span className="font-semibold">Self-Excellence, Sustainability,</span> and <span className="font-semibold">Spirituality</span>. The graceful form inspired by the Kannada letter “ಅ” represents <span className="font-semibold">Self-Excellence (Akshara)</span> — the awakening of human potential and the pursuit of one’s highest possibilities through Education. The <span className="font-semibold">Green Leaf</span> stands for <span className="font-semibold">Sustainability (Abhirudhi)</span> — our deep commitment to living in harmony with nature, conserving resources, and nurturing life. The <span className="font-semibold">Red Dot (Bindhu)</span> symbolizes <span className="font-semibold">Spirituality (Adhyātma)</span> — a symbol of inner consciousness that connects every being to the Divine or Maha Devi.
          </p>
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed text-center">
            Together, these elements reflect the essence of <span className="font-semibold">Arghya</span> — an offering of one’s best self to the world and to the Divine. The logo conveys the Trust’s vision to transform individuals and communities through education, ecological balance, and spiritual harmony — building a world rooted in excellence, service, and peace.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-200 shadow-sm bg-white p-4 flex justify-center">
              <img src={logoEnglish} alt="Arghya Trust English Logo" className="w-full h-auto max-h-64 object-contain" />
            </div>
            <div className="rounded-2xl border border-gray-200 shadow-sm bg-white p-4 flex justify-center">
              <img src={logoKannada} alt="Arghya Trust Kannada Logo" className="w-full h-auto max-h-64 object-contain" />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 shadow-sm bg-white p-4 flex justify-center">
            <img src={logoMeaning} alt="Logo Meaning" className="w-full h-auto max-h-64 object-contain" />
          </div>
        </div>
      </Section>

     {/* Programs & Initiatives */}
      <Section
        eyebrow="What We Do"
        title="Programs & Initiatives"
        centered
        background="white"
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
          <Card className="home-card p-6 text-center hover:shadow-xl transition-all flex flex-col h-full">
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#c20000] mb-4">
              Shri Durga Japa Yagna Abhiyana - 2026
            </h3>
            <div className="flex justify-center mb-6">
              <div className="overflow-hidden w-full max-w-sm aspect-[3/4]">
                <img
                  src={deviiImg}
                  alt="Shri Durga Japa Yagna Abhiyana invitation"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <p className="text-center text-base md:text-lg text-[#123c7c] font-semibold leading-relaxed mb-6">
              To participate in the Shri Durga JapaYagna Abhiyana - 2026 <br />
              click the link below and complete your registration 🙏
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-auto">
              <a
                href={durgaJapaPdf}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="px-6 py-3 rounded-full bg-white text-[#123c7c] font-semibold border border-[#123c7c] shadow hover:shadow-md hover:-translate-y-0.5 transition"
              >
                Download Invitation
              </a>
            </div>
          </Card>

          <Card className="home-card p-6 text-center hover:shadow-xl transition-all flex flex-col h-full">
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#c20000] mb-4">
              Shri Shatachandi Maha Yagna - 2026
            </h3>
            <div className="flex justify-center mb-6">
              <div className="overflow-hidden w-full max-w-sm aspect-[3/4]">
                <img
                  src={deviiImgTwo}
                  alt="Shatachandi Maha Yagna"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <p className="text-center text-base md:text-lg text-[#123c7c] font-semibold leading-relaxed mb-6">
              To participate in the Shri Shatachandi Maha Yagna - <br />2026 <br />
              click the link below and complete your registration 🙏
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-auto">
              <a
                href={shatachandiPdf}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="px-6 py-3 rounded-full bg-white text-[#123c7c] font-semibold border border-[#123c7c] shadow hover:shadow-md hover:-translate-y-0.5 transition"
              >
                Download Invitation
              </a>
            </div>
          </Card>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Link
            to="/contact"
            className="px-8 py-3 rounded-full bg-[#123c7c] text-white font-semibold shadow hover:shadow-lg hover:-translate-y-0.5 transition"
          >
            Register Now
          </Link>
          <Link
            to="/events"
            className="px-8 py-3 rounded-full border border-[#123c7c] text-[#123c7c] font-semibold shadow hover:bg-gray-50 hover:-translate-y-0.5 transition"
          >
            View All Events
          </Link>
        </div>
      </Section>

      {/* Impact Stats */}
      <Section
        eyebrow="Impact"
        title="Our Impact in Numbers"
        centered
        background="gray"
      >
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: t('impact.districts'), value: 3, icon: MapPin },
            { label: t('impact.activities'), value: 3, icon: Activity },
            { label: t('impact.volunteers'), value: 57, icon: UserCheck },
            { label: t('impact.beneficiaries'), value: 5000, icon: Users },
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
                {isStatsInView && <CountUp end={stat.value} duration={2} suffix="+" />}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Gallery */}
      <Section
        eyebrow={t('home.gallery.eyebrow')}
        title={t('home.gallery.title')}
        centered
        background="white"
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
            View All
          </Link>
        </div>
      </Section>

      {/* Testimonials */}
      <Section
        eyebrow={t('home.testimonials.eyebrow')}
        title={t('home.testimonials.title')}
        centered
        background="green"
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
      <Section background="white">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#50b94b] to-[#45a340] p-12 md:p-16 text-center text-white">
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
