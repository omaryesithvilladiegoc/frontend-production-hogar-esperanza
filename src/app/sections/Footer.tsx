"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { borel } from "@/fonts";
import { MapComponent } from "./components/mapa/Map";
import {
  WHATSAPP_DISPLAY_PHONE,
  WHATSAPP_DONATION_URL,
} from "@/lib/contact";

const menuLinks = [
  { label: "Quiénes somos", href: "#quienes-somos" },
  { label: "Planes", href: "#servicios" },
  { label: "Instalaciones", href: "#instalaciones" },
  { label: "Sé parte de una historia", href: "#como-ayudar" },
  { label: "Contáctanos", href: "#contactanos" },
  { label: "Galería", href: "#blog" },
  { label: "Blog", href: "#" },
];

const politicasLinks = [
  { label: "Políticas de privacidad", href: "#" },
  { label: "Términos y condiciones", href: "#" },
  { label: "Términos de uso", href: "#" },
  { label: "Políticas de cookies", href: "#" },
];

export default function Footer() {
  const path = usePathname();

  if (path === "/mapa") return null;

  return (
    <footer
      className={`relative z-20 rounded-t-[4rem] bg-[#15803D] pb-6 pt-16 ${
        path === "/login" ? "translate-y-[-120px]" : ""
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="w-full rounded-3xl bg-white/10">
                <MapComponent />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center lg:text-left"
            >
              <div className={`mb-6 tracking-wide ${borel.className} font-sans`}>
                <h3 className="text-3xl text-white">hogar</h3>
                <h3 className="-mt-1 text-3xl text-white">esperanza</h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="mb-4 text-lg font-semibold text-white">Menú</h4>
              <ul className="space-y-2">
                {menuLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/80 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-1"
            >
              <div>
                <h4 className="mb-4 text-lg font-semibold text-white">
                  Políticas
                </h4>
                <ul className="space-y-2">
                  {politicasLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-white/80 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-lg font-semibold text-white">
                  Contacto
                </h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>Calle 24 # 15 - 90</li>
                  <li>Barrio Costa de Oro</li>
                  <li>Montería, Córdoba, Colombia</li>
                  <li>
                    <a
                      href={WHATSAPP_DONATION_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 transition-colors hover:text-white"
                    >
                      {WHATSAPP_DISPLAY_PHONE}
                    </a>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border-t border-white/20 pt-6 text-center"
          >
            <p className="text-sm text-white/70">
              Copyright © 2026 Fundación Hogar Esperanza. Todos los derechos
              reservados.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
