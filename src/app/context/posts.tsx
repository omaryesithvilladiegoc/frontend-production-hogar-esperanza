"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  ICreatePostPayload,
  IPost,
  IUpdatePostPayload,
  PostsContextType,
} from "@/interfaces/interfaces";
import {
  FcreatePost,
  FdeletePost,
  FfetchPosts,
  FupdatePost,
  FupdatePostSize,
  FuploadPostExtraImages,
  FuploadPostMainImage,
} from "@/services/fetchPosts";

export const PostsContext = createContext<PostsContextType>({
  posts: [],
  isLoading: false,
  refreshPosts: async () => [],
  createPost: async () => null,
  deletePost: async () => undefined,
  updatePostSize: async () => null,
  updatePost: async () => null,
});

export const usePostsContext = () => useContext(PostsContext);

export const PostsProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshPosts = async () => {
    setIsLoading(true);

    try {
      const response = await FfetchPosts();
      setPosts(response);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const createPost = async (
    payload: ICreatePostPayload,
    mainImage?: File | null,
    extraImages: File[] = [],
  ) => {
    setIsLoading(true);

    try {
      const createdPost = await FcreatePost(payload);

      if (mainImage) {
        try {
          await FuploadPostMainImage(createdPost.id, mainImage);
        } catch {
          // El post ya fue creado; evitamos marcarlo como error total por una subida accesoria.
        }
      }

      if (extraImages.length) {
        try {
          await FuploadPostExtraImages(createdPost.id, extraImages);
        } catch {
          // El post ya fue creado; evitamos marcarlo como error total por una subida accesoria.
        }
      }

      const refreshedPosts = await FfetchPosts();
      setPosts(refreshedPosts);

      return (
        refreshedPosts.find((post) => post.id === createdPost.id) ?? createdPost
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = async (postId: string) => {
    await FdeletePost(postId);
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== postId),
    );
  };

  const updatePostSize = async (postId: string, size: number) => {
    await FupdatePostSize(postId, size);
    const refreshedPosts = await refreshPosts();
    return refreshedPosts.find((post) => post.id === postId) ?? null;
  };

  const updatePost = async (
    postId: string,
    payload: IUpdatePostPayload,
    mainImage?: File | null,
    extraImages: File[] = [],
  ) => {
    setIsLoading(true);

    try {
      await FupdatePost(postId, payload);

      if (mainImage) {
        try {
          await FuploadPostMainImage(postId, mainImage);
        } catch {
          // El post base ya fue actualizado.
        }
      }

      if (extraImages.length) {
        try {
          await FuploadPostExtraImages(postId, extraImages);
        } catch {
          // El post base ya fue actualizado.
        }
      }

      const refreshedPosts = await FfetchPosts();
      setPosts(refreshedPosts);

      return refreshedPosts.find((post) => post.id === postId) ?? null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void refreshPosts();
  }, []);

  return (
    <PostsContext.Provider
      value={{
        posts,
        isLoading,
        refreshPosts,
        createPost,
        deletePost,
        updatePostSize,
        updatePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
