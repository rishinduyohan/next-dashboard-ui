"use client";

import { useForm } from "react-hook-form";

type FormProps = {
  type: "create" | "update";
  data?: any;
  closeModal?: () => void;
  onSubmitHandler?: (formData: any) => void;
};

const ParentForm = ({ type, data, closeModal, onSubmitHandler }: FormProps) => {
  const defaultValues = type === "update" && data ? {
    ...data,
    username: data.username ?? data.name?.toLowerCase().replace(/\s+/g, "") ?? "",
    firstName: data.firstName ?? data.name?.split(" ")[0] ?? "",
    lastName: data.lastName ?? data.name?.split(" ").slice(1).join(" ") ?? "",
    students: Array.isArray(data.students) ? data.students.join(", ") : data.students ?? "",
  } : undefined;

  const { register, handleSubmit } = useForm({ defaultValues });

  const onSubmit = (formData: any) => {
    if (onSubmitHandler) {
      onSubmitHandler(formData);
    } else if (closeModal) {
      closeModal();
    }
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new parent" : "Update the parent"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        {["username", "email", "password", "firstName", "lastName", "phone", "address"].map((field) => (
          <div key={field} className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500 capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
            <input type={field === "password" ? "password" : field === "email" ? "email" : "text"} {...register(field)} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
          </div>
        ))}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Students</label>
          <input type="text" {...register("students")} placeholder="comma separated names" className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 transition-colors" type="submit">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ParentForm;
