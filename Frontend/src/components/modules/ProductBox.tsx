import { FaRegHeart } from "react-icons/fa";
import { PiBasket } from "react-icons/pi";
import { LiaTimesCircle } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "./Button";
import UnitPrice from "./UintPrice";
import DiscountedPrice from "./DiscountedPrice";
import Tag from "./Tag";
import Loader from "./Loader";
import { ICollections } from "../AdminCollections";
export interface IProductBox {
  collection: number;
  id: number;
  images: [{ image: string }] | [];
  inventory: number;
  price_with_tax: number;
  slug: string;
  title: string;
  size?: string;
  unit_price: number;
}

export default function ProductBox({
  id,
  size,
  title,
  unit_price,
  price_with_tax,
  inventory,
  collection,
  images,
}: IProductBox) {
  const [singleCollection, setSingleCollection] = useState<ICollections>();

  const [isOpenQuickViewBox, setIsOpenQuickViewBox] = useState(false);

  const openQuickViewBoxHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsOpenQuickViewBox(!isOpenQuickViewBox);
  };
  return (
    <>
      <Link to={`/product/${id}`}>
        <div className="  flex justify-center items-center flex-col min-h-96 max-h-96">
          <div
            className={` group relative  w-full rounded-3xl overflow-hidden cursor-pointer`}
          >
            <div
              className={`flex justify-center items-start overflow-hidden w-64`}
            >
              {images ? (
                <img
                  src={images[0]?.image}
                  alt="product"
                  className=" rounded-3xl group-hover:-translate-y-16 transition-transform duration-1000 ease-in-out"
                />
              ) : (
                <Loader />
              )}
            </div>
            <div
              className={`  px-7 py-2 text-center border-4 border-primary bg-black hover:bg-red-500 rounded-full overflow-hidden absolute ${"left-[3.5rem]"}  -bottom-10 opacity-0 group-hover:opacity-100 group-hover:-bottom-1 transition-all duration-500 ease-in-out  after:absolute after:left-0  after:bottom-0 after:bg-[rgba(255,255,255,0.1)] after:border-0  hover:after:border-r-1 after:border-white  z-0 after:-z-10 after:w-0 after:h-full hover:after:w-[101%]  after:transition-all after:ease-in-out after:duration-500 `}
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                openQuickViewBoxHandler(e)
              }
            >
              <span className=" text-sm text-white uppercase">Xem Nhanh</span>
            </div>
            <div className={` absolute ${" top-2 right-2"}`}>
              <div className=" p-3 text-white bg-zinc-600 rounded-full relative overflow-hidden after:absolute after:left-0 after:bottom-0 after:bg-[rgba(255,255,255,0.1)] after:border-0  hover:after:border-r-1 after:border-white  z-0 after:-z-10 after:w-0 after:h-full hover:after:w-[105%]  after:transition-all after:ease-in-out after:duration-500">
                <FaRegHeart className=" text-xl" />
              </div>
              <div className=" mt-2 p-3 text-white bg-zinc-600 rounded-full relative overflow-hidden after:absolute after:left-0 after:bottom-0 after:bg-[rgba(255,255,255,0.1)] after:border-0  hover:after:border-r-1 after:border-white  z-0 after:-z-10 after:w-0 after:h-full hover:after:w-[105%]  after:transition-all after:ease-in-out after:duration-500">
                <PiBasket className=" text-xl" />
              </div>
            </div>
          </div>
          <div
            className={` flex justify-between items-start w-full font-bold text-lg p-2`}
          >
            <span className=" max-w-52">
              {title.length > 15 ? title.slice(0, 15) : title}
              {title.length > 10 ? "..." : null}
            </span>
            <span className="text-red-500">
              {unit_price?.toLocaleString("vi-VN")}đ
            </span>
          </div>
        </div>
      </Link>
      <div
        className={` ${
          isOpenQuickViewBox ? " visible opacity-100" : " invisible opacity-0"
        } flex justify-center items-center fixed right-0 top-0 left-0 bottom-0  bg-black/900 z-50 transition-all duration-300`}
      >
        <div className=" relative lg:w-[65rem] h-[29rem] flex flex-wrap lg:flex-nowrap justify-center items-start m-28 bg-white rounded-xl lg:overflow-hidden overflow-y-auto shadow-2xl shadow-zinc-900">
          <div className=" flex justify-center items-center h-full  w-0 lg:w-1/2">
            {images ? (
              <img src={images[0]?.image} alt="product" className=" w-full " />
            ) : (
              <Loader />
            )}
          </div>
          <div className=" p-10 w-full lg:w-1/2  flex flex-col gap-5">
            <div className=" flex justify-between items-start">
              <span className=" font-bold text-3xl">{title}</span>
              <div onClick={() => setIsOpenQuickViewBox(false)}>
                <LiaTimesCircle className=" text-3xl cursor-pointer hover:text-rose-600 transition-colors duration-300" />
              </div>
            </div>
            <span className=" text-zinc-600 text-sm">Test</span>
            <div className="">
              <UnitPrice price={unit_price} />
              <DiscountedPrice price={price_with_tax} />
            </div>
            <Link to={`/product/${id}`}>
              <Button
                padding=" p-2 text-center "
                text="Xem chi tiết"
                bgColor="white"
              />
            </Link>
            <div className=" flex flex-col gap-3 border-t-1 py-3">
              <Tag keyTag="Bộ sưu tập" valueTag={singleCollection?.title} />
              <Tag keyTag="Kho hàng" valueTag={inventory} />
              <Tag keyTag="Danh mục" valueTag="dresses" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
