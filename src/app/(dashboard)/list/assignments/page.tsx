"use client";

import { useState } from "react";
import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { role } from "@/lib/data";
import { useData } from "@/context/DataContext";
import Image from "next/image";

type Assignment = { id: number; subject: string; class: string; teacher: string; dueDate: string };

const columns = [
  { header: "Subject Name", accessor: "subject" },
  { header: "Class", accessor: "class" },
  { header: "Teacher", accessor: "teacher", className: "hidden md:table-cell" },
  { header: "Due Date", accessor: "dueDate", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "action" },
];

const renderRow = (item: Assignment) => (
  <tr key={item.id} className="border-b border-gray-200 dark:border-slate-800 even:bg-slate-50 dark:even:bg-slate-800/40 text-sm hover:bg-RishlightSky dark:hover:bg-slate-800 transition-colors text-gray-700 dark:text-slate-200">
    <td className="flex items-center gap-4 p-4 font-semibold text-gray-800 dark:text-slate-100">{item.subject}</td>
    <td>{item.class}</td>
    <td className="hidden md:table-cell">{item.teacher}</td>
    <td className="hidden md:table-cell">{item.dueDate}</td>
    <td>
      <div className="flex items-center gap-2">
        {(role === "admin" || role === "teacher") && (
          <>
            <FormModal table="assignment" type="update" data={item} />
            <FormModal table="assignment" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const AssignmentListPage = () => {
  const { data } = useData();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = (data.assignment || []).filter((a: Assignment) => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      (a.subject?.toLowerCase() || "").includes(q) ||
      (a.class?.toLowerCase() || "").includes(q) ||
      (a.teacher?.toLowerCase() || "").includes(q) ||
      (a.dueDate?.toLowerCase() || "").includes(q)
    );
  });

  return (
    <div className="bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 p-4 rounded-md flex-1 m-4 mt-0 border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="hidden md:block text-lg font-semibold">All Assignments</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search assignments..." />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Rishyellow dark:bg-yellow-900">
              <Image src="/filter.png" alt="filter" width={14} height={14} className="dark:invert" />
            </button>
            {(role === "admin" || role === "teacher") && <FormModal table="assignment" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={filteredData} />
      <Pagination />
    </div>
  );
};

export default AssignmentListPage;
