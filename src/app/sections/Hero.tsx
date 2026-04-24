"use client"
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { borel } from '@/fonts';
export interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}
const slides = [
  {
    id: 1,
    image: 'https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096318/IMG_3278_q5dsqa.webp',
    alt: 'Adultos mayores jugando cartas',
  },
  {
    id: 2,
    image: 'https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096317/IMG_2879_ksm4he.webp',
    alt: 'Adultos mayores en actividades',
  },
  {
    id: 3,
    image: 'https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096293/IMG_1917_gfyuyx.webp',
    alt: 'Cuidado de adultos mayores',
  },
  {
    id: 4,
    image: 'https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096314/IMG_2158_fynytq.webp',
    alt: 'Residencia para adultos mayores',
  },
  {
    id: 5,
    image: 'https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096292/IMG_1905_y1782q.webp',
    alt: 'Adultos mayores felices',
  },
  {
    id: 6,
    image: 'https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096310/IMG_2092_1_ywkphr.webp',
    alt: 'Adultos mayores en grupo',
  },
  {
    id: 7,
    image: 'https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096309/IMG_2091_fr9lhu.webp',
    alt: 'Abuelitos sonriendo',
  },
];

export default function Hero({ scrollToSection }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="flex items-center justify-center font-sans">
    <div className="relative h-screen w-full pb-10">
      {/* Background Slides */}
      <div className="absolute inset-0 bg-[#0c2c20]" />
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={false}
          animate={{
            opacity: index === currentSlide ? 1 : 0,
            scale: index === currentSlide ? 1 : 1.04,
          }}
          transition={{
            opacity: { duration: 1.2, ease: 'easeInOut' },
            scale: { duration: 6, ease: 'easeOut' },
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
            aria-hidden="true"
          />
        </motion.div>
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_38%),linear-gradient(135deg,rgba(3,43,30,0.18),rgba(8,76,53,0.52)_45%,rgba(4,32,23,0.78))]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#031a12]/70 via-transparent to-transparent" />

      <div
        className="relative z-10 h-full flex flex-col items-center justify-center px-4"
        style={{ paddingTop: 'var(--navbar-safe-offset-mobile)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center mb-8"
        >
          <section className={`tracking-wide ${borel.className} font-sans`}><h1 className={"text-5xl md:text-7xl text-white mb-4 drop-shadow-lg"}>
            hogar
          </h1>
          <h1 className="text-5xl md:text-7xl text-white mb-6 drop-shadow-lg">
            esperanza
          </h1></section>
          
          <p className="text-white/90 text-lg md:text-xl max-w-md mx-auto font-light">
            El lugar donde los abuelitos se sienten como en casa
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          {/* Botones corregidos (clases en una sola línea y sin espacios raros) */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('quienes-somos')}
            suppressHydrationWarning
            className="px-8 py-3 rounded-full border-2 border-white text-white font-medium hover:bg-white hover:text-emerald-600 transition-all duration-300 backdrop-blur-sm min-w-[160px]"
          >
            Conócenos
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contactanos')}
            suppressHydrationWarning
            className="px-8 py-3 rounded-full bg-white/20 border-2 border-white text-white font-medium hover:bg-white hover:text-emerald-600 transition-all duration-300 backdrop-blur-sm min-w-[160px]"
          >
            Agenda una visita
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/donaciones')}
            suppressHydrationWarning
            className="px-8 py-3 rounded-full bg-white/20 border-2 border-white text-white font-medium hover:bg-white hover:text-emerald-600 transition-all duration-300 backdrop-blur-sm min-w-[160px]"
          >
            Apoyanos
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex gap-2 mt-12"
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/70 flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-white"
          />
        </motion.div>
      </motion.div>
     
    </div>

    </section>
  );
}
