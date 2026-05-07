import type { ICreatePostPayload } from "@/interfaces/interfaces";

export type GeneratePostImageRequest = {
  topic?: string;
  currentPost?: Partial<ICreatePostPayload>;
};

export type GeneratedPostImage = {
  imageBase64: string;
  mimeType: string;
  prompt: string;
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

export const FgeneratePostImage = async (
  payload: GeneratePostImageRequest,
): Promise<GeneratedPostImage> => {
  const response = await fetch("/api/generate-post-image", {
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
