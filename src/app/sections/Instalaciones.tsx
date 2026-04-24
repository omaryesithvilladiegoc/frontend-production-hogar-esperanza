"use client"
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const installations = [
  {
    id: 1,
    image: 'https://res.cloudinary.com/dbzbkk9l6/image/upload/v1772978883/IMG_1724_zmujjh.webp',
    alt: 'Fachada de Hogar Esperanza',
  },
  {
    id: 2,
    image: 'https://res.cloudinary.com/dbzbkk9l6/image/upload/v1772978880/c1cd7405-178e-4d10-b4d5-583327a5956b_maxnla.webp',
    alt: 'Jardines del hogar',
  },
  {
    id: 3,
    image: 'https://res.cloudinary.com/dbzbkk9l6/image/upload/v1772978877/IMG_1735_rdq9sm.webp',
    alt: 'Áreas comunes',
  },
  {
    id: 4,
    image: 'https://res.cloudinary.com/dbzbkk9l6/image/upload/v1772978875/IMG_1733_s259wl.webp',
    alt: 'Habitaciones',
  },
  {
    id: 5,
    image: 'https://res.cloudinary.com/dbzbkk9l6/image/upload/v1772978868/IMG_1711_qeomyq.webp',
    alt: 'Sala de estar',
  },
  {
    id: 6,
    image: 'https://res.cloudinary.com/dbzbkk9l6/image/upload/v1772978869/IMG_1690_mnytiw.webp',
    alt: 'Instalación adicional',
  },
  {
    id: 7,
    image: 'https://res.cloudinary.com/dbzbkk9l6/image/upload/v1772978869/IMG_1710_cpncyi.webp',
    alt: 'Otra instalación',
  },
];

export default function Instalaciones() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % installations.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + installations.length) % installations.length);
  }, []);

  return (
    <section className="relative py-16 w-full bg-[var(--color-brand-mint)] sm:h-[120vh] flex items-center justify-center h-[100vh] align-center rounded-[4rem]">

      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 flex md:h-[100vh] h-[70vh] flex-col items-center justify-center gap-10 w-full mb-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-800">
            Instalaciones
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full flex justify-center"
        >
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gray-200 w-full max-w-5xl">

            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={installations[currentIndex].image}
                alt={installations[currentIndex].alt}
                initial={{ opacity: 0, x: 120 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -120 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Flecha izquierda */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-10"
            >
              <ChevronLeft className="w-6 h-6 text-emerald-700" />
            </button>

            {/* Flecha derecha */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-10"
            >
              <ChevronRight className="w-6 h-6 text-emerald-700" />
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {installations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

          </div>

          {/* Thumbnails */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center gap-3 mt-6 absolute -bottom-20"
          >
            {installations.map((installation, index) => (
              <button
                key={installation.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentIndex
                    ? 'ring-2 ring-white scale-110'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={installation.image}
                  alt={installation.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
