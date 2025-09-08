"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { apiService } from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  emailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const userData = await apiService.getCurrentUser();
      setUser(userData);
    } catch (err: unknown) {
      // Only clear tokens if it's a 401 Unauthorized error or token expiration
      // and we couldn't refresh the token
      // Don't log out on network errors or other temporary issues
      console.error("Auth check failed:", err);
      if (
        err instanceof Error &&
        (err.message?.includes("401") ||
          err.message?.includes("Unauthorized") ||
          err.message?.includes("Token has expired") ||
          err.message?.includes("token") ||
          err.message?.includes("expired") ||
          err.message?.includes("No refresh token"))
      ) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);

        // Clear cookies as well
        document.cookie =
          "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie =
          "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      // For other errors (network, server errors), don't change user state
      // Keep the existing user data to avoid unnecessary logouts
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const data = await apiService.login({ email, password });
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    // Also set cookies for middleware
    document.cookie = `accessToken=${data.accessToken}; path=/; max-age=86400; samesite=strict`;
    document.cookie = `refreshToken=${data.refreshToken}; path=/; max-age=604800; samesite=strict`;

    await checkAuth(); // Refresh user data
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);

    // Clear cookies
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie =
      "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    router.push("/auth/login");
  };

  const initializeCookies = () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken) {
      document.cookie = `accessToken=${accessToken}; path=/; max-age=86400; samesite=strict`;
    }
    if (refreshToken) {
      document.cookie = `refreshToken=${refreshToken}; path=/; max-age=604800; samesite=strict`;
    }
  };

  useEffect(() => {
    initializeCookies();
    checkAuth();
  }, []);

  const value = {
    user,
    loading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
