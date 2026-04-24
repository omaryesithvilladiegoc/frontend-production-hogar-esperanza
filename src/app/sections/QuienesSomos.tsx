"use client"
import { motion, type Variants } from 'framer-motion';
import { Heart, Users, Home } from 'lucide-react';

const features = [
  {
    id: 1,
    icon: Heart,
    title: 'Cuidado integral',
    description: 'Atención personalizada para el bienestar físico y emocional',
  },
  {
    id: 2,
    icon: Users,
    title: 'Compañía y afecto',
    description: 'Un ambiente familiar lleno de cariño y apoyo constante',
  },
  {
    id: 3,
    icon: Home,
    title: 'Hogar digno y seguro',
    description: 'Instalaciones cómodas y seguras para tu tranquilidad',
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 120,
    rotateX: 40,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function QuienesSomos() {
  return (
    <section className="relative py-16 md:py-24 bg-[var(--color-brand-mint)] perspective-[1200px] shadow-lg">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TITULO */}
        <motion.div
          initial={{ opacity: 0, y: 120, rotateX: 35 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-6">
            ¿Quiénes somos?
          </h2>

          <p className="text-emerald-900/80 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Somos un hogar de vida dedicada a brindar apoyo, cuidado y amor a los adultos mayores,
            promoviendo su bienestar físico, emocional y social.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-emerald-900 font-medium text-lg mb-10"
        >
          Proporcionamos:
        </motion.p>

        {/* CARDS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                rotateY: 8,
                y: -10,
              }}
              className="feature-card group cursor-pointer text-center transform-gpu"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                <feature.icon
                  size={48}
                  className="text-emerald-900 group-hover:scale-110 transition-transform duration-300"
                  strokeWidth={1.5}
                />
              </div>

              <h3 className="text-white text-xl font-semibold mb-2">
                {feature.title}
              </h3>

              <p className="text-white/70 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
