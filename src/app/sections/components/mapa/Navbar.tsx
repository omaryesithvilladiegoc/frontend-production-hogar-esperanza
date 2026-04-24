"use client";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Plus, X } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface NavbarProps {
  activeSection?: string;
  scrollToSection?: (sectionId: string) => void;
}

const navItems = [
  { id: "inicio", label: "Inicio" },
  { id: "blog", label: "Blog" },
  { id: "servicios", label: "Servicios" },
  { id: "quienes-somos", label: "¿Quiénes somos?" },
  { id: "como-ayudar", label: "¿Cómo ayudar?" },
  { id: "contacto", label: "Contacto" },
  { id: "apoyar", label: "Apoyar" },
  { id: "instalaciones", label: "Instalaciones" },
  { id: "galeria", label: "Galeria" },
  { id: "mapa", label: "Mapa" },
];

export default function Navbar({
  activeSection,
  scrollToSection,
}: NavbarProps) {
  const pathname = usePathname();
  const isBlogPath = pathname.includes("/blog");
  const [isExpanded, setIsExpanded] = useState(true);
  const [rounded, setRounded] = useState<string>("rounded-full");
  const [phase, setPhase] = useState<
    "form-newslatter" | "menu" | "dynamic-menu"| "blog" 
  >(() => (isBlogPath ? "blog" : "menu"));

  const [animation, setAnimation] = useState<
    "vibrate" | "press" | "release" | null
  >(null);

  const navRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const router = useRouter();

  /* ---------------- ANIMACIONES CONTROLADAS ---------------- */

  useEffect(() => {
    if (!animation) return;

    const run = async () => {
      if (animation === "vibrate") {
        await controls.start({
          x: [0, -2, 2, -2, 2, 0],
          transition: { duration: 0.25, ease: "easeInOut" },
        });
      }

      if (animation === "press") {
        await controls.start({
          scale: 0.94,
          y: 2,
          transition: { duration: 0.08, ease: "easeOut" },
        });
      }

      if (animation === "release") {
        await controls.start({
          scale: [0.94, 1.02, 1],
          y: [2, -1, 0],
          x: [0, 1, 0],
          transition: { duration: 0.35, ease: "easeOut" },
        });
      }

      setAnimation(null);
    };

    run();
  }, [animation, controls]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setPhase((currentPhase) => {
        if (isBlogPath) return "blog";
        if (currentPhase === "blog") return "menu";
        return currentPhase;
      });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [isBlogPath]);

  const vibrateIsland = () => setAnimation("vibrate");
  const dynamicIslandPress = () => setAnimation("press");
  const dynamicIslandRelease = () => setAnimation("release");

  /* ---------------- SECUENCIA INICIAL ---------------- */

  useEffect(() => {
    if (isBlogPath) return;

    let isCancelled = false;

    const sequence = async () => {
      await new Promise((r) => setTimeout(r, 1000));
      if (isCancelled) return;
      setPhase("menu");

      await new Promise((r) => setTimeout(r, 4000));
      if (isCancelled) return;

      vibrateIsland();
      setIsExpanded(false);
    };

    sequence();
    return () => {
      isCancelled = true;
    };
  }, [isBlogPath]);

  /* ---------------- NAVEGACIÓN ---------------- */

  const handleClick = (id: string) => {
    if (id === "como-ayudar") router.push("/donaciones");
    if (id === "mapa") router.push("/mapa");
    if (id === "blog") router.push("/blog");

    scrollToSection?.(id);
  };

  const onClickDynamicMenu = () => {
    setRounded("rounded-[2rem]");
    setPhase(phase === "dynamic-menu" ? "menu" : "dynamic-menu");
  };

  const onClickNewsletter = () => {
    if (phase === "form-newslatter") {
      setPhase("menu");
      setIsExpanded(true);
      setRounded("rounded-[4rem]");
    } else {
      vibrateIsland();
      setPhase("form-newslatter");
      setIsExpanded(false);
      setRounded("rounded-[2rem]");
    }
  };

  return (
    <motion.nav
      className="fixed top-4 left-0 right-0 z-50 flex justify-center"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        ref={navRef}
        layout
        animate={controls}
        onMouseDown={dynamicIslandPress}
        onMouseUp={dynamicIslandRelease}
        onTouchStart={dynamicIslandPress}
        onTouchEnd={dynamicIslandRelease}
        onMouseEnter={() => phase !== "form-newslatter" && setIsExpanded(true)}
        onMouseLeave={() => {
          if (phase !== "form-newslatter") {
            vibrateIsland();
            setIsExpanded(false);
          }
        }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className={`bg-white/80 backdrop-blur-xl border shadow-2xl ${rounded} px-1 flex items-center overflow-hidden cursor-pointer max-w-[92%] md:max-w-fit`}
        style={{ borderColor: 'rgb(from var(--color-brand-mint) r g b / 0.6)' }}
      >
        <div className="w-px h-5 md:h-6 bg-emerald-200 mx-2 flex-shrink-0" />

        {/* MENU */}
        <div className="flex-1 flex justify-center">
          <AnimatePresence mode="popLayout">
            {phase === "menu" && isExpanded ? (
              <motion.div
                key="expanded"
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="flex items-center gap-1 md:gap-3"
              >
                {navItems.slice(0, 3).map((item, index) => (
                  <motion.button
                    key={item.id}
                    layout
                    onClick={() => handleClick(item.id)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`px-2 py-1.5 md:py-2 rounded-full text-[12px] font-medium ${
                      activeSection === item.id
                        ? "bg-emerald-600 text-white"
                        : "text-emerald-600 hover:bg-emerald-100 hover:text-emerald-800"
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}

                <motion.button
                  layout
                  onClick={onClickDynamicMenu}
                  className="text-emerald-600 hover:bg-emerald-100 px-2 py-2 rounded-full"
                >
                  <Plus size={14} />
                </motion.button>
              </motion.div>
            ) : phase === "form-newslatter" ? (
              <div className="relative flex flex-col items-center gap-3 p-10">
                <button
                  onClick={() => {
                    vibrateIsland();
                    setPhase("menu");
                    setIsExpanded(true);
                    setRounded("rounded-full");
                  }}
                  className="shadow-md p-1 rounded-full bg-[var(--color-brand-mint)] text-white"
                >
                  <X size={18} />
                </button>

                <p className="text-center font-semibold text-emerald-600 text-sm">
                  ¿Quieres apoyar? Regístrate a nuestro newsletter
                </p>

                <div className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="Tu correo electrónico"
                    className="px-3 py-2 border rounded-xl"
                  />

                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl">
                    Suscribirse
                  </button>
                </div>
              </div>
            ) : phase === "menu" ? (
              <motion.div
                key="collapsed"
                layout
                className="px-3 py-1.5 rounded-full bg-emerald-600 text-white text-[10px]"
              >
                {navItems.find((i) => i.id === activeSection)?.label}
              </motion.div>
            ) : phase === "blog" ? (
              <motion.div
                key="collapsed"
                layout
                className="flex items-center justify-center gap-3  text-white text-[10px]"
              >
                {["/blog","/"].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => router.push(item)}
                    className={`px-3 py-1.5 text-[10px] hover:text-emerald-800 rounded-full ${item == "/" ? " text-black" : "hover:bg-emerald-100 bg-emerald-600 text-white"}`}
                  >
                    {item === "/" ? "Inicio" : "Blog"}
                  </motion.button>
                ))}
             
              </motion.div>
            ) : (
              phase === "dynamic-menu" && (
                <motion.div key="dynamic-menu" layout className="pb-4">
                  <motion.button
                    onClick={onClickDynamicMenu}
                    className="pt-4 flex w-full justify-center text-emerald-600"
                  >
                    <ArrowLeft size={14} />
                  </motion.button>

                  {navItems.slice(3).map((item) => (
                    <motion.button
                      key={item.id}
                      layout
                      onClick={() => handleClick(item.id)}
                       className={`px-2 py-1.5 md:py-2 rounded-full flex items-center justify-center text-[12px] text-center w-full font-medium ${
                      activeSection === item.id
                        ? "bg-emerald-600 text-white"
                        : "text-emerald-600 hover:bg-emerald-100 hover:text-emerald-800"
                    }`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>

        <div className="w-px h-5 md:h-6 mx-2 flex-shrink-0" />

        {/* LOGO */}
        {phase !== "form-newslatter" && (
          <motion.button
            onClick={onClickNewsletter}
            className="p-2 rounded-full hover:bg-emerald-100"
          >
            <Image
              src="https://res.cloudinary.com/dbzbkk9l6/image/upload/v1772862995/620429637_17932356405170762_5379083252956222494_n-removebg-preview_jyos1z.png"
              alt="Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
          </motion.button>
        )}
      </motion.div>
    </motion.nav>
  );
}
