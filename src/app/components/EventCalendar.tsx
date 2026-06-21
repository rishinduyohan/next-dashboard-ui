"use client";

import { useState } from "react";
import Image from "next/image";

// Simple calendar widget without external library
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const EventCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const today = new Date();
  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  // Upcoming events (static)
  const events = [
    { id: 1, title: "Maths Test", time: "25 Jan, 10:00 AM", description: "Class 4A" },
    { id: 2, title: "Science Lab", time: "26 Jan, 9:00 AM", description: "Class 3B" },
    { id: 3, title: "Arts Exhibition", time: "28 Jan, 2:00 PM", description: "All classes" },
  ];

  return (
    <div className="bg-white p-4 rounded-md">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-800">
          {monthName} {year}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 text-sm"
          >
            ‹
          </button>
          <button
            onClick={nextMonth}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 text-sm"
          >
            ›
          </button>
        </div>
      </div>
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center text-xs text-gray-400 font-semibold py-1">
            {d}
          </div>
        ))}
      </div>
      {/* Days grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {calendarDays.map((day, idx) => (
          <div key={idx} className="flex items-center justify-center">
            {day ? (
              <button
                className={`w-7 h-7 flex items-center justify-center rounded-full text-sm transition-colors
                  ${isToday(day)
                    ? "bg-Rishsky text-gray-800 font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                  }`}
              >
                {day}
              </button>
            ) : null}
          </div>
        ))}
      </div>
      {/* Events */}
      <div className="flex flex-col gap-3 mt-5">
        <h3 className="text-sm font-semibold text-gray-700">Upcoming Events</h3>
        {events.map((e) => (
          <div
            key={e.id}
            className="p-4 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-Rishsky even:border-t-Rishpurple"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-600 text-sm">{e.title}</h2>
              <span className="text-gray-400 text-xs">{e.time}</span>
            </div>
            <p className="mt-2 text-gray-400 text-xs">{e.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
