import { CSSProperties, ReactNode } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

interface SectionProps {  
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  eyebrow?: string;
  title?: string;
  titleAs?: 'h1' | 'h2' | 'h3';
  description?: string;
  centered?: boolean;
  background?: 'white' | 'gray' | 'green';
}

export function Section({
  children,
  className = '',
  style,
  eyebrow,
  title,
  titleAs = 'h2',
  description,
  centered = false,
  background = 'white',
}: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const bgClass = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    green: 'bg-gradient-to-br from-green-50 to-white',
  }[background];

  const TitleTag = titleAs;

  return (
    <section ref={ref} style={style} className={`py-[50px] md:py-[80px] ${bgClass} ${className}`}>
      <div className="container mx-auto px-4 max-w-[1200px]">
        {(eyebrow || title || description) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`mb-12 md:mb-16 ${centered ? 'text-center max-w-3xl mx-auto' : ''}`}
          >
            {eyebrow && (
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#50b94b]/10 text-[#50b94b] text-sm font-semibold mb-4">
                {eyebrow}
              </span>
            )}
            {title && (
              <TitleTag className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                {title}
              </TitleTag>
            )}
            {description && (
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {description}
              </p>
            )}
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
