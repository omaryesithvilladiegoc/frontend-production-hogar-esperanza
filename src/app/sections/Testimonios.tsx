"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import "../globals.css"
import { useRouter } from "next/navigation"

const testimonials = [
  {
    id: 1,
    name: "Eduardo",
    image:
      "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773025259/IMG_6044_sswcus.webp",
    quote: "Encontré una familia que me cuida con amor",
  },
  {
    id: 2,
    name: "Alfredo",
    image:
      "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773025255/IMG_6063_cy7y25.webp",
    quote: "Me siento feliz y acompañado todos los días",
  },
  {
    id: 3,
    name: "Marquesa",
    image:
      "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096283/IMG_0132_zhs8tq.webp",
    quote: "El mejor lugar para disfrutar mi vejez",
  },
  {
    id: 4,
    name: "Luisa",
    image:
      "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096337/IMG_8960_uryqzp.webp",
    quote: "Un lugar donde puedo sentir la paz y la tranquilidad",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export default function Testimonios() {
  const [selected, setSelected] = useState<typeof testimonials[0] | null>(null)
  const router = useRouter()
  return (
    <div>
      <section className=" relative py-16 md:py-24 bg-gradient-to-b from-[#078158] to-[#011B12]/80 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16 flex flex-col items-center gap-4"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Sé parte de una historia
            </h2>

            <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto">
              Cada abuelito tiene una historia, una vida de esfuerzo y amor.
              Hoy puedes acompañarlos y ayudar a que su historia continúe con
              dignidad y cuidado.
            </p>

            <h3 className="text-white/80 text-lg font-extrabold">
              Apadrina a un abuelito
            </h3>
          </motion.div>

          {/* Carousel */}
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">

              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3"
                >
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover={{ scale: 1.05 }}
                    viewport={{ once: true }}
                    className="testimonial-card group cursor-pointer relative rounded-[1.5rem] overflow-hidden"
                    onClick={() => setSelected(testimonial)}
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="testimonial-card-overlay">
                      <div className="w-full">
                        <p className="text-white/80 text-sm mb-2 italic opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          "{testimonial.quote}"
                        </p>

                        <h3 className="text-white text-xl md:text-2xl font-semibold">
                          {testimonial.name}
                        </h3>
                      </div>
                    </div>

                    <div className="absolute inset-0 border-4 border-transparent group-hover:border-white/30 rounded-[1.5rem] transition-colors duration-300 pointer-events-none" />
                  </motion.div>
                </CarouselItem>
              ))}

            </CarouselContent>

            <CarouselPrevious className="text-white border-white/40" />
            <CarouselNext className="text-white border-white/40" />
          </Carousel>

          {/* CTA */}
          <div className="text-white flex flex-col text-center gap-4 mt-12">
            <p>
              Tal vez no puedas apadrinar a un abuelito en específico, pero
              igual puedes ser parte de esta hermosa causa.
            </p>

            <p>
              Tu aporte nos ayuda a cubrir alimentación, medicamentos,
              cuidados diarios, actividades y todo lo necesario para brindar
              una vida digna a nuestros abuelitos.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-6"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/donaciones")}
                className="px-8 py-3 rounded-full bg-white text-emerald-600 font-semibold hover:bg-emerald-50 transition-colors duration-300 shadow-lg"
              >
                Donar ahora
              </motion.button>
            </motion.div>

            <p>
              Cada aporte, grande o pequeño, se transforma en cuidado,
              compañía y tranquilidad.
            </p>
          </div>
        </div>
      </section>

      {/* Dialog */}
      <AnimatePresence>
        {selected && (
          <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
            <DialogContent className="max-w-md rounded-2xl bg-white/95 backdrop-blur">
              <DialogHeader>
                <DialogTitle className="text-emerald-700 text-2xl">
                  {selected.name}
                </DialogTitle>

                <DialogDescription asChild>
                  <div className="mt-4">
                    <img
                      src={selected.image}
                      alt={selected.name}
                      className="w-full h-64 object-cover rounded-xl mb-4"
                    />

                    <p className="text-gray-700 italic text-center">
                      “{selected.quote}”
                    </p>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}