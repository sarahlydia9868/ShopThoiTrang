import { useState } from "react";
import Footer from "../../components/Footer";
import CategoryHeader from "../../components/modules/CategoryHeader";
import NavBar from "../../components/NavBar";
import Panel from "../../components/Panel";
import FormInput from "../../components/modules/FormInput";
import { FaRegCreditCard } from "react-icons/fa6";
import Button from "../../components/modules/Button";

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="relative">
        <CategoryHeader label="Ngân hàng" path="Tài khoản" />
        <div className="container mx-auto px-30 relative flex items-start py-10 -mt-30 z-10 gap-6">
          <Panel />
          <div className="mx-5 flex-1 p-8 rounded-3xl mt-30 border border-gray-300">
            <h2 className="text-2xl font-bold mb-8 mx-1">Ngân hàng</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <label
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${
                  paymentMethod === "paypal" ? "border-black" : "border-gray-300 hover:border-gray-500"
                }`}
              >
                <div className="flex items-center gap-2">
                  <img src="/images/logo-vnpay.png" className="w-10" alt="vnpay" /> <span className="text-sm">VNPay</span>
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={handlePaymentChange}
                  className="cursor-pointer transform scale-175"
                />
              </label>

              {/* Credit/Debit Card */}
              <label
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${
                  paymentMethod === "credit" ? "border-black" : "border-gray-300 hover:border-gray-500"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FaRegCreditCard className="text-2xl" />
                  <span className="text-sm">Thẻ ghi nợ/ Thẻ tín dụng</span>
                </div>
                <input type="radio" name="paymentMethod" value="credit" checked={paymentMethod === "credit"} onChange={handlePaymentChange} className="cursor-pointer " />
              </label>
            </div>

            {paymentMethod === "credit" && (
              <div className="grid grid-cols-1 gap-4 mb-6">
                <FormInput label="Mã số thẻ" type="number" placeholder="1234 4567 8910 1112" onChange={setCardNumber} />
                <FormInput label="Ngày hết hạn" type="date" onChange={setExpiryDate} />
                <FormInput label="CVC/CVV" type="number" placeholder="1234" onChange={setCvc} />
              </div>
            )}
            <div className="max-w-28">
              <Button text="Xác Nhận" padding="px-4 py-2" bgColor="black" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
