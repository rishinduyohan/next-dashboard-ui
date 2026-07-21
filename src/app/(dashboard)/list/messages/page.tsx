import TableSearch from "@/app/components/TableSearch";

const MessagesPage = () => {
  return (
    <div className="bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 p-4 rounded-md flex-1 m-4 mt-0 border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-lg font-semibold">Messages</h1>
        <TableSearch />
      </div>
      <div className="flex flex-col gap-4 mt-8">
        {[
          { sender: "John Doe", preview: "Hey, the Math test for class 4A has been rescheduled...", time: "2h ago", unread: true },
          { sender: "Anna Smith", preview: "Please confirm your attendance for the staff meeting.", time: "5h ago", unread: true },
          { sender: "Michael Chen", preview: "The assignment results for class 3B are ready.", time: "1d ago", unread: false },
          { sender: "Sarah Williams", preview: "Parent-teacher meeting scheduled for next Monday.", time: "2d ago", unread: false },
        ].map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-4 p-4 rounded-xl border border-gray-100 dark:border-slate-800 cursor-pointer hover:bg-RishlightSky dark:hover:bg-slate-800 transition-colors ${
              msg.unread ? "bg-RishlightSky dark:bg-sky-950/40" : "bg-white dark:bg-slate-900"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-Rishpurple dark:bg-purple-900 flex items-center justify-center text-gray-700 dark:text-purple-100 font-semibold text-sm shrink-0">
              {msg.sender[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className={`text-sm ${msg.unread ? "font-semibold text-gray-800 dark:text-slate-100" : "font-normal text-gray-600 dark:text-slate-300"} truncate`}>
                  {msg.sender}
                </h3>
                <span className="text-xs text-gray-400 dark:text-slate-400 shrink-0">{msg.time}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 truncate">{msg.preview}</p>
            </div>
            {msg.unread && <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-sky-400 mt-1 shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesPage;
