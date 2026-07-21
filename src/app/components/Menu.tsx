"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserRole } from "@/context/AuthContext";

type MenuItem = {
  icon: string;
  label: string;
  href: string;
  visible: UserRole[];
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

const menuItems: MenuSection[] = [
  {
    title: "MENU",
    items: [
      { icon: "/home.png", label: "Home", href: "/", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/teacher.png", label: "Teachers", href: "/list/teachers", visible: ["admin", "teacher"] },
      { icon: "/student.png", label: "Students", href: "/list/students", visible: ["admin", "teacher"] },
      { icon: "/parent.png", label: "Parents", href: "/list/parents", visible: ["admin", "teacher"] },
      { icon: "/subject.png", label: "Subjects", href: "/list/subjects", visible: ["admin"] },
      { icon: "/class.png", label: "Classes", href: "/list/classes", visible: ["admin", "teacher"] },
      { icon: "/lesson.png", label: "Lessons", href: "/list/lessons", visible: ["admin", "teacher"] },
      { icon: "/exam.png", label: "Exams", href: "/list/exams", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/assignment.png", label: "Assignments", href: "/list/assignments", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/result.png", label: "Results", href: "/list/results", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/attendance.png", label: "Attendance", href: "/list/attendance", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/calendar.png", label: "Events", href: "/list/events", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/message.png", label: "Messages", href: "/list/messages", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/announcement.png", label: "Announcements", href: "/list/announcements", visible: ["admin", "teacher", "student", "parent"] },
    ],
  },
  {
    title: "OTHER",
    items: [
      { icon: "/profile.png", label: "Profile", href: "/profile", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/setting.png", label: "Settings", href: "/settings", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/logout.png", label: "Logout", href: "/logout", visible: ["admin", "teacher", "student", "parent"] },
    ],
  },
];

const ROLE_HOME: Record<UserRole, string> = {
  admin: "/admin",
  teacher: "/teacher",
  student: "/student",
  parent: "/parent",
};

interface MenuProps {
  role: UserRole;
  onLinkClick?: () => void;
}

export default function Menu({ role, onLinkClick }: MenuProps) {
  const pathname = usePathname();

  const getHref = (item: MenuItem) => {
    if (item.href === "/") return ROLE_HOME[role];
    return item.href;
  };

  const isActive = (item: MenuItem) => {
    if (!pathname) return false;
    const href = getHref(item);
    if (href === ROLE_HOME[role]) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="mt-2 text-sm flex flex-col gap-1 px-2 pb-4">
      {menuItems.map((section) => {
        const visibleItems = section.items.filter((item) =>
          item.visible.includes(role)
        );
        if (visibleItems.length === 0) return null;
        return (
          <div key={section.title} className="flex flex-col gap-0.5 mb-2">
            <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase px-3 py-2">
              {section.title}
            </span>
            {visibleItems.map((item) => {
              const href = getHref(item);
              const active = isActive(item);
              return (
                <Link
                  key={item.label}
                  href={href}
                  onClick={onLinkClick}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group ${
                    active
                      ? "bg-[#C3EBFA] text-gray-800"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={18}
                    height={18}
                    className={`shrink-0 ${active ? "opacity-100" : "opacity-60 group-hover:opacity-80"}`}
                  />
                  <span className="font-semibold text-sm">{item.label}</span>
                  {active && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400" />
                  )}
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}