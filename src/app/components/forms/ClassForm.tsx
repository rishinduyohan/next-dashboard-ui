import { useForm } from "react-hook-form";

const ClassForm = ({ type, data }: { type: "create" | "update"; data?: any }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (formData: any) => console.log(formData);
  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">{type === "create" ? "Create a new class" : "Update the class"}</h1>
      <div className="flex justify-between flex-wrap gap-4">
        {["name", "capacity", "grade", "supervisor"].map((field) => (
          <div key={field} className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500 capitalize">{field}</label>
            <input type={field === "capacity" || field === "grade" ? "number" : "text"} {...register(field)} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
          </div>
        ))}
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md" type="submit">{type === "create" ? "Create" : "Update"}</button>
    </form>
  );
};
export default ClassForm;
