import { Section } from '../components/Section';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from '../components/ui/card';
import { Phone, Facebook, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import logoImage from '../../assets/logooo.png';
import trustee1 from '../../assets/T1.jpg';
import trustee2 from '../../assets/T2.jpg';
import trustee3 from '../../assets/T3.jpg';
import trustee4 from '../../assets/T4.jpg';
import trustee5 from '../../assets/T5.jpg';
import logoEnglish from '../../assets/logo3s.jpg';
import logoKannada from '../../assets/Logokan.jpeg';
import logoMeaning from '../../assets/meaning.jpg';
import founderImage from '../../assets/founder.JPG';
import work1 from '../../assets/F1.jpg';
import work2 from '../../assets/F2.jpg';
import work3 from '../../assets/F3.jpg';
import work4 from '../../assets/f4.jpg';
import work5 from '../../assets/F5.jpg';
import work6 from '../../assets/F6.jpg';
import compassionImage from '../../assets/Compassion.png';
import excellenceImage from '../../assets/Excellence.jpg';
import communityImage from '../../assets/Community.jpg';
import learningImage from '../../assets/learning.jpg';
import purposeImage from '../../assets/purpose.png';
import transparencyImage from '../../assets/Transparency.png';
import sectionBackground from '../../assets/back.jpg';

export function AboutPage() {
  const { t } = useLanguage();

  const arghyaMeaning = [
    { letter: 'A', meaningKey: 'about.arghya.a' },
    { letter: 'R', meaningKey: 'about.arghya.r' },
    { letter: 'G', meaningKey: 'about.arghya.g' },
    { letter: 'H', meaningKey: 'about.arghya.h' },
    { letter: 'Y', meaningKey: 'about.arghya.y' },
    { letter: 'A', meaningKey: 'about.arghya.a2' },
  ];

  const values = [
    {
      image: compassionImage,
      titleKey: 'about.values.compassion.title',
      descKey: 'about.values.compassion.desc',
    },
    {
      image: excellenceImage,
      titleKey: 'about.values.excellence.title',
      descKey: 'about.values.excellence.desc',
    },
    {
      image: communityImage,
      titleKey: 'about.values.community.title',
      descKey: 'about.values.community.desc',
    },
    {
      image: learningImage,
      titleKey: 'about.values.learning.title',
      descKey: 'about.values.learning.desc',
    },
    {
      image: purposeImage,
      titleKey: 'about.values.purpose.title',
      descKey: 'about.values.purpose.desc',
    },
    {
      image: transparencyImage,
      titleKey: 'about.values.transparency.title',
      descKey: 'about.values.transparency.desc',
    },
  ];

  const milestones = [
    { year: '2020', eventKey: 'about.timeline.2020' },
    { year: '2021', eventKey: 'about.timeline.2021' },
    { year: '2022', eventKey: 'about.timeline.2022' },
    { year: '2023', eventKey: 'about.timeline.2023' },
    { year: '2024', eventKey: 'about.timeline.2024' },
    { year: '2025', eventKey: 'about.timeline.2025' },
    { year: '2026', eventKey: 'about.timeline.2026' },
  ];

  const team = [
    {
      name: 'Sri Ranjan Bellarpady',
      roleKey: 'about.team.ranjan.role',
      bioKey: 'about.team.ranjan.bio',
      image: trustee1,
    },
    {
      name: 'Mr. Bellala Gopinath Rao',
      roleKey: 'about.team.gopinath.role',
      bioKey: 'about.team.gopinath.bio',
      image: trustee2,
    },
    {
      name: 'Mr. Dilraj Alva',
      roleKey: 'about.team.dilraj.role',
      bioKey: 'about.team.dilraj.bio',
      image: trustee3,
    },
    {
      name: 'Mr. Vinay P M',
      roleKey: 'about.team.vinay.role',
      bioKey: 'about.team.vinay.bio',
      image: trustee4,
    },
  ];

  const pageBackgroundStyle = {
    backgroundImage: `url(${sectionBackground})`,
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  } as const;

  const transparentSectionClass = '!bg-transparent';

  return (
    <div className="min-h-screen pt-20" style={pageBackgroundStyle}>
      {/* Hero Section */}
      <Section
        background="green"
        className={`${transparentSectionClass} py-24 md:py-32`}
      >
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <img src={logoImage} alt="Arghya Trust" className="h-24 w-auto mx-auto" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {t('about.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-gray-700 leading-relaxed"
          >
            {t('about.hero.desc')}
          </motion.p>
        </div>
      </Section>

      {/* Vision & Mission */}
      <Section background="white" className={transparentSectionClass}>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="about-card vm-card relative overflow-hidden p-10 bg-white rounded-3xl shadow-lg border border-gray-100">
            <div className="vm-accent-circle absolute -top-6 -right-6 w-28 h-28 rounded-full bg-gradient-to-br from-[#3ac36d] to-[#9be2ba]" />
            <h2 className="text-3xl font-bold mb-4 text-[#123c7c] text-center">{t('about.vision')}</h2>
            <p className="text-gray-700 leading-relaxed text-left">
              {t('about.vision.desc')}
            </p>
          </Card>

          <Card className="about-card vm-card relative overflow-hidden p-10 bg-white rounded-3xl shadow-lg border border-gray-100">
            <div className="vm-accent-circle absolute -top-6 -right-6 w-28 h-28 rounded-full bg-gradient-to-br from-[#3ac36d] to-[#9be2ba]" />
            <h2 className="text-3xl font-bold mb-4 text-[#123c7c] text-center">{t('about.mission')}</h2>
            <ul className="space-y-4 text-gray-700 text-left">
              <li className="flex gap-3">
                <span className="vm-bullet w-2.5 h-2.5 rounded-full bg-[#1fa56a] mt-2" />
                <span>{t('about.mission.point1')}</span>
              </li>
              <li className="flex gap-3">
                <span className="vm-bullet w-2.5 h-2.5 rounded-full bg-[#1fa56a] mt-2" />
                <span>{t('about.mission.point2')}</span>
              </li>
              <li className="flex gap-3">
                <span className="vm-bullet w-2.5 h-2.5 rounded-full bg-[#1fa56a] mt-2" />
                <span>{t('about.mission.point3')}</span>
              </li>
              <li className="flex gap-3">
                <span className="vm-bullet w-2.5 h-2.5 rounded-full bg-[#1fa56a] mt-2" />
                <span>{t('about.mission.point4')}</span>
              </li>
            </ul>
          </Card>
        </div>
      </Section>
      <Section
        eyebrow={t('about.arghya.eyebrow')}
        title={t('about.arghya.title')}
        centered
        background="gray"
        className={transparentSectionClass}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {arghyaMeaning.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="group p-8 bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-lg transition-all h-full">
                {(() => {
                  const phrase = t(item.meaningKey);
                  const [firstWord, ...rest] = phrase.split(' ');
                  const title = firstWord || phrase;
                  const description = phrase; // keep full phrase so description starts with the key word
                  return (
                    <div className="flex items-start gap-4 h-full">
                      <span className="text-6xl font-semibold text-[#50b94b] group-hover:text-[#ec1d23] transition-colors leading-none">{item.letter}</span>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-[#123c7c] mb-2">{title}</h3>
                        <p className="text-gray-700 leading-relaxed">{description}</p>
                      </div>
                    </div>
                  );
                })()}
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

{/* Trust Logo */}

      <Section
        centered
        background="gray"
        className={transparentSectionClass}
      >
        <div className="text-center mt-14 mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#50b94b]/10 text-[#50b94b] text-sm font-semibold mb-4">
            Brand Identity
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Symbol of Trust & Purpose
          </h2>
        </div>

        <div className="p-8 md:p-12 max-w-5xl mx-auto space-y-6">
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed text-center">
            The Arghya Trust logo represents three guiding values: Self-Excellence, Sustainability, and Spirituality.
          </p>
          <ul className="max-w-4xl mx-auto text-left space-y-3 text-gray-800">
            <li className="flex gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#50b94b] mt-2" />
              <span>The Akshara-inspired form represents self-excellence through knowledge, discipline, and personal growth.</span>
            </li>
            <li className="flex gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#50b94b] mt-2" />
              <span>The green leaf represents sustainability through environmental care and responsible community action.</span>
            </li>
            <li className="flex gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#50b94b] mt-2" />
              <span>The red bindhu represents spirituality and inner awareness that shape values-based service.</span>
            </li>
          </ul>
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed text-center">
            Together, these symbols communicate our commitment to transformative education, social responsibility, and value-driven leadership.
          </p>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 shadow-sm bg-white p-4 flex min-h-[170px] items-center justify-center">
              <img src={logoEnglish} alt="Arghya Trust English Logo" className="trust-logo-hover h-full max-h-40 w-full object-contain" />
            </div>
            <div className="rounded-2xl border border-gray-200 shadow-sm bg-white p-4 flex min-h-[170px] items-center justify-center">
              <img src={logoKannada} alt="Arghya Trust Kannada Logo" className="trust-logo-hover h-full max-h-40 w-full object-contain" />
            </div>
            <div className="rounded-2xl border border-gray-200 shadow-sm bg-white p-4 flex min-h-[170px] items-center justify-center">
              <img src={logoMeaning} alt="Arghya Trust logo symbolism for self-excellence sustainability and spirituality" className="trust-logo-hover h-full max-h-36 w-full object-contain" />
            </div>
          </div>
        </div>
      </Section>

      {/* Journey Timeline */}
      <Section
        eyebrow={t('about.timeline.eyebrow')}
        title={t('about.journey')}
        centered
        background="white"
        className={transparentSectionClass}
      >
        <div className="max-w-3xl mx-auto">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex gap-6 mb-8 last:mb-0"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#50b94b] flex items-center justify-center text-white font-bold flex-shrink-0">
                  {milestone.year.slice(-2)}
                </div>
                {index < milestones.length - 1 && (
                  <div className="w-0.5 h-full bg-green-200 mt-2" />
                )}
              </div>
              <div className="pb-8">
                <div className="font-semibold text-[#50b94b] mb-1">{milestone.year}</div>
                <p className="text-gray-700">{t(milestone.eventKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Leadership Team */}
      <Section
        eyebrow={t('about.team.eyebrow')}
        title={t('about.team')}
        centered
        background="gray"
        className={transparentSectionClass}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto justify-items-stretch">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="about-card p-6 text-center hover:shadow-xl transition-all flex flex-col h-full">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-green-100 shadow-sm">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-sm text-[#50b94b] font-semibold mb-3">{t(member.roleKey)}</p>
                <p className="text-sm text-gray-600 flex-1">{t(member.bioKey)}</p>
                <div className="mt-4 flex items-center justify-center gap-3 text-gray-600">
                  <button aria-label="Call" className="p-2 rounded-full border border-gray-200 hover:border-[#50b94b] hover:text-[#50b94b] transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button aria-label="WhatsApp" className="p-2 rounded-full border border-gray-200 hover:border-[#50b94b] hover:text-[#50b94b] transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button aria-label="Facebook" className="p-2 rounded-full border border-gray-200 hover:border-[#50b94b] hover:text-[#50b94b] transition-colors">
                    <Facebook className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      
      {/* Founder Feature */}
      <Section centered background="white" className={transparentSectionClass}>
        <div className="rounded-3xl p-6 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#123c7c]">Sri Ranjan Bellarpady</h2>
            <p className="text-lg text-gray-700 font-semibold">Founder & Managing Trustee</p>
          </div>

          <div className="grid lg:grid-cols-[0.85fr_1.3fr_0.85fr] gap-6 items-stretch">
            <div className="h-full w-full max-w-[320px] mx-auto">
              <img
                src={founderImage}
                alt="Sri Ranjan Bellarpady"
                className="w-full h-full object-cover rounded-xl border-2 border-[#50b94b] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              />
            </div>

            <div className="p-4 md:p-6 lg:px-2 flex flex-col justify-center">
              <div className="text-center space-y-4 text-gray-800">
                <p>
                  <span className="font-semibold">Sri Ranjan Bellarpady</span> is a transformative leader committed to nation-building through the principles of Self-excellence, Sustainability, and Spirituality (3S).
                </p>
                <p>
                  As Chief Coordinator of the Ramakrishna Mission's Swachh Mangaluru Abhiyan, he mobilized 10,000+ volunteers and contributed 20 lakh man-hours to environmental awareness, training 50,000+ children and youth in sustainable living.
                </p>
                <p>
                  Founder of Mangala Resource Management Pvt. Ltd., he operates India's first rural MRF and multiple facilities processing 10,000 tons of waste annually, creating 160 green jobs across 250 villages, and pioneering Zero Waste Campus and Temple Projects.
                </p>
                <p>
                  As Founder of Arghya Trust, he advances education, tribal empowerment, and spiritual well-being through value-based initiatives. A Gold Medalist in Philosophy, he also serves as a nominated member of the Swami Vivekananda Study Centre at Mangalore University.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[work1, work2, work3].map((img, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border-2 border-[#50b94b] shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ width: '100%', aspectRatio: '4 / 3' }}
                >
                  <img
                    src={img}
                    alt={`Arghya Trust community impact activity ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Team"
        centered
        background="white"
        className={transparentSectionClass}
      >
        <div className="max-w-6xl mx-auto">
          <Card className="about-card p-6 text-center hover:shadow-xl transition-all flex flex-col h-full max-w-sm mx-auto">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-green-100 shadow-sm">
              <img
                src={trustee5}
                alt="Mr. Shashidhar M"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-bold text-lg mb-1">Mr. Shashidhar M</h3>
            <p className="text-sm text-[#50b94b] font-semibold mb-3">Director</p>
            <p className="text-sm text-gray-600 flex-1">
              Providing leadership and operational oversight for Trust initiatives.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3 text-gray-600">
              <button aria-label="Call" className="p-2 rounded-full border border-gray-200 hover:border-[#50b94b] hover:text-[#50b94b] transition-colors">
                <Phone className="w-4 h-4" />
              </button>
              <button aria-label="WhatsApp" className="p-2 rounded-full border border-gray-200 hover:border-[#50b94b] hover:text-[#50b94b] transition-colors">
                <MessageCircle className="w-4 h-4" />
              </button>
              <button aria-label="Facebook" className="p-2 rounded-full border border-gray-200 hover:border-[#50b94b] hover:text-[#50b94b] transition-colors">
                <Facebook className="w-4 h-4" />
              </button>
            </div>
          </Card>
        </div>
      </Section>
      <Section
        eyebrow={t('about.values.eyebrow')}
        title={t('about.values')}
        centered
        background="white"
        className={transparentSectionClass}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
            >
          <Card className="about-card p-6 hover:shadow-lg transition-all border-l-4 border-[#50b94b]">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center flex-shrink-0 overflow-hidden border border-green-100">
                  <img
                    src={value.image}
                    alt={t(value.titleKey)}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{t(value.titleKey)}</h3>
                  <p className="text-sm text-gray-600">{t(value.descKey)}</p>
                </div>
              </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
