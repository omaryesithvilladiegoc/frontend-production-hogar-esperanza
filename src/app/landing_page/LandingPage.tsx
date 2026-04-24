"use client";

import { useEffect, useState, useCallback } from "react";
import { Plan } from "../dashboard/types/index.types";
import Navbar from "../sections/components/mapa/Navbar";
import Hero from "../sections/Hero";
import QuienesSomos from "../sections/QuienesSomos";
import MisionVision from "../sections/MisionVision";
import Servicios from "../sections/Servicios";
import Instalaciones from "../sections/Instalaciones";
import Testimonios from "../sections/Testimonios";
import Contacto from "../sections/FormInfo";
import Gallery from "../sections/Gallery";

interface LandingPageProps {
  initialPlans?: Plan[];
}

const getActiveSectionFromScroll = () => {
  if (typeof window === "undefined") return "inicio";

  const sections = [
    "inicio",
    "quienes-somos",
    "servicios",
    "instalaciones",
    "contacto",
    "apoyar",
    "testimonios",
    "galeria",
    "mapa",
  ];
  const scrollPosition = window.scrollY + 100;

  for (const section of sections) {
    const element = document.getElementById(section);
    if (!element) continue;

    const offsetTop = element.offsetTop;
    const offsetHeight = element.offsetHeight;

    if (
      scrollPosition >= offsetTop &&
      scrollPosition < offsetTop + offsetHeight
    ) {
      return section;
    }
  }

  return "inicio";
};

export default function LandingPage({
  initialPlans = [],
}: LandingPageProps) {
  const [activeSection, setActiveSection] = useState("inicio");

  const handleScroll = useCallback(() => {
    setActiveSection(getActiveSectionFromScroll());
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    const frameId = window.requestAnimationFrame(handleScroll);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const navbarOffset = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--navbar-safe-offset-mobile",
      ),
    );
    const offset = Number.isNaN(navbarOffset) ? 96 : navbarOffset;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

      <main>
        <section
          id="inicio"
          className="relative scroll-mt-[var(--navbar-safe-offset-mobile)] md:scroll-mt-20"
        >
          <Hero scrollToSection={scrollToSection} />
          <div className="h-20 w-full bg-[var(--color-brand-mint)] rounded-t-[4rem] absolute bottom-0 left-0" />
        </section>

        <section
          id="quienes-somos"
          className="scroll-mt-[var(--navbar-safe-offset-mobile)] md:scroll-mt-20 bg-[var(--color-brand-mint)] rounded-[4rem] h-full w-full"
        >
          <QuienesSomos />
        </section>

        <MisionVision />

        <section id="servicios" className="scroll-mt-[var(--navbar-safe-offset-mobile)] md:scroll-mt-20">
          <Servicios scrollToSection={scrollToSection} plans={initialPlans} />
        </section>

        <section
          id="instalaciones"
          className="bg-gradient-to-b from-transparent to-[#078158] h-full w-full"
        >
          <Instalaciones />
        </section>

        <section id="apoyar" className="scroll-mt-[var(--navbar-safe-offset-mobile)] md:scroll-mt-20">
          <Testimonios />
        </section>

        <section id="contacto" className="scroll-mt-[var(--navbar-safe-offset-mobile)] md:scroll-mt-20">
          <Contacto />
        </section>

        <section id="galeria" className="scroll-mt-[var(--navbar-safe-offset-mobile)] md:scroll-mt-20">
          <Gallery />
        </section>
      </main>
    </div>
  );
}
