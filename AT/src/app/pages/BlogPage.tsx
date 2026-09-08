import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { blogs } from '../data/blogs';
import sectionBackground from '../../assets/back.jpg';
import { useLanguage } from '../contexts/LanguageContext';
import { getPublicBlogs, type PublicBlogPost } from '../lib/api';
import { toast } from 'sonner';

type BlogCardItem = {
  id: string | number;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  featuredImage: string;
  publishedAt: string;
};

function BlogListCard({ blog }: { blog: BlogCardItem }) {
  const { t } = useLanguage();
  return (
    <Link
      to={`/blog/${blog.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <span className="inline-block rounded-full bg-[#4CAF50]/10 px-3 py-1 text-xs font-semibold text-[#4CAF50]">
          {blog.category}
        </span>
        <h2 className="mt-3 text-xl font-semibold leading-tight text-[#0f2d57]">{blog.title}</h2>
        <p className="mt-3 text-sm leading-6 text-gray-600">{blog.excerpt}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            {blog.author}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {blog.date}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {blog.readTime}
          </span>
        </div>
        <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#4CAF50]">
          {t('common.readMore')}
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function BlogPage() {
  const { t } = useLanguage();
  const [approvedBlogs, setApprovedBlogs] = useState<PublicBlogPost[]>([]);

  useEffect(() => {
    let mounted = true;
    getPublicBlogs()
      .then((data) => {
        if (mounted) {
          setApprovedBlogs(data);
        }
      })
      .catch(() => {
        toast.error('Unable to load latest approved blogs');
      });
    return () => {
      mounted = false;
    };
  }, []);

  const allBlogs = useMemo<BlogCardItem[]>(() => {
    const dynamicBlogs = approvedBlogs.map((blog) => ({
      ...blog,
      id: blog._id,
    }));
    return [...dynamicBlogs, ...blogs];
  }, [approvedBlogs]);

  const pageBackgroundStyle = {
    backgroundImage: `url(${sectionBackground})`,
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  } as const;

  return (
    <div className="min-h-screen pt-20 pb-16" style={pageBackgroundStyle}>
      <section className="mx-auto max-w-[1200px] px-4">
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-[#0f2d57] md:text-5xl">{t('blog.title')}</h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            {t('blog.hero.desc')}
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allBlogs
            .slice()
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
            .map((blog) => (
              <article key={blog.id}>
                <BlogListCard blog={blog} />
              </article>
            ))}
        </section>

        <section className="mt-14">
          <div className="rounded-3xl bg-gradient-to-br from-[#50b94b] to-[#45a340] p-8 text-center text-white md:p-12">
            <h2 className="text-3xl font-bold md:text-4xl">{t('blog.cta.title')}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-green-50">
              {t('blog.cta.desc')}
            </p>
            <Link
              to="/blog/submit"
              className="mt-8 inline-flex items-center rounded-xl bg-white px-6 py-3 font-semibold text-[#50b94b] transition-colors hover:bg-gray-100"
            >
              Submit Your Blog
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </section>
    </div>
  );
}
