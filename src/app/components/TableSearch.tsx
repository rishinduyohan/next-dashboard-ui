import Image from "next/image";
import { ChangeEvent } from "react";

interface TableSearchProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const TableSearch = ({ value = "", onChange, placeholder = "Search..." }: TableSearchProps) => {
  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 dark:ring-slate-700 px-3 py-1 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-200 focus-within:ring-2 focus-within:ring-blue-400 dark:focus-within:ring-sky-500 transition-all">
      <Image src="/search.png" alt="Search" width={14} height={14} className="opacity-50 dark:invert shrink-0" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full md:w-[200px] py-1 bg-transparent outline-none placeholder-gray-400 dark:placeholder-slate-500 text-sm"
      />
      {value && onChange && (
        <button
          onClick={() => onChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 text-xs font-bold px-1"
          title="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default TableSearch;
