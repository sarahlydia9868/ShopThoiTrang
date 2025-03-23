import Button from "./modules/Button";
import { Link } from "react-router-dom";

export default function SecondAdvertise() {
  return (
    <div className='mx-6 relative flex justify-center items-center flex-col gap-9 text-center h-[75vh] bg-[url("/images/advertise/secondAd-bg.png")] bg-cover bg-no-repeat bg-center'>
      <div className="absolute inset-0 z-0 3xl:block">
        <div className="absolute top-16 left-20 animate-move-img">
          <img
            src="/images/collection/collection1.jpeg"
            alt="image"
            className="h-52 rounded-tl-[6rem]"
          />
        </div>
        <div className="absolute bottom-16 left-80 animate-move-img">
          <img
            src="/images/collection/collection2.jpeg"
            alt="image"
            className="h-52 rounded-tl-[6rem] rounded-tr-[6rem]"
          />
        </div>
        <div className="absolute top-16 right-20 animate-move-img">
          <img
            src="/images/collection/collection3.jpeg"
            alt="image"
            className="h-52 rounded-br-[6rem]"
          />
        </div>
        <div className="absolute bottom-16 right-80 animate-move-img">
          <img
            src="/images/collection/collection4.jpeg"
            alt="image"
            className="h-52 rounded-bl-[6rem] rounded-br-[6rem]"
          />
        </div>
      </div>
      <span className="text-4xl md:text-6xl font-bold max-w-[60rem] leading-tight z-10 relative">
        Nâng cấp phong cách của bạn với bộ sưu tập hàng đầu của chúng tôi.
      </span>
      <Link to="/collection">
        <Button text="Tất cả bộ sưu tập" padding="px-6 py-3" bgColor="black" />
      </Link>
    </div>
  );
}
