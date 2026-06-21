export interface Product {
  title: string;
  description: string;
  category: string;
}

export type IndustryCategory = 'tech' | 'machinery';

export interface Member {
  id: string;
  fullName: string;
  jobTitle: string;
  companyName: string;
  email: string;
  linkedInUrl: string;
  location: string;
  industry: IndustryCategory;
  products: Product[];
  avatar: string;
  bio: string;
  isOnline: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: number;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  messages: Message[];
  lastMessageAt: number;
  unreadCount: number;
}

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  companyName: string;
  jobTitle: string;
  industry: IndustryCategory;
  avatar: string;
}

export interface RegisterFormData {
  fullName: string;
  jobTitle: string;
  companyName: string;
  email: string;
  password: string;
  linkedInUrl: string;
  location: string;
  industry: IndustryCategory;
  products: Product[];
}
