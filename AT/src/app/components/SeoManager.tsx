import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getBlogBySlug } from '../data/blogs';

interface PageSeoConfig {
  title: string;
  description: string;
  canonical: string;
  ogType?: string;
  ogImage?: string;
  keywords?: string;
  noindex?: boolean;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const BASE_URL = 'https://arghyatrust.org';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;

const staticPagesConfig: Record<string, PageSeoConfig> = {
  '/': {
    title: 'Arghya Trust | Self-Excellence, Sustainability & Spirituality',
    description:
      'Arghya Trust is a non-profit organization in Karnataka advancing education, sustainability, and spirituality through youth workshops, cleanliness drives, and community empowerment.',
    canonical: `${BASE_URL}/`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    keywords:
      'Arghya Trust, 3S philosophy, nonprofit Karnataka, Swacch Manas, Be and Make workshop, Sustainability Circles, education, youth leadership, spirituality, Srirangapatna, Mandya, Mysuru, Mangaluru',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${BASE_URL}/#webpage`,
          url: `${BASE_URL}/`,
          name: 'Arghya Trust | Self-Excellence, Sustainability & Spirituality',
          description:
            'Arghya Trust is a non-profit organization in Karnataka advancing education, sustainability, and spirituality through youth workshops, cleanliness drives, and community empowerment.',
          isPartOf: { '@id': `${BASE_URL}/#website` },
          about: { '@id': `${BASE_URL}/#organization` },
        },
      ],
    },
  },
  '/about': {
    title: 'About Arghya Trust | Vision, Mission & 3S Leadership',
    description:
      'Learn about Arghya Trust vision, mission, and leadership under Sri Ranjan Bellarpady. Guided by the 3S philosophy to transform self, serve society, and offer to the divine.',
    canonical: `${BASE_URL}/about`,
    ogType: 'article',
    ogImage: DEFAULT_IMAGE,
    keywords:
      'About Arghya Trust, Sri Ranjan Bellarpady, 3S vision, leadership Arghya Trust, nonprofit Karnataka, value-based education',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'AboutPage',
          '@id': `${BASE_URL}/about#aboutpage`,
          url: `${BASE_URL}/about`,
          name: 'About Arghya Trust | Vision, Mission & 3S Leadership',
          description:
            'Learn about Arghya Trust vision, mission, and leadership under Sri Ranjan Bellarpady. Guided by the 3S philosophy to transform self, serve society, and offer to the divine.',
          isPartOf: { '@id': `${BASE_URL}/#website` },
          mainEntity: { '@id': `${BASE_URL}/#organization` },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${BASE_URL}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'About Us',
              item: `${BASE_URL}/about`,
            },
          ],
        },
      ],
    },
  },
  '/donate': {
    title: 'Donate to Arghya Trust | Support Education & Sustainability',
    description:
      'Support Arghya Trust initiatives in education, environmental sustainability, and youth leadership across Karnataka. Transparent fund allocation and real community impact.',
    canonical: `${BASE_URL}/donate`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    keywords:
      'Donate Arghya Trust, support education Karnataka, sponsor student workshop, nonprofit donation Mandya Mysuru, 3S fund allocation',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${BASE_URL}/donate#webpage`,
          url: `${BASE_URL}/donate`,
          name: 'Donate to Arghya Trust | Support Education & Sustainability',
          description:
            'Support Arghya Trust initiatives in education, environmental sustainability, and youth leadership across Karnataka. Transparent fund allocation and real community impact.',
          potentialAction: {
            '@type': 'DonateAction',
            target: `${BASE_URL}/donate`,
            recipient: { '@id': `${BASE_URL}/#organization` },
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${BASE_URL}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Donate',
              item: `${BASE_URL}/donate`,
            },
          ],
        },
      ],
    },
  },
  '/events': {
    title: 'Arghya Trust Events | Community Gatherings & Youth Workshops',
    description:
      'Explore upcoming and past Arghya Trust events including Shri Durga Japa Yagna, Shatachandi Maha Yagna, Be & Make youth workshops, and Swachha Biligiri campaigns.',
    canonical: `${BASE_URL}/events`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    keywords:
      'Arghya Trust events, Durga Japa Yagna 2026, Shatachandi Maha Yagna Polali, Swachha Biligiri, youth development workshops Karnataka',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `${BASE_URL}/events#collectionpage`,
          url: `${BASE_URL}/events`,
          name: 'Arghya Trust Events | Community Gatherings & Youth Workshops',
          description:
            'Explore upcoming and past Arghya Trust events including Shri Durga Japa Yagna, Shatachandi Maha Yagna, Be & Make youth workshops, and Swachha Biligiri campaigns.',
        },
        {
          '@type': 'Event',
          name: 'Shri Durga Japa Yagna Abhiyana - 2026',
          description: 'Collective spiritual effort rooted in devotion and discipline.',
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          location: {
            '@type': 'Place',
            name: 'Multiple Centers across Karnataka',
            address: {
              '@type': 'PostalAddress',
              addressRegion: 'Karnataka',
              addressCountry: 'IN',
            },
          },
          organizer: { '@id': `${BASE_URL}/#organization` },
        },
        {
          '@type': 'Event',
          name: 'Shatachandi Maha Yagna',
          description: 'Sacred Vedic ritual and community gathering with Sri Vidya practitioners.',
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          location: {
            '@type': 'Place',
            name: 'Sri Ramakrishna Tapovana, Polali',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Polali, Mangaluru',
              addressRegion: 'Karnataka',
              addressCountry: 'IN',
            },
          },
          organizer: { '@id': `${BASE_URL}/#organization` },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${BASE_URL}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Events',
              item: `${BASE_URL}/events`,
            },
          ],
        },
      ],
    },
  },
  '/gallery': {
    title: 'Arghya Trust Photo Gallery | Social Impact & Field Moments',
    description:
      'View authentic photos from Arghya Trust programs, student workshops, cleanliness drives, and cultural-spiritual gatherings across Karnataka.',
    canonical: `${BASE_URL}/gallery`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    keywords:
      'Arghya Trust photo gallery, Swacch Manas photos, Be and Make pictures, social work photos Karnataka, sustainability drives',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `${BASE_URL}/gallery#collectionpage`,
          url: `${BASE_URL}/gallery`,
          name: 'Arghya Trust Photo Gallery | Social Impact & Field Moments',
          description:
            'View authentic photos from Arghya Trust programs, student workshops, cleanliness drives, and cultural-spiritual gatherings across Karnataka.',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${BASE_URL}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Gallery',
              item: `${BASE_URL}/gallery`,
            },
          ],
        },
      ],
    },
  },
  '/blog': {
    title: 'Arghya Trust Blog | Articles on Education, Growth & Sustainability',
    description:
      'Read practical reflections and verified field stories from Arghya Trust on self-development, sustainability, spirituality, and youth leadership.',
    canonical: `${BASE_URL}/blog`,
    ogType: 'blog',
    ogImage: DEFAULT_IMAGE,
    keywords:
      'Arghya Trust blog, 3S articles, youth leadership essays, environmental awareness Karnataka, character development',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Blog',
          '@id': `${BASE_URL}/blog#blog`,
          url: `${BASE_URL}/blog`,
          name: 'Arghya Trust Blog | Articles on Education, Growth & Sustainability',
          description:
            'Read practical reflections and verified field stories from Arghya Trust on self-development, sustainability, spirituality, and youth leadership.',
          publisher: { '@id': `${BASE_URL}/#organization` },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${BASE_URL}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Blog',
              item: `${BASE_URL}/blog`,
            },
          ],
        },
      ],
    },
  },
  '/blog/submit': {
    title: 'Submit an Article | Arghya Trust Community Stories',
    description:
      'Contribute your story or perspective on self-excellence, sustainability, or spirituality to the Arghya Trust blog network.',
    canonical: `${BASE_URL}/blog/submit`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    keywords: 'Submit blog Arghya Trust, guest post social impact, community writing Karnataka',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${BASE_URL}/blog/submit#webpage`,
          url: `${BASE_URL}/blog/submit`,
          name: 'Submit an Article | Arghya Trust Community Stories',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${BASE_URL}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Blog',
              item: `${BASE_URL}/blog`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Submit Article',
              item: `${BASE_URL}/blog/submit`,
            },
          ],
        },
      ],
    },
  },
  '/contact': {
    title: 'Contact Arghya Trust | Office Locations & Volunteer Opportunities',
    description:
      'Reach Arghya Trust offices in Srirangapatna and Mysuru. Connect for volunteering, educational partnerships, donations, or general queries.',
    canonical: `${BASE_URL}/contact`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    keywords:
      'Contact Arghya Trust, volunteer Karnataka, Arghya Trust phone number, Srirangapatna office, Mysuru office, NGO partnership',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ContactPage',
          '@id': `${BASE_URL}/contact#contactpage`,
          url: `${BASE_URL}/contact`,
          name: 'Contact Arghya Trust | Office Locations & Volunteer Opportunities',
          description:
            'Reach Arghya Trust offices in Srirangapatna and Mysuru. Connect for volunteering, educational partnerships, donations, or general queries.',
          mainEntity: { '@id': `${BASE_URL}/#organization` },
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How can I volunteer with Arghya Trust?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Fill out the volunteer registration form on our contact page or email us at contact@arghyatrust.org. We welcome volunteers who can contribute time, skills, or expertise aligned with our 3S philosophy.',
              },
            },
            {
              '@type': 'Question',
              name: 'Which areas does Arghya Trust currently operate in?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'We currently work across 3+ districts including Mangaluru, Mandya, Mysuru, and surrounding regions in Karnataka, partnering with Ramakrishna Mission and Mangalore University.',
              },
            },
            {
              '@type': 'Question',
              name: 'How can schools or colleges partner with Arghya Trust?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Educational institutions can partner with us for Swacch Manas, Sustainability Circles, or Be & Make youth workshops. Contact us directly to discuss scheduling.',
              },
            },
            {
              '@type': 'Question',
              name: 'What are the core pillars of Arghya Trust?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Arghya Trust operates on the 3S foundation: Self-Excellence (personal character & life skills), Sustainability (ecological responsibility & cleanliness), and Spirituality (inner resilience & dharmic values).',
              },
            },
          ],
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${BASE_URL}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Contact',
              item: `${BASE_URL}/contact`,
            },
          ],
        },
      ],
    },
  },
};

