import TableSearch from "@/app/components/TableSearch";

const MessagesPage = () => {
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
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
          <div key={i} className={`flex items-start gap-4 p-4 rounded-xl border border-gray-100 cursor-pointer hover:bg-RishlightSky transition-colors ${msg.unread ? "bg-RishlightSky" : "bg-white"}`}>
            <div className="w-10 h-10 rounded-full bg-Rishpurple flex items-center justify-center text-gray-700 font-semibold text-sm shrink-0">
              {msg.sender[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className={`text-sm ${msg.unread ? "font-semibold" : "font-normal"} text-gray-800 truncate`}>{msg.sender}</h3>
                <span className="text-xs text-gray-400 shrink-0">{msg.time}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1 truncate">{msg.preview}</p>
            </div>
            {msg.unread && <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesPage;
