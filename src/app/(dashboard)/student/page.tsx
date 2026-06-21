import Announcements from "@/app/components/Announcements";
import BigCalendar from "@/app/components/BigCalendar";
import EventCalendar from "@/app/components/EventCalendar";

const StudentPage = () => {
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white rounded-xl p-4">
          <h1 className="text-xl font-semibold mb-4">Schedule (4B)</h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;