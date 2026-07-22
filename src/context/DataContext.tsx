"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import * as initialData from "@/lib/data";

export type TableKey =
  | "teacher"
  | "student"
  | "parent"
  | "subject"
  | "class"
  | "lesson"
  | "exam"
  | "assignment"
  | "result"
  | "event"
  | "announcement";

interface DataContextType {
  data: Record<TableKey, any[]>;
  addItem: (table: TableKey, item: any) => void;
  updateItem: (table: TableKey, updatedItem: any) => void;
  deleteItem: (table: TableKey, id: number) => void;
}

const DataContext = createContext<DataContextType>({
  data: {
    teacher: [],
    student: [],
    parent: [],
    subject: [],
    class: [],
    lesson: [],
    exam: [],
    assignment: [],
    result: [],
    event: [],
    announcement: [],
  },
  addItem: () => {},
  updateItem: () => {},
  deleteItem: () => {},
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<Record<TableKey, any[]>>(() => {
    return {
      teacher: initialData.teachersData ?? [],
      student: initialData.studentsData ?? [],
      parent: initialData.parentsData ?? [],
      subject: initialData.subjectsData ?? [],
      class: initialData.classesData ?? [],
      lesson: initialData.lessonsData ?? [],
      exam: initialData.examsData ?? [],
      assignment: initialData.assignmentsData ?? [],
      result: initialData.resultsData ?? [],
      event: initialData.eventsData ?? [],
      announcement: initialData.announcementsData ?? [],
    };
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("schooldev_crud_data");
      if (stored) {
        const parsed = JSON.parse(stored);
        setData((prev) => ({ ...prev, ...parsed }));
      }
    } catch {}
  }, []);

  const saveToStorage = (newData: Record<TableKey, any[]>) => {
    try {
      localStorage.setItem("schooldev_crud_data", JSON.stringify(newData));
    } catch {}
  };

  const addItem = (table: TableKey, newItem: any) => {
    setData((prev) => {
      const list = prev[table] || [];
      const newId = newItem.id ?? (list.length > 0 ? Math.max(...list.map((i) => Number(i.id) || 0)) + 1 : 1);
      
      let formattedName = newItem.name;
      if (!formattedName && (newItem.firstName || newItem.lastName)) {
        formattedName = `${newItem.firstName ?? ""} ${newItem.lastName ?? ""}`.trim();
      }

      const created = { 
        ...newItem, 
        id: newId,
        ...(formattedName ? { name: formattedName } : {}),
      };

      const updated = [created, ...list];
      const nextData = { ...prev, [table]: updated };
      saveToStorage(nextData);
      return nextData;
    });
  };

  const updateItem = (table: TableKey, updatedItem: any) => {
    setData((prev) => {
      const list = prev[table] || [];
      const updated = list.map((item) => {
        if (item.id === updatedItem.id || item.id === Number(updatedItem.id)) {
          let mergedName = updatedItem.name;
          if (!mergedName && (updatedItem.firstName || updatedItem.lastName)) {
            mergedName = `${updatedItem.firstName ?? ""} ${updatedItem.lastName ?? ""}`.trim();
          }

          let parsedSubjects = updatedItem.subjects;
          if (typeof parsedSubjects === "string") {
            parsedSubjects = parsedSubjects.split(",").map((s: string) => s.trim()).filter(Boolean);
          }

          let parsedClasses = updatedItem.classes;
          if (typeof parsedClasses === "string") {
            parsedClasses = parsedClasses.split(",").map((c: string) => c.trim()).filter(Boolean);
          }

          let parsedTeachers = updatedItem.teachers;
          if (typeof parsedTeachers === "string") {
            parsedTeachers = parsedTeachers.split(",").map((t: string) => t.trim()).filter(Boolean);
          }

          let parsedStudents = updatedItem.students;
          if (typeof parsedStudents === "string") {
            parsedStudents = parsedStudents.split(",").map((st: string) => st.trim()).filter(Boolean);
          }

          return {
            ...item,
            ...updatedItem,
            ...(mergedName ? { name: mergedName } : {}),
            ...(parsedSubjects ? { subjects: parsedSubjects } : {}),
            ...(parsedClasses ? { classes: parsedClasses } : {}),
            ...(parsedTeachers ? { teachers: parsedTeachers } : {}),
            ...(parsedStudents ? { students: parsedStudents } : {}),
          };
        }
        return item;
      });
      const nextData = { ...prev, [table]: updated };
      saveToStorage(nextData);
      return nextData;
    });
  };

  const deleteItem = (table: TableKey, id: number) => {
    setData((prev) => {
      const list = prev[table] || [];
      const updated = list.filter((item) => item.id !== id && item.id !== Number(id));
      const nextData = { ...prev, [table]: updated };
      saveToStorage(nextData);
      return nextData;
    });
  };

  return (
    <DataContext.Provider value={{ data, addItem, updateItem, deleteItem }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
