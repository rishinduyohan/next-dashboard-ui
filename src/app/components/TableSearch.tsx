import Image from "next/image";

const TableSearch = () => {
  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 dark:ring-slate-700 px-2 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-200">
      <Image src="/search.png" alt="Search" width={14} height={14} className="opacity-50 dark:invert" />
      <input
        type="text"
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none placeholder-gray-400 dark:placeholder-slate-500"
      />
    </div>
  );
};

export default TableSearch;
