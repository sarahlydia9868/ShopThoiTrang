import { useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosCloudUpload } from "react-icons/io";

interface IFormInput {
  label?: string;
  type: string;
  placeholder: string;
  onChange?: (e: any) => void;
}

export default function FormInput({ label, type, placeholder, onChange }: IFormInput) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return type === "password" ? (
    <label htmlFor="password" className="relative flex justify-center items-start flex-col gap-1 w-full">
      <span style={{ fontWeight: "bold" }}>{label}</span>
      <input
        type={isShowPassword ? "text" : "password"}
        id="password"
        onChange={onChange}
        placeholder={placeholder}
        className=" w-full p-3 rounded-lg placeholder:text-sm  border-1 border-black text-black outline-hidden  placeholder:text-zinc-600 focus:bg-primary transition-colors duration-500 bg-white"
      />
      <div className=" absolute right-3 bottom-[0.8rem]">
        {isShowPassword ? (
          <div className="" onClick={() => setIsShowPassword(!isShowPassword)}>
            <IoIosEyeOff className=" text-2xl  bg-primary cursor-pointer" />
          </div>
        ) : (
          <div className="" onClick={() => setIsShowPassword(!isShowPassword)}>
            <IoIosEye className=" text-2xl bg-primary cursor-pointer" />
          </div>
        )}
      </div>
    </label>
  ) : type === "text" ? (
    <label htmlFor="text" className="flex justify-center  items-start flex-col gap-1 w-full">
      <span style={{ fontWeight: "bold" }}>{label}</span>
      <input
        type={type}
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
        id="number"
        min={0}
        placeholder={placeholder}
        onChange={onChange}
        className=" w-full p-3 rounded-lg border-1 border-black text-black outline-hidden placeholder:text-sm  placeholder:text-zinc-600 focus:bg-primary transition-colors duration-500 bg-white"
      />
    </label>
  ) : type === "number" ? (
    <label htmlFor="date" className="flex justify-center  items-start flex-col gap-1 w-full">
      <span style={{ fontWeight: "bold" }}>{label}</span>

      <input
        id="default-datepicker"
        type={type}
        min={0}
        placeholder={placeholder}
        onChange={onChange}
        className=" w-full p-3 rounded-lg border-1 border-black text-black outline-hidden placeholder:text-sm  placeholder:text-zinc-600 focus:bg-primary transition-colors duration-500 bg-white"
      />
    </label>
  ) : type === "textarea" ? (
    <label>
      <span style={{ fontWeight: "bold" }}>{label}</span>
      <textarea
        className="w-full h-48 outline-hidden p-3 border-1 border-black placeholder:text-zinc-600 rounded-lg placeholder:text-sm  text-black focus:bg-primary transition-colors duration-500 bg-white"
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e)}
      ></textarea>
    </label>
  ) : type === "file" ? (
    <label htmlFor="file" className="flex justify-center items-start flex-col gap-1 w-full">
      <span style={{ fontWeight: "bold" }}>{label}</span>
      <span className="flex justify-center items-center gap-3 w-full p-3 hover:bg-primary transition-colors duration-500 rounded-lg font-bold text-zinc-600 hover:text-black text-center cursor-pointer ">
        <IoIosCloudUpload className=" text-xl" />
        Tải hình ảnh
      </span>
      <input type={type} id="file" min={0} placeholder={placeholder} className="hidden" onChange={onChange} multiple />
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
