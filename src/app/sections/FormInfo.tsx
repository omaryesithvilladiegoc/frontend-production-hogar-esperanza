"use client";

import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { UserContext } from "../context/user";
import { usePlansContext } from "../context/plans";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Contacto() {
  const { sendFormContact } = useContext(UserContext);
  const { plans } = usePlansContext();
  const [loading, setLoading] = useState(false);
  const [formStartedAt] = useState(() => Date.now());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    edad: "",
    plan: "",
    website: "",
  });

  const resetFormData = () => {
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      edad: "",
      plan: "",
      website: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Date.now() - formStartedAt < 1500 || formData.website.trim()) {
      setDialogTitle("Solicitud no valida");
      setDialogMessage(
        "Por favor intenta nuevamente completando el formulario de forma manual.",
      );
      setDialogOpen(true);
      return;
    }

    try {
      setLoading(true);

      const response = await sendFormContact({
        fullName: formData.nombre.trim(),
        email: formData.email.trim(),
        phone: formData.telefono.trim(),
        age: Number(formData.edad),
        plan: formData.plan,
        website: formData.website.trim(),
      });

      if (response?.success) {
        setDialogTitle("Mensaje enviado");
        setDialogMessage(
          response.message ||
            "Gracias por contactarnos. Te responderemos pronto, por favor revisa tu correo electronico.",
        );
        resetFormData();
      } else {
        setDialogTitle("Error");
        setDialogMessage(
          response?.message ||
            "Ocurrio un error al enviar el formulario. Por favor, intentalo de nuevo.",
        );
      }

      setDialogOpen(true);
    } catch (error) {
      console.error("Servidor caido:", error);
      setDialogTitle("Servidor no disponible");
      setDialogMessage("El servidor no esta disponible en este momento.");
      setDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <section
        id="contactanos"
        className="relative mb-[100px] overflow-hidden bg-gradient-to-b from-[#011B12]/80 to-white pt-[100px]"
      >
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 h-full w-full rounded-[4rem] bg-cover bg-no-repeat"
            style={{
              backgroundImage:
                "url(https://res.cloudinary.com/dbzbkk9l6/image/upload/v1772996246/Rectangle_34_1_i6sod3.webp)",
              backgroundPosition: "center",
            }}
          />
        </div>

        <div className="relative z-10 w-full px-4 py-20 sm:px-6 md:py-28 lg:px-8 xl:px-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="mb-6 text-3xl font-bold text-white text-shadow md:text-4xl lg:text-5xl">
                  Contactanos
                </h2>

                <p className="max-w-lg text-sm leading-relaxed text-white/90 text-shadow md:text-base">
                  Contactanos hoy mismo para obtener mas informacion sobre
                  nuestros servicios y programas disenados para mejorar la
                  calidad de vida de los adultos mayores.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <form
                  onSubmit={handleSubmit}
                  className="relative rounded-3xl border-2 border-white/30 bg-white/10 p-6 backdrop-blur-md md:p-8"
                >
                  {loading && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center rounded-3xl bg-black/40 backdrop-blur-sm">
                      <Loader2 className="h-10 w-10 animate-spin text-white" />
                    </div>
                  )}

                  <div className="space-y-4">
                    <input
                      type="text"
                      name="nombre"
                      placeholder="Nombre completo"
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full rounded-full border-2 border-white/50 bg-white/10 px-5 py-3.5 text-white placeholder-white/70 focus:border-white focus:outline-none"
                      required
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder="Correo electronico"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-full border-2 border-white/50 bg-white/10 px-5 py-3.5 text-white placeholder-white/70 focus:border-white focus:outline-none"
                      required
                    />

                    <input
                      type="tel"
                      name="telefono"
                      placeholder="Telefono o WhatsApp"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full rounded-full border-2 border-white/50 bg-white/10 px-5 py-3.5 text-white placeholder-white/70 focus:border-white focus:outline-none"
                      required
                    />

                    <input
                      type="number"
                      name="edad"
                      placeholder="Edad"
                      value={formData.edad}
                      onChange={handleChange}
                      className="w-full rounded-full border-2 border-white/50 bg-white/10 px-5 py-3.5 text-white placeholder-white/70 focus:border-white focus:outline-none"
                      required
                      min={18}
                      max={100}
                    />

                    <select
                      name="plan"
                      value={formData.plan}
                      onChange={handleChange}
                      className="w-full rounded-full border-2 border-white/50 bg-white/10 px-5 py-3.5 text-white focus:border-white focus:outline-none"
                      required
                    >
                      <option value="" className="text-gray-800">
                        Selecciona un servicio
                      </option>

                      {plans.map((service) => (
                        <option
                          key={service.id}
                          value={service.id}
                          className="text-gray-800"
                        >
                          {service.title}
                        </option>
                      ))}
                    </select>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] px-6 py-4 font-semibold text-white disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <>
                          <span>Enviar</span>
                          <Send className="h-5 w-5" />
                        </>
                      )}
                    </motion.button>

                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
            <AlertDialogDescription>{dialogMessage}</AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setDialogOpen(false)}>
              Cerrar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
