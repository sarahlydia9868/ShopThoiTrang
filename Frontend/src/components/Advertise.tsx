import Button from "./modules/Button";
import AdvertiseBox from "./modules/AdvertiseBox";
export default function Advertise() {
  return (
    <div className=" container mx-auto flex justify-center lg:justify-evenly items-center lg:flex-row flex-col lg:h-[33rem] my-24">
      <div className=" relative h-full  ">
        <img
          src="/images/advertise/advertise1.jpeg"
          alt="media"
          className=" z-10 md:mask  max-h-[640px]"
        />
        <div className=" absolute left-16  bottom-1">
          <Button text={"Đầm sát nách"} padding="px-3 py-3" bgColor={"white"} />
        </div>
      </div>
      <div
        data-aos="fade-left"
        className=" flex justify-center lg:items-center items-start flex-col gap-6 lg:p-0 p-5  "
      >
        <div className=" flex justify-center items-start flex-col gap-3 pt-5">
          <span className=" font-bold text-3xl max-w-[30rem]">
            {" "}
            Trang phục trong ngày
          </span>
          <span className=" max-w-[35rem] text-lg">
            {" "}
            Không chỉ là việc mặc những bộ quần áo mặc thường ngày, mà bạn còn
            phải mix theo phong cách của riêng mình tạo một style theo cá tính
            của mình. Ngoài một style đẹp, bạn cần phải có cho mình một
            backgruop thật ngầu để làm nổi bật lên những bộ quần áo thường ngày
            của mình.
          </span>
        </div>
        <div className=" flex justify-center items-center lg:flex-row  flex-col gap-8 w-full">
          <AdvertiseBox
            text="Áo sơ mi cổ đức"
            image="/images/advertise/advertise2.jpeg"
          />
          <AdvertiseBox
            text="Áo tweed cổ tròn"
            image="/images/advertise/advertise3.jpeg"
          />
        </div>
      </div>
    </div>
  );
}
