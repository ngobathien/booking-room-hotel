import type { User } from "./user.types";

export interface RegisterData {
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface VerifyOtp {
  email: string;
  otp: string;
}

export type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  isAdmin: boolean;
  isUser: boolean;
  login: (token: string) => void;
  logout: () => void;
};
