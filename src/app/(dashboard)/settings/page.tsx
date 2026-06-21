"use client";

import { useState } from "react";
import Image from "next/image";

type Toggle = { id: string; label: string; desc: string; default: boolean };

const notifToggles: Toggle[] = [
  { id: "email-notif", label: "Email Notifications", desc: "Receive updates via email", default: true },
  { id: "exam-reminder", label: "Exam Reminders", desc: "Get notified before upcoming exams", default: true },
  { id: "assignment-due", label: "Assignment Due Alerts", desc: "Alerts when assignments are due soon", default: true },
  { id: "announcement", label: "School Announcements", desc: "Receive new school announcements", default: false },
  { id: "msg-notif", label: "Message Notifications", desc: "Notify when you receive a new message", default: true },
];

function ToggleSwitch({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`w-10 h-5 rounded-full transition-colors duration-200 relative shrink-0 ${on ? "bg-[#C3EBFA]" : "bg-gray-200"}`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${on ? "translate-x-5" : "translate-x-0.5"}`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(notifToggles.map((t) => [t.id, t.default]))
  );
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("Asia/Colombo");
  const [theme, setTheme] = useState("light");

  return (
    <div className="p-4 max-w-3xl mx-auto flex flex-col gap-4">
      <h1 className="text-xl font-semibold text-gray-800">Settings</h1>

      {/* GENERAL */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Image src="/setting.png" alt="settings" width={16} height={16} />
          General
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="sm:w-1/3">
              <p className="text-sm font-semibold text-gray-700">Language</p>
              <p className="text-xs text-gray-400">Display language for the interface</p>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="en">English</option>
              <option value="si">Sinhala</option>
              <option value="ta">Tamil</option>
              <option value="fr">French</option>
            </select>
          </div>
          <div className="h-px bg-gray-100" />
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="sm:w-1/3">
              <p className="text-sm font-semibold text-gray-700">Timezone</p>
              <p className="text-xs text-gray-400">Your local timezone</p>
            </div>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="Asia/Colombo">Asia/Colombo (UTC+5:30)</option>
              <option value="America/New_York">America/New_York (UTC-5)</option>
              <option value="Europe/London">Europe/London (UTC+0)</option>
              <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
            </select>
          </div>
          <div className="h-px bg-gray-100" />
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="sm:w-1/3">
              <p className="text-sm font-semibold text-gray-700">Theme</p>
              <p className="text-xs text-gray-400">Interface color scheme</p>
            </div>
            <div className="flex gap-2">
              {["light", "dark", "system"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-colors ${
                    theme === t
                      ? "bg-[#C3EBFA] text-blue-700"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* NOTIFICATIONS */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Image src="/announcement.png" alt="notifications" width={16} height={16} />
          Notifications
        </h2>
        <div className="flex flex-col gap-1">
          {notifToggles.map((t, i) => (
            <div key={t.id}>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-semibold text-gray-700">{t.label}</p>
                  <p className="text-xs text-gray-400">{t.desc}</p>
                </div>
                <ToggleSwitch
                  on={toggles[t.id]}
                  onChange={() => setToggles((prev) => ({ ...prev, [t.id]: !prev[t.id] }))}
                />
              </div>
              {i < notifToggles.length - 1 && <div className="h-px bg-gray-100" />}
            </div>
          ))}
        </div>
      </div>

      {/* PRIVACY & SECURITY */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Image src="/profile.png" alt="privacy" width={16} height={16} />
          Privacy & Security
        </h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-semibold text-gray-700">Two-Factor Authentication</p>
              <p className="text-xs text-gray-400">Add an extra layer of security</p>
            </div>
            <button className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-xl text-xs font-semibold hover:bg-gray-200 transition-colors">
              Enable
            </button>
          </div>
          <div className="h-px bg-gray-100" />
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-semibold text-gray-700">Active Sessions</p>
              <p className="text-xs text-gray-400">1 active session on this device</p>
            </div>
            <button className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-xl text-xs font-semibold hover:bg-gray-200 transition-colors">
              Manage
            </button>
          </div>
          <div className="h-px bg-gray-100" />
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-semibold text-gray-700">Download My Data</p>
              <p className="text-xs text-gray-400">Export your personal data</p>
            </div>
            <button className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-xl text-xs font-semibold hover:bg-gray-200 transition-colors">
              Export
            </button>
          </div>
        </div>
      </div>

      {/* DANGER ZONE */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100">
        <h2 className="text-base font-semibold text-red-600 mb-4">Danger Zone</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-red-50 rounded-xl">
          <div>
            <p className="text-sm font-semibold text-gray-700">Delete Account</p>
            <p className="text-xs text-gray-400">Permanently delete your account and all data. This cannot be undone.</p>
          </div>
          <button className="shrink-0 px-4 py-2 bg-red-100 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-200 transition-colors">
            Delete Account
          </button>
        </div>
      </div>

      {/* SAVE */}
      <button className="w-full sm:w-auto sm:self-end bg-[#C3EBFA] hover:bg-blue-200 text-gray-800 font-semibold px-8 py-3 rounded-xl text-sm transition-colors">
        Save Changes
      </button>
    </div>
  );
}
