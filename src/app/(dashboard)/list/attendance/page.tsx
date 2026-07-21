import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import Image from "next/image";

const attendanceData = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  student: `Student ${i + 1}`,
  class: `${Math.ceil(Math.random() * 5)}A`,
  date: "2025-01-01",
  day: ["Mon", "Tue", "Wed", "Thu", "Fri"][i % 5],
  present: i % 3 !== 0,
}));

const columns = [
  { header: "Student Name", accessor: "student" },
  { header: "Class", accessor: "class", className: "hidden md:table-cell" },
  { header: "Date", accessor: "date", className: "hidden md:table-cell" },
  { header: "Day", accessor: "day", className: "hidden lg:table-cell" },
  { header: "Present", accessor: "present", className: "hidden lg:table-cell" },
];

const renderRow = (item: any) => (
  <tr key={item.id} className="border-b border-gray-200 dark:border-slate-800 even:bg-slate-50 dark:even:bg-slate-800/40 text-sm hover:bg-RishlightSky dark:hover:bg-slate-800 transition-colors text-gray-700 dark:text-slate-200">
    <td className="flex items-center gap-4 p-4 font-semibold text-gray-800 dark:text-slate-100">{item.student}</td>
    <td className="hidden md:table-cell">{item.class}</td>
    <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(new Date(item.date))}</td>
    <td className="hidden lg:table-cell">{item.day}</td>
    <td className="hidden lg:table-cell">
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${item.present ? "bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-300" : "bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-300"}`}>
        {item.present ? "Present" : "Absent"}
      </span>
    </td>
  </tr>
);

const AttendanceListPage = () => (
  <div className="bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 p-4 rounded-md flex-1 m-4 mt-0 border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
    <div className="flex items-center justify-between flex-wrap gap-4">
      <h1 className="hidden md:block text-lg font-semibold">Attendance</h1>
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        <TableSearch />
        <div className="flex items-center gap-4 self-end">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Rishyellow dark:bg-yellow-900">
            <Image src="/filter.png" alt="filter" width={14} height={14} className="dark:invert" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Rishyellow dark:bg-yellow-900">
            <Image src="/sort.png" alt="sort" width={14} height={14} className="dark:invert" />
          </button>
        </div>
      </div>
    </div>
    <Table columns={columns} renderRow={renderRow} data={attendanceData} />
    <Pagination />
  </div>
);

export default AttendanceListPage;
