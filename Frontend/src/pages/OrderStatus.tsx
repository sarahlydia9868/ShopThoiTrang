import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Button from "../components/modules/Button";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { updateOrder } from "../actions/order";
export default function OrderStatus() {
  const { orderID } = useParams();
  const [searchParams] = useSearchParams();
  const transactionStatus = searchParams.get('vnp_TransactionStatus'); 
  const isComfirmOrder = transactionStatus === "00";
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (transactionStatus === "02") {
      dispatch(updateOrder(orderID!, "Đã huỷ"));
    }
    else if (!transactionStatus) {
      navigate(`/`);
    }
  }, [transactionStatus, updateOrder, orderID]);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="container mx-auto  flex-wrap  gap-10 my-20">
          <div className="mx-5 flex-1 p-8 rounded-3xl border border-gray-300 bg-[#fdf7f2]">
            <img src={isComfirmOrder ? "/images/congratulation.png" : "/images/failed.png"} alt="Order Success" className="h-80 mx-auto mb-6" />
            <h2 className="text-2xl flex justify-center item-center font-bold mb-2">{isComfirmOrder ? "Đặt hàng thành công" : "Đặt hàng thất bại"}</h2>
            <p className="text-base flex justify-center item-center text-gray-500 mb-6">{`ID Đơn Hàng: ${orderID}`}</p>
            {!isComfirmOrder && transactionStatus === "02" ? (
              <>
                <p className="text-xl flex justify-center item-center mb-6">{`Đơn hàng của bạn chưa được thanh toán`}</p>
              </>
            ) : (
              <></>
            )}
            <div className="flex justify-center gap-4 mt-10">
              <Link to={`/account/order/${orderID}`}>
                <Button text="Xem đơn hàng" padding="px-4 py-2" bgColor="black" />
              </Link>
              <Link to="/">
                <Button text="Trở về trang chính" padding="px-4 py-2" />
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
