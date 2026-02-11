import { Section } from '../components/Section';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Heart, Shield, Users, BookOpen, TreePine, Sparkles, Building2, CheckCircle2 } from 'lucide-react';
import qrImage from '../../assets/qr.jpg';
import { motion } from 'motion/react';

export function DonatePage() {
  const { t } = useLanguage();

  const donationAmounts = [500, 1000, 2500, 5000, 10000];

  const impactAreas = [
    {
      icon: BookOpen,
      titleKey: 'donate.allocation.education.title',
      percentage: 40,
      descriptionKey: 'donate.allocation.education.desc',
    },
    {
      icon: TreePine,
      titleKey: 'donate.allocation.sustainability.title',
      percentage: 30,
      descriptionKey: 'donate.allocation.sustainability.desc',
    },
    {
      icon: Sparkles,
      titleKey: 'donate.allocation.spiritual.title',
      percentage: 20,
      descriptionKey: 'donate.allocation.spiritual.desc',
    },
    {
      icon: Building2,
      titleKey: 'donate.allocation.operations.title',
      percentage: 10,
      descriptionKey: 'donate.allocation.operations.desc',
    },
  ];

  const impactExamples = [
    { amount: '₹500', impactKey: 'donate.examples.500' },
    { amount: '₹1,000', impactKey: 'donate.examples.1000' },
    { amount: '₹2,500', impactKey: 'donate.examples.2500' },
    { amount: '₹5,000', impactKey: 'donate.examples.5000' },
    { amount: '₹10,000', impactKey: 'donate.examples.10000' },
  ];

  const testimonials = [
    {
      name: 'Rajesh Menon',
      roleKey: 'donate.testimonials.rajesh.role',
      textKey: 'donate.testimonials.rajesh.text',
    },
    {
      name: 'Kavita Nair',
      roleKey: 'donate.testimonials.kavita.role',
      textKey: 'donate.testimonials.kavita.text',
    },
  ];

  const transparencyPoints = [
    'donate.transparency.point1',
    'donate.transparency.point2',
    'donate.transparency.point3',
    'donate.transparency.point4',
    'donate.transparency.point5',
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <Section background="green" className="py-24 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6"
          >
            <Heart className="w-10 h-10 text-[#50b94b]" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {t('donate.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-gray-700 leading-relaxed"
          >
            {t('donate.hero.desc')}
          </motion.p>
        </div>
      </Section>

      {/* Why Donate */}
      <Section
        eyebrow={t('donate.impact.eyebrow')}
        title={t('donate.why')}
        centered
        background="white"
      >
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="donate-card p-6 text-center hover:shadow-xl transition-all">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-[#50b94b]" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t('donate.impact.card1.title')}</h3>
            <p className="text-gray-600">
              {t('donate.impact.card1.desc')}
            </p>
          </Card>

          <Card className="donate-card p-6 text-center hover:shadow-xl transition-all">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-[#50b94b]" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t('donate.impact.card2.title')}</h3>
            <p className="text-gray-600">
              {t('donate.impact.card2.desc')}
            </p>
          </Card>

          <Card className="donate-card p-6 text-center hover:shadow-xl transition-all">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-[#50b94b]" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t('donate.impact.card3.title')}</h3>
            <p className="text-gray-600">
              {t('donate.impact.card3.desc')}
            </p>
          </Card>
        </div>
      </Section>

      {/* Allocation */}
      <Section
        eyebrow={t('donate.allocation.eyebrow')}
        title={t('donate.allocation.title')}
        centered
        background="gray"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {impactAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="donate-card p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <area.icon className="w-6 h-6 text-[#50b94b]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{t(area.titleKey)}</h3>
                      <span className="text-[#50b94b] font-bold text-lg">{area.percentage}%</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{t(area.descriptionKey)}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#50b94b] h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${area.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Donation Form */}
      <Section
        eyebrow={t('donate.contribute.eyebrow')}
        title={t('donate.amount')}
        centered
        background="white"
      >
        <Card className="p-8 max-w-2xl mx-auto border-2 border-green-100">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {donationAmounts.map((amount) => (
              <button
                key={amount}
                className="px-4 py-3 border-2 border-gray-300 rounded-xl hover:border-[#50b94b] hover:bg-green-50 transition-all font-semibold"
              >
                ₹{amount.toLocaleString()}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">{t('donate.custom.label')}</label>
            <input
              type="number"
              placeholder={t('donate.custom.placeholder')}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#50b94b] focus:outline-none"
            />
          </div>

          <div className="bg-green-50 rounded-xl p-6 mb-6 text-center">
            <h4 className="font-semibold mb-3">{t('donate.bank.title')}</h4>
            <div className="text-sm space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">{t('donate.bank.bankLabel')}</span>
                <span className="font-medium">HDFC Bank</span>
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">{t('donate.bank.branchLabel')}</span>
                <span className="font-medium">Hampanakatta Mangalore</span>
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">{t('donate.bank.accountLabel')}</span>
                <span className="font-medium">50100359972602</span>
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">{t('donate.bank.ifscLabel')}</span>
                <span className="font-medium">HDFC0001571</span>
              </p>
            </div>

            <div className="mt-6 flex justify-center">
              <img
                src={qrImage}
                alt="Arghya Trust UPI QR"
                className="w-40 h-40 object-contain rounded-lg shadow-sm"
              />
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              {t('donate.contact.line')} <br />
              <a href="mailto:contact@arghyatrust.org" className="text-[#50b94b] font-medium">
                contact@arghyatrust.org
              </a>
            </p>
            <Button size="lg" className="bg-[#50b94b] hover:bg-[#45a340] px-8">
              {t('common.donate')}
            </Button>
          </div>
        </Card>
      </Section>

      {/* Impact Examples */}
      <Section
        eyebrow={t('donate.examples.eyebrow')}
        title={t('donate.impact')}
        centered
        background="green"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {impactExamples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
            >
                <Card className="donate-card p-5 hover:shadow-lg transition-all border-l-4 border-[#50b94b]">
                  <div className="text-2xl font-bold text-[#50b94b] mb-2">{example.amount}</div>
                  <p className="text-gray-700 text-sm">{t(example.impactKey)}</p>
                </Card>
              </motion.div>
            ))}
          </div>
      </Section>

      {/* Transparency */}
      <Section
        eyebrow={t('donate.transparency.eyebrow')}
        title={t('donate.transparency')}
        centered
        background="white"
      >
        <div className="max-w-2xl mx-auto">
          <div className="space-y-3">
            {transparencyPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="w-6 h-6 text-[#50b94b] flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{t(point)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Donor Testimonials */}
      <Section
        eyebrow={t('donate.testimonials.eyebrow')}
        title={t('donate.testimonials.title')}
        centered
        background="gray"
      >
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="donate-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{t(testimonial.roleKey)}</div>
                </div>
              </div>
              <p className="text-gray-600 italic">"{t(testimonial.textKey)}"</p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
