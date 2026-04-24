"use client"
import { motion } from 'framer-motion';
import {MapComponent} from './components/mapa/Map';
import { usePathname } from 'next/navigation';
import { borel } from '@/fonts';

const menuLinks = [
  { label: 'Quienes somos', href: '#quienes-somos' },
  { label: 'Planes', href: '#servicios' },
  { label: 'Instalaciones', href: '#instalaciones' },
  { label: 'Sé parte de una historia', href: '#como-ayudar' },
  { label: 'Contáctanos', href: '#contactanos' },
  { label: 'Galería', href: '#blog' },
  { label: 'Blog', href: '#' },
];

const politicasLinks = [
  { label: 'Políticas de privacidad', href: '#' },
  { label: 'Términos y condiciones', href: '#' },
  { label: 'Términos de uso', href: '#' },
  { label: 'Políticas de Cookies', href: '#' },
];

export default function Footer() {
  const path = usePathname()

  if(path === '/mapa') return
  return (
    <footer className={`bg-[#15803D] pt-16 pb-6 rounded-t-[4rem] ${path === '/login' ? 'translate-y-[-120px]' : ''} relative z-20`}>
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="rounded-3xl bg-white/10 w-full">
                <MapComponent />
              </div>
            </motion.div>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center lg:text-left"
            >
              <div className={`mb-6 italic tracking-wide ${borel.className} font-sans`}>
                <h3 className="text-3xl text-white italic">
                  hogar
                </h3>
                <h3 className="text-3xl text-white italic -mt-1">
                  esperanza
                </h3>
              </div>
            </motion.div>

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-white font-semibold text-lg mb-4">Menú</h4>
              <ul className="space-y-2">
                {menuLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Políticas y Contacto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8"
            >
              <div>
                <h4 className="text-white font-semibold text-lg mb-4">Políticas</h4>
                <ul className="space-y-2">
                  {politicasLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-white/80 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold text-lg mb-4">Contacto</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>Calle 24 # 15 - 90</li>
                  <li>Barrio Costa de oro</li>
                  <li>Montería, Córdoba, Colombia</li>
                  <li>3013743729</li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border-t border-white/20 pt-6 text-center"
          >
            <p className="text-white/70 text-sm">
              Copyright © 2026 Fundación Hogar Esperanza. Todos los derechos reservados.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
