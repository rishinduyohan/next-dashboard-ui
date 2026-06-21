"use client";

import Image from "next/image";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const data = [
  { name: "Total", count: 1254, fill: "white" },
  { name: "Girls", count: 526, fill: "#FAE27C" },
  { name: "Boys", count: 728, fill: "#C3EBFA" },
];

const CountChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4 flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <Image src="/moreDark.png" alt="more" width={20} height={20} />
      </div>
      {/* CHART — explicit height prevents the width(-1)/height(-1) warning */}
      <div className="relative flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt="male female"
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="flex justify-center gap-16 mt-2">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-Rishsky rounded-full" />
          <h1 className="font-semibold">1,428</h1>
          <h2 className="text-xs text-gray-400">Boys (55%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-Rishyellow rounded-full" />
          <h1 className="font-semibold">1,234</h1>
          <h2 className="text-xs text-gray-400">Girls (45%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
