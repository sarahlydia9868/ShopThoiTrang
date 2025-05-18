import Footer from "../../components/Footer";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CategoryHeader from "../../components/modules/CategoryHeader";
import NavBar from "../../components/NavBar";
import { TbTruckDelivery } from "react-icons/tb";
import { GrFavorite } from "react-icons/gr";
import Panel from "../../components/Panel";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { IUserRoot } from "../../redux/reducers/user";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../../actions/user";
import Modal from "../../components/modules/Modal";
import { IMyOrderRoot } from "../../redux/reducers/order";
import TopUp from "../../components/modules/TopUp";

export default function Dashboard() {

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user) as IUserRoot;
  const { orders } = useSelector((state: RootState) => state.myOrder) as IMyOrderRoot;
  const [pendingOrders, setPendingOrders] = useState<number>(0);
  const navigate = useNavigate();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [_, setToastAlertText] = useState<string>("");
  const [openToastAlert, setOpenToastAlert] = useState<boolean>(false);

  const openLogOutModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const totalPendingOrders = () => {
    let pendingOrders = 0;
    for (const order of orders!) {
      if (order.progress === "Đang giao hàng") {
        ++pendingOrders;
      }
    }
    setPendingOrders(pendingOrders);
  };

  const confirmModal = () => {
    dispatch(logout());
    setIsOpenModal(false);
    setToastAlertText("Đăng Xuất Thành Công");
    setOpenToastAlert(!openToastAlert);
    setTimeout(() => {
      setOpenToastAlert(false);
    }, 1000);
    navigate("/", { replace: true });
  };

  
  useEffect(() => {
    totalPendingOrders();
  });

  return (
    <div className="min-h-screen">
      <NavBar />
      <TopUp />
      <div className="relative">
        <CategoryHeader label="Bảng điều khiển" path="Bảng điều khiển" />
        <div className="container mx-auto px-30 relative flex items-start py-10 -mt-30 z-10 gap-6">
          <Panel />
          <div className="mx-5 flex-1 p-8 rounded-3xl mt-30 border border-gray-300 bg-[#fdf7f2]">
            <div className="max-w-5xl mx-auto">
              <div className="mb-4">
                <h1 className="text-xl font-bold">
                  Xin chào {user?.name ?? user?.username} (không phải {user?.name ?? user?.username}?{" "}
                  <button className="text-red-500 hover:underline" onClick={openLogOutModal}>
                    Đăng xuất
                  </button>
                  )
                </h1>
              </div>

              <p className="mb-6 text-gray-700">
                Từ bảng điều khiển tài khoản, bạn có thể xem{" "}
                <Link to="/account/orders">
                  <a className="text-red-500 hover:underline">các đơn hàng gần đây</a>
                </Link>
                , quản lý{" "}
                <Link to="/account/address">
                  <a className="text-red-500 hover:underline">địa chỉ giao hàng</a>
                </Link>{" "}
                cũng như{" "}
                <Link to="/account/profile">
                  <a className="text-red-500 hover:underline">chỉnh sửa mật khẩu và thông tin tài khoản</a>
                </Link>
                .
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="hover:bg-red-500 hover:text-white after:transition-all after:ease-in-out after:duration-500 transition-all duration-300 bg-white border border-gray-200 rounded-lg px-6 py-6 flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-white p-2 border-1 border-gray-300 rounded">
                      <AiOutlineShoppingCart className="text-red-500 w-12 h-12" />
                    </div>
                  </div>
                  <p>Tổng đơn hàng</p>
                  <p className=" text-3xl font-bold">{orders?.length}</p>
                </div>
                <div className="hover:bg-red-500 hover:text-white after:transition-all after:ease-in-out after:duration-500 transition-all duration-300 bg-white border border-gray-200 rounded-lg px-6 py-6 flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-white p-2 border-1 border-gray-300 rounded">
                      <TbTruckDelivery className="text-red-500 w-12 h-12" />
                    </div>
                  </div>
                  <p>Tổng đơn hàng đang giao</p>
                  <p className=" text-3xl font-bold">{pendingOrders}</p>
                </div>
                <div className="hover:bg-red-500 hover:text-white after:transition-all after:ease-in-out after:duration-500 transition-all duration-300 bg-white border border-gray-200 rounded-lg px-6 py-6 flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-white p-2 border-1 border-gray-300 rounded">
                      <GrFavorite className="text-red-500 w-12 h-12" />
                    </div>
                  </div>
                  <p>Danh sách yêu thích</p>
                  <p className=" text-3xl font-bold">{user?.wishList.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpenModal} confirmModal={confirmModal} closeModal={closeModal} text="Bạn có muốn đăng xuất không" />
      <Footer />
    </div>
  );
}
