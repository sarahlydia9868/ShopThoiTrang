import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";

export default function Panel() {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <div
      className="bg-white w-80 p-6 rounded-3xl border border-gray-300"
      style={{
        boxShadow: "10px 0 20px -5px rgba(0,0,0,0.1), -10px 0 20px -5px rgba(0,0,0,0.1)",
      }}
    >
      <div className="flex flex-col items-center text-center mb-4">
        <img src={user?.avatarImage.url} alt="Profile" className="w-20 h-20 rounded-full mb-2 object-cover border-4" />
        <h2 className="font-bold text-xl">{user?.name ?? user?.username ?? "‎ "}</h2>
        <p className="text-red-500">{user?.email ?? "‎ "}</p>
      </div>
      <div className="bg-[#fff7ee] px-4 py-2 rounded-md">
        <p className="font-semibold text-gray-500 uppercase ">Bảng Điều Khiển</p>
      </div>
      <ul className="mt-4 mb-6 mx-4 space-y-5">
        <li>
          <Link to="/account/dashboard">Bảng điều khiển</Link>
        </li>
        <li>
          <Link to="/account/orders">Đơn hàng</Link>
        </li>
        <li>
          <Link to="/account/return-request">Yêu cầu trả hàng</Link>
        </li>
        <li>
          <Link to="/account/review">Đánh giá</Link>
        </li>
      </ul>
      <div className="bg-[#fff7ee] px-4 py-2 rounded-md">
        <p className=" font-semibold text-gray-500 uppercase">Cài Đặt Tài Khoản</p>
      </div>
      <ul className="mt-4 mx-4 space-y-5">
        <li>
          <Link to="/account/profile">Hồ sơ của tôi</Link>
        </li>
        <li>
          <Link to="/account/address">Địa chỉ</Link>
        </li>
        <li>
          <Link to="/account/change-password">Đổi mật khẩu</Link>
        </li>
        <li>
          <Link to="/account/payment">Ngân hàng</Link>
        </li>
      </ul>
    </div>
  );
}
