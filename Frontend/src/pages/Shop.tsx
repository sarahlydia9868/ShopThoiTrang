import CategoryHeader from "../components/modules/CategoryHeader";
import { VscSettings } from "react-icons/vsc";
import { BiSort } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import ProductBox from "../components/modules/ProductBox";
import Footer from "../components/Footer";
import FormInput from "../components/modules/FormInput";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import TopUp from "../components/modules/TopUp";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { clearErrors } from "../actions/user";
import { getProduct } from "../actions/product";
import { useSearchParams } from "react-router-dom";

interface IShop {
  label: string;
  category: string;
}

export default function Shop({ label, category }: IShop) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  const { products, error, currentCount } = useSelector((state: RootState) => state.products);
  const [status, setStatus] = useState<string>("createAt");
  const isVaildPreviousPage = () => {
    return currentPage > 1;
  };

  const isVaildNextPage = () => {
    return 9 * currentPage < currentCount!;
  };

  const setPreviousPage = () => {
    if (isVaildPreviousPage()) {
      handlePageChange(currentPage - 1);
    }
  };

  const setNextPage = () => {
    if (isVaildNextPage()) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProduct({ currentPage: currentPage, category: category, sort: status }));
  }, [dispatch, currentPage, category, error, status]);

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
                  status === "price" && "border-b-2 rounded-sm text-red-600 border-red-600"
                }   p-5  cursor-pointer capitalize transition-all duration-200 border-b-2  border-primary`}
                onClick={() => setStatus("price")}
              >
                Giá Tăng Dần
              </span>
              <span
                className={` ${
                  status === "-price" && "border-b-2 rounded-sm text-red-600 border-red-600"
                } p-5 cursor-pointer capitalize transition-all duration-200 border-b-2  border-primary`}
                onClick={() => setStatus("-price")}
              >
                Giá Giảm Dần
              </span>
              <span
                className={` ${
                  status === "createAt" && "border-b-2 rounded-sm text-red-600 border-red-600"
                } p-5 cursor-pointer capitalize transition-all duration-200 border-b-2  border-primary`}
                onClick={() => setStatus("createAt")}
              >
                Mới Nhất
              </span>
            </div>
          </div>
          <div className=" flex justify-center items-start gap-5 flex-wrap">
            {products?.length === 0 ? (
              <div className="py-50 text-red-500 text-3xl">Không có sản phẩm</div>
            ) : (
              products?.map((product: ProductModel) => <ProductBox id={product._id} {...product} />)
            )}
          </div>
          <div className=" flex justify-center lg:justify-between  items-center flex-wrap gap-10 w-full mt-10">
            <span className=" text-sm text-center">{`Hiện thị ${1 + 9 * (currentPage - 1)}-${
              9 * currentPage > currentCount! ? currentCount! : 9 * currentPage
            } trên ${currentCount} sản phảm`}</span>
            <div className="">
              <span
                onClick={setPreviousPage}
                className=" mx-1 border-1 border-black rounded-full px-3 py-1 lg:px-6 lg:py-2 hover:bg-black hover:text-white cursor-pointer transition-colors duration-300"
              >
                Trước
              </span>

              <span
                onClick={setNextPage}
                className=" mx-1 border-1 border-black rounded-full px-3 py-1 lg:px-6 lg:py-2 hover:bg-black hover:text-white cursor-pointer transition-colors duration-300"
              >
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
