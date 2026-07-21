"use client";

import Image from "next/image";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", present: 60, absent: 40 },
  { name: "Tue", present: 70, absent: 60 },
  { name: "Wed", present: 90, absent: 75 },
  { name: "Thu", present: 90, absent: 75 },
  { name: "Fri", present: 65, absent: 55 },
];

const AttendanceChart = () => {
  return (
    <div className="bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 rounded-xl w-full h-full p-4 flex flex-col shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
      <div className="flex justify-between items-center shrink-0">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" alt="more" width={20} height={20} className="dark:invert" />
      </div>
      <div className="flex-1 min-h-[200px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={20}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
            <XAxis dataKey="name" axisLine={false} tick={{ fill: "#94a3b8" }} tickLine={false} />
            <YAxis axisLine={false} tick={{ fill: "#94a3b8" }} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "#334155", backgroundColor: "#0f172a", color: "#f8fafc" }} />
            <Legend align="left" verticalAlign="top" wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }} />
            <Bar dataKey="present" fill="#C3EBFA" legendType="circle" radius={[10, 10, 0, 0]} />
            <Bar dataKey="absent" fill="#FAE27C" legendType="circle" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceChart;
