import { IoIosArrowForward } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { Link } from "react-router-dom";

interface IBreadCrumb {
  path: string;
}

export default function BreadCrumb({ path }: IBreadCrumb) {
  return (
    <div className=" flex justify-center items-center gap-3 font-bold">
      <Link to={"/"}>
        <span className=" flex justify-center items-center gap-1 hover:text-red-500 transition-colors">
          <GoHomeFill className="mb-0.5" />
          Trang chủ
        </span>
      </Link>
      <IoIosArrowForward />
      <span className=" flex justify-center items-center capitalize">
        {path}
      </span>
    </div>
  );
}
