"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "@/context/AuthContext";

const ROLE_DASHBOARDS: Record<UserRole, string> = {
  admin: "/admin",
  teacher: "/teacher",
  student: "/student",
  parent: "/parent",
};

const DEMO_CREDENTIALS: Record<
  UserRole,
  { email: string; password: string; name: string }
> = {
  admin: { email: "admin@schooldev.com", password: "admin123", name: "Rishindu Yohan" },
  teacher: { email: "teacher@schooldev.com", password: "teacher123", name: "Cameron Moran" },
  student: { email: "student@schooldev.com", password: "student123", name: "John Doe" },
  parent: { email: "parent@schooldev.com", password: "parent123", name: "Sarah Doe" },
};

const ROLE_STYLES: Record<UserRole, { bg: string; text: string; border: string; label: string; icon: string }> = {
  admin: { bg: "bg-[#EDF9FD]", text: "text-blue-700", border: "border-[#C3EBFA]", label: "Admin", icon: "/profile.png" },
  teacher: { bg: "bg-[#F1F0FF]", text: "text-purple-700", border: "border-[#CFCEFF]", label: "Teacher", icon: "/teacher.png" },
  student: { bg: "bg-[#FEFCE8]", text: "text-yellow-700", border: "border-[#FAE27C]", label: "Student", icon: "/student.png" },
  parent: { bg: "bg-[#f0fdf4]", text: "text-green-700", border: "border-green-200", label: "Parent", icon: "/parent.png" },
};

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState<UserRole>("admin");
  const [email, setEmail] = useState(DEMO_CREDENTIALS.admin.email);
  const [password, setPassword] = useState(DEMO_CREDENTIALS.admin.password);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(DEMO_CREDENTIALS[role].email);
    setPassword(DEMO_CREDENTIALS[role].password);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate auth delay
    await new Promise((r) => setTimeout(r, 800));

    const creds = DEMO_CREDENTIALS[selectedRole];
    if (email === creds.email && password === creds.password) {
      login({
        role: selectedRole,
        name: creds.name,
        email: creds.email,
        avatar: "/avatar.png",
      });
      router.push(ROLE_DASHBOARDS[selectedRole]);
    } else {
      setError("Invalid email or password. Use the demo credentials shown.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-8 items-center">
        {/* LEFT BRANDING */}
        <div className="hidden lg:flex flex-col gap-6 flex-1">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="SchoolDev" width={48} height={48} />
            <span className="text-3xl font-semibold text-gray-800">SchoolDev</span>
          </div>
          <h1 className="text-4xl font-semibold text-gray-800 leading-tight">
            Welcome to your <br />
            <span className="text-blue-500">School Dashboard</span>
          </h1>
          <p className="text-gray-500 text-base leading-relaxed">
            Manage students, teachers, classes, exams, attendance and more — all in one modern platform.
          </p>
          <div className="flex flex-col gap-3 mt-2">
            {(["admin", "teacher", "student", "parent"] as UserRole[]).map((role) => {
              const s = ROLE_STYLES[role];
              return (
                <div key={role} className={`flex items-center gap-3 p-3 rounded-xl ${s.bg} border ${s.border}`}>
                  <Image src={s.icon} alt={role} width={20} height={20} />
                  <div>
                    <p className={`text-sm font-semibold ${s.text}`}>{s.label}</p>
                    <p className="text-xs text-gray-500">{DEMO_CREDENTIALS[role].email}</p>
                  </div>
                  <span className="ml-auto text-xs text-gray-400 font-semibold">
                    pw: {role}123
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full lg:w-[420px] bg-white rounded-2xl shadow-lg p-8">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-2 mb-6">
            <Image src="/logo.png" alt="SchoolDev" width={32} height={32} />
            <span className="text-xl font-semibold text-gray-800">SchoolDev</span>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-1">Sign in</h2>
          <p className="text-sm text-gray-500 mb-6">Select your role and enter credentials</p>

          {/* ROLE PICKER */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {(["admin", "teacher", "student", "parent"] as UserRole[]).map((role) => {
              const s = ROLE_STYLES[role];
              const isSelected = selectedRole === role;
              return (
                <button
                  key={role}
                  onClick={() => handleRoleSelect(role)}
                  className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? `${s.bg} ${s.border} ${s.text}`
                      : "border-gray-100 hover:border-gray-200 text-gray-500"
                  }`}
                >
                  <Image src={s.icon} alt={role} width={16} height={16} />
                  <span className="text-sm font-semibold capitalize">{role}</span>
                  {isSelected && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-current" />
                  )}
                </button>
              );
            })}
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all bg-gray-50"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all bg-gray-50"
                required
              />
              <div className="text-right mt-1">
                <span className="text-xs text-blue-500 cursor-pointer hover:underline">
                  Forgot password?
                </span>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#C3EBFA] hover:bg-blue-200 text-gray-800 font-semibold py-3 rounded-xl transition-colors duration-200 text-sm disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {isLoading ? "Signing in..." : `Sign in as ${ROLE_STYLES[selectedRole].label}`}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-blue-500 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
