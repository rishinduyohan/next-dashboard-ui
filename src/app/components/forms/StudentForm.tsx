import { useForm } from "react-hook-form";
import Image from "next/image";

const StudentForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (formData: any) => {
    console.log(formData);
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new student" : "Update the student"}
      </h1>
      <span className="text-xs text-gray-400 font-semibold">Authentication Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Username</label>
          <input type="text" {...register("username")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Email</label>
          <input type="email" {...register("email")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Password</label>
          <input type="password" {...register("password")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
        </div>
      </div>
      <span className="text-xs text-gray-400 font-semibold">Personal Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">First Name</label>
          <input type="text" {...register("firstName")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Last Name</label>
          <input type="text" {...register("lastName")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Phone</label>
          <input type="text" {...register("phone")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Address</label>
          <input type="text" {...register("address")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Blood Type</label>
          <input type="text" {...register("bloodType")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Birthday</label>
          <input type="date" {...register("birthday")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select {...register("sex")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Grade</label>
          <input type="number" {...register("grade")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Class</label>
          <input type="text" {...register("class")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" htmlFor="student-img">
            <Image src="/upload.png" alt="upload" width={28} height={28} />
            <span>Upload a photo</span>
          </label>
          <input type="file" id="student-img" {...register("img")} className="hidden" />
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md" type="submit">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default StudentForm;
