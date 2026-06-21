"use client";

import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Total", count: 100, fill: "white" },
  { name: "Girls", count: 45, fill: "#FAE27C" },
  { name: "Boys", count: 55, fill: "#C3EBFA" },
];

const PerformanceChart = () => {
  return (
    <div className="bg-white rounded-xl p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-base font-semibold">Performance</h1>
      </div>
      {/* Give explicit height so ResponsiveContainer resolves correctly */}
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={28} data={data}>
            <RadialBar background dataKey="count" />
            <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-center text-xs text-gray-400">1st Semester — 2nd Semester</p>
    </div>
  );
};

export default PerformanceChart;
