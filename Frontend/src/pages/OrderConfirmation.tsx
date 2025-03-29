import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Button from "../components/modules/Button";
import NavBar from "../components/NavBar";

export default function OrderConfirmation() {
  const { orderID } = useParams();
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="container mx-auto  flex-wrap  gap-10 my-20">
          <div className="mx-5 flex-1 p-8 rounded-3xl border border-gray-300 bg-[#fdf7f2]">
            <img src="/images/congratulation.png" alt="Order Success" className="h-80 mx-auto mb-6" />
            <h2 className="text-2xl flex justify-center item-center font-bold mb-2">Đặt Hàng Thành Công!</h2>
            <p className="text-base flex justify-center item-center text-gray-500 mb-6">{`ID Đơn Hàng: ${orderID}`}</p>
            <div className="flex justify-center gap-4 mt-10">
              <Link to={`/order/${orderID}`}>
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
