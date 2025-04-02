import { CgLogOff } from "react-icons/cg";
import { RiHomeSmile2Line } from "react-icons/ri";
import { PiUsersDuotone } from "react-icons/pi";
import { FiShoppingBag } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import { LiaTimesCircle } from "react-icons/lia";
import PAdminLink from "../components/modules/PAdminLink";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiBars3BottomLeft } from "react-icons/hi2";
import Modal from "../components/modules/Modal";
import ToastAlert from "../components/modules/ToastAlert";
import { AppDispatch, RootState } from "../redux/store";
import { logout } from "../actions/user";
import { IUserRoot } from "../redux/reducers/user";
import { Logo } from "../components/Logo";
import { IoPricetagOutline } from "react-icons/io5";

export default function AdminPanel() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user) as IUserRoot;
  const navigate = useNavigate();
  const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(false);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [toastAlertText, setToastAlertText] = useState<string>("");
  const [openToastAlert, setOpenToastAlert] = useState<boolean>(false);

  const openLogOutModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
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

  const timeoutRef = useRef<any | null>(null);

  useEffect(() => {
    if (!user) {
      timeoutRef.current = setTimeout(() => {
        if (!user || !(user as UserModel).isAdmin) {
          navigate("/");
        }
      }, 3000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [user, navigate]);

  return (
    <>
      <div className=" bg-white w-full  h-screen overflow-hidden ">
        <div className=" flex justify-center items-center h-full">
          <div
            className={`fixed  ${
              isOpenSideBar ? "left-0 visible" : "-left-32 md:left-0"
            }  top-0 bottom-0 md:relative  flex justify-between items-center flex-col gap-5 w-28 h-full p-5 z-50 bg-white transition-all duration-200 `}
          >
            <div className=" flex flex-col justify-center items-center gap-5">
              <div className="md:hidden cursor-pointer" onClick={() => setIsOpenSideBar(!isOpenSideBar)}>
                <LiaTimesCircle className=" text-2xl  hover:text-red-600 transition-colors duration-200 " />
              </div>
              <Link to={"/"}>
                <Logo className="w-20" />
              </Link>
            </div>
            <div className="flex justify-center items-center flex-col gap-8" onClick={() => setIsOpenSideBar(!isOpenSideBar)}>
              <PAdminLink pathName="/admin/dashboard" icon={<RiHomeSmile2Line className=" text-3xl" />} text="Bảng điều khiển" />
              <PAdminLink pathName="/admin/users" icon={<PiUsersDuotone className=" text-3xl" />} text="Người dùng" />
              <PAdminLink pathName="/admin/products" icon={<FiShoppingBag className=" text-3xl" />} text="Sản phẩm" />
              <PAdminLink pathName="/admin/orders" icon={<IoPricetagOutline className=" text-3xl" />} text="Đơn hàng" />
              <PAdminLink pathName="/admin/collections" icon={<BiCategoryAlt className=" text-3xl" />} text="Bộ sưu tập" />
            </div>
            <div className=" hover:text-red-600 transition-colors duration-300 cursor-pointer" onClick={openLogOutModal}>
              <CgLogOff className=" text-3xl " />
            </div>
          </div>
          <div className=" w-full h-full ">
            <div className="flex justify-between items-center md:px-20 px-5 w-full h-20 ">
              <div className="md:hidden" onClick={() => setIsOpenSideBar(!isOpenSideBar)}>
                <HiBars3BottomLeft className="  text-3xl cursor-pointer" />
              </div>
              <div className="flex justify-center items-center">
                <FiSearch className=" text-2xl" />
              </div>
              <div className="flex justify-start gap-2 border-b-1 px-8 w-60 py-3">
                <img src={user?.avatarImage.url} alt="Profile" className="w-10 h-10 rounded-full " />
                <div className="flex justify-start items-start flex-col">
                  <span className="text-sm font-bold">{user?.name ?? user?.username}</span>
                  <span className="text-xs text-red-500">{user?.email}</span>
                </div>
              </div>
            </div>
            <div className=" w-full h-full md:rounded-[2.5rem] bg-primary overflow-scroll">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Modal closeModal={closeModal} confirmModal={confirmModal} isOpen={isOpenModal} text="Bạn có muốn đăng xuất không?" />
      <ToastAlert isOk={true} isOpen={openToastAlert} text={toastAlertText} />
    </>
  );
}
