"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Menu from "@/app/components/Menu";
import Navbar from "@/app/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, []);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA] dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#C3EBFA] border-t-blue-400 rounded-full animate-spin" />
          <p className="text-sm text-gray-500 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-[#F7F8FA] dark:bg-slate-950 text-gray-800 dark:text-slate-100 transition-colors">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
          w-64 lg:w-[14%] xl:w-[14%] 2xl:w-[16%]
          bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800
          flex flex-col overflow-y-auto scrollbar-thin
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* LOGO */}
        <div className="p-4 pb-2">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setSidebarOpen(false)}
          >
            <Image src="/logo.png" alt="Logo" width={32} height={32} />
            <span className="font-semibold text-gray-800 dark:text-slate-100 text-lg">SchoolDev</span>
          </Link>
        </div>
        {/* MENU */}
        <Menu role={user.role} onLinkClick={() => setSidebarOpen(false)} />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 min-w-0 bg-[#F7F8FA] dark:bg-slate-950 overflow-y-auto flex flex-col transition-colors">
        <Navbar
          user={user}
          onMenuToggle={() => setSidebarOpen((v) => !v)}
        />
        <div className="flex-1 min-h-0">{children}</div>
      </div>
    </div>
  );
}
