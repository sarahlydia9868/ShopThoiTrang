import SectionHeader from "./modules/SectionHeader";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { clearErrors } from "../actions/user";
import { getProduct } from "../actions/product";
import ProductBox from "./modules/ProductBox";
import ProductedBox from "./modules/ProductedBox";

interface IRelatedProducts {
  category: string;
}

export default function RelatedProducts({ category }: IRelatedProducts) {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error, resultPerPage } = useSelector((state: RootState) => state.products);
  const keyword = "";
  const [status, setStatus] = useState<string>("all");
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, 1, category));
  }, [dispatch, keyword, category, error]);

  const link = {
    Đầm: "shop/dam",
    Áo: "shop/ao",
    Quần: "shop/quan",
    "Chân Váy": "shop/chan-vay",
    "Áo Khoác": "shop/ao-khoac",
  };
  let sildesMax = products?.length! > 4 ? 4 : products?.length! - 1;
  const getSildesMax = (value: number, f: number) => {
    if (value - f < 1) {
      return 1;
    }
    return value - f;
  };
  return (
    <div className=" w-full">
      <div className=" flex justify-between  items-center w-full ">
        <SectionHeader text="Sản phẩm liên quan" />
        <Link to={link[category]}>
          <span className=" flex justify-center items-center text-sm font-bold capitalize cursor-pointer">
            Xem tất cả sản phẩm
            <MdKeyboardArrowRight className=" text-xl mb-0.5" />
          </span>
        </Link>
      </div>
      <div className=" flex justify-center items-center  mt-8 ">
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: getSildesMax(sildesMax, 3),
              spaceBetween: 10,
            },
            720: {
              slidesPerView: getSildesMax(sildesMax, 2),
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: getSildesMax(sildesMax, 1),
              spaceBetween: 30,
            },
            1400: {
              slidesPerView: getSildesMax(sildesMax, 0),
              spaceBetween: 40,
            },
          }}
          loop={true}
          speed={1000}
          className="mySwiper"
        >
          {products?.map((product: ProductModel) => (
            <SwiperSlide>
              <ProductBox id={product._id} {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
