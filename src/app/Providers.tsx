"use client";

import { PlansProvider } from "./context/plans";
import { PostsProvider } from "./context/posts";
import { UserProvider } from "./context/user";


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PlansProvider>
      <PostsProvider>
        <UserProvider>{children}</UserProvider>
      </PostsProvider>
    </PlansProvider>
  );
}
