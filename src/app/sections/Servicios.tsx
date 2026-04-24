import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

import {
  CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { usePlansContext } from '../context/plans';
import { Plan } from '../dashboard/types/index.types';

export interface ServicesProps {
  scrollToSection: (sectionId: string) => void;
  plans?: Plan[];
}

export default function Servicios({
  scrollToSection,
  plans: initialPlans = [],
}: ServicesProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [expandedId, setExpandedId] = useState<string | number | null>(null);
  const [survivorId, setSurvivorId] = useState<string | number | null>(null);
  const [lastSelectedId, setLastSelectedId] = useState<string | number | null>(
    null,
  );
  const sectionRef = useRef<HTMLElement>(null);
  const { plans: contextPlans } = usePlansContext();
  const plans = initialPlans.length ? initialPlans : contextPlans;
  const visiblePlans =
    expandedId === null
      ? plans
      : plans.filter(
          (plan) => plan.id === expandedId || plan.id === survivorId,
        );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sectionRef.current &&
        !sectionRef.current.contains(event.target as Node)
      ) {
        setExpandedId(null);
        setSurvivorId(null);
      }
    };

    if (expandedId !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expandedId]);

  const handleCardClick = (id: string | number) => {
    if (expandedId === id) {
      setLastSelectedId(id);
      setExpandedId(null);
      setSurvivorId(null);
      return;
    }

    if (!plans.length) return;

    const currentIndex = plans.findIndex((plan) => plan.id === id);
    const nextIndex = (currentIndex + 1) % plans.length;
    const nextService = plans[nextIndex];

    setLastSelectedId(id);
    setExpandedId(id);
    setSurvivorId(nextService?.id ?? null);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLastSelectedId(expandedId);
    setExpandedId(null);
    setSurvivorId(null);
  };

  useEffect(() => {
    if (!carouselApi) return;

    carouselApi.reInit();

    const frameId = window.requestAnimationFrame(() => {
      if (expandedId !== null) {
        carouselApi.scrollTo(0);
        return;
      }

      if (lastSelectedId === null) return;

      const selectedIndex = plans.findIndex((plan) => plan.id === lastSelectedId);
      if (selectedIndex >= 0) {
        carouselApi.scrollTo(selectedIndex);
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [carouselApi, expandedId, lastSelectedId, plans, survivorId]);
  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-white overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-700">
            Servicios
          </h2>
        </motion.div>

        <div className="hidden md:block w-full">
          <Carousel
            setApi={setCarouselApi}
            opts={{
              align: 'start',
              containScroll: 'trimSnaps',
            }}
          >
            <CarouselContent className="h-[550px]">
              <AnimatePresence mode="popLayout">
                {visiblePlans.map((plan) => {
                  const isExpanded = expandedId === plan.id;
                  const isSurvivor =
                    survivorId === plan.id && expandedId !== null;

                  return (
                    <CarouselItem
                      key={plan.id}
                      className={
                        isExpanded
                          ? 'basis-[calc(100%-6rem)]'
                          : isSurvivor
                            ? 'basis-24'
                            : 'basis-1/3'
                      }
                    >
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          flex: isExpanded ? 10 : isSurvivor ? 0.4 : 1,
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                          layout: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
                          opacity: { duration: 0.3 },
                          scale: { duration: 0.3 },
                        }}
                        onClick={() => handleCardClick(plan.id)}
                        className={`relative rounded-[2rem] overflow-hidden cursor-pointer h-full w-full ${
                          isSurvivor ? 'writing-vertical' : ''
                        }`}
                        style={{
                          writingMode: isSurvivor ? 'vertical-rl' : 'horizontal-tb',
                          textOrientation: 'mixed',
                        }}
                      >
                        <motion.img
                          layout="position"
                          src={plan.image}
                          alt={plan.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />

                        <div
                          className={`absolute inset-0 transition-colors duration-500 ${
                            isExpanded ? 'bg-emerald-800/85' : 'bg-emerald-700/70'
                          }`}
                        />

                        {isExpanded && (
                          <motion.button
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center"
                          >
                            <X className="w-5 h-5 text-white" />
                          </motion.button>
                        )}

                        <div className="relative h-full flex flex-col justify-end p-6 overflow-hidden">
                          <motion.h3
                            layout="position"
                            className={`text-white font-semibold mb-4 leading-tight ${
                              isSurvivor ? 'text-sm whitespace-nowrap' : 'text-xl'
                            }`}
                            style={{
                              transform: isSurvivor ? 'rotate(180deg)' : 'none',
                            }}
                          >
                            {plan.title}
                          </motion.h3>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="overflow-y-auto max-h-[380px] pr-2 custom-scrollbar"
                              >
                                <ul className="space-y-2">
                                  {plan.features.map((feature, idx) => (
                                    <motion.li
                                      key={idx}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{
                                        duration: 0.3,
                                        delay: 0.15 + idx * 0.03,
                                      }}
                                      className="text-white/90 text-sm flex items-start gap-2"
                                    >
                                      <span className="text-emerald-300 mt-0.5">
                                        -
                                      </span>
                                      <span>{feature.description}</span>
                                    </motion.li>
                                  ))}
                                </ul>

                                <motion.button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    scrollToSection('contactanos');
                                  }}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.8 }}
                                  className="mt-6 px-6 py-3 bg-white text-emerald-700 font-semibold rounded-full z-50 cursor-pointer pointer-events-auto"
                                >
                                  Solicitar informacion
                                </motion.button>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {!isExpanded && !isSurvivor && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 0.7 }}
                              className="text-white/70 text-xs mt-2"
                            >
                              Click para ver mas
                            </motion.p>
                          )}
                        </div>

                        <div
                          className={`absolute inset-0 border-2 rounded-[2rem] pointer-events-none ${
                            isExpanded ? 'border-emerald-400' : 'border-transparent'
                          }`}
                        />
                      </motion.div>
                    </CarouselItem>
                  );
                })}
              </AnimatePresence>
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="md:hidden flex flex-col justify-center items-center gap-6 px-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => handleCardClick(plan.id)}
              className="rounded-2xl overflow-hidden cursor-pointer w-full max-w-md"
            >
              <div
                className={`relative ${
                  expandedId === plan.id ? 'h-[520px]' : 'aspect-[16/12]'
                }`}
              >
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-800/60 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-white font-semibold text-xl mb-3">
                    {plan.title}
                  </h3>

                  <AnimatePresence>
                    {expandedId === plan.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden flex min-h-0 flex-1 flex-col"
                      >
                        <ul className="space-y-2 mb-4 overflow-y-auto pr-2 custom-scrollbar flex-1 min-h-0">
                          {plan.features.map((feature, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="text-white/85 text-sm flex items-start gap-2"
                            >
                              <span className="text-emerald-300 flex-shrink-0">
                                -
                              </span>
                              <span>{feature.description}</span>
                            </motion.li>
                          ))}
                        </ul>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            scrollToSection('contactanos');
                          }}
                          className="w-full py-3 bg-white text-emerald-700 font-semibold rounded-full text-sm z-10 cursor-pointer pointer-events-auto"
                        >
                          Solicitar informacion
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {expandedId !== plan.id && (
                    <p className="text-white/70 text-sm">
                      Toca para ver detalles
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </section>
  );
}
