import Footer from "../../components/Footer";
import { FaCamera } from "react-icons/fa";

import CategoryHeader from "../../components/modules/CategoryHeader";
import NavBar from "../../components/NavBar";
import FormInput from "../../components/modules/FormInput";
import Panel from "../../components/Panel";
import Button from "../../components/modules/Button";

export default function Profile() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="relative">
        <CategoryHeader label="Hồ Sơ Của Tôi" path="Cài đặt tài khoản" />
        <div className="container mx-auto px-30 relative flex items-start py-10 -mt-30 z-10 gap-6">
          <Panel/>
          <div className="mx-5 flex-1 p-8 rounded-3xl mt-30 border border-gray-300 bg-[#fdf7f2]">
            <div className="mx-5 flex items-center bg-[#fdf7f2] w-full">
              <div className=" relative w-30 h-30">
                <img src="/images/profile.jpg" alt="John Doe" className="w-30 h-30 object-cover rounded-full border-5 border-white" />
                <button
                  type="button"
                  className="absolute top-0 left-0 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md ring-3 ring-white
                  -translate-x-1/5 -translate-y-1/5"
                >
                  <FaCamera />
                </button>
              </div>
              <div className="ml-4 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-black">Sarah Lydia</h2>
                <p className="text-black text-lg font-medium">
                  Tên đăng nhập:<span className="px-2 text-red-500">shopthoitrang</span>
                </p>
              </div>
            </div>

            <hr className="my-4 border-gray-300 " />
            <form className="grid grid-cols-2 gap-6">
              <FormInput type="text" label="Họ và tên" placeholder="Tên" />
              <FormInput type="text" label="Địa chỉ email" placeholder={"Email"} />
              <FormInput type="number" label="Số điện thoại" placeholder={"0366241589"} />
              <FormInput type="date" label="Ngày sinh" placeholder={"Email"} />
              <div className="col-span-2 flex justify-end">
                <Button text="Lưu" padding="px-4 py-2" bgColor="white"/>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
