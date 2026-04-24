// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'editor' | 'user';
  status: 'active' | 'suspended' | 'inactive';
  joinedAt: string;
}

export interface Post {
  id: string;

  title: string;
  subtitle: string;

  header: string;
  footer: string;

  mainContent: string;

  image?: string;

  createdAt: Date;

  keywords?: string[];

  extraImages?: string[];

  size: number;

  author?: string;

  commentsCount?: number;

  likesCount?: number;
}

// Plan types
export interface ProgramFeatureItem {
  description: string;
}

export interface IcreatePlan {
  title:string,
  image:string,
  features:ProgramFeatureItem[]
}

export interface createPlan {
  title: string;
  image: string;
  features: ProgramFeatureItem[];
}

export interface Plan {
  id:string;
  title: string;
  image: string;
  features: ProgramFeatureItem[];
}



// Stats types
export interface DashboardStats {
  totalUsers: number;
  totalPosts: number;
  activePlans: number;
  monthlyRevenue: number;
}

// Activity types
export interface Activity {
  id: string;
  type: 'post' | 'user' | 'plan';
  description: string;
  timestamp: string;
}

// Chart data types
export interface ChartData {
  name: string;
  value?: number;
  posts?: number;
  users?: number;
}

// Sidebar item type
export interface SidebarItem {
  label: string;
  icon: string;
  href: string;
}

