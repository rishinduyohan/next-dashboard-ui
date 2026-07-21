"use client";

import { calendarEvents } from "@/lib/data";
import { useState } from "react";

const HOURS = Array.from({ length: 10 }, (_, i) => i + 8); // 8am to 5pm
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const getColorForTitle = (title: string) => {
  const colors: Record<string, string> = {
    Math: "bg-Rishsky dark:bg-sky-950 text-gray-800 dark:text-sky-100 border-l-4 border-blue-300 dark:border-sky-500",
    English: "bg-RishpurpleLight dark:bg-purple-950 text-gray-800 dark:text-purple-100 border-l-4 border-purple-300 dark:border-purple-500",
    Biology: "bg-green-50 dark:bg-green-950 text-gray-800 dark:text-green-100 border-l-4 border-green-300 dark:border-green-500",
    Physics: "bg-RishyellowLight dark:bg-yellow-950 text-gray-800 dark:text-yellow-100 border-l-4 border-yellow-300 dark:border-yellow-500",
    Chemistry: "bg-red-50 dark:bg-red-950 text-gray-800 dark:text-red-100 border-l-4 border-red-300 dark:border-red-500",
    History: "bg-orange-50 dark:bg-orange-950 text-gray-800 dark:text-orange-100 border-l-4 border-orange-300 dark:border-orange-500",
  };
  return colors[title] || "bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-slate-100 border-l-4 border-gray-300 dark:border-slate-600";
};

const BigCalendar = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(now.setDate(diff));
  });

  const weekDates = DAYS.map((_, i) => {
    const d = new Date(currentWeekStart);
    d.setDate(currentWeekStart.getDate() + i);
    return d;
  });

  const getEventsForDayAndHour = (dayIndex: number, hour: number) => {
    const day = weekDates[dayIndex];
    return calendarEvents.filter((e) => {
      const start = new Date(e.start);
      return (
        start.getDate() === day.getDate() &&
        start.getMonth() === day.getMonth() &&
        start.getFullYear() === day.getFullYear() &&
        start.getHours() === hour
      );
    });
  };

  return (
    <div className="w-full overflow-x-auto text-gray-800 dark:text-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Schedule</h1>
        <div className="flex gap-2">
          <button
            onClick={() => {
              const d = new Date(currentWeekStart);
              d.setDate(d.getDate() - 7);
              setCurrentWeekStart(d);
            }}
            className="px-3 py-1 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
          >
            ‹ Prev
          </button>
          <button
            onClick={() => {
              const d = new Date(currentWeekStart);
              d.setDate(d.getDate() + 7);
              setCurrentWeekStart(d);
            }}
            className="px-3 py-1 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
          >
            Next ›
          </button>
        </div>
      </div>
      <div className="min-w-[600px]">
        {/* Day Headers */}
        <div className="grid grid-cols-6 border-b border-gray-200 dark:border-slate-800">
          <div className="p-2 text-xs text-gray-400 dark:text-slate-400" />
          {weekDates.map((date, i) => (
            <div key={i} className="p-2 text-center">
              <p className="text-xs text-gray-500 dark:text-slate-400">{DAYS[i]}</p>
              <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">{date.getDate()}</p>
            </div>
          ))}
        </div>
        {/* Time slots */}
        {HOURS.map((hour) => (
          <div key={hour} className="grid grid-cols-6 border-b border-gray-100 dark:border-slate-800/60 min-h-[60px]">
            <div className="p-2 text-xs text-gray-400 dark:text-slate-400 text-right pr-3 pt-1">
              {hour}:00
            </div>
            {DAYS.map((_, dayIdx) => {
              const events = getEventsForDayAndHour(dayIdx, hour);
              return (
                <div key={dayIdx} className="p-1 border-l border-gray-100 dark:border-slate-800/60">
                  {events.map((ev, i) => (
                    <div
                      key={i}
                      className={`rounded-md p-1 text-xs mb-1 ${getColorForTitle(ev.title)}`}
                    >
                      <p className="font-semibold">{ev.title}</p>
                      <p className="opacity-80">
                        {new Date(ev.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} –{" "}
                        {new Date(ev.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BigCalendar;
