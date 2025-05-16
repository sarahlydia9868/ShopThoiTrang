import { useEffect, useState } from "react";
import Footer from "../../components/Footer";

import CategoryHeader from "../../components/modules/CategoryHeader";
import NavBar from "../../components/NavBar";
import Panel from "../../components/Panel";
import Button from "../../components/modules/Button";
import { IOrderDetailsRoot } from "../../redux/reducers/order";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getOrderDetails, updateOrder } from "../../actions/order";
import { useNavigate, useParams } from "react-router-dom";
import ToastAlert from "../../components/modules/ToastAlert";
import TopUp from "../../components/modules/TopUp";

const formatDate = (isoString: string, addMinutes: number = 0) => {
  const date = new Date(isoString);

  date.setMinutes(date.getMinutes() + addMinutes);

  const day = date.getDate().toString().padStart(2, "0");
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} tháng ${month}, ${year} ${hours}:${minutes}pm`;
};

export default function OrderDetailPage() {
  const { orderID } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { order } = useSelector((state: RootState) => state.myOrderDetails) as IOrderDetailsRoot;
  const orderProcess = order?.progress ?? "Chờ xác nhận";
  const [toastAlertText, setToastAlertText] = useState<string>("");
  const [openToastAlert, setOpenToastAlert] = useState<boolean>(false);
  const [isToastAlertOK, setIsToastAlertOK] = useState<boolean>(false);

  const { isUpdated } = useSelector((state: RootState) => state.updateOrder);
  const navigate = useNavigate();
  const cancelSubmit = () => {
    navigate(`/account/order-cancel/${orderID}`);
  };

  const orderSubmit = (e: any) => {
    e.preventDefault();
    dispatch(updateOrder(orderID!, "Đã giao"));
  };

  useEffect(() => {
    if (isUpdated) {
      setIsToastAlertOK(true);
      setToastAlertText("Đã xác nhận");
      setOpenToastAlert(true);
      setTimeout(() => {
        setOpenToastAlert(false);
      }, 3000);
    }
    dispatch(getOrderDetails(orderID!));
  }, [dispatch, getOrderDetails, orderID, isUpdated]);

  return (
    <div className="min-h-screen">
      <NavBar />
      <TopUp />
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
                {orderProcess !== "Đã giao" && orderProcess !== "Đã huỷ" && (
                  <div className="flex items-center gap-4 mb-6" onClick={orderProcess === "Chờ xác nhận" ? cancelSubmit : orderSubmit}>
                    <Button text={orderProcess === "Chờ xác nhận" ? "Huỷ đơn hàng" : "Đã nhận hàng"} padding="px-4 py-2" bgColor="black"></Button>
                  </div>
                )}

                <div className="flex items-center gap-4 mb-6 border-b border-gray-200 pb-2">
                  <button className="text-red-500 text-lg border-b-2 border-rose-600 pb-2">Lịch sử giao hàng</button>
                </div>
                <div className="space-y-6 mt-6">
                  {orderProcess === "Chờ xác nhận" ? (
                    <div className="relative pl-16">
                      <div className="pt-8">
                        <div className="absolute left-0 w-5 h-5 border-2 border-gray-300 rounded-full bg-white flex items-center justify-center">
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        </div>
                        <p className="font-semibold">Chờ xác nhận</p>
                        <p className="text-sm text-gray-500">{formatDate(order!["createdAt"])}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative pl-16">
                      {orderProcess === "Đã giao" && (
                        <>
                          <div className="absolute left-0 w-5 h-5 border-2 border-emerald-500 rounded-full bg-white flex items-center justify-center">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          </div>
                          <div className="absolute left-2 top-6 bottom-9 border-l-2 border-gray-300 border-dashed"></div>
                          <p className="font-semibold">Đã giao</p>
                          <p className="text-sm text-gray-500">{formatDate(order!["createdAt"], 3929)}</p>
                          <div className="pt-8">
                            <div className="absolute left-0 w-5 h-5 border-2 border-gray-300 rounded-full bg-white flex items-center justify-center">
                              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                            </div>
                            <p className="font-semibold">Đang giao hàng</p>
                            <p className="text-sm text-gray-500">{formatDate(order!["createdAt"], 251)}</p>
                          </div>
                          <div className="pt-8">
                            <div className="absolute left-0 w-5 h-5 border-2 border-gray-300 rounded-full bg-white flex items-center justify-center">
                              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                            </div>
                            <p className="font-semibold">Đã gửi đơn</p>
                            <p className="text-sm text-gray-500">{formatDate(order!["createdAt"], 242)}</p>
                          </div>
                        </>
                      )}

                      {orderProcess === "Đang giao hàng" && (
                        <>
                          <div className="absolute left-0 w-5 h-5 border-2 border-emerald-500 rounded-full bg-white flex items-center justify-center">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          </div>
                          <div className="absolute left-2 top-6 bottom-9 border-l-2 border-gray-300 border-dashed"></div>
                          <p className="font-semibold">Đang giao hàng</p>
                          <p className="text-sm text-gray-500">{formatDate(order!["createdAt"], 193)}</p>
                          <div className="pt-8">
                            <div className="absolute left-0 w-5 h-5 border-2 border-gray-300 rounded-full bg-white flex items-center justify-center">
                              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                            </div>
                            <p className="font-semibold">Đã gửi đơn</p>
                            <p className="text-sm text-gray-500">{formatDate(order!["createdAt"], 168)}</p>
                          </div>
                        </>
                      )}

                      {orderProcess === "Đã huỷ" && (
                        <>
                          <div className="absolute left-0 w-5 h-5 border-2 border-red-500 rounded-full bg-white flex items-center justify-center">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          </div>
                          <div className="absolute left-2 top-6 bottom-9 border-l-2 border-gray-300 border-dashed"></div>
                          <p className="font-semibold">Đã huỷ</p>
                          <p className="text-sm text-gray-500">{formatDate(order!["updatedAt"])}</p>
                        </>
                      )}

                      <div className="pt-8">
                        <div className="absolute left-0 w-5 h-5 border-2 border-gray-300 rounded-full bg-white flex items-center justify-center">
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        </div>
                        <p className="font-semibold">Chờ xác nhận</p>
                        <p className="text-sm text-gray-500">{formatDate(order!["createdAt"])}</p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div>Không tìm thấy đơn hàng</div>
            )}
          </div>
        </div>
      </div>
      <ToastAlert text={toastAlertText} isOk={isToastAlertOK} isOpen={openToastAlert} />
      <Footer />
    </div>
  );
}
