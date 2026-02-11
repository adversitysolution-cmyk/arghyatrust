import { Section } from '../components/Section';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { BookOpen, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import { Input } from '../components/ui/input';

export function BlogPage() {
  const { t } = useLanguage();

  const categories = [
    { nameKey: 'blog.categories.self', count: 12, color: 'bg-red-100 text-red-700' },
    { nameKey: 'blog.categories.sustainability', count: 15, color: 'bg-green-100 text-green-700' },
    { nameKey: 'blog.categories.spirituality', count: 10, color: 'bg-amber-100 text-amber-700' },
    { nameKey: 'blog.categories.stories', count: 18, color: 'bg-blue-100 text-blue-700' },
  ];

  const featuredPosts = [
    {
      titleKey: 'blog.featured.post1.title',
      excerptKey: 'blog.featured.post1.excerpt',
      authorKey: 'blog.featured.post1.author',
      date: 'Feb 5, 2026',
      categoryKey: 'blog.categories.spirituality',
      image: 'https://images.unsplash.com/photo-1766899922114-c19a8a7472d2?w=600',
      readTime: '5 min read',
    },
    {
      titleKey: 'blog.featured.post2.title',
      excerptKey: 'blog.featured.post2.excerpt',
      authorKey: 'blog.featured.post2.author',
      date: 'Feb 3, 2026',
      categoryKey: 'blog.categories.self',
      image: 'https://images.unsplash.com/flagged/photo-1574097656146-0b43b7660cb6?w=600',
      readTime: '4 min read',
    },
  ];

  const latestPosts = [
    {
      titleKey: 'blog.latest.post1.title',
      excerptKey: 'blog.latest.post1.excerpt',
      authorKey: 'blog.latest.post1.author',
      date: 'Feb 8, 2026',
      categoryKey: 'blog.categories.self',
      image: 'https://images.unsplash.com/photo-1623863568368-69e4cbe6cc0b?w=600',
    },
    {
      titleKey: 'blog.latest.post2.title',
      excerptKey: 'blog.latest.post2.excerpt',
      authorKey: 'blog.latest.post2.author',
      date: 'Feb 7, 2026',
      categoryKey: 'blog.categories.sustainability',
      image: 'https://images.unsplash.com/photo-1758599668356-c8c919e24dda?w=600',
    },
    {
      titleKey: 'blog.latest.post3.title',
      excerptKey: 'blog.latest.post3.excerpt',
      authorKey: 'blog.latest.post3.author',
      date: 'Feb 6, 2026',
      categoryKey: 'blog.categories.spirituality',
      image: 'https://images.unsplash.com/photo-1766899922114-c19a8a7472d2?w=600',
    },
    {
      titleKey: 'blog.latest.post4.title',
      excerptKey: 'blog.latest.post4.excerpt',
      authorKey: 'blog.latest.post4.author',
      date: 'Feb 4, 2026',
      categoryKey: 'blog.categories.sustainability',
      image: 'https://images.unsplash.com/photo-1758599668209-783bd3691ec8?w=600',
    },
    {
      titleKey: 'blog.latest.post5.title',
      excerptKey: 'blog.latest.post5.excerpt',
      authorKey: 'blog.latest.post5.author',
      date: 'Feb 2, 2026',
      categoryKey: 'blog.categories.stories',
      image: 'https://images.unsplash.com/photo-1712231872585-7ff87adc7bce?w=600',
    },
    {
      titleKey: 'blog.latest.post6.title',
      excerptKey: 'blog.latest.post6.excerpt',
      authorKey: 'blog.latest.post6.author',
      date: 'Feb 1, 2026',
      categoryKey: 'blog.categories.spirituality',
      image: 'https://images.unsplash.com/photo-1766899922114-c19a8a7472d2?w=600',
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
            <BookOpen className="w-10 h-10 text-[#50b94b]" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {t('blog.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-gray-700 leading-relaxed"
          >
            {t('blog.hero.desc')}
          </motion.p>
        </div>
      </Section>

      {/* Categories */}
      <Section background="white">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              viewport={{ once: true }}
              className={`px-6 py-3 rounded-full font-semibold ${category.color} hover:shadow-lg transition-all hover:scale-105`}
            >
              <Tag className="inline w-4 h-4 mr-2" />
              {t(category.nameKey)} ({category.count})
            </motion.button>
          ))}
        </div>
      </Section>

      {/* Featured Posts */}
      <Section
        eyebrow={t('blog.featured.eyebrow')}
        title={t('blog.featured')}
        centered
        background="gray"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {featuredPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="blog-card overflow-hidden hover:shadow-xl transition-all group h-full">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <Badge className="absolute top-4 right-4 bg-[#50b94b] text-white">
                    {t('blog.featured.badge')}
                  </Badge>
                </div>
                <div className="p-6">
                  <Badge className="mb-3">{t(post.categoryKey)}</Badge>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-[#50b94b] transition-colors">
                    {t(post.titleKey)}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{t(post.excerptKey)}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{t(post.authorKey)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-[#50b94b] text-[#50b94b] hover:bg-green-50">
                    {t('common.readMore')}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Latest Posts */}
      <Section
        eyebrow={t('blog.latest.eyebrow')}
        title={t('blog.latest')}
        centered
        background="white"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="blog-card overflow-hidden hover:shadow-lg transition-all group h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <Badge className="mb-3 w-fit">{t(post.categoryKey)}</Badge>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[#50b94b] transition-colors">
                    {t(post.titleKey)}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-1">{t(post.excerptKey)}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{t(post.authorKey)}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Newsletter */}
      <Section
        eyebrow={t('blog.newsletter.eyebrow')}
        title={t('blog.newsletter.title')}
        centered
        background="green"
      >
        <Card className="blog-card p-8 max-w-2xl mx-auto border-2 border-green-200">
          <p className="text-gray-600 mb-6 text-center">
            {t('blog.newsletter.desc')}
          </p>
          <form className="flex flex-col md:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <Input
              type="email"
              placeholder={t('contact.email')}
              className="flex-1"
            />
            <Button type="submit" className="bg-[#50b94b] hover:bg-[#45a340] px-8">
              {t('common.subscribe')}
            </Button>
          </form>
        </Card>
      </Section>

      {/* CTA */}
      <Section background="white">
        <div className="blog-card text-center bg-gradient-to-br from-[#50b94b] to-[#45a340] rounded-3xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('blog.cta.title')}</h2>
          <p className="text-lg mb-8 text-green-50 max-w-2xl mx-auto">
            {t('blog.cta.desc')}
          </p>
          <Button size="lg" className="bg-white text-[#50b94b] hover:bg-gray-100 px-8">
            {t('common.contact')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </Section>
    </div>
  );
}
