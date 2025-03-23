import { Link } from "react-router-dom";
import Button from "./modules/Button";

export default function BannerAdvertise() {
  return (
    <div
      data-aos="fade-up"
      className="flex justify-center items-center md:flex-row flex-col w-full h-full min-h-[320px]"
    >
      <div className=" flex justify-center items-center md:flex-row flex-col w-full md:h-[30rem] h-[50rem] my-28">
        <div className="relative overflow-hidden bg-[url('/images/banner/bannerAdvertise1.jpeg')] bg-center  bg-cover h-full w-full md:w-1/2">
          <div className=" absolute  top-36 right-0 lg:right-28">
            <div className=" flex justify-center items-center flex-col z-10 font-bold relative after:absolute after:bg-[url('/images/svg/shape.svg')] after:bg-no-repeat after:-left-18 after:w-[25rem] after:h-[25rem] after:-z-10">
              <span className=" text-sm uppercase">Giảm giá tới 50%</span>
              <span className=" text-4xl uppercase tracking-widest">
                Mùa Hè
              </span>
              <span className=" text-8xl uppercase">2025</span>
              <Link to="/shop-dam">
                <Button text="Mua ngay" padding="px-8 py-3" />
              </Link>
            </div>
          </div>
        </div>
        <div className=" relative overflow-hidden bg-[url('/images/banner/bannerAdvertise2.jpeg')] bg-center bg-cover h-full w-full md:w-1/2">
          <div className=" flex justify-center items-start flex-col gap-4 font-bold px-14 absolute top-24 left-0">
            <span className=" text-sm uppercase">Giảm giá tới 50%</span>
            <span className=" text-3xl lg:text-6xl max-w-96 uppercase">
              Bộ sưu tập Mùa Hè
            </span>
            <Link to="/shop-ao">
              <Button text="Mua ngay" padding="px-8 py-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
