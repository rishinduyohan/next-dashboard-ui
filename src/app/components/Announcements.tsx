import { announcementsData } from "@/lib/data";

const Announcements = () => {
  return (
    <div className="bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 p-4 rounded-md shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400 dark:text-slate-400 hover:underline cursor-pointer">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {announcementsData.slice(0, 3).map((announcement) => (
          <div key={announcement.id} className="bg-RishlightSky dark:bg-sky-950/40 rounded-md p-4 border border-transparent dark:border-sky-900/40">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-600 dark:text-slate-200 text-sm">
                {announcement.title}
              </h2>
              <span className="text-xs text-gray-400 dark:text-slate-400 bg-white dark:bg-slate-800 rounded-md px-1.5 py-0.5 shadow-sm">
                {announcement.date}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
              Class: {announcement.class} — Click to view full details of this announcement.
            </p>
          </div>
        ))}
        {announcementsData.slice(3, 5).map((announcement) => (
          <div key={announcement.id} className="bg-RishpurpleLight dark:bg-purple-950/40 rounded-md p-4 border border-transparent dark:border-purple-900/40">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-600 dark:text-slate-200 text-sm">
                {announcement.title}
              </h2>
              <span className="text-xs text-gray-400 dark:text-slate-400 bg-white dark:bg-slate-800 rounded-md px-1.5 py-0.5 shadow-sm">
                {announcement.date}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
              Class: {announcement.class} — Click to view full details of this announcement.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
