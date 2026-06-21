"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const ROLE_COLORS: Record<string, string> = {
  admin: "bg-[#C3EBFA] text-blue-700",
  teacher: "bg-[#CFCEFF] text-purple-700",
  student: "bg-[#FAE27C] text-yellow-700",
  parent: "bg-green-100 text-green-700",
};

const ROLE_INFO: Record<string, { subjects?: string; grade?: string; classes?: string; department?: string }> = {
  admin: { department: "School Administration" },
  teacher: { subjects: "Math, Physics", classes: "4A, 4B, 5A" },
  student: { grade: "Grade 5", classes: "5A" },
  parent: { classes: "Child: John Doe (5A)" },
};

export default function ProfilePage() {
  const { user } = useAuth();
  if (!user) return null;

  const info = ROLE_INFO[user.role] ?? {};

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* HEADER CARD */}
      <div className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-6 shadow-sm">
        <div className="relative">
          <Image
            src={user.avatar ?? "/avatar.png"}
            alt="profile"
            width={96}
            height={96}
            className="rounded-full object-cover ring-4 ring-[#C3EBFA]"
          />
          <button className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center border border-gray-200">
            <Image src="/edit.png" alt="edit" width={12} height={12} />
          </button>
        </div>
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h1 className="text-2xl font-semibold text-gray-800">{user.name}</h1>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize w-fit mx-auto sm:mx-0 ${ROLE_COLORS[user.role]}`}>
            {user.role}
          </span>
          <p className="text-sm text-gray-500">{user.email}</p>
          {info.department && <p className="text-sm text-gray-500">{info.department}</p>}
          {info.grade && <p className="text-sm text-gray-500">{info.grade} • {info.classes}</p>}
          {info.subjects && <p className="text-sm text-gray-500">Subjects: {info.subjects}</p>}
          {info.classes && user.role === "parent" && <p className="text-sm text-gray-500">{info.classes}</p>}
        </div>
        <button className="sm:ml-auto flex items-center gap-2 px-4 py-2 bg-[#C3EBFA] rounded-xl text-sm font-semibold text-gray-700 hover:bg-blue-200 transition-colors">
          <Image src="/edit.png" alt="edit" width={14} height={14} />
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* PERSONAL INFORMATION */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Image src="/profile.png" alt="info" width={16} height={16} />
            Personal Information
          </h2>
          <div className="flex flex-col gap-4">
            {[
              { label: "Full Name", value: user.name },
              { label: "Email Address", value: user.email },
              { label: "Phone", value: "+1 (555) 123-4567" },
              { label: "Date of Birth", value: "January 15, 1990" },
              { label: "Address", value: "123 Main St, Springfield, USA" },
              { label: "Blood Type", value: "A+" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-xs text-gray-400 font-semibold">{label}</span>
                <span className="text-sm text-gray-700">{value}</span>
                <div className="h-px bg-gray-100 mt-2" />
              </div>
            ))}
          </div>
        </div>

        {/* CHANGE PASSWORD */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Image src="/setting.png" alt="security" width={16} height={16} />
            Security
          </h2>
          <form className="flex flex-col gap-4">
            {[
              { id: "current-pw", label: "Current Password" },
              { id: "new-pw", label: "New Password" },
              { id: "confirm-pw", label: "Confirm New Password" },
            ].map(({ id, label }) => (
              <div key={id} className="flex flex-col gap-1.5">
                <label htmlFor={id} className="text-xs font-semibold text-gray-500">{label}</label>
                <input
                  id={id}
                  type="password"
                  placeholder="••••••••"
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-gray-50"
                />
              </div>
            ))}
            <button
              type="button"
              className="w-full bg-[#C3EBFA] hover:bg-blue-200 text-gray-800 font-semibold py-2.5 rounded-xl text-sm transition-colors mt-2"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* ACTIVITY STATS */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Activity Overview</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Attendance", value: "94%", icon: "/attendance.png", bg: "bg-[#EDF9FD]" },
              { label: "Assignments", value: "28", icon: "/assignment.png", bg: "bg-[#F1F0FF]" },
              { label: "Exams Taken", value: "12", icon: "/exam.png", bg: "bg-[#FEFCE8]" },
              { label: "Avg Score", value: "86%", icon: "/result.png", bg: "bg-[#f0fdf4]" },
            ].map(({ label, value, icon, bg }) => (
              <div key={label} className={`${bg} rounded-xl p-4 flex flex-col gap-2`}>
                <Image src={icon} alt={label} width={20} height={20} />
                <h3 className="text-xl font-semibold text-gray-800">{value}</h3>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="flex flex-col gap-3">
            {[
              { action: "Logged in", time: "2 minutes ago", icon: "/home.png" },
              { action: "Viewed Math class schedule", time: "1 hour ago", icon: "/lesson.png" },
              { action: "Submitted assignment", time: "3 hours ago", icon: "/assignment.png" },
              { action: "Checked exam results", time: "Yesterday", icon: "/result.png" },
              { action: "Sent message to teacher", time: "2 days ago", icon: "/message.png" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <Image src={item.icon} alt="activity" width={14} height={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 truncate">{item.action}</p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
