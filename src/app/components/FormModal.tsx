"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useData, TableKey } from "@/context/DataContext";

// Dynamic import to avoid SSR issues
const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1 className="text-xl font-semibold">Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1 className="text-xl font-semibold">Loading...</h1>,
});
const ParentForm = dynamic(() => import("./forms/ParentForm"), {
  loading: () => <h1 className="text-xl font-semibold">Loading...</h1>,
});
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <h1 className="text-xl font-semibold">Loading...</h1>,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <h1 className="text-xl font-semibold">Loading...</h1>,
});
const LessonForm = dynamic(() => import("./forms/LessonForm"), {
  loading: () => <h1 className="text-xl font-semibold">Loading...</h1>,
});
const ExamForm = dynamic(() => import("./forms/ExamForm"), {
  loading: () => <h1 className="text-xl font-semibold">Loading...</h1>,
});
const AssignmentForm = dynamic(() => import("./forms/AssignmentForm"), {
  loading: () => <h1 className="text-xl font-semibold">Loading...</h1>,
});
const ResultForm = dynamic(() => import("./forms/ResultForm"), {
  loading: () => <h1 className="text-xl font-semibold">Loading...</h1>,
});
const EventForm = dynamic(() => import("./forms/EventForm"), {
  loading: () => <h1 className="text-xl font-semibold">Loading...</h1>,
});
const AnnouncementForm = dynamic(() => import("./forms/AnnouncementForm"), {
  loading: () => <h1 className="text-xl font-semibold">Loading...</h1>,
});

const forms: {
  [key: string]: (
    type: "create" | "update",
    data: any,
    closeModal: () => void,
    onSubmitHandler: (formData: any) => void
  ) => JSX.Element;
} = {
  teacher: (type, data, closeModal, onSubmitHandler) => (
    <TeacherForm type={type} data={data} closeModal={closeModal} onSubmitHandler={onSubmitHandler} />
  ),
  student: (type, data, closeModal, onSubmitHandler) => (
    <StudentForm type={type} data={data} closeModal={closeModal} onSubmitHandler={onSubmitHandler} />
  ),
  parent: (type, data, closeModal, onSubmitHandler) => (
    <ParentForm type={type} data={data} closeModal={closeModal} onSubmitHandler={onSubmitHandler} />
  ),
  subject: (type, data, closeModal, onSubmitHandler) => (
    <SubjectForm type={type} data={data} closeModal={closeModal} onSubmitHandler={onSubmitHandler} />
  ),
  class: (type, data, closeModal, onSubmitHandler) => (
    <ClassForm type={type} data={data} closeModal={closeModal} onSubmitHandler={onSubmitHandler} />
  ),
  lesson: (type, data, closeModal, onSubmitHandler) => (
    <LessonForm type={type} data={data} closeModal={closeModal} onSubmitHandler={onSubmitHandler} />
  ),
  exam: (type, data, closeModal, onSubmitHandler) => (
    <ExamForm type={type} data={data} closeModal={closeModal} onSubmitHandler={onSubmitHandler} />
  ),
  assignment: (type, data, closeModal, onSubmitHandler) => (
    <AssignmentForm type={type} data={data} closeModal={closeModal} onSubmitHandler={onSubmitHandler} />
  ),
  result: (type, data, closeModal, onSubmitHandler) => (
    <ResultForm type={type} data={data} closeModal={closeModal} onSubmitHandler={onSubmitHandler} />
  ),
  event: (type, data, closeModal, onSubmitHandler) => (
    <EventForm type={type} data={data} closeModal={closeModal} onSubmitHandler={onSubmitHandler} />
  ),
  announcement: (type, data, closeModal, onSubmitHandler) => (
    <AnnouncementForm type={type} data={data} closeModal={closeModal} onSubmitHandler={onSubmitHandler} />
  ),
};

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table: TableKey;
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
}) => {
  const [open, setOpen] = useState(false);
  const { addItem, updateItem, deleteItem } = useData();

  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-Rishyellow"
      : type === "update"
      ? "bg-Rishsky"
      : "bg-red-100";

  const handleFormSubmit = (formData: any) => {
    if (type === "create") {
      addItem(table, formData);
    } else if (type === "update") {
      updateItem(table, { ...data, ...formData });
    }
    setOpen(false);
  };

  const handleDelete = () => {
    if (id) {
      deleteItem(table, id);
    }
    setOpen(false);
  };

  const Form = () => {
    return type === "delete" && id ? (
      <form className="p-4 flex flex-col gap-4">
        <span className="text-center font-semibold text-gray-700">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <button
          className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center hover:bg-red-800 transition-colors"
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data, () => setOpen(false), handleFormSubmit)
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image
          src={`/${type === "create" ? "plus" : type === "update" ? "edit" : "delete"}.png`}
          alt={type}
          width={type === "create" ? 16 : 14}
          height={type === "create" ? 16 : 14}
        />
      </button>
      {open && (
        <div className="w-screen h-screen fixed left-0 top-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 p-6 rounded-2xl relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-slate-800 shadow-2xl">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="close" width={14} height={14} className="dark:invert" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
