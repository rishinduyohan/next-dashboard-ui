import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { resultsData, role } from "@/lib/data";
import Image from "next/image";

type Result = { id: number; subject: string; class: string; teacher: string; student: string; date: string; type: string; score: number };

const columns = [
  { header: "Subject Name", accessor: "subject" },
  { header: "Student", accessor: "student", className: "hidden md:table-cell" },
  { header: "Score", accessor: "score", className: "hidden md:table-cell" },
  { header: "Teacher", accessor: "teacher", className: "hidden lg:table-cell" },
  { header: "Class", accessor: "class", className: "hidden lg:table-cell" },
  { header: "Date", accessor: "date", className: "hidden xl:table-cell" },
  { header: "Actions", accessor: "action" },
];

const renderRow = (item: Result) => (
  <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-RishlightSky transition-colors">
    <td className="flex items-center gap-4 p-4 font-semibold">{item.subject}</td>
    <td className="hidden md:table-cell">{item.student}</td>
    <td className="hidden md:table-cell">{item.score}</td>
    <td className="hidden lg:table-cell">{item.teacher}</td>
    <td className="hidden lg:table-cell">{item.class}</td>
    <td className="hidden xl:table-cell">{new Intl.DateTimeFormat("en-US").format(new Date(item.date))}</td>
    <td>
      <div className="flex items-center gap-2">
        {(role === "admin" || role === "teacher") && (
          <>
            <FormModal table="result" type="update" data={item} />
            <FormModal table="result" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const ResultListPage = () => (
  <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
    <div className="flex items-center justify-between flex-wrap gap-4">
      <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        <TableSearch />
        <div className="flex items-center gap-4 self-end">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Rishyellow">
            <Image src="/filter.png" alt="filter" width={14} height={14} />
          </button>
          {(role === "admin" || role === "teacher") && <FormModal table="result" type="create" />}
        </div>
      </div>
    </div>
    <Table columns={columns} renderRow={renderRow} data={resultsData} />
    <Pagination />
  </div>
);

export default ResultListPage;
