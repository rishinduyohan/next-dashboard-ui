"use client";

import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { useAuth, AuthUser } from "@/context/AuthContext";
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

const PRESET_AVATARS = [
  "/avatar.png",
  "/teacher.png",
  "/student.png",
  "/parent.png",
  "/profile.png",
];

export default function ProfilePage() {
  const { user, updateUser } = useAuth();

  // Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Profile Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    bloodType: "",
    department: "",
    bio: "",
    avatar: "",
  });

  // Security Form State
  const [pwForm, setPwForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [pwStatus, setPwStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const info = ROLE_INFO[user.role] ?? {};

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleOpenModal = () => {
    setFormData({
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "+1 (555) 123-4567",
      address: user.address ?? "123 Main St, Springfield, USA",
      dateOfBirth: user.dateOfBirth ?? "1990-01-15",
      bloodType: user.bloodType ?? "A+",
      department: user.department ?? info.department ?? "",
      bio: user.bio ?? "",
      avatar: user.avatar ?? "/avatar.png",
    });
    setIsEditModalOpen(true);
  };

  const handleAvatarFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast("Error: Image size should be under 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        updateUser({ avatar: result });
        showToast("Profile image updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModalAvatarFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast("Error: Image size should be under 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: FormEvent) => {
    e.preventDefault();
    updateUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      dateOfBirth: formData.dateOfBirth,
      bloodType: formData.bloodType,
      department: formData.department,
      bio: formData.bio,
      avatar: formData.avatar,
    });
    setIsEditModalOpen(false);
    showToast("Profile updated successfully!");
  };

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!pwForm.currentPassword) {
      setPwStatus({ type: "error", msg: "Please enter your current password." });
      return;
    }
    if (pwForm.newPassword.length < 6) {
      setPwStatus({ type: "error", msg: "New password must be at least 6 characters." });
      return;
    }
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwStatus({ type: "error", msg: "New passwords do not match." });
      return;
    }

    setPwStatus({ type: "success", msg: "Password changed successfully!" });
    setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setPwStatus(null), 4000);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto relative">
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* HIDDEN FILE INPUT FOR DIRECT AVATAR UPLOAD */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAvatarFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* HEADER CARD */}
      <div className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-6 shadow-sm border border-gray-100">
        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <Image
            src={user.avatar ?? "/avatar.png"}
            alt="profile"
            width={96}
            height={96}
            unoptimized={user.avatar?.startsWith("data:")}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-[#C3EBFA] transition-transform group-hover:scale-105"
          />
          <button
            type="button"
            className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-200 group-hover:bg-[#C3EBFA] transition-colors"
            title="Upload profile picture"
          >
            <Image src="/edit.png" alt="edit photo" width={14} height={14} />
          </button>
        </div>

        <div className="flex flex-col gap-2 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <h1 className="text-2xl font-semibold text-gray-800">{user.name}</h1>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${ROLE_COLORS[user.role]}`}>
              {user.role}
            </span>
          </div>
          <p className="text-sm text-gray-500">{user.email}</p>
          {(user.department || info.department) && (
            <p className="text-sm text-gray-500 font-medium">{user.department ?? info.department}</p>
          )}
          {info.grade && <p className="text-sm text-gray-500">{info.grade} • {info.classes}</p>}
          {info.subjects && <p className="text-sm text-gray-500">Subjects: {info.subjects}</p>}
          {info.classes && user.role === "parent" && <p className="text-sm text-gray-500">{info.classes}</p>}
          {user.bio && <p className="text-xs text-gray-600 italic mt-1 bg-gray-50 p-2 rounded-lg">{user.bio}</p>}
        </div>

        <button
          onClick={handleOpenModal}
          className="sm:ml-auto flex items-center gap-2 px-4 py-2 bg-[#C3EBFA] rounded-xl text-sm font-semibold text-gray-700 hover:bg-blue-200 transition-colors shadow-sm active:scale-95"
        >
          <Image src="/edit.png" alt="edit" width={14} height={14} />
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* PERSONAL INFORMATION */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <Image src="/profile.png" alt="info" width={16} height={16} />
                Personal Information
              </h2>
              <button
                onClick={handleOpenModal}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Edit
              </button>
            </div>
            <div className="flex flex-col gap-3.5">
              {[
                { label: "Full Name", value: user.name },
                { label: "Email Address", value: user.email },
                { label: "Phone", value: user.phone ?? "+1 (555) 123-4567" },
                { label: "Date of Birth", value: user.dateOfBirth ?? "January 15, 1990" },
                { label: "Address", value: user.address ?? "123 Main St, Springfield, USA" },
                { label: "Blood Type", value: user.bloodType ?? "A+" },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-xs text-gray-400 font-semibold">{label}</span>
                  <span className="text-sm font-medium text-gray-700">{value}</span>
                  <div className="h-px bg-gray-100 mt-2" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CHANGE PASSWORD */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Image src="/setting.png" alt="security" width={16} height={16} />
            Security & Password
          </h2>

          {pwStatus && (
            <div
              className={`p-3 mb-4 rounded-xl text-xs font-semibold ${
                pwStatus.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {pwStatus.msg}
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="current-pw" className="text-xs font-semibold text-gray-500">Current Password</label>
              <input
                id="current-pw"
                type="password"
                value={pwForm.currentPassword}
                onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })}
                placeholder="••••••••"
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="new-pw" className="text-xs font-semibold text-gray-500">New Password</label>
              <input
                id="new-pw"
                type="password"
                value={pwForm.newPassword}
                onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
                placeholder="••••••••"
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirm-pw" className="text-xs font-semibold text-gray-500">Confirm New Password</label>
              <input
                id="confirm-pw"
                type="password"
                value={pwForm.confirmPassword}
                onChange={(e) => setPwForm({ ...pwForm, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#C3EBFA] hover:bg-blue-200 text-gray-800 font-semibold py-2.5 rounded-xl text-sm transition-colors mt-2"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* ACTIVITY STATS */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
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
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="flex flex-col gap-3">
            {[
              { action: "Updated profile details", time: "Just now", icon: "/edit.png" },
              { action: "Logged in", time: "2 minutes ago", icon: "/home.png" },
              { action: "Viewed Math class schedule", time: "1 hour ago", icon: "/lesson.png" },
              { action: "Submitted assignment", time: "3 hours ago", icon: "/assignment.png" },
              { action: "Checked exam results", time: "Yesterday", icon: "/result.png" },
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

      {/* EDIT PROFILE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-200 my-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Image src="/edit.png" alt="edit" width={18} height={18} />
                Edit Profile Information
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
              {/* AVATAR SELECTION & UPLOAD */}
              <div className="flex flex-col items-center gap-3 py-2 bg-gray-50 rounded-2xl p-4 border border-dashed border-gray-200">
                <div className="relative group">
                  <Image
                    src={formData.avatar || "/avatar.png"}
                    alt="preview"
                    width={80}
                    height={80}
                    unoptimized={formData.avatar?.startsWith("data:")}
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-[#C3EBFA]"
                  />
                </div>

                <input
                  type="file"
                  ref={modalFileInputRef}
                  onChange={handleModalAvatarFileChange}
                  accept="image/*"
                  className="hidden"
                />

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => modalFileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 flex items-center gap-1.5"
                  >
                    <Image src="/upload.png" alt="upload" width={14} height={14} />
                    Upload Custom Photo
                  </button>
                  {formData.avatar !== "/avatar.png" && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, avatar: "/avatar.png" })}
                      className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>

                {/* PRESET AVATARS */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-gray-400 font-semibold uppercase">Or choose preset:</span>
                  <div className="flex gap-2">
                    {PRESET_AVATARS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, avatar: preset })}
                        className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${
                          formData.avatar === preset ? "border-blue-500 scale-110" : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image src={preset} alt="preset" width={28} height={28} className="object-cover w-full h-full" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* INPUT FIELDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="px-3.5 py-2 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="px-3.5 py-2 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="px-3.5 py-2 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600">Date of Birth</label>
                  <input
                    type="text"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    placeholder="YYYY-MM-DD or Month DD, YYYY"
                    className="px-3.5 py-2 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-600">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="px-3.5 py-2 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600">Blood Type</label>
                  <input
                    type="text"
                    value={formData.bloodType}
                    onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                    className="px-3.5 py-2 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600">Department / Role Subtitle</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g. School Administration"
                    className="px-3.5 py-2 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-600">Short Bio</label>
                  <textarea
                    rows={2}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    className="px-3.5 py-2 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none resize-none"
                  />
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#C3EBFA] hover:bg-blue-200 text-gray-800 text-sm font-semibold transition-colors shadow-sm"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
