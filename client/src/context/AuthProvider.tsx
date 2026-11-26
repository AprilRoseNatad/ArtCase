
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "../config/firebase";
import { AuthContext } from "./AuthContext";
import type { AppUser } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const syncRequestId = useRef(0);

  async function syncWithBackend(
    firebaseUser: User,
    username?: string
  ): Promise<AppUser> {
    const token = await firebaseUser.getIdToken();

    const response = await fetch(
      `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/auth/sync`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(username ? { username } : {}),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to synchronize ArtCase account.");
    }

    return (await response.json()) as AppUser;
  }

  async function syncAccount(username?: string): Promise<AppUser> {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("No authenticated Firebase user.");
    }

    const requestId = ++syncRequestId.current;
    setLoading(true);

    try {
      const data = await syncWithBackend(currentUser, username);

      if (
        requestId === syncRequestId.current &&
        auth.currentUser?.uid === currentUser.uid
      ) {
        setAppUser(data);
      }

      return data;
    } finally {
      if (requestId === syncRequestId.current) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    const requestIdRef = syncRequestId;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      const requestId = ++requestIdRef.current;

      console.log(
  "[Auth] Firebase session:",
  currentUser ? `SIGNED IN (${currentUser.email})` : "SIGNED OUT"
);

      setLoading(true);
      setUser(currentUser);
      setAppUser(null);

      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const data = await syncWithBackend(currentUser);

        if (
          requestId === requestIdRef.current &&
          auth.currentUser?.uid === currentUser.uid
        ) {
          setAppUser(data);
        }
      } catch (error) {
        if (requestId !== requestIdRef.current) return;

        console.error("Account synchronization failed:", error);

        try {
          await signOut(auth);
        } catch (signOutError) {
          console.error("Failed to sign out:", signOutError);
        }
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    });

    return () => {
      requestIdRef.current++;
      unsubscribe();
    };
  }, []);

  async function logout() {
    setAppUser(null);
    await signOut(auth);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        appUser,
        loading,
        syncAccount,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
