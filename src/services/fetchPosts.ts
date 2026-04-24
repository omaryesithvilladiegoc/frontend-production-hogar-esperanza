import {
  ICreatePostPayload,
  IPost,
  IUpdatePostPayload,
} from "@/interfaces/interfaces";
import { getPublicFetchOptions } from "@/lib/fetch-cache";

const urlBack = process.env.NEXT_PUBLIC_BACKEND_URL?.trim();

const getBackendUrl = () => {
  if (!urlBack) {
    throw new Error("Falta NEXT_PUBLIC_BACKEND_URL");
  }

  return urlBack.replace(/\/+$/, "");
};

const getToken = () => {
  if (typeof window === "undefined") return "";

  const cookieToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  return cookieToken || localStorage.getItem("token") || "";
};

const normalizePost = (post: Partial<IPost>): IPost => ({
  id: post.id ?? "",
  title: post.title ?? "",
  subtitle: post.subtitle ?? "",
  header: post.header ?? "",
  mainContent: post.mainContent ?? "",
  footer: post.footer ?? "",
  image: post.image ?? null,
  createdAt: post.createdAt ?? new Date().toISOString(),
  keywords: Array.isArray(post.keywords) ? post.keywords : [],
  extraImages: Array.isArray(post.extraImages) ? post.extraImages : [],
  size: typeof post.size === "number" ? post.size : 1,
});

const parseError = async (response: Response) => {
  try {
    const data = await response.json();
    if (typeof data?.message === "string") return data.message;
    if (Array.isArray(data?.message)) return data.message.join(", ");
  } catch {
    return `Error ${response.status}`;
  }

  return `Error ${response.status}`;
};

export const FfetchPosts = async (): Promise<IPost[]> => {
  let response: Response;

  try {
    const backendUrl = getBackendUrl();
    response = await fetch(`${backendUrl}/post`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      ...getPublicFetchOptions(["posts"]),
    });
  } catch (error) {
    console.error("No se pudieron obtener los posts publicos.", error);
    return [];
  }

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const data = await response.json();
  return Array.isArray(data) ? data.map(normalizePost) : [];
};

export const FfetchPostById = async (postId: string): Promise<IPost | null> => {
  let response: Response;

  try {
    const backendUrl = getBackendUrl();
    response = await fetch(`${backendUrl}/post/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      ...getPublicFetchOptions(["posts", `post-${postId}`]),
    });
  } catch (error) {
    console.error(`No se pudo obtener el post ${postId}.`, error);
    return null;
  }

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return normalizePost(data);
};

export const FcreatePost = async (
  payload: ICreatePostPayload,
): Promise<IPost> => {
  const token = getToken();
  const backendUrl = getBackendUrl();

  const response = await fetch(`${backendUrl}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const data = await response.json();
  return normalizePost(data);
};

export const FdeletePost = async (postId: string): Promise<void> => {
  const token = getToken();
  const backendUrl = getBackendUrl();

  const response = await fetch(`${backendUrl}/post/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }
};

export const FupdatePostSize = async (
  postId: string,
  size: number,
): Promise<void> => {
  const token = getToken();
  const backendUrl = getBackendUrl();

  const response = await fetch(`${backendUrl}/post/update-size/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ size }),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }
};

export const FupdatePost = async (
  postId: string,
  payload: IUpdatePostPayload,
): Promise<IPost> => {
  const token = getToken();
  const backendUrl = getBackendUrl();

  const response = await fetch(`${backendUrl}/post/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const data = await response.json();
  return normalizePost(data);
};

export const FuploadPostMainImage = async (
  postId: string,
  file: File,
): Promise<void> => {
  const token = getToken();
  const backendUrl = getBackendUrl();
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${backendUrl}/file-upload/uploadImage/${postId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }
};

export const FuploadPostExtraImages = async (
  postId: string,
  files: File[],
): Promise<void> => {
  if (!files.length) return;

  const token = getToken();
  const backendUrl = getBackendUrl();
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await fetch(
    `${backendUrl}/file-upload/uploadExtraImages/${postId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error(await parseError(response));
  }
};
