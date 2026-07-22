"use client";

import Announcements from "@/app/components/Announcements";
import BigCalendar from "@/app/components/BigCalendar";
import FormModal from "@/app/components/FormModal";
import PerformanceChart from "@/app/components/PerformanceChart";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";

const SingleTeacherPage = ({ params }: { params: { id: string } }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row text-gray-800 dark:text-slate-100">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-Rishsky dark:bg-sky-950 py-6 px-4 rounded-md flex-1 flex gap-4 border border-transparent dark:border-sky-800/40">
            <div className="w-1/3">
              <Image
                src="https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="teacher photo"
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover ring-2 ring-white dark:ring-slate-800"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">Cameron Moran</h1>
                {isAdmin && (
                  <FormModal
                    table="teacher"
                    type="update"
                    data={{
                      id: 1,
                      teacherId: "1234567890",
                      name: "Cameron Moran",
                      email: "user@gmail.com",
                      phone: "+1 234 567",
                      address: "123 Main St, Springfield",
                      subjects: ["Math", "Geometry"],
                      classes: ["4A", "4B"],
                    }}
                  />
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-sky-200">
                Teacher at SchoolDev.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/blood.png" alt="blood" width={14} height={14} className="dark:invert" />
                  <span>A+</span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/date.png" alt="date" width={14} height={14} className="dark:invert" />
                  <span>January 2025</span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/mail.png" alt="mail" width={14} height={14} className="dark:invert" />
                  <span>user@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/phone.png" alt="phone" width={14} height={14} className="dark:invert" />
                  <span>+1 234 567</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex-1 flex flex-wrap gap-4 justify-between">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] border border-gray-100 dark:border-slate-800 shadow-sm">
              <Image src="/singleAttendance.png" alt="attendance" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400 dark:text-slate-400">Attendance</span>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] border border-gray-100 dark:border-slate-800 shadow-sm">
              <Image src="/singleBranch.png" alt="branches" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold">2</h1>
                <span className="text-sm text-gray-400 dark:text-slate-400">Branches</span>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] border border-gray-100 dark:border-slate-800 shadow-sm">
              <Image src="/singleLesson.png" alt="lessons" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-400 dark:text-slate-400">Lessons</span>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] border border-gray-100 dark:border-slate-800 shadow-sm">
              <Image src="/singleClass.png" alt="classes" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-400 dark:text-slate-400">Classes</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM — SCHEDULE */}
        <div className="mt-4 bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-slate-800 shadow-sm">
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-md border border-gray-100 dark:border-slate-800 shadow-sm">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500 dark:text-slate-300">
            <Link className="p-3 rounded-md bg-RishlightSky dark:bg-sky-950 dark:text-sky-200" href={`/list/classes?supervisorId=${"teacher2"}`}>
              Teacher&apos;s Classes
            </Link>
            <Link className="p-3 rounded-md bg-RishpurpleLight dark:bg-purple-950 dark:text-purple-200" href={`/list/students?teacherId=${"teacher2"}`}>
              Teacher&apos;s Students
            </Link>
            <Link className="p-3 rounded-md bg-RishyellowLight dark:bg-yellow-950 dark:text-yellow-200" href={`/list/lessons?classId=${"class1"}`}>
              Teacher&apos;s Lessons
            </Link>
            <Link className="p-3 rounded-md bg-Rishsky dark:bg-sky-900 dark:text-sky-100" href={`/list/exams?teacherId=${"teacher2"}`}>
              Teacher&apos;s Exams
            </Link>
            <Link className="p-3 rounded-md bg-Rishpurple dark:bg-purple-900 dark:text-purple-100" href={`/list/assignments?teacherId=${"teacher2"}`}>
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
        <PerformanceChart />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
