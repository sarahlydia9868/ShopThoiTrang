import Footer from "../../components/Footer";
import { BsFillHouseAddFill } from "react-icons/bs";

import CategoryHeader from "../../components/modules/CategoryHeader";
import NavBar from "../../components/NavBar";
import FormInput from "../../components/modules/FormInput";
import Panel from "../../components/Panel";
import Button from "../../components/modules/Button";
import { useState } from "react";

export default function OrderCancel() {
  const [reason, setReason] = useState<string>("");

  const handleSubmit = () => {
    alert(`You selected reason: ${reason}`);
  };
  const item = {
    id: 1,
    requestNo: "#1374837",
    date: "March 21, 2024",
    productName: "Collar Casual Shirt",
    quantity: 1,
    price: 105,
    imageUrl: "https://via.placeholder.com/100?text=Shirt1",
  };
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="relative">
        <CategoryHeader label="Huỷ đơn hàng" path="Cài đặt tài khoản" />
        <div className="container mx-auto px-30 relative flex items-start py-10 -mt-30 z-10 gap-6">
          <Panel />
          <div className="mx-5 flex-1 p-8 mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-300 p-4 rounded-xl px-10 bg-white">
                <img src={"item.imageUrl"} alt="product" className="w-20 h-20 object-cover border border-gray-200 rounded" />
                <div>
                  <p className="text-sm text-gray-500">
                    Request No: <span className="font-semibold">{item.requestNo}</span>
                  </p>
                  <p className="text-sm text-gray-500">{item.date}</p>
                  <h3 className="font-bold mt-2">{item.productName}</h3>
                  <p className="text-sm">Quantity: {item.quantity}</p>
                  <p className="text-lg font-semibold mt-1">${item.price}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              <div>
                <h2 className="text-lg font-semibold mb-4">Lý do huỷ </h2>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="reason" value="changed" checked={reason === "changed"} onChange={(e) => setReason(e.target.value)} />
                    <span>Tôi muốn cập nhật địa chỉ sản phẩm</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="reason" value="deliveryTime" checked={reason === "deliveryTime"} onChange={(e) => setReason(e.target.value)} />
                    <span>Thời gian đặt hàng quá lâu</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="reason" value="changeOrderType" checked={reason === "changeOrderType"} onChange={(e) => setReason(e.target.value)} />
                    <span>Tôi muốn cập nhật địa chỉ đơn hàng</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="reason" value="priceDecrease" checked={reason === "priceDecrease"} onChange={(e) => setReason(e.target.value)} />
                    <span>Giá sản phẩm đã giảm xuống</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="reason" value="purchaseElsewhere" checked={reason === "purchaseElsewhere"} onChange={(e) => setReason(e.target.value)} />
                    <span>Tôi tìm thấy chỗ mua khác tốt hơn</span>
                  </label>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Trạng thái hoàn tiền</h2>
                <p className="text-gray-600 mb-4">
                Sẽ không có hoàn lại tiền vì đơn hàng được mua bằng hình thức 
                  <span className="font-semibold"> Thanh toán khi nhận hàng</span>.
                </p>
                <Button text="Xác nhận huỷ" padding="max-w-37 px-4 py-2" bgColor="black"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
