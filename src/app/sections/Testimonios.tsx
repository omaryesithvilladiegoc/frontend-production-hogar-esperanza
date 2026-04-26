"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import "../globals.css";
import {
  WHATSAPP_DONATION_URL,
  buildWhatsAppMessageUrl,
} from "@/lib/contact";

type Testimonial = {
  id: number;
  name: string;
  image: string;
  quote: string;
  story: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Eduardo",
    image: "/testimonios/eduardo.jpeg",
    quote: "Una vida marcada por el fútbol, la disciplina y la gratitud.",
    story:
      "Don Eduardo Collado nació el 31 de julio de 1942 en Uruguay, pero desde muy pequeño su vida se construyó en Argentina, donde creció rodeado de fútbol gracias al trabajo de sus padres como utileros en un estadio del barrio Belgrano. Prácticamente criado entre canchas, desarrolló su pasión jugando en las divisiones inferiores de Excursionistas y más adelante en Ferrocarril Oeste, una institución que recuerda con mucho cariño por su ambiente deportivo y humano. El fútbol fue su escuela de vida, donde aprendió disciplina, constancia y amor por lo que se hace. Aunque consideró seguir como director técnico, decidió cerrar esa etapa con gratitud, llevando consigo una historia marcada por el esfuerzo, los sueños y una profunda pasión por el deporte. Hoy hace parte de Hogar Esperanza, donde continúa escribiendo su historia con tranquilidad, compañía y una sonrisa que refleja todo lo vivido.",
  },
  {
    id: 2,
    name: "Fancy",
    image: "/testimonios/fancy.jpeg",
    quote: "Su sonrisa ilumina cada espacio que comparte en Hogar Esperanza.",
    story:
      "Fancy hace parte de Hogar Esperanza y hoy comparte con nosotros una presencia serena, cercana y llena de luz. Su testimonio escrito no venía incluido en los archivos recibidos, pero su imagen ya transmite la calidez y la dignidad con la que vive esta etapa acompañada por nuestro hogar.",
  },
  {
    id: 3,
    name: "Marquesa",
    image: "/testimonios/marquesa.jpeg",
    quote: "Una mujer auténtica, de fe profunda y recuerdos inolvidables.",
    story:
      "La señora Marquesa es una mujer sencilla y querida, nacida en Cereté, un lugar donde, como ella misma dice con orgullo, todo el mundo la conoce. Dedicó su vida al hogar, siendo ama de casa y entregando su tiempo y amor a su familia. Madre de tres hijos, ha construido su historia entre recuerdos cotidianos, anécdotas que aún la acompañan y una fe profunda que la sostiene, siempre confiando en la Virgen y en la bendición de Dios. Su forma de hablar, espontánea y llena de vida, refleja a una mujer auténtica, marcada por los años pero también por el cariño de quienes la rodean. Hoy hace parte de Hogar Esperanza, donde continúa viviendo con tranquilidad, acompañada y conservando esa esencia tan suya que la hace inolvidable.",
  },
  {
    id: 4,
    name: "Mary",
    image: "/testimonios/mary.jpeg",
    quote: "Tradición, familia y fortaleza en una historia profundamente costeña.",
    story:
      "La señora Mary nació el 7 de abril de 1950 en Montería, una mujer profundamente costeña que ha vivido siempre rodeada de familia y tradiciones. Su vida transcurrió entre el hogar y el trabajo hecho con sus manos, dedicándose por muchos años al tejido, con el que aportaba al sustento mientras cuidaba de su casa. Madre de cuatro hijos, entre ellos una hija con síndrome de Down a quien ha acompañado con amor y dedicación, construyó una familia unite en medio de las dificultades y alegrías de la vida. También guarda en su memoria los sabores y costumbres de su tierra, disfrutando de la cocina tradicional y de momentos especiales como la Semana Santa. Hoy hace parte de Hogar Esperanza, donde vive acompañada, tranquila y con ese espíritu cálido que la caracteriza.",
  },
  {
    id: 5,
    name: "Sixta",
    image: "/testimonios/sixta.jpeg",
    quote: "Vocación, fortaleza y una vida dedicada a enseñar y construir futuro.",
    story:
      "La señora Sixta nació en 1955, siendo la menor de una familia numerosa y muy dedicada al estudio, donde todos sus hermanos se formaron como profesionales. A lo largo de su vida construyó un camino sólido en la educación, convirtiéndose en licenciada en biología y química, con especializaciones y una maestría que le permitieron alcanzar uno de los niveles más altos en el escalafón docente. Se desempeñó como coordinadora disciplinaria en reconocidos colegios de Montería, dejando huella con su carácter firme y su vocación por la enseñanza. Su historia también está marcada por momentos difíciles, como la pérdida de seres queridos, incluido su esposo y un hermano durante la pandemia, experiencias que enfrentó con fortaleza. Madre de un hijo y orgullosa abuela de cuatro nietos, hoy mira su vida con la satisfacción de lo construido. Actualmente hace parte de Hogar Esperanza, donde encuentra tranquilidad, compañía y un espacio para seguir compartiendo su historia con serenidad.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const openWhatsApp = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export default function Testimonios() {
  const [selected, setSelected] = useState<Testimonial | null>(null);

  const testimonialsWithUrls = useMemo(
    () =>
      testimonials.map((testimonial) => ({
        ...testimonial,
        whatsappUrl: buildWhatsAppMessageUrl(
          `Hola, quiero apoyar a ${testimonial.name}.`,
        ),
      })),
    [],
  );

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#078158] to-[#011B12]/80 py-16 md:py-24">
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 flex flex-col items-center gap-4 text-center md:mb-16"
          >
            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Se parte de una historia
            </h2>

            <p className="mx-auto max-w-xl text-base text-white/80 md:text-lg">
              Cada abuelo tiene una historia única, una vida de esfuerzo y
              amor. Hoy puedes acompañarlos y ayudar a que su historia continúe
              con dignidad, cuidado y compañía.
            </p>

            <h3 className="text-lg font-extrabold text-white/85">
              Apadrina a un abuelo
            </h3>
          </motion.div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonialsWithUrls.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="basis-[88%] pl-4 sm:basis-1/2 xl:basis-1/3"
                >
                  <motion.article
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ y: -6 }}
                    className="overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-sm"
                  >
                    <button
                      type="button"
                      onClick={() => setSelected(testimonial)}
                      className="group block w-full text-left"
                    >
                      <div className="relative h-[340px] w-full overflow-hidden">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          sizes="(max-width: 768px) 88vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#02150e]/95 via-[#02150e]/18 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-5">
                          <p className="mb-3 text-sm italic leading-6 text-white/80">
                            &ldquo;{testimonial.quote}&rdquo;
                          </p>
                          <h3 className="text-2xl font-semibold text-white">
                            {testimonial.name}
                          </h3>
                        </div>
                      </div>
                    </button>

                    <div className="space-y-4 p-5">
                      <p className="line-clamp-4 text-sm leading-7 text-white/82">
                        {testimonial.story}
                      </p>

                      <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          onClick={() => openWhatsApp(testimonial.whatsappUrl)}
                          className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
                        >
                          Apoya a {testimonial.name}
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelected(testimonial)}
                          className="rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                        >
                          Ver historia
                        </button>
                      </div>
                    </div>
                  </motion.article>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="border-white/40 text-white" />
            <CarouselNext className="border-white/40 text-white" />
          </Carousel>

          <div className="mt-12 flex flex-col gap-4 text-center text-white">
            <p>
              Tal vez no puedas apadrinar a un abuelo en específico, pero igual
              puedes ser parte de esta hermosa causa.
            </p>

            <p>
              Tu aporte nos ayuda a cubrir alimentación, medicamentos, cuidados
              diarios, actividades y todo lo necesario para brindar una vida
              digna a nuestros abuelos.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openWhatsApp(WHATSAPP_DONATION_URL)}
                className="rounded-full bg-white px-8 py-3 font-semibold text-emerald-600 shadow-lg transition-colors duration-300 hover:bg-emerald-50"
              >
                Donar ahora
              </motion.button>
            </motion.div>

            <p>
              Cada aporte, grande o pequeño, se transforma en cuidado, compañía
              y tranquilidad.
            </p>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
            <DialogContent className="max-w-2xl rounded-[2rem] border border-emerald-100 bg-white/95 p-0 backdrop-blur">
              <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
                <div className="relative max-h-[320px]">
                  <Image
                    src={selected.image}
                    alt={selected.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="rounded-t-[2rem] object-cover md:rounded-l-[2rem] md:rounded-tr-none"
                  />
                </div>

                <DialogHeader className="flex h-full flex-col p-6 text-left sm:p-8">
                  <DialogTitle className="text-3xl text-emerald-700">
                    {selected.name}
                  </DialogTitle>

                  <DialogDescription asChild>
                    <div className="mt-4 flex h-full flex-col">
                      <p className="mb-5 text-base italic leading-7 text-emerald-900/75">
                        &ldquo;{selected.quote}&rdquo;
                      </p>

                      <p className="text-sm leading-7 text-gray-700 sm:text-base">
                        {selected.story}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          openWhatsApp(
                            buildWhatsAppMessageUrl(
                              `Hola, quiero apoyar a ${selected.name}.`,
                            ),
                          )
                        }
                        className="mt-6 w-fit rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                      >
                        Apoya a {selected.name}
                      </button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
