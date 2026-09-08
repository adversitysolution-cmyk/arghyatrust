import { Section } from '../components/Section';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import sectionBackground from '../../assets/back.jpg';
import { FormEvent, useState } from 'react';
import { submitContact, submitVolunteer } from '../lib/api';
import join1 from '../../assets/join1.jpg';
import join2 from '../../assets/join2.jpg';
import join3 from '../../assets/join3.jpeg';

export function ContactPage() {
  const { t } = useLanguage();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    age: '',
    gender: '',
    qualification: '',
    cityState: '',
    language: '',
    email: '',
    whatsapp: '',
    interest: '',
    duration: '',
    pledge: false,
  });
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [volunteerSubmitting, setVolunteerSubmitting] = useState(false);
  const [contactResult, setContactResult] = useState('');
  const [volunteerResult, setVolunteerResult] = useState('');

  const contactInfo = [
    {
      icon: MapPin,
      titleKey: 'contact.info.visit',
      offices: [
        {
          name: 'Head Office',
          lines: ["'Viveka Kutira'", 'C/o Vidya Umesh', 'Behind Seetha Nilaya', 'Old Post Office Road', 'Srirangapatna', 'Mandya - 571438'],
        },
        {
          name: 'Mysuru Office',
          lines: ['C/o VGKK TRC', 'Next to JSS College', 'Ooty Road', 'Chamundipuram', 'Mysuru - 570004'],
        },
      ],
    },
    {
      icon: Phone,
      titleKey: 'contact.info.call',
      content: '+91 744 844 1972',
      link: 'tel:+917448441972',
    },
    {
      icon: Mail,
      titleKey: 'contact.info.email',
      content: 'contact@arghyatrust.org',
      link: 'mailto:contact@arghyatrust.org',
    },
  ];

  const socialLinks = [
    { icon: Facebook, url: 'https://facebook.com/arghyatrust', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Instagram, url: 'https://instagram.com/arghyatrust', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Linkedin, url: 'https://www.linkedin.com/company/arghya-trust', label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { icon: Youtube, url: 'https://youtube.com/@arghyatrust', label: 'YouTube', color: 'hover:bg-red-600' },
    { icon: MessageSquare, url: 'https://wa.me/917448441972', label: 'WhatsApp', color: 'hover:bg-green-600' },
  ];

  const joinCards = [
    {
      image: join1,
      title: 'Volunteer',
      description: 'Volunteer with our programs',
    },
    {
      image: join2,
      title: 'Support',
      description: 'Support education and sustainability projects',
    },
    {
      image: join3,
      title: 'Collaborate',
      description: 'Collaborate for spiritual and cultural initiatives',
    },
  ];

  const faqs = [
    {
      questionKey: 'contact.faq.volunteer.q',
      answerKey: 'contact.faq.volunteer.a',
    },
    {
      questionKey: 'contact.faq.tax.q',
      answerKey: 'contact.faq.tax.a',
    },
    {
      questionKey: 'contact.faq.areas.q',
      answerKey: 'contact.faq.areas.a',
    },
    {
      questionKey: 'contact.faq.partner.q',
      answerKey: 'contact.faq.partner.a',
    },
    {
      questionKey: 'contact.faq.intern.q',
      answerKey: 'contact.faq.intern.a',
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

  async function handleContactSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setContactSubmitting(true);
    setContactResult('');
    try {
      await submitContact({
        ...contactForm,
        sourcePage: 'contact',
      });
      setContactForm({ name: '', email: '', phone: '', message: '' });
      setContactResult('Message sent successfully.');
    } catch (error) {
      setContactResult(error instanceof Error ? error.message : 'Failed to send message.');
    } finally {
      setContactSubmitting(false);
    }
  }

  async function handleVolunteerSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setVolunteerSubmitting(true);
    setVolunteerResult('');
    try {
      await submitVolunteer({
        ...volunteerForm,
        sourcePage: 'contact',
      });
      setVolunteerForm({
        name: '',
        age: '',
        gender: '',
        qualification: '',
        cityState: '',
        language: '',
        email: '',
        whatsapp: '',
        interest: '',
        duration: '',
        pledge: false,
      });
      setVolunteerResult('Volunteer application submitted successfully.');
    } catch (error) {
      setVolunteerResult(error instanceof Error ? error.message : 'Failed to submit volunteer form.');
    } finally {
      setVolunteerSubmitting(false);
    }
  }

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
            <Mail className="w-10 h-10 text-[#50b94b]" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            JOIN US
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-gray-700 leading-relaxed"
          >
            Join hands with us to transform Self, serve the World, and offer to the Divine.
          </motion.p>
        </div>
      </Section>

      {/* Contact Info */}
      <Section background="white" className={transparentSectionClass}>
        <div className="grid md:grid-cols-3 gap-6">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
          <Card className="contact-card p-6 text-center hover:shadow-xl transition-all h-full">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-8 h-8 text-[#50b94b]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t(info.titleKey)}</h3>
                {info.offices ? (
                  <div className="space-y-4 text-center text-gray-700">
                    {info.offices.map((office) => (
                      <div key={office.name} className="leading-relaxed">
                        <p>
                          <span className="font-medium">{office.name}:</span>{' '}
                          {office.lines.join(', ')}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : info.link ? (
                  <a
                    href={info.link}
                    className="text-gray-600 hover:text-[#50b94b] transition-colors"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Contact Form & Volunteer Form */}
      <Section
        eyebrow={t('contact.section.eyebrow')}
        title={t('contact.section.title')}
        centered
        background="gray"
        className={transparentSectionClass}
      >
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="contact-card p-0 overflow-hidden border border-green-100">
            <div className="bg-green-50 border-b border-green-100 px-6 py-5">
              <h3 className="text-2xl font-bold tracking-tight text-[#123c7c]">{t('contact.form.title')}</h3>
              <p className="text-sm text-gray-600 mt-1">Share your details and message. Our team will contact you shortly.</p>
            </div>
            <form className="space-y-4 p-6 bg-white" onSubmit={handleContactSubmit}>
              <div>
                <Label htmlFor="name" className="text-sm font-semibold text-gray-800">{t('contact.name')}</Label>
                <Input
                  id="name"
                  placeholder={t('contact.form.namePlaceholder')}
                  value={contactForm.name}
                  onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                  required
                  className="bg-white border-green-100 focus-visible:ring-[#50b94b]/40"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-semibold text-gray-800">{t('contact.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('contact.form.emailPlaceholder')}
                  value={contactForm.email}
                  onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                  required
                  className="bg-white border-green-100 focus-visible:ring-[#50b94b]/40"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm font-semibold text-gray-800">{t('contact.phone')}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t('contact.form.phonePlaceholder')}
                  value={contactForm.phone}
                  onChange={(e) => setContactForm((prev) => ({ ...prev, phone: e.target.value }))}
                  className="bg-white border-green-100 focus-visible:ring-[#50b94b]/40"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-sm font-semibold text-gray-800">{t('contact.message')}</Label>
                <Textarea
                  id="message"
                  placeholder={t('contact.form.messagePlaceholder')}
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                  required
                  className="bg-white border-green-100 focus-visible:ring-[#50b94b]/40"
                />
              </div>
              <Button type="submit" className="w-full bg-[#50b94b] hover:bg-[#45a340] text-white py-6" disabled={contactSubmitting}>
                {contactSubmitting ? 'Sending...' : t('contact.send')}
              </Button>
              {contactResult && <p className="text-sm text-center text-gray-700">{contactResult}</p>}
            </form>
          </Card>

          {/* Volunteer Form */}
          <Card className="contact-card p-0 overflow-hidden border border-green-100">
            <div className="bg-green-50 border-b border-green-100 px-6 py-5 relative">
              <span className="absolute right-5 top-4 text-gray-500 text-lg leading-none">×</span>
              <h3 className="text-2xl font-bold tracking-tight text-[#123c7c]">REGISTRATION FORM</h3>
              <p className="text-sm text-gray-600 mt-1">All information will be sent directly to Arghya Trust</p>
            </div>
            <form className="space-y-5 p-6 bg-white" onSubmit={handleVolunteerSubmit}>
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-800">Personal Details</p>
                <Input
                  id="v-name"
                  placeholder="Full Name *"
                  value={volunteerForm.name}
                  onChange={(e) => setVolunteerForm((prev) => ({ ...prev, name: e.target.value }))}
                  required
                  className="bg-white border-green-100 focus-visible:ring-[#50b94b]/40"
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    id="v-age"
                    type="number"
                    min="16"
                    max="80"
                    placeholder="Age *"
                    value={volunteerForm.age}
                    onChange={(e) => setVolunteerForm((prev) => ({ ...prev, age: e.target.value }))}
                    required
                    className="bg-white border-green-100 focus-visible:ring-[#50b94b]/40"
                  />
                  <Select
                    value={volunteerForm.gender || undefined}
                    onValueChange={(value) => setVolunteerForm((prev) => ({ ...prev, gender: value }))}
                  >
                    <SelectTrigger id="v-gender" className="bg-white border-green-100">
                      <SelectValue placeholder="Select Gender *" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">{t('contact.volunteer.gender.male')}</SelectItem>
                      <SelectItem value="female">{t('contact.volunteer.gender.female')}</SelectItem>
                      <SelectItem value="other">{t('contact.volunteer.gender.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  id="v-qualification"
                  placeholder="Educational Qualification *"
                  value={volunteerForm.qualification}
                  onChange={(e) => setVolunteerForm((prev) => ({ ...prev, qualification: e.target.value }))}
                  required
                  className="bg-white border-green-100 focus-visible:ring-[#50b94b]/40"
                />
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-800">Contact Information</p>
                <Input
                  id="v-city"
                  placeholder="City, State *"
                  value={volunteerForm.cityState}
                  onChange={(e) => setVolunteerForm((prev) => ({ ...prev, cityState: e.target.value }))}
                  required
                  className="bg-white border-green-100 focus-visible:ring-[#50b94b]/40"
                />
                <div className="grid grid-cols-2 gap-3">
                  <Select
                    value={volunteerForm.language || undefined}
                    onValueChange={(value) => setVolunteerForm((prev) => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger id="v-language" className="bg-white border-green-100">
                      <SelectValue placeholder="Select Language *" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="kannada">Kannada</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="v-whatsapp"
                    type="tel"
                    placeholder="WhatsApp Number *"
                    value={volunteerForm.whatsapp}
                    onChange={(e) => setVolunteerForm((prev) => ({ ...prev, whatsapp: e.target.value }))}
                    required
                    className="bg-white border-green-100 focus-visible:ring-[#50b94b]/40"
                  />
                </div>
                <Input
                  id="v-email"
                  type="email"
                  placeholder="Email Address *"
                  value={volunteerForm.email}
                  onChange={(e) => setVolunteerForm((prev) => ({ ...prev, email: e.target.value }))}
                  required
                  className="bg-white border-green-100 focus-visible:ring-[#50b94b]/40"
                />
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-800">Areas of Interest</p>
                <Select
                  value={volunteerForm.interest || undefined}
                  onValueChange={(value) => setVolunteerForm((prev) => ({ ...prev, interest: value }))}
                >
                  <SelectTrigger id="v-interest" className="bg-white border-green-100">
                    <SelectValue placeholder="Select your areas of interest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">{t('programs.category.self')}</SelectItem>
                    <SelectItem value="sustainability">{t('programs.category.sustainability')}</SelectItem>
                    <SelectItem value="spirituality">{t('programs.category.spirituality')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-800">Commitment Duration</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: '1week', label: '1 week' },
                    { value: '1month', label: '1 month' },
                    { value: '3months', label: '3 months' },
                    { value: 'career', label: 'Career' },
                    { value: '1year', label: '1 year' },
                    { value: 'fulltime', label: 'Fulltime' },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setVolunteerForm((prev) => ({ ...prev, duration: item.value }))}
                      className={`rounded-md border px-3 py-2 text-xs md:text-sm transition ${
                        volunteerForm.duration === item.value
                          ? 'border-[#50b94b] bg-green-50 text-[#1b7a2a] font-semibold'
                          : 'border-green-100 bg-white text-gray-700 hover:border-[#50b94b]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-start gap-2 rounded-md border border-green-100 bg-green-50/40 px-3 py-2 text-xs text-gray-700">
                <input
                  type="checkbox"
                  className="mt-0.5"
                  checked={volunteerForm.pledge}
                  onChange={(e) => setVolunteerForm((prev) => ({ ...prev, pledge: e.target.checked }))}
                  required
                />
                <span>
                  I solemnly pledge to join this sacred movement with dedication and sincerity. I commit to
                  contributing my time, energy, and skills for the transformation of self, service to the world,
                  and offerings to the Divine.
                </span>
              </label>

              <Button type="submit" className="w-full bg-[#50b94b] hover:bg-[#45a340] text-white py-6" disabled={volunteerSubmitting}>
                {volunteerSubmitting ? 'Submitting...' : 'Begin Your Journey with Arghya'}
              </Button>
              {volunteerResult && <p className="text-sm text-center text-gray-700">{volunteerResult}</p>}
            </form>
          </Card>
        </div>
      </Section>

      <Section background="white" className={transparentSectionClass}>
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {joinCards.map((card) => (
            <Card key={card.title} className="contact-card p-6 text-center">
              <img
                src={card.image}
                alt={card.title}
                className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-2 border-green-100"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{card.title}</h3>
              <p className="text-gray-600 leading-relaxed">{card.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Map Section */}
      <Section background="white" className={transparentSectionClass}>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="contact-card overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 bg-green-50">
              <p className="font-semibold text-[#123c7c]">Head Office</p>
            </div>
            <iframe
              title="Arghya Trust Head Office Location Map"
              src="https://www.google.com/maps?q=Viveka+Kutira,+Srirangapatna,+Mandya,+Karnataka+571438&output=embed"
              className="w-full h-80 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Card>
          <Card className="contact-card overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 bg-green-50">
              <p className="font-semibold text-[#123c7c]">Mysuru Office</p>
            </div>
            <iframe
              title="Arghya Trust Mysuru Office Location Map"
              src="https://www.google.com/maps?q=VGKK+TRC,+Next+to+JSS+College,+Ooty+Road,+Chamundipuram,+Mysuru+570004&output=embed"
              className="w-full h-80 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Card>
        </div>
      </Section>

      {/* Social & Community Channels */}
      <Section
        eyebrow={t('contact.social.eyebrow')}
        title={t('contact.social.title')}
        centered
        background="gray"
        className={transparentSectionClass}
      >
        <div className="flex flex-wrap justify-center gap-4">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              viewport={{ once: true }}
              className={`w-16 h-16 rounded-full bg-gray-800 ${social.color} text-white flex items-center justify-center transition-all hover:scale-110 shadow-lg`}
              aria-label={social.label}
            >
              <social.icon className="w-8 h-8" />
            </motion.a>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section
        eyebrow={t('contact.faq.eyebrow')}
        title={t('contact.faq.title')}
        centered
        background="white"
        className={transparentSectionClass}
      >
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-semibold">
                {t(faq.questionKey)}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                {t(faq.answerKey)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* Response Assurance */}
      <Section background="green" className={transparentSectionClass}>
          <Card className="contact-card p-8 text-center max-w-2xl mx-auto border-2 border-green-200">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-[#50b94b]" />
          </div>
          <h3 className="text-2xl font-bold mb-3">{t('contact.assurance.title')}</h3>
          <p className="text-gray-600 leading-relaxed">
            {t('contact.assurance.desc')}
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 text-[#50b94b]">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold">{t('contact.assurance.note')}</span>
          </div>
        </Card>
      </Section>
    </div>
  );
}
