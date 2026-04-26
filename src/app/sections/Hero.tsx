"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { borel } from "@/fonts";
import { WHATSAPP_DONATION_URL } from "@/lib/contact";

export interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

const slides = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096318/IMG_3278_q5dsqa.webp",
    alt: "Adultos mayores jugando cartas",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096317/IMG_2879_ksm4he.webp",
    alt: "Adultos mayores en actividades",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096293/IMG_1917_gfyuyx.webp",
    alt: "Cuidado de adultos mayores",
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096314/IMG_2158_fynytq.webp",
    alt: "Residencia para adultos mayores",
  },
  {
    id: 5,
    image:
      "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096292/IMG_1905_y1782q.webp",
    alt: "Adultos mayores felices",
  },
  {
    id: 6,
    image:
      "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096310/IMG_2092_1_ywkphr.webp",
    alt: "Adultos mayores en grupo",
  },
  {
    id: 7,
    image:
      "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096309/IMG_2091_fr9lhu.webp",
    alt: "Abuelitos sonriendo",
  },
];

export default function Hero({ scrollToSection }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const openDonationWhatsApp = () => {
    window.open(WHATSAPP_DONATION_URL, "_blank", "noopener,noreferrer");
  };

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
              opacity: { duration: 1.2, ease: "easeInOut" },
              scale: { duration: 6, ease: "easeOut" },
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
          className="relative z-10 flex h-full flex-col items-center justify-center px-4"
          style={{ paddingTop: "var(--navbar-safe-offset-mobile)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-8 text-center"
          >
            <section className={`tracking-wide ${borel.className} font-sans`}>
              <h1 className="mb-4 text-5xl text-white drop-shadow-lg md:text-7xl">
                hogar
              </h1>
              <h1 className="mb-6 text-5xl text-white drop-shadow-lg md:text-7xl">
                esperanza
              </h1>
            </section>

            <p className="mx-auto max-w-md text-lg font-light text-white/90 md:text-xl">
              El lugar donde los abuelitos se sienten como en casa
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("quienes-somos")}
              suppressHydrationWarning
              className="min-w-[160px] rounded-full border-2 border-white px-8 py-3 font-medium text-white transition-all duration-300 hover:bg-white hover:text-emerald-600 backdrop-blur-sm"
            >
              Conócenos
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("contactanos")}
              suppressHydrationWarning
              className="min-w-[160px] rounded-full border-2 border-white bg-white/20 px-8 py-3 font-medium text-white transition-all duration-300 hover:bg-white hover:text-emerald-600 backdrop-blur-sm"
            >
              Agenda una visita
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={openDonationWhatsApp}
              suppressHydrationWarning
              className="min-w-[160px] rounded-full border-2 border-white bg-white/20 px-8 py-3 font-medium text-white transition-all duration-300 hover:bg-white hover:text-emerald-600 backdrop-blur-sm"
            >
              Apóyanos
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-12 flex gap-2"
          >
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`carousel-dot ${index === currentSlide ? "active" : ""}`}
                aria-label={`Ir a la imagen ${index + 1}`}
              />
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex h-10 w-6 justify-center rounded-full border-2 border-white/70 pt-2"
          >
            <motion.div
              animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-white"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
