"use client";

import { useForm } from "react-hook-form";

type FormProps = {
  type: "create" | "update";
  data?: any;
  closeModal?: () => void;
  onSubmitHandler?: (formData: any) => void;
};

const AnnouncementForm = ({ type, data, closeModal, onSubmitHandler }: FormProps) => {
  const { register, handleSubmit } = useForm({
    defaultValues: type === "update" ? data : undefined,
  });

  const onSubmit = (formData: any) => {
    if (onSubmitHandler) {
      onSubmitHandler(formData);
    } else if (closeModal) {
      closeModal();
    }
  };

  return (
    <form className="flex flex-col gap-8 text-gray-800 dark:text-slate-100" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">{type === "create" ? "Create a new announcement" : "Update the announcement"}</h1>
      <div className="flex justify-between flex-wrap gap-4">
        {["title", "class"].map((field) => (
          <div key={field} className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500 dark:text-slate-400 capitalize">{field}</label>
            <input type="text" {...register(field)} className="ring-[1.5px] ring-gray-300 dark:ring-slate-700 bg-transparent dark:bg-slate-800 p-2 rounded-md text-sm w-full outline-none focus:ring-blue-400" />
          </div>
        ))}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500 dark:text-slate-400">Date</label>
          <input type="date" {...register("date")} className="ring-[1.5px] ring-gray-300 dark:ring-slate-700 bg-transparent dark:bg-slate-800 p-2 rounded-md text-sm w-full outline-none focus:ring-blue-400" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-xs text-gray-500 dark:text-slate-400">Description</label>
          <textarea {...register("description")} className="ring-[1.5px] ring-gray-300 dark:ring-slate-700 bg-transparent dark:bg-slate-800 p-2 rounded-md text-sm w-full min-h-[100px] outline-none focus:ring-blue-400" />
        </div>
      </div>
      <button className="bg-blue-400 dark:bg-sky-600 text-white p-2 rounded-md hover:bg-blue-500 dark:hover:bg-sky-500 transition-colors" type="submit">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AnnouncementForm;
