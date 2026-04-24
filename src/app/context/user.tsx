"use client";

import { createContext, useState, ReactNode, useContext } from "react";
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

export const UserContext = createContext<IUserContextType>({
  user: null,
  isLogin: false,
  signIn: async () => null,
  signOut: async () => false,
  sendFormContact: async () => null,
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
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

  const logOut = async () => {
    await FlogOut();
    localStorage.removeItem("token");
    Cookies.remove("token");
    router.push("/login");
    setUser(null);
    setIsLogin(false);
  };

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
