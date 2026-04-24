import { IcreatePlan, Plan } from "@/app/dashboard/types/index.types";

interface IUsersForm {
  fullName: string;
  email: string;
  phone: string;
  age: number;
  plan: string;
  website?: string;
}
interface IUser {
  email: string;
  password: string;
  isAdmin: boolean;
  name: string;
}

interface ILoginUser {
  email: string;
  password: string;
}

interface IUserResponse {
  login: boolean;
  user: Partial<IUser> | null;
  token: string;
  logout: () => void;
}

interface ILoginResponse {
  message: string;
  token?: string;
}

interface IFormContactResponse {
  success: boolean;
  message?: string;
  data?: unknown;
}

interface IUserContextType {
  user: Partial<IUserResponse> | null,
  isLogin: boolean,
  signIn: (user: ILoginUser) => Promise<ILoginResponse | null>,
  signOut: () => Promise<void>,
  sendFormContact: (formData: IUsersForm) => Promise<IFormContactResponse | null>
}

interface PlansContextType  {
  plans: Plan[];
  setPlans: (plans: Plan[]) => void;
  createPlan: (plan: IcreatePlan) => Promise<void | null>;
  deletePlan: (plan: Plan) => Promise<void | null>;
  updatePlan: (plan: Plan) => Promise<void | null>;
}

interface IPost {
  id: string;
  title: string;
  subtitle: string;
  header: string;
  mainContent: string;
  footer: string;
  image: string | null;
  createdAt: string;
  keywords: string[];
  extraImages: string[];
  size: number;
}

interface ICreatePostPayload {
  title: string;
  subtitle: string;
  header: string;
  mainContent: string;
  footer: string;
  keywords: string[];
  size: number;
}

type IUpdatePostPayload = Partial<ICreatePostPayload> & {
  extraImages?: string[];
};

interface PostsContextType {
  posts: IPost[];
  isLoading: boolean;
  refreshPosts: () => Promise<IPost[]>;
  createPost: (
    payload: ICreatePostPayload,
    mainImage?: File | null,
    extraImages?: File[],
  ) => Promise<IPost | null>;
  deletePost: (postId: string) => Promise<void>;
  updatePostSize: (postId: string, size: number) => Promise<IPost | null>;
  updatePost: (
    postId: string,
    payload: IUpdatePostPayload,
    mainImage?: File | null,
    extraImages?: File[],
  ) => Promise<IPost | null>;
}


export type {
  IUser,
  ILoginUser,
  ILoginResponse,
  IFormContactResponse,
  IUserResponse,
  IUserContextType,
  IUsersForm,
  PlansContextType,
  IPost,
  ICreatePostPayload,
  IUpdatePostPayload,
  PostsContextType,
}
