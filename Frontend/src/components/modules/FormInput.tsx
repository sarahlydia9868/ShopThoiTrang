import { IoIosCloudUpload } from "react-icons/io";

interface IFormInput {
  label?: string;
  type: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: any) => void;
}

export default function FormInput({ label, type, placeholder, value, onChange }: IFormInput) {
  return type === "password" ? (
    <label htmlFor="password" className="relative flex justify-center items-start flex-col gap-1 w-full">
      <span style={{ fontWeight: "bold" }}>{label}</span>
      <input
        type="password"
        id="password"
        onChange={onChange}
        placeholder={placeholder}
        className=" w-full p-3 rounded-lg border-1 border-black text-black outline-hidden placeholder:text-sm  placeholder:text-zinc-600 focus:bg-primary transition-colors duration-500 bg-white"
      />
    </label>
  ) : type === "text" ? (
    <label htmlFor="text" className="flex justify-center  items-start flex-col gap-1 w-full">
      <span style={{ fontWeight: "bold" }}>{label}</span>
      <input
        type={type}
        value={value}
        id="text"
        min={0}
        placeholder={placeholder}
        onChange={onChange}
        className=" w-full p-3 rounded-lg border-1 border-black text-black outline-hidden placeholder:text-sm  placeholder:text-zinc-600 focus:bg-primary transition-colors duration-500 bg-white"
      />
    </label>
  ) : type === "number" ? (
    <label htmlFor="number" className="flex justify-center  items-start flex-col gap-1 w-full">
      <span style={{ fontWeight: "bold" }}>{label}</span>
      <input
        type={type}
        value={value}
        id="number"
        min={0}
        placeholder={placeholder}
        onChange={onChange}
        className=" w-full p-3 rounded-lg border-1 border-black text-black outline-hidden placeholder:text-sm  placeholder:text-zinc-600 focus:bg-primary transition-colors duration-500 bg-white"
      />
    </label>
  ) : type === "date" ? (
    <label htmlFor="date" className="flex justify-center  items-start flex-col gap-1 w-full">
      <span style={{ fontWeight: "bold" }}>{label}</span>

      <input
        id="default-datepicker"
        value={value}
        type={type}
        min={0}
        onChange={onChange}
        className=" w-full p-3 rounded-lg border-1 border-black text-black outline-hidden placeholder:text-sm  placeholder:text-zinc-600 focus:bg-primary transition-colors duration-500 bg-white"
      />
    </label>
  ) : type === "textarea" ? (
    <label>
      <span style={{ fontWeight: "bold" }}>{label}</span>
      <textarea
        className="w-full h-24 outline-hidden p-3 border-1 border-black placeholder:text-zinc-600 rounded-lg placeholder:text-sm  text-black focus:bg-primary transition-colors duration-500 bg-white"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange && onChange(e)}
      ></textarea>
    </label>
  ) : type === "file" ? (
    <label htmlFor="file" className="flex justify-center items-start flex-col gap-1 w-full">
      <span style={{ fontWeight: "bold" }}>{label}</span>
      <span className="border-1 border-black flex justify-center items-center gap-3 w-full p-3 hover:bg-primary transition-colors duration-500 rounded-lg font-bold text-zinc-600 hover:text-black text-center cursor-pointer  bg-white">
        <IoIosCloudUpload className=" text-xl" />
        Tải hình ảnh
      </span>
      <input type={type} name="image" accept="image/*" id="file" min={0} placeholder={placeholder} className="hidden" onChange={onChange} multiple />
    </label>
  ) : (
    <label htmlFor="email" className="flex justify-center  items-start flex-col gap-1 w-full">
      <span style={{ fontWeight: "bold" }}>{label}</span>
      <input
        type={type}
        id="email"
        min={0}
        placeholder={placeholder}
        onChange={onChange}
        className=" w-full p-3 rounded-lg border-1 border-black text-black outline-hidden placeholder:text-sm  placeholder:text-zinc-600 focus:bg-primary transition-colors duration-500 bg-white"
      />
    </label>
  );
}
