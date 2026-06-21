import { useForm } from "react-hook-form";

const ParentForm = ({ type, data }: { type: "create" | "update"; data?: any }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (formData: any) => console.log(formData);

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
      <button className="bg-blue-400 text-white p-2 rounded-md" type="submit">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};
export default ParentForm;
