"use client"

import { motion } from "framer-motion";
import { MessageCircle, Heart, ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();

  const backgroundImage =
    "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096296/IMG_1939_b2r7sy.webp";

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden text-white">
      
      {/* Flecha izquierda */}
      <button
        onClick={() => router.back()}
        className="fixed left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-30 cursor-pointer"
      >
        <ArrowBigLeft className="w-6 h-6 text-emerald-700" />
      </button>

      {/* Background */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat brightness-50"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 hero-overlay z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-2xl px-6 py-16 flex flex-col items-center text-center space-y-12">

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white">
            Gracias por querer ser parte de esta historia
          </h1>

          <p className="text-lg md:text-xl font-light text-white/90 max-w-xl mx-auto leading-relaxed">
            Cada aporte, grande o pequeño, se transforma en cuidado, compañía y bienestar para nuestros abuelitos.
          </p>
        </motion.header>

        {/* Botón */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full max-w-xs"
        >
          <button className="group relative w-full py-5 px-8 border-2 border-white rounded-full text-xl font-semibold overflow-hidden transition-all hover:bg-white hover:text-[#1b4332] active:scale-95 text-white">
            <span className="relative z-10">Quiero donar</span>
          </button>
        </motion.div>

        {/* Info */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="w-full space-y-10"
        >
          <p className="text-base md:text-lg font-medium text-white/80 max-w-md mx-auto">
            Te guiaremos paso a paso y resolveremos cualquier duda.
          </p>

          <div className="w-full h-px bg-white/20 max-w-md mx-auto" />

          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Si prefieres hacer la donación directamente:
            </h2>

            <p className="text-base md:text-lg font-light text-white/80 max-w-lg mx-auto">
              También puedes escribirnos por WhatsApp.
            </p>

            <button className="flex items-center justify-center space-x-2 mx-auto bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3 rounded-full font-medium transition-colors">
              <MessageCircle size={20} />
              <span>Contactar por WhatsApp</span>
            </button>
          </div>

          <div className="w-full h-px bg-white/20 max-w-md mx-auto" />
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="pt-8 space-y-2"
        >
          <div className="flex justify-center mb-4">
            <Heart className="text-red-400 fill-red-400 animate-pulse" size={32} />
          </div>

          <p className="text-2xl md:text-3xl font-bold tracking-wide">
            Gracias por pensar en ellos.
          </p>

          <p className="text-2xl md:text-3xl font-bold tracking-wide">
            Gracias por no mirar a otro lado.
          </p>
        </motion.footer>

      </div>
    </main>
  );
}