function setMetaTag(attributeName: string, attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(href: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function setJsonLd(schema: Record<string, unknown> | Array<Record<string, unknown>> | undefined) {
  const existing = document.getElementById('dynamic-jsonld');
  if (existing) {
    existing.remove();
  }
  if (!schema) return;

  const script = document.createElement('script');
  script.id = 'dynamic-jsonld';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

export function SeoManager() {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const path = location.pathname.replace(/\/+$/, '') || '/';
    let config = staticPagesConfig[path];

    // Handle blog detail dynamic slug
    if (!config && path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      const staticBlog = getBlogBySlug(slug);

      if (staticBlog) {
        config = {
          title: `${staticBlog.title} | Arghya Trust Blog`,
          description: staticBlog.excerpt,
          canonical: `${BASE_URL}/blog/${staticBlog.slug}`,
          ogType: 'article',
          ogImage: staticBlog.featuredImage.startsWith('http')
            ? staticBlog.featuredImage
            : `${BASE_URL}${staticBlog.featuredImage}`,
          keywords: staticBlog.tags ? staticBlog.tags.join(', ') : 'Arghya Trust article',
          schema: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: staticBlog.title,
            description: staticBlog.excerpt,
            image: staticBlog.featuredImage.startsWith('http')
              ? staticBlog.featuredImage
              : `${BASE_URL}${staticBlog.featuredImage}`,
            datePublished: staticBlog.publishedAt,
            dateModified: staticBlog.publishedAt,
            author: {
              '@type': 'Person',
              name: staticBlog.author,
            },
            publisher: {
              '@id': `${BASE_URL}/#organization`,
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${BASE_URL}/blog/${staticBlog.slug}`,
            },
          },
        };
      } else {
        // Fallback for dynamic approved blog post
        config = {
          title: 'Community Story & Article | Arghya Trust Blog',
          description:
            'Read practical insights and community impact field reflections from Arghya Trust across education, sustainability, and spirituality.',
          canonical: `${BASE_URL}${path}`,
          ogType: 'article',
          ogImage: DEFAULT_IMAGE,
        };
      }
    }

    // Fallback for unknown / 404 page
    if (!config) {
      config = {
        title: 'Page Not Found | Arghya Trust',
        description: 'The requested page could not be found on Arghya Trust.',
        canonical: `${BASE_URL}${path}`,
        noindex: true,
      };
    }

    // 1. Update Title
    document.title = config.title;

    // 2. Update HTML Language
    document.documentElement.lang = language || 'en';

    // 3. Update Standard Meta
    setMetaTag('name', 'description', config.description);
    if (config.keywords) {
      setMetaTag('name', 'keywords', config.keywords);
    }
    setMetaTag(
      'name',
      'robots',
      config.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // 4. Update Canonical
    setCanonical(config.canonical);

    // 5. Update Open Graph
    setMetaTag('property', 'og:title', config.title);
    setMetaTag('property', 'og:description', config.description);
    setMetaTag('property', 'og:url', config.canonical);
    setMetaTag('property', 'og:type', config.ogType || 'website');
    setMetaTag('property', 'og:image', config.ogImage || DEFAULT_IMAGE);
    setMetaTag('property', 'og:site_name', 'Arghya Trust');

    // 6. Update Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', config.title);
    setMetaTag('name', 'twitter:description', config.description);
    setMetaTag('name', 'twitter:image', config.ogImage || DEFAULT_IMAGE);

    // 7. Inject JSON-LD Schema
    setJsonLd(config.schema);
  }, [location.pathname, language]);

  return null;
}
