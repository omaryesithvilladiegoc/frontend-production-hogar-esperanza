"use client";

import Cookies from "js-cookie";

export const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

export async function clearClientSession() {
  if (typeof window === "undefined") return;

  localStorage.clear();
  sessionStorage.clear();

  Cookies.remove("token", { path: "/" });
  Cookies.remove("token");
  document.cookie =
    "token=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";

  if ("caches" in window) {
    const cacheKeys = await caches.keys();
    await Promise.all(cacheKeys.map((cacheKey) => caches.delete(cacheKey)));
  }
}
