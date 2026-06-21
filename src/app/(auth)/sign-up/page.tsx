"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "@/context/AuthContext";

const ROLE_OPTIONS: { role: UserRole; label: string; desc: string; bg: string; border: string; text: string; icon: string }[] = [
  { role: "admin", label: "Admin", desc: "Full access to all modules", bg: "bg-[#EDF9FD]", border: "border-[#C3EBFA]", text: "text-blue-700", icon: "/profile.png" },
  { role: "teacher", label: "Teacher", desc: "Manage classes and students", bg: "bg-[#F1F0FF]", border: "border-[#CFCEFF]", text: "text-purple-700", icon: "/teacher.png" },
  { role: "student", label: "Student", desc: "View schedule and results", bg: "bg-[#FEFCE8]", border: "border-[#FAE27C]", text: "text-yellow-700", icon: "/student.png" },
  { role: "parent", label: "Parent", desc: "Monitor your child's progress", bg: "bg-[#f0fdf4]", border: "border-green-200", text: "text-green-700", icon: "/parent.png" },
];

const ROLE_DASHBOARDS: Record<UserRole, string> = {
  admin: "/admin",
  teacher: "/teacher",
  student: "/student",
  parent: "/parent",
};

export default function SignUpPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.lastName.trim()) errs.lastName = "Last name is required";
    if (!form.email.includes("@")) errs.email = "Valid email is required";
    if (form.password.length < 6) errs.password = "Password must be at least 6 characters";
    if (form.password !== form.confirm) errs.confirm = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2() || !selectedRole) return;

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    login({
      role: selectedRole,
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      avatar: "/avatar.png",
    });
    router.push(ROLE_DASHBOARDS[selectedRole]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Image src="/logo.png" alt="SchoolDev" width={32} height={32} />
          <span className="text-xl font-semibold text-gray-800">SchoolDev</span>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= 1 ? "bg-[#C3EBFA] text-blue-700" : "bg-gray-100 text-gray-400"}`}>1</div>
          <div className={`flex-1 h-0.5 ${step >= 2 ? "bg-[#C3EBFA]" : "bg-gray-100"}`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= 2 ? "bg-[#C3EBFA] text-blue-700" : "bg-gray-100 text-gray-400"}`}>2</div>
        </div>

        {step === 1 ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">Choose your role</h2>
            <p className="text-sm text-gray-500 mb-6">Select how you will use SchoolDev</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {ROLE_OPTIONS.map((opt) => (
                <button
                  key={opt.role}
                  onClick={() => setSelectedRole(opt.role)}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    selectedRole === opt.role
                      ? `${opt.bg} ${opt.border} ${opt.text}`
                      : "border-gray-100 hover:border-gray-200 text-gray-600"
                  }`}
                >
                  <Image src={opt.icon} alt={opt.role} width={20} height={20} className="mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold">{opt.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => { if (selectedRole) setStep(2); }}
              disabled={!selectedRole}
              className="w-full bg-[#C3EBFA] hover:bg-blue-200 text-gray-800 font-semibold py-3 rounded-xl transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">Create account</h2>
            <p className="text-sm text-gray-500 mb-6">
              Signing up as <span className="font-semibold capitalize">{selectedRole}</span>
              <button onClick={() => setStep(1)} className="ml-2 text-blue-500 text-xs hover:underline">(change)</button>
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex gap-3">
                {["firstName", "lastName"].map((field) => (
                  <div key={field} className="flex flex-col gap-1 flex-1">
                    <label className="text-xs font-semibold text-gray-700 capitalize">
                      {field === "firstName" ? "First name" : "Last name"}
                    </label>
                    <input
                      type="text"
                      value={form[field as keyof typeof form]}
                      onChange={(e) => updateForm(field, e.target.value)}
                      className={`px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 ${errors[field] ? "border-red-300" : "border-gray-200"}`}
                    />
                    {errors[field] && <p className="text-xs text-red-500">{errors[field]}</p>}
                  </div>
                ))}
              </div>

              {[
                { field: "email", label: "Email address", type: "email" },
                { field: "password", label: "Password", type: "password" },
                { field: "confirm", label: "Confirm password", type: "password" },
              ].map(({ field, label, type }) => (
                <div key={field} className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700">{label}</label>
                  <input
                    type={type}
                    value={form[field as keyof typeof form]}
                    onChange={(e) => updateForm(field, e.target.value)}
                    className={`px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 ${errors[field] ? "border-red-300" : "border-gray-200"}`}
                  />
                  {errors[field] && <p className="text-xs text-red-500">{errors[field]}</p>}
                </div>
              ))}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#C3EBFA] hover:bg-blue-200 text-gray-800 font-semibold py-3 rounded-xl transition-colors text-sm disabled:opacity-60 mt-2"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </button>
            </form>
          </>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
