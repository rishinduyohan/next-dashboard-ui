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
  student: "bg-Rishsky",
  teacher: "bg-Rishpurple",
  parent: "bg-Rishyellow",
  staff: "bg-Rishsky",
};

const UserCard = ({ type }: { type: string }) => {
  const label = type.charAt(0).toUpperCase() + type.slice(1) + "s";
  return (
    <div className={`rounded-2xl ${bgMap[type] ?? "bg-Rishsky"} p-4 flex-1 min-w-[130px]`}>
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600 font-semibold">
          2024/25
        </span>
        <Image src="/more.png" alt="More" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{countMap[type] ?? "—"}</h1>
      <h2 className="capitalize text-sm font-semibold text-gray-700">{label}</h2>
    </div>
  );
};

export default UserCard;