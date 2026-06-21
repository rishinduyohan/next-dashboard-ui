import { announcementsData } from "@/lib/data";

const Announcements = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {announcementsData.slice(0, 3).map((announcement) => (
          <div key={announcement.id} className="bg-RishlightSky rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-600 text-sm">
                {announcement.title}
              </h2>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                {announcement.date}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Class: {announcement.class} — Click to view full details of this announcement.
            </p>
          </div>
        ))}
        {announcementsData.slice(3, 5).map((announcement) => (
          <div key={announcement.id} className="bg-RishpurpleLight rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-600 text-sm">
                {announcement.title}
              </h2>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                {announcement.date}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Class: {announcement.class} — Click to view full details of this announcement.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
