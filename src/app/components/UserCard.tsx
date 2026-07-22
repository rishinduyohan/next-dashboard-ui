import React from "react";
import Image from "next/image";

const iconMap: Record<string, string> = {
  student: "/student.png",
  teacher: "/teacher.png",
  parent: "/parent.png",
  staff: "/finance.png",
};

const countMap: Record<string, string> = {
  student: "1,254",
  teacher: "124",
  parent: "1,020",
  staff: "56",
};

const bgMap: Record<string, string> = {
  student: "bg-Rishsky dark:bg-sky-950 dark:text-sky-100",
  teacher: "bg-Rishpurple dark:bg-purple-950 dark:text-purple-100",
  parent: "bg-Rishyellow dark:bg-yellow-950 dark:text-yellow-100",
  staff: "bg-Rishsky dark:bg-sky-950 dark:text-sky-100",
};

const UserCard = ({ type }: { type: string }) => {
  const label = type.charAt(0).toUpperCase() + type.slice(1) + "s";
  return (
    <div className={`rounded-2xl ${bgMap[type] ?? "bg-Rishsky dark:bg-sky-950"} p-4 flex-1 min-w-[130px] shadow-sm border border-transparent dark:border-slate-800 transition-colors`}>
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] bg-white dark:bg-slate-800 px-2 py-1 rounded-full text-green-600 dark:text-green-400 font-semibold shadow-sm">
          2024/25
        </span>
        <Image src="/more.png" alt="More" width={20} height={20} className="dark:invert" />
      </div>
      <h1 className="text-2xl font-semibold my-4">{countMap[type] ?? "—"}</h1>
      <h2 className="capitalize text-sm font-semibold text-gray-700 dark:text-slate-300">{label}</h2>
    </div>
  );
};

export default UserCard;