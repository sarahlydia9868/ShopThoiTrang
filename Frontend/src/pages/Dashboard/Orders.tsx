import { useEffect } from "react";
import CategoryHeader from "../../components/modules/CategoryHeader";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Panel from "../../components/Panel";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { myOrders } from "../../actions/order";
import { IMyOrderRoot } from "../../redux/reducers/order";
import { IUserRoot } from "../../redux/reducers/user";

export const getStatusStyle = (status: string) => {
  switch (status) {
    case "Đang giao hàng":
      return "bg-sky-500";
    case "Đã huỷ":
      return "bg-red-400";
    case "Đã giao":
      return "bg-emerald-500";
    default:
      return "bg-gray-400";
  }
};

export const formatDate = (isoDate?: string) => {
  if (isoDate === undefined) {
    return "";
  }
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
  }).format(date);
};

export default function OrdersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user) as IUserRoot;
  const { orders } = useSelector((state: RootState) => state.myOrder) as IMyOrderRoot;
  useEffect(() => {
    dispatch(myOrders(user!._id));
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="relative">
        <CategoryHeader label="Đơn hàng" path="Bảng điều khiển" />
        <div className="container mx-auto px-30 relative flex items-start py-10 -mt-30 z-10 gap-6">
          <Panel />
          <div className="mx-5 flex-1 p-8 rounded-3xl mt-30 border border-gray-300 bg-[#fdf7f2]">
            <table className="w-full border-collapse ">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="py-5">Đơn hàng #</th>
                  <th className="py-5 px-10">Ngày mua</th>
                  <th className="py-5 px-5">Số tiền</th>
                  <th className="py-5 px-5">Tình trạng</th>
                  <th className="flex justify-end  py-5">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {(orders ?? []).map((order: OrderModel) => (
                  <tr key={order._id} className="border-b border-gray-200 last:border-0">
                    <td className="py-5">#{order._id}</td>
                    <td className="py-5 px-10">{formatDate(order["createdAt"])}</td>
                    <td className="py-5 px-5 text-red-500">{order.totalPrice.toLocaleString("vi-VN")}đ</td>
                    <td className="py-5 px-5">
                      <span className={`text-white px-3 py-2 rounded-lg ${getStatusStyle(order.progress)}`}>{order.progress}</span>
                    </td>

                    <td className="py-5">
                      <Link to={`/account/order/${order._id}`}>
                        <a className="flex justify-end text-red-500 hover:underline">Xem chi tiết</a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
