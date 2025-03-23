import CategoryHeader from "../components/modules/CategoryHeader";
import { VscSettings } from "react-icons/vsc";
import { BiSort } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import ProductBox, { IProductBox } from "../components/modules/ProductBox";
import Footer from "../components/Footer";
import FormInput from "../components/modules/FormInput";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import TopUp from "../components/modules/TopUp";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { ICollections } from "../components/AdminCollections";

interface IShop {
  label: string;
  products: IProductBox[];
}

export default function Shop({ label, products }: IShop) {
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const allProducts = useSelector((state: RootState) => state.products);

  const [orderedProducts, setOrderedProducts] = useState<IProductBox[]>();
  const [status, setStatus] = useState<string>("all");

  return (
    <>
      <NavBar />
      <TopUp />
      <CategoryHeader label={label} path="Cửa Hàng" />
      <div className=" container mx-auto px-10 relative flex justify-between items-start  py-10">
        <div
          className={` lg:flex  gap-8 lg:w-96 fixed ${
            isOpenFilter ? "-bottom-[20.7rem]" : "-bottom-0"
          }  right-0 left-0 border-t-1 lg:border-0  border-black rounded-t-3xl p-5 lg:p-0 z-50 w-full  lg:sticky lg:top-24 transition-all duration-500 `}
        >
          <div className=" flex justify-center items-center lg:items-start flex-col gap-10 w-full">
            <div className="flex items-start flex-col w-full ">
              <span className=" flex justify-center items-center gap-1 text font-bold">
                <VscSettings />
                Bộ Lọc
              </span>
              <div className=" relative w-full">
                <FormInput type="search" placeholder="Tìm kiếm" />
                <IoIosSearch className=" absolute right-3 bottom-4 text-xl cursor-pointer" />
              </div>
            </div>
            <div className="flex items-start flex-col w-full ">
              <span className=" flex justify-center items-center gap-1 text font-bold">
                <BiSolidCategoryAlt />
                Danh Mục
              </span>
              <div className=" flex flex-col gap-3 mt-5 w-full h-32 overflow-y-auto">
                {[]?.map((collection: ICollections) => (
                  <div className=" flex justify-between items-center  cursor-pointer hover:text-purple-400 transition-colors ">
                    <span className=" capitalize text-sm">{collection.title}</span>
                    <span>({collection.products_count})</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={` lg:hidden absolute -top-7 ${
                isOpenFilter ? "rotate-0 hover:-translate-y-3" : "-rotate-180 hover:translate-y-2"
              }  bg-black  cursor-pointer rounded-full border-1 border-black transition-all duration-500 `}
              onClick={() => setIsOpenFilter(!isOpenFilter)}
            >
              <MdOutlineKeyboardArrowUp className=" text-4xl  text-white" />
            </div>
          </div>
        </div>
        <div className=" w-full lg:mx-24">
          <div className=" flex justify-center lg:justify-between items-center flex-wrap mb-5 lg:px-5 font-bold rounded-xl ">
            <span className="flex justify-center items-center">
              <BiSort className="text-xl" />
              Sắp Xếp Theo :
            </span>
            <div className="m-3 text-center">
              <span
                className={` ${
                  status === "cheapest" && "border-b-2 rounded-sm text-purple-600 border-purple-600"
                }   p-5  cursor-pointer capitalize transition-all duration-200 border-b-2  border-primary`}
                onClick={() => setStatus("cheapest")}
              >
                Giá Tăng Dần
              </span>
              <span
                className={` ${
                  status === "expensive" && "border-b-2 rounded-sm text-purple-600 border-purple-600"
                } p-5 cursor-pointer capitalize transition-all duration-200 border-b-2  border-primary`}
                onClick={() => setStatus("expensive")}
              >
                Giá Giảm Dần
              </span>
              <span
                className={` ${
                  status === "all" && "border-b-2 rounded-sm text-purple-600 border-purple-600"
                } p-5 cursor-pointer capitalize transition-all duration-200 border-b-2  border-primary`}
                onClick={() => setStatus("all")}
              >
                Mới Nhất
              </span>
            </div>
          </div>
          <div className=" flex justify-center items-start gap-5 flex-wrap">
            {products?.map((product: IProductBox) => (
              <ProductBox key={product.id} {...product} />
            ))}
          </div>
          <div className=" flex justify-center lg:justify-between  items-center flex-wrap gap-10 w-full mt-10">
            <span className=" text-sm text-center">Hiện thị 1–5 trên 50 sản phảm</span>
            <div className="">
              <span className=" mx-1 border-1 border-black rounded-full px-3 py-1 lg:px-6 lg:py-2 hover:bg-black hover:text-white cursor-pointer transition-colors duration-300">
                Trước
              </span>
              <span className=" mx-1 border-1 border-black rounded-full px-3 py-1 lg:px-6 lg:py-2 hover:bg-black hover:text-white cursor-pointer transition-colors duration-300">
                Sau
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
