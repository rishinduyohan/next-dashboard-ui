"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";

type StudentFormInputs = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  bloodType: string;
  birthday: string;
  sex: string;
  grade: number;
  class: string;
  img: FileList;
};

type FormProps = {
  type: "create" | "update";
  data?: any;
  closeModal?: () => void;
  onSubmitHandler?: (formData: any) => void;
};

const StudentForm = ({
  type,
  data,
  closeModal,
  onSubmitHandler,
}: FormProps) => {
  const defaultValues = type === "update" && data ? {
    ...data,
    username: data.username ?? data.studentId ?? data.name?.toLowerCase().replace(/\s+/g, "") ?? "",
    email: data.email ?? `${data.name?.toLowerCase().replace(/\s+/g, "") ?? "student"}@schooldev.com`,
    firstName: data.firstName ?? data.name?.split(" ")[0] ?? "",
    lastName: data.lastName ?? data.name?.split(" ").slice(1).join(" ") ?? "",
    phone: data.phone ?? "",
    address: data.address ?? "",
    bloodType: data.bloodType ?? "A+",
    birthday: data.birthday ?? "2010-01-01",
    sex: data.sex ?? "male",
    grade: data.grade ?? 5,
    class: data.class ?? "5A",
  } : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentFormInputs>({ defaultValues });

  const onSubmit = (formData: StudentFormInputs) => {
    if (onSubmitHandler) {
      onSubmitHandler(formData);
    } else if (closeModal) {
      closeModal();
    }
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new student" : "Update the student"}
      </h1>
      <span className="text-xs text-gray-400 font-semibold">Authentication Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        {(["username", "email", "password"] as const).map((field) => (
          <div key={field} className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500 capitalize">{field}</label>
            <input
              type={field === "password" ? "password" : field === "email" ? "email" : "text"}
              {...register(field)}
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            />
          </div>
        ))}
      </div>
      <span className="text-xs text-gray-400 font-semibold">Personal Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        {(["firstName", "lastName", "phone", "address", "bloodType"] as const).map((field) => (
          <div key={field} className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500 capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="text"
              {...register(field)}
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            />
          </div>
        ))}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Birthday</label>
          <input
            type="date"
            {...register("birthday")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            {...register("sex")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Grade</label>
          <input
            type="number"
            {...register("grade")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Class</label>
          <input
            type="text"
            {...register("class")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="student-img"
          >
            <Image src="/upload.png" alt="upload" width={28} height={28} />
            <span>Upload a photo</span>
          </label>
          <input
            type="file"
            id="student-img"
            {...register("img")}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 transition-colors" type="submit">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default StudentForm;
