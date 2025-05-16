import SectionHeader from "./modules/SectionHeader";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import ProductedBox from "./modules/ProductedBox";
import { Link } from "react-router-dom";

export default function ProductCategories() {
  const scrollToUpHandler = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div data-aos="fade-up" className="flex justify-center items-center md:flex-row flex-col w-full h-full min-h-[320px]">
      <div className="container mx-auto my-28">
        <div className=" flex justify-around md:justify-between flex-wrap items-center ">
          <SectionHeader text="Danh Mục Sản Phẩm" />
          <Link to="/shop/dam" onClick={scrollToUpHandler}>
            <span className=" flex justify-center items-center text-sm font-bold capitalize cursor-pointer">
              Xem tất cả
              <MdKeyboardArrowRight className=" text-xl mb-0.5" />
            </span>
          </Link>
        </div>
        <div className=" flex justify-center items-center  mt-8 ">
          <Swiper
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              720: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
              1400: {
                slidesPerView: 4,
              },
            }}
            loop={true}
            speed={1000}
            className="mySwiper"
          >
            <SwiperSlide>
              <ProductedBox bgUrl="/images/product/productCategory1.jpeg" title="Đầm" path="/shop/dam" />
            </SwiperSlide>
            <SwiperSlide>
              <ProductedBox bgUrl="/images/product/productCategory2.jpeg" title="Áo" path="/shop/ao" />
            </SwiperSlide>
            <SwiperSlide>
              <ProductedBox bgUrl="/images/product/productCategory3.jpeg" title="Quần" path="/shop/quan" />
            </SwiperSlide>
            <SwiperSlide>
              <ProductedBox bgUrl="/images/product/productCategory4.jpeg" title="Chân Váy" path="/shop/chan-vay" />
            </SwiperSlide>
            <SwiperSlide>
              <ProductedBox bgUrl="/images/product/productCategory5.jpeg" title="Áo Khoác" path="/shop/ao-khoac" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
