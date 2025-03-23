import Footer from "../../components/Footer";
import { BsFillHouseAddFill } from "react-icons/bs";

import CategoryHeader from "../../components/modules/CategoryHeader";
import NavBar from "../../components/NavBar";
import FormInput from "../../components/modules/FormInput";
import Panel from "../../components/Panel";
import Button from "../../components/modules/Button";

export default function Address() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="relative">
        <CategoryHeader label="Địa chỉ" path="Cài đặt tài khoản" />
        <div className="container mx-auto px-30 relative flex items-start py-10 -mt-30 z-10 gap-6">
          <Panel />
          <div className="mx-5 flex-1 p-8 mt-20">
            <p className="text-gray-600 mb-6">Các địa chỉ sau đây sẽ được sử dụng trên trang thanh toán theo mặc định.</p>

            {/* Hai thẻ địa chỉ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Billing Address */}
              <div className="border border-gray-300 p-4 rounded-xl px-10 bg-white">
                <h2 className="text-lg font-semibold mb-2">Địa chỉ giao hàng</h2>
                <p>Sarah Lydia</p>
                <p>Sdt: 09822328113</p>
                <p>shopthoitrang@info.com</p>

                <div className="mt-4 flex gap-2">
                  <Button text="Sửa" padding="px-3 py-1"/>
                  <Button text="Xoá" padding="px-3 py-1"/>
                </div>
              </div>
              </div>
            <div className="border-2 border-dashed border-red-300 bg-white mt-8 p-8 rounded-xl flex flex-col items-center justify-center">
              <div className="bg-red-500 text-white w-20 h-20 rounded-full flex items-center justify-center mb-4">
                <BsFillHouseAddFill className="w-8 h-8"/>
              </div>
              <p className="text-xl font-semibold mb-4">Thêm địa chỉ mới</p>
              <Button text="Thêm" padding="px-4 py-2"/>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
