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
    <label className="text-xs text-gray-500">{label}</label>
    <input
      type={type}
      {...register(name)}
      className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
    />
    {error?.message && (
      <p className="text-xs text-red-400">{error.message}</p>
    )}
  </div>
);

const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeacherFormInputs>();

  const onSubmit = (formData: TeacherFormInputs) => {
    console.log(formData);
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new teacher" : "Update the teacher"}
      </h1>
      <span className="text-xs text-gray-400 font-semibold">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField label="Username" register={register} name="username" error={errors.username} />
        <InputField label="Email" register={register} name="email" type="email" error={errors.email} />
        <InputField label="Password" register={register} name="password" type="password" error={errors.password} />
      </div>
      <span className="text-xs text-gray-400 font-semibold">Personal Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField label="First Name" register={register} name="firstName" error={errors.firstName} />
        <InputField label="Last Name" register={register} name="lastName" error={errors.lastName} />
        <InputField label="Phone" register={register} name="phone" error={errors.phone} />
        <InputField label="Address" register={register} name="address" error={errors.address} />
        <InputField label="Blood Type" register={register} name="bloodType" error={errors.bloodType} />
        <InputField label="Birthday" register={register} name="birthday" type="date" error={errors.birthday} />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            {...register("sex")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
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
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="upload" width={28} height={28} />
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
      <button className="bg-blue-400 text-white p-2 rounded-md" type="submit">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;
