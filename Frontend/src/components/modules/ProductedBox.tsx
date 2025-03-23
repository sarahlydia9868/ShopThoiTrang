import { Link } from "react-router-dom";

interface IProductedBox {
  bgUrl: string;
  title: string;
  path: string;
}

export default function ProductedBox({ bgUrl, title, path }: IProductedBox) {
  return (
    <div className=" flex flex-col">
      <div className=" relative overflow-hidden w-80 rounded-3xl group">
        <Link to={path}>
          <img
            src={bgUrl}
            alt="bg-sponsored"
            className=" w-full group-hover:scale-110 transition-transform duration-700"
          />
        </Link>
      </div>
      <div className=" flex justify-between items-center">
        <span className=" font-bold text-lg p-2">{title}</span>
        <span className=" text-sm">Giảm 30%</span>
      </div>
    </div>
  );
}
