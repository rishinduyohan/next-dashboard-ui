"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";

type TeacherFormInputs = {
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
  subjects: string;
  img: FileList;
};

type InputFieldProps = {
  label: string;
  register: ReturnType<typeof useForm<TeacherFormInputs>>["register"];
  name: keyof TeacherFormInputs;
  type?: string;
  error?: { message?: string };
};

const InputField = ({ label, register, name, type = "text", error }: InputFieldProps) => (
  <div className="flex flex-col gap-2 w-full md:w-1/4">
    <label className="text-xs text-gray-500 dark:text-slate-400">{label}</label>
    <input
      type={type}
      {...register(name)}
      className="ring-[1.5px] ring-gray-300 dark:ring-slate-700 bg-transparent dark:bg-slate-800 p-2 rounded-md text-sm w-full outline-none focus:ring-blue-400"
    />
    {error?.message && (
      <p className="text-xs text-red-400">{error.message}</p>
    )}
  </div>
);

type FormProps = {
  type: "create" | "update";
  data?: any;
  closeModal?: () => void;
  onSubmitHandler?: (formData: any) => void;
};

const TeacherForm = ({
  type,
  data,
  closeModal,
  onSubmitHandler,
}: FormProps) => {
  const defaultValues = type === "update" && data ? {
    ...data,
    username: data.username ?? data.teacherId ?? data.name?.toLowerCase().replace(/\s+/g, "") ?? "",
    email: data.email ?? `${data.name?.toLowerCase().replace(/\s+/g, "") ?? "teacher"}@schooldev.com`,
    firstName: data.firstName ?? data.name?.split(" ")[0] ?? "",
    lastName: data.lastName ?? data.name?.split(" ").slice(1).join(" ") ?? "",
    phone: data.phone ?? "",
    address: data.address ?? "",
    bloodType: data.bloodType ?? "A+",
    birthday: data.birthday ?? "1985-01-01",
    sex: data.sex ?? "male",
    subjects: Array.isArray(data.subjects) ? data.subjects.join(", ") : data.subjects ?? "",
  } : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeacherFormInputs>({ defaultValues });

  const onSubmit = (formData: TeacherFormInputs) => {
    if (onSubmitHandler) {
      onSubmitHandler(formData);
    } else if (closeModal) {
      closeModal();
    }
  };

  return (
    <form className="flex flex-col gap-8 text-gray-800 dark:text-slate-100" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new teacher" : "Update the teacher"}
      </h1>
      <span className="text-xs text-gray-400 dark:text-slate-400 font-semibold">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField label="Username" register={register} name="username" error={errors.username} />
        <InputField label="Email" register={register} name="email" type="email" error={errors.email} />
        <InputField label="Password" register={register} name="password" type="password" error={errors.password} />
      </div>
      <span className="text-xs text-gray-400 dark:text-slate-400 font-semibold">Personal Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField label="First Name" register={register} name="firstName" error={errors.firstName} />
        <InputField label="Last Name" register={register} name="lastName" error={errors.lastName} />
        <InputField label="Phone" register={register} name="phone" error={errors.phone} />
        <InputField label="Address" register={register} name="address" error={errors.address} />
        <InputField label="Blood Type" register={register} name="bloodType" error={errors.bloodType} />
        <InputField label="Birthday" register={register} name="birthday" type="date" error={errors.birthday} />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500 dark:text-slate-400">Sex</label>
          <select
            {...register("sex")}
            className="ring-[1.5px] ring-gray-300 dark:ring-slate-700 bg-transparent dark:bg-slate-800 p-2 rounded-md text-sm w-full outline-none focus:ring-blue-400"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex && (
            <p className="text-xs text-red-400">{errors.sex.message}</p>
          )}
        </div>
        <InputField label="Subjects" register={register} name="subjects" error={errors.subjects} />
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="upload" width={28} height={28} className="dark:invert" />
            <span>Upload a photo</span>
          </label>
          <input
            type="file"
            id="img"
            {...register("img")}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>
      <button className="bg-blue-400 dark:bg-sky-600 text-white p-2 rounded-md hover:bg-blue-500 dark:hover:bg-sky-500 transition-colors" type="submit">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;
