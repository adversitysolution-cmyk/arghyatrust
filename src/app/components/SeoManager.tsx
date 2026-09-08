import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const seoByPath: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Arghya Trust | Education, Sustainability & Spirituality',
    description:
      'Arghya Trust advances education, sustainability, and spirituality through youth workshops, community programs, and service initiatives across Karnataka.',
  },
  '/about': {
    title: 'About Arghya Trust | Vision, Mission & Leadership',
    description:
      'Discover Arghya Trust vision, mission, leadership, and milestones shaping education, sustainability, and values-based community development.',
  },
  '/donate': {
    title: 'Donate to Arghya Trust | Support Community Impact',
    description:
      'Support Arghya Trust programs in education, sustainability, and youth leadership. Your donation helps build cleaner, stronger, value-driven communities.',
  },
  '/events': {
    title: 'Arghya Trust Events | Community & Cultural Programs',
    description:
      'Explore Arghya Trust events, including youth workshops, spiritual gatherings, and sustainability drives that strengthen community participation.',
  },
  '/gallery': {
    title: 'Arghya Trust Gallery | Programs, Events & Social Impact',
    description:
      'View photos from Arghya Trust programs, events, and social impact work featuring education, culture, sustainability, and community outreach.',
  },
  '/blog': {
    title: 'Arghya Trust Blog | Insights on Growth & Impact',
    description:
      'Read practical articles from Arghya Trust on self-development, sustainability, spirituality, and youth leadership through real community stories.',
  },
  '/contact': {
    title: 'Contact Arghya Trust | Volunteer, Partner, Connect',
    description:
      'Contact Arghya Trust for volunteering, partnerships, donations, and program support. Reach our team and contribute to meaningful social change.',
  },
};

function ensureMeta(name: string) {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  return meta;
}

export function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    const fallback = seoByPath['/'];
    const seo =
      location.pathname.startsWith('/blog/')
        ? {
            title: 'Blog Detail | Arghya Trust',
            description:
              'Read detailed insights and field stories from Arghya Trust on spirituality, sustainability, and community development.',
          }
        : seoByPath[location.pathname] || fallback;
    document.title = seo.title;

    const description = ensureMeta('description');
    description.setAttribute('content', seo.description);
  }, [location.pathname]);

  return null;
}
