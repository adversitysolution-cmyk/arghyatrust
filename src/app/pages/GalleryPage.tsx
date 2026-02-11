import { Section } from '../components/Section';
import { Card } from '../components/ui/card';
import { motion } from 'motion/react';

// Eagerly import all images in assets (jpg/jpeg/png/JPG/JPEG)
const imageModules = import.meta.glob('../../assets/**/*.{jpg,jpeg,png,JPG,JPEG}', {
  eager: true,
}) as Record<string, { default: string }>;

const galleryImages = Object.entries(imageModules).map(([path, mod]) => {
  const filename = path.split('/').pop() ?? 'gallery';
  const alt = filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
  return { src: mod.default, alt };
});

export function GalleryPage() {
  return (
    <div className="min-h-screen pt-20">
      <Section
        eyebrow="Media"
        title="Gallery"
        description="Highlights from our programs, workshops, community drives, and spiritual events."
        centered
        background="white"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.04, duration: 0.35 }}
              viewport={{ once: true }}
            >
              <Card className="gallery-card overflow-hidden h-full shadow-sm hover:shadow-lg transition-all">
                <div className="relative" style={{ aspectRatio: '4 / 3' }}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
