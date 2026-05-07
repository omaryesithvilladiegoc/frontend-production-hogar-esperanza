import type { ICreatePostPayload } from "@/interfaces/interfaces";

export type GeneratePostContentRequest = {
  topic?: string;
  currentPost?: Partial<ICreatePostPayload>;
};

export type GeneratedPostContent = {
  title: string;
  subtitle: string;
  header: string;
  mainContent: string;
  footer: string;
  keywords: string[];
  size: number;
};

const parseError = async (response: Response) => {
  try {
    const data = await response.json();
    if (typeof data?.message === "string") return data.message;
  } catch {
    return `Error ${response.status}`;
  }

  return `Error ${response.status}`;
};

export const FgeneratePostContent = async (
  payload: GeneratePostContentRequest,
): Promise<GeneratedPostContent> => {
  const response = await fetch("/api/generate-post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
};
