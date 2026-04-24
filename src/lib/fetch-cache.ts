export const getPublicFetchOptions = (tags: string[] = []) =>
  typeof window === "undefined"
    ? {
        next: {
          revalidate: 300,
          tags,
        },
      }
    : {
        cache: "no-store" as RequestCache,
      };
