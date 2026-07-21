"use client";

import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { role } from "@/lib/data";
import { useData } from "@/context/DataContext";
import Image from "next/image";
import Link from "next/link";

type Student = {
  id: number;
  studentId: string;
  name: string;
  email?: string;
  photo?: string;
  phone: string;
  grade: number;
  class: string;
  address: string;
};

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Student ID", accessor: "studentId", className: "hidden md:table-cell" },
  { header: "Grade", accessor: "grade", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Address", accessor: "address", className: "hidden xl:table-cell" },
  { header: "Actions", accessor: "action" },
];

const renderRow = (item: Student) => (
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
        <p className="text-xs text-gray-500 dark:text-slate-400">{item.class}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.studentId}</td>
    <td className="hidden md:table-cell">{item.grade}</td>
    <td className="hidden lg:table-cell">{item.phone}</td>
    <td className="hidden xl:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/students/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-Rishsky dark:bg-sky-900 text-gray-800 dark:text-sky-100">
            <Image src="/view.png" alt="view" width={16} height={16} className="dark:invert" />
          </button>
        </Link>
        {role === "admin" && (
          <>
            <FormModal table="student" type="update" data={item} />
            <FormModal table="student" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const StudentListPage = () => {
  const { data } = useData();

  return (
    <div className="bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 p-4 rounded-md flex-1 m-4 mt-0 border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Rishyellow dark:bg-yellow-900">
              <Image src="/filter.png" alt="filter" width={14} height={14} className="dark:invert" />
            </button>
            {role === "admin" && <FormModal table="student" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={data.student} />
      <Pagination />
    </div>
  );
};

export default StudentListPage;
