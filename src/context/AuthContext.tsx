"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "admin" | "teacher" | "student" | "parent";

export interface AuthUser {
  role: UserRole;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  bloodType?: string;
  department?: string;
  bio?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  updateUser: (updatedFields: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage
    try {
      const stored = localStorage.getItem("schooldev_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {}
    setIsLoading(false);
  }, []);

  const login = (userData: AuthUser) => {
    setUser(userData);
    localStorage.setItem("schooldev_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("schooldev_user");
  };

  const updateUser = (updatedFields: Partial<AuthUser>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem("schooldev_user", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
