import { useCallback, useEffect, useState } from "react";
import CategoryHeader from "../components/modules/CategoryHeader";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Button from "../components/modules/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { BsFillHouseAddFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import ToastAlert from "../components/modules/ToastAlert";
import { clearErrors, createOrder } from "../actions/order";
import { updateItems } from "../actions/user";
import TopUp from "../components/modules/TopUp";

export default function CheckOut() {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [indexAddress, setIndexAddress] = useState<number>(-1);
  const [toastAlertText, setToastAlertText] = useState<string>("");
  const [openToastAlert, setOpenToastAlert] = useState<boolean>(false);
  const [isToastAlertOK, setIsToastAlertOK] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.user);
  const { order, message, success } = useSelector((state: RootState) => state.order);

  const address = user?.address;
  const cart = user?.cartItems ?? [];

  const [shipping, setShipping] = useState<number>(0);
  const [payment, setPayment] = useState<string>("Thanh toán khi nhận hàng");

  const calcTotalPrice = useCallback(() => {
    if (cart.length) {
      const tPrice = cart.reduce((total, item) => total + item.price * item.qty, 0) + shipping;
      setTotalPrice(tPrice);
    } else {
      setTotalPrice(0);
    }
  }, [cart, shipping]);

  useEffect(() => {
    calcTotalPrice();
  }, [calcTotalPrice]);

  useEffect(() => {
    if (success && message) {
      dispatch(clearErrors());
      dispatch(updateItems(user?._id, [], user?.wishList!));
      navigate(`/account/order-confirmation/${order?._id}`);
    }
  }, [success, message, dispatch, navigate, order?._id]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (indexAddress === -1) {
      setIsToastAlertOK(false);
      setToastAlertText(address?.length === 0 ? "Vui lòng thêm địa chỉ" : "Vui lòng chọn địa chỉ");
      setOpenToastAlert(true);
      setTimeout(() => {
        setOpenToastAlert(false);
      }, 3000);
      return;
    }
    dispatch(createOrder(cart, address![shipping], totalPrice, user?._id));
  };

  return (
    <>
      <NavBar />
      <TopUp />
      <CategoryHeader label="Thanh Toán" path="Thanh toán" />
      <div className="container mx-auto flex justify-center items-start flex-wrap gap-10 my-20">
        <div className="flex-1/2">
          <div className={`grid grid-cols-1 ${address?.length === 0 ? "-mt-20" : "md:grid-cols-2"} gap-6`}>
            {address?.length === 0 ? (
              <div className="mx-5 flex-1 p-8 mt-20">
                <p className="text-gray-600">Chưa có địa chỉ giao hàng, bạn cần thêm địa chỉ trước.</p>
              </div>
            ) : (
              address?.map((shippingAddres: ShippingAddress, index: number) => (
                <div key={index} className={`border p-4 rounded-xl px-10 ${indexAddress === index ? "bg-rose-100 border-red-500" : "border-gray-300  bg-white"}`}>
                  <h2 className="text-lg font-semibold mb-2">Địa chỉ giao hàng</h2>
                  <p>{shippingAddres.name}</p>
                  <p>Sđt: {shippingAddres.phoneNumber}</p>
                  <p>{shippingAddres.specificAddress}</p>
                  <p>
                    {shippingAddres.commune}, {shippingAddres.district}, {shippingAddres.province}
                  </p>
                  <button className="mt-4 flex gap-2" onClick={() => setIndexAddress(index)}>
                    <Button text="Chọn" padding="px-3 py-1" />
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="border-2 border-dashed border-red-300 bg-white mt-8 p-8 rounded-xl flex flex-col items-center justify-center">
            <div className="bg-red-500 text-white w-20 h-20 rounded-full flex items-center justify-center mb-4">
              <BsFillHouseAddFill className="w-8 h-8" />
            </div>
            <p className="text-xl font-semibold mb-4">Thêm địa chỉ mới</p>
            <Link to="/account/shipping-address">
              <Button text="Thêm" padding="px-4 py-2" />
            </Link>
          </div>
        </div>
        <div className="flex-1/3 flex-col w-120">
          <span className="font-bold text-lg mb-2">Đơn Hàng Của Bạn</span>
          <div className="flex gap-8 flex-col p-7 border-1 border-black w-120 mt-6 rounded-2xl hover:shadow-xl transition-all duration-500">
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="flex items-center gap-4 border-b border-gray-200">
                  <img src={item.image} alt={item.name} className="max-h-20 rounded-xl mb-4" />
                  <div className="flex-1 font-bold">
                    <p>{item.name}</p>
                  </div>
                  <p>{item.price.toLocaleString("vi-VN")}đ</p>
                </div>
              ))}
            </div>
            <h2 className="text-lg font-semibold mb-2">Phương thức vận chuyển</h2>
            <div className="-mt-4">
              <div className={`flex items-center gap-2 py-3 cursor-pointer ${shipping === 0 ? "font-bold" : ""}`} onClick={() => setShipping(0)}>
                <input type="radio" checked={shipping === 0} readOnly />
                Vận chuyển bình thường: 0đ
              </div>
              <div className={`flex items-center gap-2 py-3 cursor-pointer ${shipping === 35.0 ? "font-bold" : ""}`} onClick={() => setShipping(35.0)}>
                <input type="radio" checked={shipping === 35.0} readOnly />
                Vận chuyển hoả tốc: 35.000đ
              </div>
            </div>
            <p className="flex justify-between">
              Tổng <span>{totalPrice.toLocaleString("vi-VN")}đ</span>
            </p>
            <div className="border-1 border-gray-200"></div>
            <h2 className="text-lg font-semibold mb-2">Phương thức thanh toán</h2>
            <div className="-mt-4">
              <div
                className={`flex items-center gap-2 py-3 cursor-pointer ${payment === "Thanh toán khi nhận hàng" ? "font-bold" : ""}`}
                onClick={() => setPayment("Thanh toán khi nhận hàng")}
              >
                <input type="radio" checked={payment === "Thanh toán khi nhận hàng"} readOnly />
                Thanh toán khi nhận hàng
              </div>
              <div
                className={`flex items-center gap-2 py-3 cursor-pointer ${payment === "Thanh toán qua VNPay" ? "font-bold" : ""}`}
                onClick={() => setPayment("Thanh toán qua VNPay")}
              >
                <input type="radio" checked={payment === "Thanh toán qua VNPay"} readOnly />
                Thanh toán qua VNPay
              </div>
            </div>
            <button onClick={submit}>
              <Button text="Đặt Hàng" padding="px-4 py-2" bgColor="black" />
            </button>
          </div>
        </div>
      </div>
      <ToastAlert text={toastAlertText} isOk={isToastAlertOK} isOpen={openToastAlert} />
      <Footer />
    </>
  );
}
