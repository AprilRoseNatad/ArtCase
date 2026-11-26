
import { createContext } from "react";
import type { User } from "firebase/auth";

export interface AppUser {
  id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  role: "PARTICIPANT" | "COORDINATOR" | "CURATOR" | "ADMIN";
}

interface AuthContextType {
  user: User | null;
  appUser: AppUser | null;
  loading: boolean;
  syncAccount: (username?: string) => Promise<AppUser>;
  logout: () => Promise<void>;
}

export const AuthContext =
  createContext<AuthContextType | undefined>(undefined);
