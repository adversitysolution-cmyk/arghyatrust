import { useEffect, useMemo, useState } from 'react';
import { Section } from '../components/Section';
import { ArrowLeft } from 'lucide-react';
import sectionBackground from '../../assets/back.jpg';
import { getPublicGallery, type PublicGalleryImage } from '../lib/api';
import { useLanguage } from '../contexts/LanguageContext';
import defaultG1 from '../../assets/G1.jpg';
import defaultG2 from '../../assets/G2.jpg';
import defaultG3 from '../../assets/G3.jpg';
import defaultG4 from '../../assets/G4.jpg';
import defaultF1 from '../../assets/F1.jpg';
import defaultF2 from '../../assets/F2.jpg';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

type GalleryItem = {
  id: string;
  title: string;
  coverImage: string;
  images: string[];
};

const fallbackGalleries: GalleryItem[] = [
  {
    id: 'fallback-1',
    title: 'Spiritual Events & Yagnas',
    coverImage: defaultG1,
    images: [defaultG1, defaultG2, defaultG3, defaultG4],
  },
  {
    id: 'fallback-2',
    title: 'Community Outreach & Volunteer Programs',
    coverImage: defaultF1,
    images: [defaultF1, defaultF2, defaultG2],
  },
];

function normalizeMediaUrl(url?: string) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
  if (url.startsWith('/')) return `${API_BASE_URL}${url}`;
  return url;
}

function GalleryCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full overflow-hidden rounded-2xl bg-white text-left shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.coverImage}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4 text-sm font-semibold text-[#153A75]">{item.title}</div>
    </button>
  );
}

function GallerySidebar({
  galleries,
  selectedId,
  onSelect,
}: {
  galleries: GalleryItem[];
  selectedId: string;
  onSelect: (item: GalleryItem) => void;
}) {
  return (
    <aside className="w-full lg:w-[30%]">
      <div className="flex gap-3 overflow-auto pb-1 lg:max-h-[75vh] lg:flex-col lg:pr-2">
        {galleries.map((gallery) => {
          const active = gallery.id === selectedId;
          return (
            <button
              key={gallery.id}
              type="button"
              onClick={() => onSelect(gallery)}
              className={`flex min-w-[280px] items-center gap-4 rounded-2xl border p-3 transition-all lg:min-w-0 ${
                active
                  ? 'border-[#4CAF50] bg-[#4CAF50]/10'
                  : 'border-gray-200 bg-white hover:border-[#4CAF50]/60'
              }`}
            >
              <img src={gallery.coverImage} alt={gallery.title} className="h-24 w-24 rounded-xl object-cover" loading="lazy" />
              <span className="line-clamp-2 text-left text-sm font-medium text-[#153A75]">{gallery.title}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function GalleryPreview({
  gallery,
  onBack,
  onOpenImage,
  backLabel,
}: {
  gallery: GalleryItem;
  onBack: () => void;
  onOpenImage: (img: string) => void;
  backLabel: string;
}) {
  return (
    <section className="w-full p-2 sm:p-4 lg:w-[70%]">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-2 rounded-xl border border-[#4CAF50] px-4 py-2 text-sm font-semibold text-[#4CAF50] transition-colors hover:bg-[#4CAF50]/10"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </button>
      <h2 className="mb-5 text-2xl font-semibold text-[#153A75]">{gallery.title}</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {gallery.images.map((image, idx) => (
          <button
            key={`${gallery.id}-${idx}`}
            type="button"
            onClick={() => onOpenImage(image)}
            className="overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
          >
            <div className="relative aspect-[4/3]">
              <img
                src={image}
                alt={`${gallery.title} ${idx + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export function GalleryPage() {
  const { t } = useLanguage();
  const [galleryPrograms, setGalleryPrograms] = useState<PublicGalleryImage[]>([]);
  const [selectedGallery, setSelectedGallery] = useState<GalleryItem | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    getPublicGallery()
      .then((items) => {
        if (!mounted) return;
        setGalleryPrograms(items);
      })
      .catch(() => {
        if (!mounted) return;
        setGalleryPrograms([]);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const galleries = useMemo<GalleryItem[]>(() => {
    const list = galleryPrograms
      .map((item) => {
        const coverImage = normalizeMediaUrl(item.mainImageUrl || item.url);
        const related = (item.relatedImages || []).map((img) => normalizeMediaUrl(img)).filter(Boolean);
        const images = related.length > 0 ? related : coverImage ? [coverImage] : [];
        return {
          id: item._id,
          title: item.caption || 'Gallery Program',
          coverImage,
          images,
        };
      })
      .filter((item) => item.coverImage);

    return list.length > 0 ? list : fallbackGalleries;
  }, [galleryPrograms]);

  const pageBackgroundStyle = {
    backgroundImage: `url(${sectionBackground})`,
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  } as const;

  return (
    <div className="min-h-screen pt-20" style={pageBackgroundStyle}>
      <h1 className="sr-only">Arghya Trust Gallery</h1>
      <Section
        eyebrow={t('gallery.eyebrow')}
        title={t('gallery.title')}
        description={t('gallery.description')}
        centered
        background="white"
        className="!bg-transparent [&_.container]:max-w-[1500px]"
      >
        {galleries.length === 0 ? (
          <div className="text-center text-gray-600">{t('gallery.empty')}</div>
        ) : (
          <div className="transition-all duration-300">
            {!selectedGallery ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {galleries.map((gallery) => (
                  <GalleryCard key={gallery.id} item={gallery} onClick={() => setSelectedGallery(gallery)} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                <GallerySidebar
                  galleries={galleries}
                  selectedId={selectedGallery.id}
                  onSelect={setSelectedGallery}
                />
                <GalleryPreview
                  gallery={selectedGallery}
                  onBack={() => setSelectedGallery(null)}
                  onOpenImage={setLightboxImage}
                  backLabel={t('gallery.backToAll')}
                />
              </div>
            )}
          </div>
        )}

        {lightboxImage ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setLightboxImage(null)}>
            <img src={lightboxImage} alt="Gallery preview" className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-xl" />
          </div>
        ) : null}
      </Section>
    </div>
  );
}
