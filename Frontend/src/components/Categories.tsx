import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import SpinnerIcon from "./modules/SpinnerIcon";
import { useWindowDimensions } from "../utils/hooks";

export default function Categories() {
  const { width } = useWindowDimensions();
  const screenWidth = width * 4 / 6;
  const bannerHeight = Math.round(screenWidth / 2049 * 779) < 200 ? 200 : Math.round(screenWidth / 2049 * 779);
  return (
    <div
      data-aos="fade-up"
      className="flex justify-center items-center md:flex-row flex-col w-full h-full min-h-[320px]"
    >
      <div className="relative bg-rose-100 md:w-4/6 w-full h-full after:absolute after:bg-[url('/images/svg/category.svg')] after:bg-no-repeat after:top-0 after:w-full after:h-full" style={{ height: `${bannerHeight}px` }} >
        <Swiper
          effect={"coverflow"}
          loop={true}
          autoplay={true}
          speed={3000}
          centeredSlides={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: false,
          }}
          modules={[Autoplay, EffectCoverflow]}
          className="mySwiper h-full"
        >
          <SwiperSlide className="w-full" >
            <img src="/images/banner/banner1.jpg"/>
          </SwiperSlide>
          <SwiperSlide className="w-full">
            <img src="/images/banner/banner2.jpg"/>
          </SwiperSlide>
          <SwiperSlide className="w-full">
            <img src="/images/banner/banner3.jpg"/>
          </SwiperSlide>
          <SwiperSlide className="w-full">
            <img src="/images/banner/banner4.jpg"/>
          </SwiperSlide>
          <SwiperSlide className="w-full">
            <img src="/images/banner/banner5.jpg"/>
          </SwiperSlide>
          <SwiperSlide className="w-full">
            <img src="/images/banner/banner6.jpg"/>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className={`flex justify-between items-center gap-3 bg-companies-bg md:w-2/6 w-full p-16`} style={{ height: `${bannerHeight}px` }} >
        <div className="text-white">
          <p className="text-5xl max-w-96 font-semibold leading-snug">
          Fashion Store
          </p>
          <p className="max-w-64 text-xl leading-loose">
            Thương hiệu thời trang cho phái nữ
          </p>
        </div>
        <div className="hidden md:block">
          <SpinnerIcon color="text-white" />
        </div>
      </div>
    </div>

  );
}
