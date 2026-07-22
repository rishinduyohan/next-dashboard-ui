"use client";

import { useState } from "react";
import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import Image from "next/image";

type Result = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  student: string;
  date: string;
  type: "exam" | "assignment";
  score: number;
};

const ResultListPage = () => {
  const { user } = useAuth();
  const { data } = useData();
  const [searchTerm, setSearchTerm] = useState("");

  const userRole = user?.role ?? "student";
  const canEdit = userRole === "admin" || userRole === "teacher";

  const columns = [
    { header: "Subject Name", accessor: "subject" },
    { header: "Student", accessor: "student" },
    { header: "Score", accessor: "score", className: "hidden md:table-cell" },
    { header: "Teacher", accessor: "teacher", className: "hidden md:table-cell" },
    { header: "Class", accessor: "class", className: "hidden lg:table-cell" },
    { header: "Date", accessor: "date", className: "hidden lg:table-cell" },
    ...(canEdit ? [{ header: "Actions", accessor: "action" }] : []),
  ];

  const renderRow = (item: Result) => (
    <tr key={item.id} className="border-b border-gray-200 dark:border-slate-800 even:bg-slate-50 dark:even:bg-slate-800/40 text-sm hover:bg-RishlightSky dark:hover:bg-slate-800 transition-colors text-gray-700 dark:text-slate-200">
      <td className="flex items-center gap-4 p-4 font-semibold text-gray-800 dark:text-slate-100">{item.subject}</td>
      <td>{item.student}</td>
      <td className="hidden md:table-cell font-bold text-blue-600 dark:text-sky-400">{item.score}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td className="hidden lg:table-cell">{item.class}</td>
      <td className="hidden lg:table-cell">{item.date}</td>
      {canEdit && (
        <td>
          <div className="flex items-center gap-2">
            <FormModal table="result" type="update" data={item} />
            <FormModal table="result" type="delete" id={item.id} />
          </div>
        </td>
      )}
    </tr>
  );

  const filteredData = (data.result || []).filter((r: Result) => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      (r.subject?.toLowerCase() || "").includes(q) ||
      (r.student?.toLowerCase() || "").includes(q) ||
      (r.teacher?.toLowerCase() || "").includes(q) ||
      (r.class?.toLowerCase() || "").includes(q) ||
      (r.date?.toLowerCase() || "").includes(q) ||
      r.score?.toString().includes(q)
    );
  });

  return (
    <div className="bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 p-4 rounded-md flex-1 m-4 mt-0 border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search results..." />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Rishyellow dark:bg-yellow-900">
              <Image src="/filter.png" alt="filter" width={14} height={14} className="dark:invert" />
            </button>
            {canEdit && <FormModal table="result" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={filteredData} />
      <Pagination />
    </div>
  );
};

export default ResultListPage;
