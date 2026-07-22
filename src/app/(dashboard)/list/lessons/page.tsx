"use client";

import { useState } from "react";
import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import Image from "next/image";

type Lesson = { id: number; subject: string; class: string; teacher: string };

const LessonListPage = () => {
  const { user } = useAuth();
  const { data } = useData();
  const [searchTerm, setSearchTerm] = useState("");

  const userRole = user?.role ?? "student";
  const canEdit = userRole === "admin" || userRole === "teacher";

  const columns = [
    { header: "Subject Name", accessor: "subject" },
    { header: "Class", accessor: "class" },
    { header: "Teacher", accessor: "teacher", className: "hidden md:table-cell" },
    ...(canEdit ? [{ header: "Actions", accessor: "action" }] : []),
  ];

  const renderRow = (item: Lesson) => (
    <tr key={item.id} className="border-b border-gray-200 dark:border-slate-800 even:bg-slate-50 dark:even:bg-slate-800/40 text-sm hover:bg-RishlightSky dark:hover:bg-slate-800 transition-colors text-gray-700 dark:text-slate-200">
      <td className="flex items-center gap-4 p-4 font-semibold text-gray-800 dark:text-slate-100">{item.subject}</td>
      <td>{item.class}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      {canEdit && (
        <td>
          <div className="flex items-center gap-2">
            <FormModal table="lesson" type="update" data={item} />
            <FormModal table="lesson" type="delete" id={item.id} />
          </div>
        </td>
      )}
    </tr>
  );

  const filteredData = (data.lesson || []).filter((l: Lesson) => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      (l.subject?.toLowerCase() || "").includes(q) ||
      (l.class?.toLowerCase() || "").includes(q) ||
      (l.teacher?.toLowerCase() || "").includes(q)
    );
  });

  return (
    <div className="bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 p-4 rounded-md flex-1 m-4 mt-0 border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search lessons..." />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Rishyellow dark:bg-yellow-900">
              <Image src="/filter.png" alt="filter" width={14} height={14} className="dark:invert" />
            </button>
            {canEdit && <FormModal table="lesson" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={filteredData} />
      <Pagination />
    </div>
  );
};

export default LessonListPage;
