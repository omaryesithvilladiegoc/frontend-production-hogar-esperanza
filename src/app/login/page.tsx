"use client";

import { useState } from "react";
import {
  Mail,
  Lock,
  LogIn,
  HandHeart,
  Home,
  Info,
  Phone,
} from "lucide-react";
import { motion } from "framer-motion";
import { useUserContext } from "../context/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginScreen = () => {
  const { signIn } = useUserContext();
  const router = useRouter();
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [nextAllowedAt, setNextAllowedAt] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nextAllowedAt && Date.now() < nextAllowedAt) {
      const secondsLeft = Math.ceil((nextAllowedAt - Date.now()) / 1000);
      const message = `Espera ${secondsLeft} segundos antes de volver a intentar.`;
      setNextAllowedAt(Date.now() + 3000);
      setError(message);
      toast.error("Intentos demasiado seguidos", {
        description: message,
      });
      return;
    }

    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)?.value;

    try {
      const res = await signIn({
        email,
        password,
      });

      if (!res) {
        const message = "No se obtuvo respuesta del servidor.";
        setNextAllowedAt(Date.now() + 3000);
        setError(message);
        toast.error("Error al iniciar sesión", {
          description: message,
        });
        return;
      }

      if (res?.message && !res?.token) {
        setNextAllowedAt(Date.now() + 3000);
        setError(res.message);
        toast.error("Credenciales inválidas", {
          description: res.message,
          duration: 5000,
          position: "top-center",

        });
        return;
      }

      const token =
        res?.token ||
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

      if (!token || typeof token !== "string" || token.trim() === "") {
        const message = "Login correcto, pero no se encontró un token válido.";
        setError(message);
        toast.error("Login incompleto", {
          description: message,
        });
        return;
      }

      toast.success("Inicio de sesión exitoso", {
        description: "Bienvenido a Hogar Esperanza.",
      });
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        (err as { message?: string })?.message ||
        "Ocurrió un error al iniciar sesión.";

      setError(message);

      toast.error("Error al iniciar sesión", {
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col justify-center items-center py-12 pb-12 overflow-hidden bg-background-light">
      <div className="absolute inset-0 z-0 ">
        <div className="absolute inset-0 bg-gradient-to-b from-background-light/80 via-background-light/40 to-background-light/90 z-10"></div>
        <img
          alt="Smiling elderly people in a garden"
          className="w-full h-full object-cover grayscale-[20%] opacity-40"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKy4QvUbr0nMmIAGDExTpZeGRczUY2t9RRpDQzs-8I0PgDM7UnzgvUtWisPUdumxIoKzP9MNZYSYNBZOsEeNvthygrHWvod2m1S1Uttn-HfjDn_u7bLfVDepN1SUQOb-_EiP9wrqsEP22B4lpC1xnbfHXhLHVJuwhkoyRj8vmnIpBtHLEyOsuaai6AwBNZ_VrekPIE064MZnyh77ZkdTbgEff5uH7Thbc1ljadIW7MGnNFvSgG4FIDxMFcc5z62BcWm5ysoFyvEw"
          referrerPolicy="no-referrer"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-20 w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-primary/10 h-[80%] absolute transform translate-y-[-10%]"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary/10 p-4 rounded-full mb-4">
            <HandHeart className="text-primary size-12" />
          </div>
          <h1 className="text-3xl font-extrabold text-primary mb-2">
            Hogar Esperanza
          </h1>
          <p className="text-slate-600 font-medium">
            A warm, secure home for your loved ones
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm font-bold text-slate-700 mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
              <input
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-primary/20 bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                id="email"
                name="email"
                placeholder="name@example.com"
                type="email"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label
                className="block text-sm font-bold text-slate-700"
                htmlFor="password"
              >
                Password
              </label>
              <a className="text-xs font-bold text-primary hover:underline" href="#">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
              <input
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-primary/20 bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                id="password"
                name="password"
                placeholder="••••••••"
                type="password"
                required
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              className="rounded border-primary/20 text-primary focus:ring-primary size-4"
              id="remember"
              type="checkbox"
            />
            <label className="ml-2 text-sm text-slate-600" htmlFor="remember">
              Remember me
            </label>
          </div>

          {error && (
            <p className="text-red-500 text-sm font-semibold text-center">
              {error}
            </p>
          )}

          <button
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg shadow-primary/20 flex justify-center items-center gap-2 cursor-pointer disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            <span>{loading ? "Cargando..." : "Sign In"}</span>
            <LogIn className="size-5" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-primary/10 text-center">
          <p className="text-slate-600">
            New to our community?
            <a className="text-primary font-bold hover:underline ml-1" href="#">
              Create an account
            </a>
          </p>
        </div>
      </motion.div>

      <div className="fixed bottom-0 left-0 right-0 z-30 flex gap-2 border-t border-primary/10 bg-white/90 backdrop-blur-sm px-4 pb-4 pt-3 md:hidden">
        <a className="flex flex-1 flex-col items-center justify-center gap-1 text-primary" href="#">
          <Home className="size-6" />
        </a>
        <a className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400" href="#">
          <Info className="size-6" />
        </a>
        <a className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400" href="#">
          <Phone className="size-6" />
        </a>
      </div>
    </div>
  );
};

export default LoginScreen;
