"use client";

import { useState } from "react";
import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { role } from "@/lib/data";
import { useData } from "@/context/DataContext";
import Image from "next/image";
import Link from "next/link";

type Teacher = {
  id: number;
  teacherId: string;
  name: string;
  email?: string;
  photo?: string;
  phone: string;
  subjects: string[] | string;
  classes: string[] | string;
  address: string;
};

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Teacher ID", accessor: "teacherId", className: "hidden md:table-cell" },
  { header: "Subjects", accessor: "subjects", className: "hidden md:table-cell" },
  { header: "Classes", accessor: "classes", className: "hidden lg:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Address", accessor: "address", className: "hidden xl:table-cell" },
  { header: "Actions", accessor: "action" },
];

const renderRow = (item: Teacher) => {
  const subjectsDisplay = Array.isArray(item.subjects) ? item.subjects.join(", ") : item.subjects;
  const classesDisplay = Array.isArray(item.classes) ? item.classes.join(", ") : item.classes;

  return (
    <tr
      key={item.id}
      className="border-b border-gray-200 dark:border-slate-800 even:bg-slate-50 dark:even:bg-slate-800/40 text-sm hover:bg-RishlightSky dark:hover:bg-slate-800 transition-colors text-gray-700 dark:text-slate-200"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.photo || "/avatar.png"}
          alt={item.name}
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-800 dark:text-slate-100">{item.name}</h3>
          <p className="text-xs text-gray-500 dark:text-slate-400">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.teacherId}</td>
      <td className="hidden md:table-cell">{subjectsDisplay}</td>
      <td className="hidden lg:table-cell">{classesDisplay}</td>
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden xl:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-Rishsky dark:bg-sky-900 text-gray-800 dark:text-sky-100">
              <Image src="/view.png" alt="view" width={16} height={16} className="dark:invert" />
            </button>
          </Link>
          {role === "admin" && (
            <>
              <FormModal table="teacher" type="update" data={item} />
              <FormModal table="teacher" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

const TeacherListPage = () => {
  const { data } = useData();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = (data.teacher || []).filter((t: Teacher) => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    const name = t.name?.toLowerCase() || "";
    const email = t.email?.toLowerCase() || "";
    const phone = t.phone?.toLowerCase() || "";
    const teacherId = t.teacherId?.toLowerCase() || "";
    const address = t.address?.toLowerCase() || "";
    const subjects = Array.isArray(t.subjects) ? t.subjects.join(" ").toLowerCase() : (t.subjects?.toLowerCase() || "");
    const classes = Array.isArray(t.classes) ? t.classes.join(" ").toLowerCase() : (t.classes?.toLowerCase() || "");
    return (
      name.includes(q) ||
      email.includes(q) ||
      phone.includes(q) ||
      teacherId.includes(q) ||
      address.includes(q) ||
      subjects.includes(q) ||
      classes.includes(q)
    );
  });

  return (
    <div className="bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 p-4 rounded-md flex-1 m-4 mt-0 border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search teachers..." />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Rishyellow dark:bg-yellow-900">
              <Image src="/filter.png" alt="filter" width={14} height={14} className="dark:invert" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Rishyellow dark:bg-yellow-900">
              <Image src="/sort.png" alt="sort" width={14} height={14} className="dark:invert" />
            </button>
            {role === "admin" && <FormModal table="teacher" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={filteredData} />
      <Pagination />
    </div>
  );
};

export default TeacherListPage;
