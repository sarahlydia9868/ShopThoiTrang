import SectionHeader from "./modules/SectionHeader";
import PopularFilterItem from "./modules/PopularFilterItem";
import ProductBox from "./modules/ProductBox";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { clearErrors, getProduct } from "../actions/product";

export default function Popular() {
  const dispatch = useDispatch<AppDispatch>();

  const [category, setCategory] = useState<string>("Tất cả");
  const { products, error } = useSelector((state: RootState) => state.products);
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProduct({ category: category === "Tất cả" ? undefined : category }));
  }, [dispatch, category, error]);

  return (
    <div data-aos="fade-up" className="flex justify-center items-center md:flex-row flex-col w-full h-full min-h-[320px]">
      <div className=" container mx-auto my-24 ">
        <div className=" flex justify-between md:flex-row flex-col gap-3 items-center">
          <SectionHeader text="Sản Phẩm Bán Chạy" />
          <div className="mx-10 flex gap-4 p-1.5 border-1 border-black rounded-full">
            <button
              onClick={() => {
                setCategory("Tất cả");
              }}
            >
              <PopularFilterItem isSelected={category === "Tất cả"} text="Tất cả" />
            </button>
            <button
              onClick={() => {
                setCategory("Đầm");
              }}
            >
              <PopularFilterItem isSelected={category === "Đầm"} text="Đầm" />
            </button>
            <button
              onClick={() => {
                setCategory("Áo");
              }}
            >
              <PopularFilterItem isSelected={category === "Áo"} text="Áo" />
            </button>
            <button
              onClick={() => {
                setCategory("Quần");
              }}
            >
              <PopularFilterItem isSelected={category === "Quần"} text="Quần" />
            </button>
            <button
              onClick={() => {
                setCategory("Váy");
              }}
            >
              <PopularFilterItem isSelected={category === "Váy"} text="Váy" />
            </button>
          </div>
        </div>
        <div className=" flex justify-center items-start flex-wrap gap-8 p-12 mx-auto ">
          {products?.map((product: ProductModel) => (
            <ProductBox id={product._id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
