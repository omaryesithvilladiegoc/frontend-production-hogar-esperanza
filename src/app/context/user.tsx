"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  ReactNode,
  useContext,
} from "react";
import {
  IFormContactResponse,
  IUserContextType,
  IUserResponse,
  ILoginUser,
  IUsersForm,
} from "@/interfaces/interfaces";
import { FsendFormContact, FsignIn, FlogOut } from "@/services/fetchUsers";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { clearClientSession, SESSION_TIMEOUT_MS } from "@/lib/session";
import { toast } from "sonner";

export const UserContext = createContext<IUserContextType>({
  user: null,
  isLogin: false,
  signIn: async () => null,
  signOut: async () => {},
  sendFormContact: async () => null,
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const idleTimeoutRef = useRef<number | null>(null);
  const [user, setUser] = useState<Partial<IUserResponse> | null>(() => {
    if (typeof window === "undefined") return null;

    const token = localStorage.getItem("token");
    if (!token) return null;

    return {
      login: true,
      token,
      user: null,
    };
  });
  const [isLogin, setIsLogin] = useState(() => {
    if (typeof window === "undefined") return false;
    return Boolean(localStorage.getItem("token"));
  });

  const signIn = async (userData: ILoginUser) => {
    const res = await FsignIn(userData);

    if (!res) return null;
    if (!res.token) return res;

    localStorage.setItem("token", res.token);
    Cookies.set("token", res.token, {
      expires: 7,
      path: "/",
      secure: true,
      sameSite: "strict",
    });

    setUser({
      login: true,
      token: res.token,
      user: null,
    });
    setIsLogin(true);

    return res;
  };

  const logOut = useCallback(async (options?: { silent?: boolean }) => {
    try {
      await FlogOut();
    } catch {
      // El cierre local debe continuar aunque falle el backend.
    }

    if (idleTimeoutRef.current) {
      window.clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = null;
    }

    await clearClientSession();
    router.push("/login");
    setUser(null);
    setIsLogin(false);

    if (!options?.silent) {
      toast.info("Sesión cerrada");
    }
  }, [router]);

  const sendFormContact = async (
    formData: IUsersForm,
  ): Promise<IFormContactResponse | null> => {
    try {
      const data = await FsendFormContact(formData);
      if (!data) return null;
      return data;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (!isLogin || typeof window === "undefined") return;

    const resetIdleTimer = () => {
      if (idleTimeoutRef.current) {
        window.clearTimeout(idleTimeoutRef.current);
      }

      idleTimeoutRef.current = window.setTimeout(() => {
        void logOut({ silent: true });
        toast.info("Sesión finalizada por inactividad", {
          description: "Vuelve a iniciar sesión para continuar.",
        });
      }, SESSION_TIMEOUT_MS);
    };

    const activityEvents: Array<keyof WindowEventMap> = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, resetIdleTimer, { passive: true });
    });

    resetIdleTimer();

    return () => {
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, resetIdleTimer);
      });

      if (idleTimeoutRef.current) {
        window.clearTimeout(idleTimeoutRef.current);
        idleTimeoutRef.current = null;
      }
    };
  }, [isLogin, logOut]);

  return (
    <UserContext.Provider
      value={{
        user,
        isLogin,
        signIn,
        signOut: logOut,
        sendFormContact,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
