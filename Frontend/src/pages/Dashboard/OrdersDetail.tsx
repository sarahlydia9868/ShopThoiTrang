import { useEffect } from "react";
import Footer from "../../components/Footer";

import CategoryHeader from "../../components/modules/CategoryHeader";
import NavBar from "../../components/NavBar";
import Panel from "../../components/Panel";
import { formatDate } from "./Orders";
import Button from "../../components/modules/Button";
import { IOrderDetailsRoot } from "../../redux/reducers/order";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getOrderDetails } from "../../actions/order";
import { useParams } from "react-router-dom";

export default function OrderDetailPage() {
  const { orderID } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { order } = useSelector((state: RootState) => state.myOrderDetails) as IOrderDetailsRoot;
  console.log(order?.cartItems!);
  useEffect(() => {
    dispatch(getOrderDetails(orderID!));
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="relative">
        <CategoryHeader label="Đơn Hàng" path="Bảng điều khiển" />
        <div className="container mx-auto px-30 relative flex items-start py-10 -mt-30 z-10 gap-6">
          <Panel />
          <div className="mx-5 flex-1 p-8 rounded-3xl mt-30 border border-gray-300 bg-[#fdf7f2]">
            {order ? (
              <>
                <div className="space-y-4">
                  {(order?.cartItems! ?? []).map((cart: any, index) => (
                    <div key={index} className="flex items-center gap-4 border-b border-gray-200 last:border-0">
                      <img src={cart.image} alt={cart.name} className="max-h-20 rounded-xl mb-4" />
                      <div className="flex-1 font-bold ">
                        <p>{cart.name}</p>
                      </div>
                      <p className="">{cart.price.toLocaleString("vi-VN")}đ</p>
                    </div>
                  ))}
                </div>
                <hr className="my-4 border-gray-300  border-dashed " />
                <div className="grid grid-cols-2  gap-4 mb-6">
                  <div>
                    <p className="font-semibold">Thời gian đặt hàng</p>
                    <p>{formatDate(order!["createdAt"])}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Địa chỉ</p>
                    <p>
                      {order!.shippingAddress?.commune}, {order!.shippingAddress?.district}, {order!.shippingAddress?.province}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <Button text="Đã nhận hàng" padding="px-4 py-2" bgColor="black"></Button>
                  <Button text="Huỷ đơn hàng" padding="px-4 py-2"></Button>
                </div>

                <div className="flex items-center gap-4 mb-6 border-b border-gray-200 pb-2">
                  <button className="text-red-500 text-lg border-b-2 border-rose-600 pb-2">Lịch sử giao hàng</button>
                  <button className="text-lg hover:text-red-500 hover:border-red-500 after:transition-all after:ease-in-out after:duration-500 transition-all duration-300  hover:border-b-2 hover:border-black pb-2">
                    Thông tin đơn hàng
                  </button>
                </div>
                <div className="space-y-6 mt-6">
                  <div className="relative pl-16">
                    <div className="absolute left-0 w-5 h-5 border-2 border-emerald-500 rounded-full bg-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    </div>
                    <div className="absolute left-2 top-6 bottom-9 border-l-2 border-gray-300 border-dashed"></div>
                    <p className="font-semibold">Đang giao hàng</p>
                    <p className="text-sm text-gray-500">{formatDate(order!["createdAt"])} 20:13pm</p>
                    <div className="pt-8">
                      <div className="absolute left-0 w-5 h-5 border-2 border-gray-300 rounded-full bg-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      </div>
                      <p className="font-semibold">Đã gửi đơn</p>
                      <p className="text-sm text-gray-500">{formatDate(order!["createdAt"])} 13:57pm</p>
                    </div>
                    <div className="pt-8">
                      <div className="absolute left-0 w-5 h-5 border-2 border-gray-300 rounded-full bg-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      </div>
                      <p className="font-semibold">Đã nhận đơn</p>
                      <p className="text-sm text-gray-500">{formatDate(order!["createdAt"])} 13:22pm</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div>Không tìm thấy đơn hàng</div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
