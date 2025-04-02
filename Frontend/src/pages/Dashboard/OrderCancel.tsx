import Footer from "../../components/Footer";

import CategoryHeader from "../../components/modules/CategoryHeader";
import NavBar from "../../components/NavBar";
import Panel from "../../components/Panel";
import Button from "../../components/modules/Button";
import { useEffect, useState } from "react";
import { updateOrder } from "../../actions/order";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { FcOk } from "react-icons/fc";

export default function OrderCancel() {
  const { orderID } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [reason, setReason] = useState<string>("");

  const [cancelConfirm, setCancelConfirm] = useState<boolean>(false);

  const submit = (e: any) => {
    e.preventDefault();
    dispatch(updateOrder(orderID!, "Đã huỷ"));
  };

  const { isUpdated } = useSelector((state: RootState) => state.updateOrder);
  useEffect(() => {
    if (isUpdated) {
      setCancelConfirm(true);
    }
  }, [dispatch, isUpdated]);

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="relative">
        <CategoryHeader label="Huỷ đơn hàng" path="Cài đặt tài khoản" />
        <div className="container mx-auto px-30 relative flex items-start py-10 -mt-30 z-10 gap-6">
          <Panel />
          <div className="mx-5 flex-1 p-8 rounded-3xl mt-30 border border-gray-300">
            {cancelConfirm ? (
              <>
                <div className="py-8 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <FcOk className="w-30 h-30"/>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Đã huỷ đơn hàng</h2>
                  <Link to={`/account/order/${orderID}`}>
                  <div className="flex items-center justify-center">
                    <Button text="Xem trạng thái" padding="px-4 py-2" />
                  </div>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-8 mx-1">Huỷ đơn hàng</h2>
                <div className="mx-5 flex-1 p-8 ">
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
                      <button onClick={submit}>
                        <Button text="Xác nhận huỷ" padding="max-w-37 px-4 py-2" bgColor="black" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
