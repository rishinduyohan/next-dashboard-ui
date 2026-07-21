const Pagination = () => {
  return (
    <div className="p-4 flex items-center justify-between text-gray-500 dark:text-slate-400">
      <button
        disabled
        className="py-2 px-4 rounded-md bg-slate-200 dark:bg-slate-800 text-gray-700 dark:text-slate-300 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        <button className="px-2 rounded-sm bg-Rishsky dark:bg-sky-900 text-gray-800 dark:text-sky-100 font-semibold">1</button>
        <button className="px-2 rounded-sm hover:bg-gray-100 dark:hover:bg-slate-800">2</button>
        <button className="px-2 rounded-sm hover:bg-gray-100 dark:hover:bg-slate-800">3</button>
        ...
        <button className="px-2 rounded-sm hover:bg-gray-100 dark:hover:bg-slate-800">10</button>
      </div>
      <button className="py-2 px-4 rounded-md bg-slate-200 dark:bg-slate-800 text-gray-700 dark:text-slate-300 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
        Next
      </button>
    </div>
  );
};

export default Pagination;
