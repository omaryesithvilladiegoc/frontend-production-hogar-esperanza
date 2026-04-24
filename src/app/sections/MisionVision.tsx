"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function MisionVision() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-[var(--color-brand-mint)] to-transparent">
      {/* Background Image - Se añade suppressHydrationWarning por el style dinámico */}
      <div className="absolute inset-0 overflow-hidden rounded-[4rem] border-4 border-[var(--color-brand-mint)]">
        <Image
          src="https://res.cloudinary.com/dbzbkk9l6/image/upload/v1772976199/IMG_5912_1_1_p2wul6.webp"
          alt="Background"
          width={1920}
          height={1080}
          className="w-full h-full"
          style={{ objectFit: 'cover' }}
          priority 
        />
      </div>
      <div 
        suppressHydrationWarning
        className="absolute inset-0 bg-cover bg-center bg-fixed overflow-hidden"
        
      />
      
      {/* Green Overlay */}
      <div  className="absolute inset-0 rounded-[4rem] "  />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden" >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Misión */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6 text-center"
            >
              Misión
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-4 text-white/90 text-sm md:text-base leading-relaxed text-center"
            >
              <p>
                Nuestra misión es proporcionar a nuestros adultos mayores bienestar integral, 
                calidad de vida y tranquilidad en un ambiente hogareño seguro, donde recibirán 
                amor y cuidados excepcionales durante toda su estancia.
              </p>
              <p>
                Nos comprometemos a crear un espacio donde cada persona se sienta como en casa, 
                valorando su individualidad y ofreciendo un entorno que promueva su felicidad 
                y confort diario.
              </p>
              <p>
                Nos dedicamos a ofrecerles la oportunidad de disfrutar de un hogar lleno de empatía, 
                respeto, atención especializada y compañía profesional, garantizando siempre un 
                ambiente cálido y lleno de afecto.
              </p>
              <p>
                En Hogar Esperanza, nos esforzamos por ser más que un lugar de residencia; somos una 
                familia que brinda apoyo continuo y cariño, asegurando que cada día sea significativo 
                y enriquecedor para nuestros residentes.
              </p>
            </motion.div>
          </motion.div>

          {/* Visión */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center"
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Visión
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-4 text-white/90 text-sm md:text-base leading-relaxed"
            >
              <p>
                Desde nuestros corazones y capacidades, nos esforzamos por ofrecer atención de 
                primera calidad para consolidarnos como el Hogar número uno para adultos mayores 
                en Montería y sus alrededores.
              </p>
              <p>
                En Hogar Esperanza, estamos profundamente comprometidos con nuestra causa. Con el 
                respaldo de nuestro personal altamente especializado y la constante adaptación de 
                nuestros esfuerzos, aspiramos a establecer nuevos estándares en el cuidado y la 
                protección de nuestros residentes mayores.
              </p>
              <p>
                Nuestra visión abarca no solo brindar un excelente servicio, sino también ser 
                reconocidos por nuestra dedicación, compasión y excelencia en el cuidado de quienes 
                han dedicado sus vidas al servicio de las generaciones pasadas.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
