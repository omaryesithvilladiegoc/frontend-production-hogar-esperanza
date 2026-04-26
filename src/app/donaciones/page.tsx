"use client";

import { motion } from "framer-motion";
import { MessageCircle, Heart, ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  WHATSAPP_DISPLAY_PHONE,
  WHATSAPP_DONATION_URL,
} from "@/lib/contact";

export default function App() {
  const router = useRouter();

  const backgroundImage =
    "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096296/IMG_1939_b2r7sy.webp";

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden text-white">
      <button
        onClick={() => router.back()}
        className="fixed left-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white"
      >
        <ArrowBigLeft className="h-6 w-6 text-emerald-700" />
      </button>

      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat brightness-50"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="hero-overlay absolute inset-0 z-10" />
      </div>

      <div className="relative z-20 flex w-full max-w-2xl flex-col items-center space-y-12 px-6 py-16 text-center">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            Gracias por querer ser parte de esta historia
          </h1>

          <p className="mx-auto max-w-xl text-lg font-light leading-relaxed text-white/90 md:text-xl">
            Cada aporte, grande o pequeño, se transforma en cuidado, compañía y
            bienestar para nuestros abuelitos.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full max-w-xs"
        >
          <a
            href={WHATSAPP_DONATION_URL}
            target="_blank"
            rel="noreferrer"
            className="group relative block w-full overflow-hidden rounded-full border-2 border-white px-8 py-5 text-xl font-semibold text-white transition-all hover:bg-white hover:text-[#1b4332] active:scale-95"
          >
            <span className="relative z-10">Quiero donar</span>
          </a>
        </motion.div>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="w-full space-y-10"
        >
          <p className="mx-auto max-w-md text-base font-medium text-white/80 md:text-lg">
            Te guiaremos paso a paso y resolveremos cualquier duda.
          </p>

          <div className="mx-auto h-px w-full max-w-md bg-white/20" />

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Si prefieres hacer la donación directamente:
            </h2>

            <p className="mx-auto max-w-lg text-base font-light text-white/80 md:text-lg">
              También puedes escribirnos por WhatsApp.
            </p>

            <a
              href={WHATSAPP_DONATION_URL}
              target="_blank"
              rel="noreferrer"
              className="mx-auto flex w-fit items-center justify-center space-x-2 rounded-full bg-[#25D366] px-6 py-3 font-medium text-white transition-colors hover:bg-[#20ba5a]"
            >
              <MessageCircle size={20} />
              <span>Contactar por WhatsApp</span>
            </a>

            <p className="text-sm text-white/75">{WHATSAPP_DISPLAY_PHONE}</p>
          </div>

          <div className="mx-auto h-px w-full max-w-md bg-white/20" />
        </motion.section>

        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-2 pt-8"
        >
          <div className="mb-4 flex justify-center">
            <Heart className="animate-pulse fill-red-400 text-red-400" size={32} />
          </div>

          <p className="text-2xl font-bold tracking-wide md:text-3xl">
            Gracias por pensar en ellos.
          </p>

          <p className="text-2xl font-bold tracking-wide md:text-3xl">
            Gracias por no mirar a otro lado.
          </p>
        </motion.footer>
      </div>
    </main>
  );
}
