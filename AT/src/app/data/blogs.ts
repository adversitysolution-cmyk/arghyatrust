import blogImg1 from '../../assets/F1.jpg';
import blogImg2 from '../../assets/F2.jpg';
import blogImg3 from '../../assets/F3.jpg';
import blogImg4 from '../../assets/F5.jpg';
import blogImg5 from '../../assets/G1.jpg';
import blogImg6 from '../../assets/G2.jpg';
import blogInner1 from '../../assets/G3.jpg';
import blogInner2 from '../../assets/G4.jpg';
import blogInner3 from '../../assets/G5.jpg';
import blogInner4 from '../../assets/G6.jpg';
import blogInner5 from '../../assets/G7.jpg';
import blogInner6 from '../../assets/G8.jpg';

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  publishedAt: string;
  readTime: string;
  featuredImage: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export const blogs: BlogPost[] = [
  {
    id: 1,
    title: 'The 3S Philosophy: A Holistic Approach to Life',
    slug: '3s-philosophy-holistic-approach',
    category: 'Spirituality',
    author: 'Sri Ranjan Bellarpady',
    date: 'Feb 5, 2026',
    publishedAt: '2026-02-05',
    readTime: '6 min read',
    featuredImage: blogImg1,
    excerpt:
      'Understanding how Self-Excellence, Sustainability, and Spirituality work together to create lasting change in individuals and communities.',
    content: `
      <h2>Introduction</h2>
      <p>The 3S philosophy is more than a framework. It is a practical path for personal growth and social transformation. In Arghya Trust programs, we apply Self-Excellence, Sustainability, and Spirituality together because real change needs all three dimensions.</p>
      <p>When young people focus only on skills, they may become efficient but disconnected. When communities focus only on infrastructure, they may improve systems but miss inner resilience. The 3S model ensures that growth includes competence, responsibility, and values.</p>
      <h3>Self-Excellence in Daily Action</h3>
      <p>Self-Excellence begins with discipline and clarity. Our workshops focus on communication, time management, teamwork, and accountability. Participants learn to set goals, reflect weekly, and track small improvements. These habits create confidence and consistency.</p>
      <p>In rural youth circles, we observed that structured routines significantly improved school attendance and volunteer participation. Many students who began with low confidence now lead neighborhood initiatives. Self-Excellence builds identity through action, not theory.</p>
      <h3>Sustainability as Responsibility</h3>
      <p>Sustainability is not limited to waste segregation. It includes resource awareness, responsible consumption, and community ownership. In field programs, children and parents participate in clean-up drives, composting, and water-conscious practices.</p>
      <p>When communities understand the lifecycle of waste and the cost of neglect, they adopt long-term behaviors. We have seen families reduce plastic usage, schools create green clubs, and volunteers turn awareness campaigns into measurable outcomes.</p>
      <h3>Spirituality as Inner Strength</h3>
      <p>Spirituality in the 3S model means inner alignment. Through reflection sessions, chanting, and value-based dialogue, participants cultivate calmness, empathy, and purpose. This helps them respond to challenges without burnout or aggression.</p>
      <p>Teams that practice inner reflection collaborate better. Conflicts reduce because members learn to listen deeply. Spirituality supports emotional maturity, which is essential for sustained social work.</p>
      <blockquote>“Transformation becomes durable when skill, service, and spirit move together.”</blockquote>
      <p>The 3S philosophy is practical, scalable, and rooted in lived experience. It equips individuals to grow and communities to thrive with dignity.</p>
    `,
    tags: ['Spiritual Growth', '3S Philosophy', 'Community'],
  },
  {
    id: 2,
    title: 'Swacch Manas: Building Character Through Cleanliness',
    slug: 'swacch-manas-character-through-cleanliness',
    category: 'Sustainability',
    author: 'Program Team',
    date: 'Feb 7, 2026',
    publishedAt: '2026-02-07',
    readTime: '5 min read',
    featuredImage: blogImg2,
    excerpt:
      'How cleanliness education is shaping civic responsibility, self-respect, and teamwork among children and youth.',
    content: `
      <h2>Why Cleanliness Education Matters</h2>
      <p>Swacch Manas was designed as a behavior-first model. We learned early that one-time clean-up drives are not enough. Lasting impact comes when children connect cleanliness with dignity, health, and civic pride.</p>
      <p>Our sessions combine practical activities with reflection. Students map local waste points, identify causes, and propose solutions. This transforms them from passive observers into active problem-solvers.</p>
      <h3>From Awareness to Ownership</h3>
      <p>Ownership starts with routine. Participants maintain classroom and neighborhood cleanliness logs. Teachers and volunteers provide structure, but students lead execution. This process strengthens leadership and accountability.</p>
      <p>Several schools now run weekly eco-monitor roles. Students remind peers about litter-free campuses, hand hygiene, and responsible disposal. These habits carry into homes and influence family behavior as well.</p>
      <h3>Character Outcomes Beyond Clean Streets</h3>
      <p>Swacch Manas also develops communication and teamwork. During campaigns, students coordinate with local stakeholders, speak in public, and collaborate across age groups. They build confidence while serving a shared cause.</p>
      <p>Parents report better discipline and responsibility at home. This confirms that civic training can drive personal development when delivered consistently.</p>
      <blockquote>“A clean environment is the visible result of an awakened mind.”</blockquote>
      <p>Swacch Manas shows that environmental action and character development are deeply connected. The model is simple, replicable, and effective in schools and community clusters.</p>
    `,
    tags: ['Cleanliness', 'Youth Programs', 'Civic Responsibility'],
  },
  {
    id: 3,
    title: 'Youth Leadership in Nation Building',
    slug: 'youth-leadership-in-nation-building',
    category: 'Self-Excellence',
    author: 'Workshop Team',
    date: 'Feb 10, 2026',
    publishedAt: '2026-02-10',
    readTime: '7 min read',
    featuredImage: blogImg3,
    excerpt:
      'Insights from youth workshops on discipline, value-based leadership, and building solutions for local challenges.',
    content: `
      <h2>Leadership Starts Before Position</h2>
      <p>Many students assume leadership begins after a title. Our workshops challenge that belief. Leadership begins with reliability, emotional balance, and the courage to take responsibility in small situations.</p>
      <p>Participants practice real scenarios: organizing local events, addressing team conflict, and designing community action plans. This approach builds practical confidence.</p>
      <h3>Skill + Values = Effective Leadership</h3>
      <p>Technical skill alone cannot sustain public leadership. We integrate values such as integrity, empathy, and service orientation into every module. Youth learn to make decisions that are both efficient and ethical.</p>
      <p>During feedback cycles, mentors assess not just outcomes but behavior quality. This creates mature leaders who prioritize trust and long-term impact.</p>
      <h3>Nation Building Through Local Action</h3>
      <p>Nation building is often discussed at a large scale, but it is built through local contribution. Students who lead literacy support groups, environmental drives, and cultural initiatives develop civic capacity.</p>
      <p>These experiences create grounded leaders who can collaborate across institutions. Their confidence grows because they see direct results from their effort.</p>
      <blockquote>“A nation is strengthened every time a young person chooses responsibility over comfort.”</blockquote>
      <p>Our youth leadership programs continue to evolve, but one principle remains constant: leadership is a disciplined practice rooted in character and service.</p>
    `,
    tags: ['Youth Leadership', 'Nation Building', 'Self-Excellence'],
  },
  {
    id: 4,
    title: 'Spiritual Gatherings and Community Harmony',
    slug: 'spiritual-gatherings-community-harmony',
    category: 'Spirituality',
    author: 'Events Team',
    date: 'Feb 12, 2026',
    publishedAt: '2026-02-12',
    readTime: '5 min read',
    featuredImage: blogImg4,
    excerpt:
      'How shared spiritual spaces strengthen social trust, emotional resilience, and unity across diverse communities.',
    content: `
      <h2>Spirituality as Social Energy</h2>
      <p>Community harmony grows when people share meaningful spaces. Spiritual gatherings create that space by encouraging humility, gratitude, and mutual respect across groups.</p>
      <p>In our programs, collective prayer and value dialogues are paired with service activities. This ensures spirituality remains practical and inclusive.</p>
      <h3>Building Emotional Resilience</h3>
      <p>Many families face stress linked to financial pressure, social isolation, or uncertainty. Spiritual gatherings offer mental calm and collective support. Participants report reduced anxiety and stronger inner stability.</p>
      <p>When people feel emotionally grounded, they engage more positively with neighbors and institutions. This directly improves social cohesion.</p>
      <h3>From Ritual to Responsible Action</h3>
      <p>Ritual has value when it inspires behavior. Our gatherings encourage participants to follow up with local service: volunteering, mentoring children, and environmental contribution.</p>
      <p>This bridge between devotion and duty creates a culture where spirituality supports measurable community outcomes.</p>
      <blockquote>“Inner peace becomes public good when shared through service.”</blockquote>
      <p>Spiritual gatherings are not separate from development. They are a powerful foundation for balanced, value-driven social progress.</p>
    `,
    tags: ['Spirituality', 'Community Harmony', 'Cultural Values'],
  },
  {
    id: 5,
    title: 'Sustainability Circles: Creating Environmental Stewards',
    slug: 'sustainability-circles-environmental-stewards',
    category: 'Sustainability',
    author: 'Environment Team',
    date: 'Feb 14, 2026',
    publishedAt: '2026-02-14',
    readTime: '6 min read',
    featuredImage: blogImg5,
    excerpt:
      'A field-tested model for turning environmental awareness into local action through schools, youth clubs, and volunteers.',
    content: `
      <h2>What Are Sustainability Circles?</h2>
      <p>Sustainability Circles are structured local groups that meet regularly to solve environmental problems. They include students, volunteers, teachers, and residents working together on practical goals.</p>
      <p>Each circle sets monthly priorities: waste reduction, green campus actions, or water saving. The process is simple but highly participatory.</p>
      <h3>Learning Through Doing</h3>
      <p>Instead of lecture-heavy sessions, circles use action tasks. Participants conduct waste audits, map leak points, and run awareness campaigns. This makes learning immediate and measurable.</p>
      <p>As outcomes become visible, participation grows. Communities value the model because it combines education with visible results.</p>
      <h3>Stewardship Mindset</h3>
      <p>The biggest shift is mindset. Participants stop seeing environmental work as temporary activism. They begin to treat it as shared stewardship. This creates continuity and local leadership.</p>
      <blockquote>“Sustainability succeeds when responsibility becomes a habit, not an event.”</blockquote>
      <p>Sustainability Circles demonstrate that decentralized action can create long-term ecological impact when people are trained, trusted, and connected.</p>
    `,
    tags: ['Environment', 'Sustainability', 'Schools'],
  },
  {
    id: 6,
    title: 'Volunteer Voices: Service, Growth, and Purpose',
    slug: 'volunteer-voices-service-growth-purpose',
    category: 'Stories',
    author: 'Volunteer Network',
    date: 'Feb 16, 2026',
    publishedAt: '2026-02-16',
    readTime: '5 min read',
    featuredImage: blogImg6,
    excerpt:
      'First-person reflections on how volunteering in education and outreach programs shaped confidence, empathy, and purpose.',
    content: `
      <h2>Why Volunteers Stay</h2>
      <p>Volunteers often join for one event but stay for the community. Many share that they expected to give time, but they received clarity, friendships, and a stronger sense of purpose.</p>
      <p>Structured mentorship and meaningful roles make the journey deeper. Volunteers are not treated as extra hands; they are developed as community leaders.</p>
      <h3>Growth Through Responsibility</h3>
      <p>From event coordination to student mentoring, volunteers handle real responsibility. They learn planning, communication, and problem-solving under guidance. This accelerates practical learning.</p>
      <p>Several volunteers later lead independent initiatives in their own areas. The experience creates confidence built on service outcomes.</p>
      <h3>Purpose in Action</h3>
      <p>Service becomes meaningful when linked to values. Volunteers connect with communities, understand challenges deeply, and contribute with empathy. This creates purpose that is both personal and social.</p>
      <blockquote>“When service is sincere, growth becomes inevitable.”</blockquote>
      <p>Volunteer voices remind us that social impact is not only measured in projects delivered. It is also measured in people transformed through contribution.</p>
    `,
    tags: ['Volunteer Stories', 'Service', 'Community Impact'],
  },
];

export function getBlogBySlug(slug: string) {
  return blogs.find((blog) => blog.slug === slug);
}

export function getLatestPosts(currentSlug: string, currentCategory: string, limit = 3) {
  const remaining = blogs
    .filter((blog) => blog.slug !== currentSlug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const sameCategory = remaining.filter((blog) => blog.category === currentCategory);
  const combined = [...sameCategory, ...remaining.filter((blog) => blog.category !== currentCategory)];
  return combined.slice(0, limit);
}

export const blogImagePool = [blogInner1, blogInner2, blogInner3, blogInner4, blogInner5, blogInner6];
