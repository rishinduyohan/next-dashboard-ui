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
  <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-RishlightSky transition-colors">
    <td className="flex items-center gap-4 p-4 font-semibold">{item.student}</td>
    <td className="hidden md:table-cell">{item.class}</td>
    <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(new Date(item.date))}</td>
    <td className="hidden lg:table-cell">{item.day}</td>
    <td className="hidden lg:table-cell">
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.present ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
        {item.present ? "Present" : "Absent"}
      </span>
    </td>
  </tr>
);

const AttendanceListPage = () => (
  <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
    <div className="flex items-center justify-between flex-wrap gap-4">
      <h1 className="hidden md:block text-lg font-semibold">Attendance</h1>
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        <TableSearch />
        <div className="flex items-center gap-4 self-end">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Rishyellow">
            <Image src="/filter.png" alt="filter" width={14} height={14} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Rishyellow">
            <Image src="/sort.png" alt="sort" width={14} height={14} />
          </button>
        </div>
      </div>
    </div>
    <Table columns={columns} renderRow={renderRow} data={attendanceData} />
    <Pagination />
  </div>
);

export default AttendanceListPage;
