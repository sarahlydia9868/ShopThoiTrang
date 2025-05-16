import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface IPAdminLink {
  icon: ReactNode;
  text: string;
  pathName: string;
}

export default function PAdminLink({ icon, text, pathName }: IPAdminLink) {
  const location = useLocation();
  return (
    <NavLink to={pathName} className={(link) => (link.isActive ? "text-red-500" : " text-black" )}>
      <div className={location.pathname.startsWith("/admin/product-modify") && pathName == "/admin/products" ? "text-red-500" : ""}>
      <div className="flex justify-center items-center flex-col gap-1  text-center group cursor-pointer ">
        <div className="  group-hover:text-secondary transition-colors duration-300 ">{icon}</div>
        <span className=" text-xs font-bold uppercase">{text}</span>
      </div>
      </div>
    </NavLink>
  );
}
