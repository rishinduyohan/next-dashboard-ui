"use client";

import Image from "next/image";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", income: 4000, expense: 2400 },
  { name: "Feb", income: 3000, expense: 1398 },
  { name: "Mar", income: 2000, expense: 4800 },
  { name: "Apr", income: 2780, expense: 3908 },
  { name: "May", income: 1890, expense: 4800 },
  { name: "Jun", income: 2390, expense: 3800 },
  { name: "Jul", income: 3490, expense: 4300 },
  { name: "Aug", income: 3800, expense: 4100 },
  { name: "Sep", income: 4200, expense: 3600 },
  { name: "Oct", income: 4500, expense: 3900 },
  { name: "Nov", income: 5000, expense: 4100 },
  { name: "Dec", income: 5500, expense: 4300 },
];

const FinanceChart = () => {
  return (
    <div className="bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 rounded-xl w-full h-full p-4 flex flex-col shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
      <div className="flex justify-between items-center shrink-0">
        <h1 className="text-lg font-semibold">Finance Overview</h1>
        <Image src="/moreDark.png" alt="more" width={20} height={20} className="dark:invert" />
      </div>
      <div className="flex-1 min-h-[200px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} tickLine={false} tickMargin={8} />
            <YAxis axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} tickLine={false} tickMargin={10} />
            <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "#334155", backgroundColor: "#0f172a", color: "#f8fafc", fontSize: "12px" }} />
            <Legend align="center" verticalAlign="top" wrapperStyle={{ paddingBottom: "20px" }} />
            <Line type="monotone" dataKey="income" stroke="#C3EBFA" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="expense" stroke="#CFCEFF" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinanceChart;
