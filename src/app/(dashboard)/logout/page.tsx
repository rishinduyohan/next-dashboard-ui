"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function LogoutPage() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      logout();
      router.replace("/login");
    }, 1500);
    return () => clearTimeout(timer);
  }, [logout, router]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white rounded-2xl p-12 shadow-sm flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-[#EDF9FD] flex items-center justify-center">
          <Image src="/logout.png" alt="logout" width={32} height={32} />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Signing you out...</h2>
        <p className="text-sm text-gray-500">Please wait while we securely sign you out.</p>
        <div className="w-8 h-8 border-4 border-[#C3EBFA] border-t-blue-400 rounded-full animate-spin mt-2" />
      </div>
    </div>
  );
}
