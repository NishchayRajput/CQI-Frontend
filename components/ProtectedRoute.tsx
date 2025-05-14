"use client";
import { useAuth } from "../app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-black border-opacity-50"></div>
  </div>;
  if (!user) return null; // Or a spinner

  return <>{children}</>;
}