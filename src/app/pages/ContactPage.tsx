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

export function ContactPage() {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      titleKey: 'contact.info.visit',
      content: "Arghya Trust, 'Viveka Kutira', C/o Vidya Umesh, Behind Seetha Nilaya, Old Post Office Road, Srirangapatna, Mandya - 571438",
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
            <Mail className="w-10 h-10 text-[#50b94b]" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {t('contact.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-gray-700 leading-relaxed"
          >
            {t('contact.hero.desc')}
          </motion.p>
        </div>
      </Section>

      {/* Contact Info */}
      <Section background="white">
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
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-gray-600 hover:text-[#50b94b] transition-colors"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-gray-600">{info.content}</p>
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
      >
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="contact-card p-8">
            <h3 className="text-2xl font-bold mb-6">{t('contact.form.title')}</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <Label htmlFor="name">{t('contact.name')}</Label>
                <Input id="name" placeholder={t('contact.form.namePlaceholder')} />
              </div>
              <div>
                <Label htmlFor="email">{t('contact.email')}</Label>
                <Input id="email" type="email" placeholder={t('contact.form.emailPlaceholder')} />
              </div>
              <div>
                <Label htmlFor="phone">{t('contact.phone')}</Label>
                <Input id="phone" type="tel" placeholder={t('contact.form.phonePlaceholder')} />
              </div>
              <div>
                <Label htmlFor="message">{t('contact.message')}</Label>
                <Textarea id="message" placeholder={t('contact.form.messagePlaceholder')} rows={4} />
              </div>
              <Button type="submit" className="w-full bg-[#50b94b] hover:bg-[#45a340]">
                {t('contact.send')}
              </Button>
            </form>
          </Card>

          {/* Volunteer Form */}
          <Card className="contact-card p-8">
            <h3 className="text-2xl font-bold mb-6">{t('contact.volunteer.title')}</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <Label htmlFor="v-name">{t('contact.volunteer.name')}</Label>
                <Input id="v-name" placeholder={t('contact.form.namePlaceholder')} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="v-age">{t('contact.volunteer.age')}</Label>
                  <Input id="v-age" type="number" min="16" max="80" placeholder={t('contact.volunteer.agePlaceholder')} />
                </div>
                <div>
                  <Label htmlFor="v-gender">{t('contact.volunteer.gender')}</Label>
                  <Select>
                    <SelectTrigger id="v-gender">
                      <SelectValue placeholder={t('contact.volunteer.genderPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">{t('contact.volunteer.gender.male')}</SelectItem>
                      <SelectItem value="female">{t('contact.volunteer.gender.female')}</SelectItem>
                      <SelectItem value="other">{t('contact.volunteer.gender.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="v-email">{t('contact.email')}</Label>
                <Input id="v-email" type="email" placeholder={t('contact.form.emailPlaceholder')} />
              </div>
              <div>
                <Label htmlFor="v-whatsapp">{t('contact.volunteer.whatsapp')}</Label>
                <Input id="v-whatsapp" type="tel" placeholder={t('contact.form.phonePlaceholder')} />
              </div>
              <div>
                <Label htmlFor="v-interest">{t('contact.volunteer.interest')}</Label>
                <Select>
                  <SelectTrigger id="v-interest">
                    <SelectValue placeholder={t('contact.volunteer.interestPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">{t('programs.category.self')}</SelectItem>
                    <SelectItem value="sustainability">{t('programs.category.sustainability')}</SelectItem>
                    <SelectItem value="spirituality">{t('programs.category.spirituality')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="v-duration">{t('contact.volunteer.duration')}</Label>
                <Select>
                  <SelectTrigger id="v-duration">
                    <SelectValue placeholder={t('contact.volunteer.durationPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1week">{t('contact.volunteer.duration.1week')}</SelectItem>
                    <SelectItem value="1month">{t('contact.volunteer.duration.1month')}</SelectItem>
                    <SelectItem value="3months">{t('contact.volunteer.duration.3months')}</SelectItem>
                    <SelectItem value="1year">{t('contact.volunteer.duration.1year')}</SelectItem>
                    <SelectItem value="career">{t('contact.volunteer.duration.career')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full bg-[#50b94b] hover:bg-[#45a340]">
                {t('contact.volunteer.submit')}
              </Button>
            </form>
          </Card>
        </div>
      </Section>

      {/* Map Section */}
      <Section background="white">
        <Card className="contact-card overflow-hidden">
          <div className="h-96 bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-[#50b94b] mx-auto mb-3" />
              <p className="text-gray-600 font-medium">
                Viveka Kutira, Srirangapatna, Mandya - 571438
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {t('contact.map.note')}
              </p>
            </div>
          </div>
        </Card>
      </Section>

      {/* Social & Community Channels */}
      <Section
        eyebrow={t('contact.social.eyebrow')}
        title={t('contact.social.title')}
        centered
        background="gray"
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
      <Section background="green">
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
