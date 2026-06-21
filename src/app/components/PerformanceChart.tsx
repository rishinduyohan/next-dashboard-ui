"use client";

import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Total", count: 100, fill: "white" },
  { name: "Girls", count: 45, fill: "#FAE27C" },
  { name: "Boys", count: 55, fill: "#C3EBFA" },
];

const PerformanceChart = () => {
  return (
    <div className="bg-white rounded-xl p-4 h-80 flex flex-col gap-4 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Performance</h1>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
          <RadialBar background dataKey="count" />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <p className="text-xs text-gray-500">1st Sem — 2nd Sem</p>
      </div>
    </div>
  );
};

export default PerformanceChart;
