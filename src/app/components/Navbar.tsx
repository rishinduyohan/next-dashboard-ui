"use client";

import Image from "next/image";
import Link from "next/link";
import { AuthUser } from "@/context/AuthContext";

const ROLE_COLORS: Record<string, string> = {
  admin: "bg-[#C3EBFA] text-blue-700",
  teacher: "bg-[#CFCEFF] text-purple-700",
  student: "bg-[#FAE27C] text-yellow-700",
  parent: "bg-green-100 text-green-700",
};

interface NavbarProps {
  user: AuthUser;
  onMenuToggle: () => void;
}

const Navbar = ({ user, onMenuToggle }: NavbarProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-30">
      {/* LEFT — hamburger + search */}
      <div className="flex items-center gap-3">
        {/* Hamburger (mobile only) */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden flex flex-col gap-1.5 p-1 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <span className="w-5 h-0.5 bg-gray-600 rounded-full" />
          <span className="w-5 h-0.5 bg-gray-600 rounded-full" />
          <span className="w-5 h-0.5 bg-gray-600 rounded-full" />
        </button>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-200 px-3 py-1.5 bg-gray-50 hover:ring-gray-300 transition-all">
          <Image src="/search.png" alt="search" width={14} height={14} className="opacity-50" />
          <input
            type="text"
            placeholder="Search..."
            className="w-[180px] bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
          />
        </div>
      </div>

      {/* RIGHT — icons + user */}
      <div className="flex items-center gap-3">
        {/* Message icon */}
        <Link href="/list/messages">
          <div className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#EDF9FD] flex items-center justify-center cursor-pointer transition-colors">
            <Image src="/message.png" alt="messages" width={16} height={16} className="opacity-60" />
          </div>
        </Link>

        {/* Announcement icon with badge */}
        <Link href="/list/announcements">
          <div className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#F1F0FF] flex items-center justify-center cursor-pointer relative transition-colors">
            <Image src="/announcement.png" alt="announcements" width={16} height={16} className="opacity-60" />
            <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-purple-500 text-white rounded-full text-[10px] font-semibold">
              3
            </span>
          </div>
        </Link>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 hidden sm:block" />

        {/* User info */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-semibold text-gray-800 leading-tight">{user.name}</span>
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full capitalize ${ROLE_COLORS[user.role] ?? "bg-gray-100 text-gray-600"}`}>
              {user.role}
            </span>
          </div>
          <Link href="/profile">
            <Image
              src={user.avatar ?? "/avatar.png"}
              alt="avatar"
              width={36}
              height={36}
              unoptimized={user.avatar?.startsWith("data:")}
              className="rounded-full ring-2 ring-gray-200 hover:ring-[#C3EBFA] transition-all cursor-pointer object-cover w-9 h-9"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;