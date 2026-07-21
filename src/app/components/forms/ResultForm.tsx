"use client";

import { useForm } from "react-hook-form";

type FormProps = {
  type: "create" | "update";
  data?: any;
  closeModal?: () => void;
  onSubmitHandler?: (formData: any) => void;
};

const ResultForm = ({ type, data, closeModal, onSubmitHandler }: FormProps) => {
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
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">{type === "create" ? "Create a new result" : "Update the result"}</h1>
      <div className="flex justify-between flex-wrap gap-4">
        {["subject", "class", "teacher", "student"].map((field) => (
          <div key={field} className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500 capitalize">{field}</label>
            <input type="text" {...register(field)} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
          </div>
        ))}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Score</label>
          <input type="number" {...register("score")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Date</label>
          <input type="date" {...register("date")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Type</label>
          <select {...register("type")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full">
            <option value="exam">Exam</option>
            <option value="assignment">Assignment</option>
          </select>
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 transition-colors" type="submit">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ResultForm;
