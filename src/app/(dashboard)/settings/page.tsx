"use client";

import { useState } from "react";
import Image from "next/image";
import { useSettings, ThemeMode } from "@/context/SettingsContext";
import { Language } from "@/lib/translations";

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
      className={`w-10 h-5 rounded-full transition-colors duration-200 relative shrink-0 ${
        on ? "bg-[#C3EBFA] dark:bg-sky-600" : "bg-gray-200 dark:bg-slate-700"
      }`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
          on ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const { theme, setTheme, language, setLanguage, timezone, setTimezone, t } = useSettings();

  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(notifToggles.map((t) => [t.id, t.default]))
  );

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSaveChanges = () => {
    setToastMessage(t("Settings saved successfully!"));
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto flex flex-col gap-4 relative">
      {/* TOAST */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 dark:bg-slate-100 text-white dark:text-gray-900 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <h1 className="text-xl font-semibold text-gray-800 dark:text-slate-100">{t("Settings")}</h1>

      {/* GENERAL */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
        <h2 className="text-base font-semibold text-gray-800 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Image src="/setting.png" alt="settings" width={16} height={16} className="dark:invert" />
          {t("General")}
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="sm:w-1/3">
              <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">{t("Language")}</p>
              <p className="text-xs text-gray-400 dark:text-slate-400">{t("Display language for the interface")}</p>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="flex-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 text-sm bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-sky-900"
            >
              <option value="en">English</option>
              <option value="si">Sinhala (සිංහල)</option>
              <option value="ta">Tamil (தமிழ்)</option>
            </select>
          </div>
          <div className="h-px bg-gray-100 dark:bg-slate-800" />
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="sm:w-1/3">
              <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">{t("Timezone")}</p>
              <p className="text-xs text-gray-400 dark:text-slate-400">{t("Your local timezone")}</p>
            </div>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 text-sm bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-sky-900"
            >
              <option value="Asia/Colombo">Asia/Colombo (UTC+5:30)</option>
              <option value="America/New_York">America/New_York (UTC-5)</option>
              <option value="Europe/London">Europe/London (UTC+0)</option>
              <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
            </select>
          </div>
          <div className="h-px bg-gray-100 dark:bg-slate-800" />
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="sm:w-1/3">
              <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">{t("Theme")}</p>
              <p className="text-xs text-gray-400 dark:text-slate-400">{t("Interface color scheme")}</p>
            </div>
            <div className="flex gap-2">
              {(["light", "dark", "system"] as const).map((tMode) => (
                <button
                  key={tMode}
                  onClick={() => setTheme(tMode)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                    theme === tMode
                      ? "bg-[#C3EBFA] dark:bg-sky-600 text-blue-700 dark:text-white shadow-sm"
                      : "bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {tMode}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* NOTIFICATIONS */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
        <h2 className="text-base font-semibold text-gray-800 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Image src="/announcement.png" alt="notifications" width={16} height={16} className="dark:invert" />
          {t("Notifications")}
        </h2>
        <div className="flex flex-col gap-1">
          {notifToggles.map((item, i) => (
            <div key={item.id}>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">{item.label}</p>
                  <p className="text-xs text-gray-400 dark:text-slate-400">{item.desc}</p>
                </div>
                <ToggleSwitch
                  on={toggles[item.id]}
                  onChange={() => setToggles((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                />
              </div>
              {i < notifToggles.length - 1 && <div className="h-px bg-gray-100 dark:bg-slate-800" />}
            </div>
          ))}
        </div>
      </div>

      {/* PRIVACY & SECURITY */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
        <h2 className="text-base font-semibold text-gray-800 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Image src="/profile.png" alt="privacy" width={16} height={16} className="dark:invert" />
          {t("Privacy & Security")}
        </h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">Two-Factor Authentication</p>
              <p className="text-xs text-gray-400 dark:text-slate-400">Add an extra layer of security</p>
            </div>
            <button className="px-4 py-1.5 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 rounded-xl text-xs font-semibold hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
              Enable
            </button>
          </div>
          <div className="h-px bg-gray-100 dark:bg-slate-800" />
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">Active Sessions</p>
              <p className="text-xs text-gray-400 dark:text-slate-400">1 active session on this device</p>
            </div>
            <button className="px-4 py-1.5 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 rounded-xl text-xs font-semibold hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
              Manage
            </button>
          </div>
          <div className="h-px bg-gray-100 dark:bg-slate-800" />
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">Download My Data</p>
              <p className="text-xs text-gray-400 dark:text-slate-400">Export your personal data</p>
            </div>
            <button className="px-4 py-1.5 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 rounded-xl text-xs font-semibold hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
              Export
            </button>
          </div>
        </div>
      </div>

      {/* DANGER ZONE */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-red-100 dark:border-red-900/50 transition-colors">
        <h2 className="text-base font-semibold text-red-600 dark:text-red-400 mb-4">{t("Danger Zone")}</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-red-50 dark:bg-red-950/40 rounded-xl">
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">Delete Account</p>
            <p className="text-xs text-gray-400 dark:text-slate-400">Permanently delete your account and all data. This cannot be undone.</p>
          </div>
          <button className="shrink-0 px-4 py-2 bg-red-100 dark:bg-red-900/60 text-red-600 dark:text-red-200 rounded-xl text-sm font-semibold hover:bg-red-200 dark:hover:bg-red-900 transition-colors">
            Delete Account
          </button>
        </div>
      </div>

      {/* SAVE */}
      <button
        onClick={handleSaveChanges}
        className="w-full sm:w-auto sm:self-end bg-[#C3EBFA] dark:bg-sky-600 hover:bg-blue-200 dark:hover:bg-sky-500 text-gray-800 dark:text-white font-semibold px-8 py-3 rounded-xl text-sm transition-colors shadow-sm active:scale-95"
      >
        {t("Save Changes")}
      </button>
    </div>
  );
}
