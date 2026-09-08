import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Calendar, Clock, Copy, Facebook, MessageCircle, User } from 'lucide-react';
import { blogs, getBlogBySlug } from '../data/blogs';
import sectionBackground from '../../assets/back.jpg';
import { useLanguage } from '../contexts/LanguageContext';
import { getPublicBlogs, type PublicBlogPost } from '../lib/api';

type BlogItem = {
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
  content: string;
  tags: string[];
};

export function BlogDetailPage() {
  const { t } = useLanguage();
  const { slug = '' } = useParams();
  const [approvedBlogs, setApprovedBlogs] = useState<PublicBlogPost[]>([]);
  const [approvedLoaded, setApprovedLoaded] = useState(false);
  const staticBlog = getBlogBySlug(slug);

  useEffect(() => {
    let mounted = true;
    getPublicBlogs()
      .then((data) => {
        if (mounted) {
          setApprovedBlogs(data);
        }
      })
      .finally(() => {
        if (mounted) setApprovedLoaded(true);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const allBlogs = useMemo<BlogItem[]>(() => {
    const dynamicBlogs = approvedBlogs.map((blog) => ({
      ...blog,
      id: blog._id,
    }));
    return [...dynamicBlogs, ...blogs];
  }, [approvedBlogs]);

  const blog = staticBlog || allBlogs.find((item) => item.slug === slug);

  const latestPosts = useMemo(() => {
    if (!blog) return [];
    const remaining = allBlogs
      .filter((item) => item.slug !== blog.slug)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    const sameCategory = remaining.filter((item) => item.category === blog.category);
    const rest = remaining.filter((item) => item.category !== blog.category);
    return [...sameCategory, ...rest].slice(0, 3);
  }, [allBlogs, blog]);

  useEffect(() => {
    if (!blog) return undefined;
    const prevTitle = document.title;
    const prevMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    const previousDescription = prevMeta?.getAttribute('content') || '';

    document.title = `${blog.title} | Arghya Trust Blog`;
    if (prevMeta) {
      prevMeta.setAttribute('content', blog.excerpt);
    }

    return () => {
      document.title = prevTitle;
      if (prevMeta) prevMeta.setAttribute('content', previousDescription);
    };
  }, [blog]);

  if (!blog && !staticBlog && !approvedLoaded) {
    return (
      <div className="min-h-screen pt-20 pb-16" style={{
        backgroundImage: `url(${sectionBackground})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}>
        <div className="mx-auto max-w-[900px] px-4 text-center text-gray-600">Loading blog...</div>
      </div>
    );
  }

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${blog.title} - ${pageUrl}`)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
    } catch {
      // no-op fallback
    }
  };

  const pageBackgroundStyle = {
    backgroundImage: `url(${sectionBackground})`,
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  } as const;

  return (
    <div className="min-h-screen pt-20 pb-16" style={pageBackgroundStyle}>
      <article className="mx-auto max-w-[900px] px-4">
        <header className="mb-8">
          <span className="inline-block rounded-full bg-[#4CAF50]/10 px-3 py-1 text-xs font-semibold text-[#4CAF50]">
            {blog.category}
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-[#0f2d57] md:text-5xl">{blog.title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {blog.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {blog.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {blog.readTime}
            </span>
          </div>
        </header>

        <section className="mb-8">
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="h-auto w-full rounded-2xl object-cover shadow-md"
          />
        </section>

        <section
          className="mb-10 text-[17px] leading-8 text-gray-700 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:text-[#0f2d57] [&_h3]:mt-7 [&_h3]:mb-2 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-[#0f2d57] [&_p]:mb-4 [&_blockquote]:my-8 [&_blockquote]:rounded-2xl [&_blockquote]:border-l-4 [&_blockquote]:border-[#4CAF50] [&_blockquote]:bg-[#f6fbf6] [&_blockquote]:p-5 [&_blockquote]:text-lg [&_blockquote]:italic [&_blockquote]:text-[#1b3a1a]"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <section className="mb-8 rounded-2xl border border-gray-200 p-4">
          <h2 className="mb-3 text-lg font-semibold text-[#0f2d57]">{t('blog.detail.share')}</h2>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={handleShareWhatsApp} className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2 text-sm font-semibold text-white">
              <MessageCircle className="h-4 w-4" />
              {t('blog.detail.whatsapp')}
            </button>
            <button type="button" onClick={handleShareFacebook} className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-4 py-2 text-sm font-semibold text-white">
              <Facebook className="h-4 w-4" />
              {t('blog.detail.facebook')}
            </button>
            <button type="button" onClick={handleCopyLink} className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700">
              <Copy className="h-4 w-4" />
              {t('blog.detail.copyLink')}
            </button>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-3 text-lg font-semibold text-[#0f2d57]">{t('blog.detail.tags')}</h2>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="border-t border-gray-200 pt-10">
          <h2 className="mb-6 text-3xl font-semibold text-[#0f2d57]">{t('blog.latest')}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <article key={post.id} className="overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <img src={post.featuredImage} alt={post.title} className="h-44 w-full object-cover" />
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-[#0f2d57]">{post.title}</h3>
                  <p className="mb-4 text-sm text-gray-600">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="text-sm font-semibold text-[#4CAF50] hover:underline">
                    {t('common.readMore')}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
