"use client";

import { useState } from "react";
import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import Image from "next/image";

type Parent = {
  id: number;
  name: string;
  email?: string;
  phone: string;
  students: string[] | string;
  address: string;
};

const ParentListPage = () => {
  const { user } = useAuth();
  const { data } = useData();
  const [searchTerm, setSearchTerm] = useState("");

  const userRole = user?.role ?? "student";
  const canEdit = userRole === "admin" || userRole === "teacher";

  const columns = [
    { header: "Info", accessor: "info" },
    { header: "Student Names", accessor: "students", className: "hidden md:table-cell" },
    { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
    { header: "Address", accessor: "address", className: "hidden xl:table-cell" },
    ...(canEdit ? [{ header: "Actions", accessor: "action" }] : []),
  ];

  const renderRow = (item: Parent) => {
    const studentsDisplay = Array.isArray(item.students) ? item.students.join(", ") : item.students;
    return (
      <tr key={item.id} className="border-b border-gray-200 dark:border-slate-800 even:bg-slate-50 dark:even:bg-slate-800/40 text-sm hover:bg-RishlightSky dark:hover:bg-slate-800 transition-colors text-gray-700 dark:text-slate-200">
        <td className="flex items-center gap-4 p-4">
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-800 dark:text-slate-100">{item.name}</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400">{item?.email}</p>
          </div>
        </td>
        <td className="hidden md:table-cell">{studentsDisplay}</td>
        <td className="hidden lg:table-cell">{item.phone}</td>
        <td className="hidden xl:table-cell">{item.address}</td>
        {canEdit && (
          <td>
            <div className="flex items-center gap-2">
              <FormModal table="parent" type="update" data={item} />
              <FormModal table="parent" type="delete" id={item.id} />
            </div>
          </td>
        )}
      </tr>
    );
  };

  const filteredData = (data.parent || []).filter((p: Parent) => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    const students = Array.isArray(p.students) ? p.students.join(" ").toLowerCase() : (p.students?.toLowerCase() || "");
    return (
      (p.name?.toLowerCase() || "").includes(q) ||
      (p.email?.toLowerCase() || "").includes(q) ||
      (p.phone?.toLowerCase() || "").includes(q) ||
      (p.address?.toLowerCase() || "").includes(q) ||
      students.includes(q)
    );
  });

  return (
    <div className="bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 p-4 rounded-md flex-1 m-4 mt-0 border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search parents..." />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Rishyellow dark:bg-yellow-900">
              <Image src="/filter.png" alt="filter" width={14} height={14} className="dark:invert" />
            </button>
            {canEdit && <FormModal table="parent" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={filteredData} />
      <Pagination />
    </div>
  );
};

export default ParentListPage;
