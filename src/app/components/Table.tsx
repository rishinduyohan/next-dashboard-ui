type Column = {
  header: string;
  accessor: string;
  className?: string;
};

type TableProps = {
  columns: Column[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
};

const Table = ({ columns, renderRow, data }: TableProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full mt-4 min-w-[640px]">
        <thead>
          <tr className="text-left text-gray-400 dark:text-slate-400 text-xs font-semibold border-b border-gray-100 dark:border-slate-800">
            {columns.map((col) => (
              <th key={col.accessor} className={`pb-3 ${col.className ?? ""}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{data.map((item) => renderRow(item))}</tbody>
      </table>
    </div>
  );
};

export default Table;
