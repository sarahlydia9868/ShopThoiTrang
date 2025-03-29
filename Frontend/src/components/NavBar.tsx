import { useEffect, useState } from "react";
import NavBarLink from "./modules/NavBarLink";
import { FiSearch } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { HiBars3BottomRight } from "react-icons/hi2";
import { RiHeart2Line } from "react-icons/ri";
import { LiaTimesCircle } from "react-icons/lia";
import { IoIosSettings } from "react-icons/io";
import { LuLayoutPanelLeft } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NavBarOption from "./modules/NavBarOption";
import NavBarLinkMobile from "./modules/NavBarLinkMobile";
import { CgLogOff } from "react-icons/cg";
import Modal from "./modules/Modal";
import ToastAlert from "./modules/ToastAlert";
import { AppDispatch, RootState } from "../redux/store";
import { IUserRoot } from "../redux/reducers/user";
import { logout } from "../actions/user";
import { Logo } from "./Logo";

export default function NavBar() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user) as IUserRoot;
  const navigate = useNavigate();
  const [openStickyNavbar, setOpenStickyNavbar] = useState<boolean>(false);
  const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(false);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [toastAlertText, setToastAlertText] = useState<string>("");
  const [openToastAlert, setOpenToastAlert] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 250) {
        setOpenStickyNavbar(true);
      } else {
        setOpenStickyNavbar(false);
      }
    });
  }, []);

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
  return (
    <>
      <div className={` py-4 z-40 border-b-1 transition-all duration-300 ${openStickyNavbar && "bg-white sticky top-0"} `}>
        <div className=" px-5 flex justify-between items-center">
          <div className=" flex justify-center items-center gap-8">
            <div className="">
              <Logo className="mx-10 w-20" />
            </div>
            <div className=" hidden lg:flex gap-14">
              <NavBarLink text={"Đầm"} path="/shop/dam" />
              <NavBarLink text={"Áo"} path="/shop/ao" />
              <NavBarLink text={"Quần"} path="/shop/quan" />
              <NavBarLink text={"Chân Váy"} path="/shop/chan-vay" />
              <NavBarLink text={"Áo Khoác"} path="/shop/ao-khoac" />
              <NavBarLink text={"Bộ Sưu Tập"} path="/collection" />
            </div>
          </div>
          <div className=" flex justify-center items-center gap-12">
            <div className=" hidden lg:flex justify-center items-center gap-5 text-xl">
              <FiSearch className=" cursor-pointer" />
              <Link to="/wishlist">
                <div className=" relative cursor-pointer">
                  <RiHeart2Line className=" " />
                  <span className=" absolute -right-4 bottom-3 text-white bg-red-500 rounded-full px-1.5 py-0.5 text-xs">{user?.wishList.length ?? 0}</span>
                </div>
              </Link>
              <Link to="/cart">
                <div className=" relative cursor-pointer">
                  <MdOutlineShoppingCart className=" " />
                  <span className=" absolute -right-4 bottom-3 text-white bg-red-500 rounded-full px-1.5 py-0.5 text-xs">{user?.cartItems.length ?? 0}</span>
                </div>
              </Link>
            </div>
            <div className=" flex justify-center items-center gap-5 ">
              {user ? (
                <div className="relative group">
                  <img src={user?.avatarImage.url} alt="Profile" className="w-12 h-12 rounded-full " />
                  <div
                    className={` z-10  absolute top-full mt-4 right-0 invisible opacity-0 group-hover:opacity-100 group-hover:visible   ${
                      openStickyNavbar && "bg-white"
                    } transition-all duration-300 z-50 overflow-hidden text-zinc-800 bg-primary border-b border-b-purple-600 rounded-b-lg shadow-lg`}
                  >
                    <div className="flex justify-start gap-2 border-b-1 px-8 w-60 py-3">
                      <img src={user?.avatarImage.url} alt="Profile" className="w-10 h-10 rounded-full " />
                      <div className="flex justify-start items-start flex-col">
                        <span className="text-sm font-bold">{user?.name ?? user.username}</span>
                        <span className="text-xs">{user?.email}</span>
                      </div>
                    </div>
                    {user?.isAdmin ? (
                      <Link to="/admin">
                        <NavBarOption title="Bảng quản trị" icon={<LuLayoutPanelLeft className="text-2xl" />} />
                      </Link>
                    ) : (
                      <Link to="/account/profile">
                        <NavBarOption title="Thông tin người dùng" icon={<LuLayoutPanelLeft className="text-2x" />} />
                      </Link>
                    )}
                    <Link to="/account/dashboard">
                      <NavBarOption title="Cài đặt" icon={<IoIosSettings className=" text-2xl group-hover/setting:animate-spin" />} />
                    </Link>
                    <NavBarOption title="Đăng xuất" icon={<CgLogOff className="text-2xl" />} onClickHandler={openLogOutModal} />
                  </div>
                </div>
              ) : (
                <div className=" ">
                  <Link to="/login" className=" hover:text-red-500 transition-colors hover:font-bold">
                    <span>Đăng Nhập</span>
                  </Link>
                  <span>/</span>
                  <Link to="/sign-up" className=" hover:text-red-500 transition-colors hover:font-bold">
                    <span>Đăng Kí</span>
                  </Link>
                </div>
              )}
              <div className="lg:hidden">
                <HiBars3BottomRight className=" text-3xl cursor-pointer" onClick={() => setIsOpenSideBar(!isOpenSideBar)} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`lg:hidden fixed top-0 right-0 ${isOpenSideBar ? "left-0" : "left-[100rem]"}  bottom-0 z-60 ${
          openStickyNavbar ? "bg-white" : "bg-primary"
        } transition-all duration-500`}
      >
        <div className="p-3">
          <div className=" flex justify-between items-center pb-5">
            <Logo className="min-w-20" />
            <LiaTimesCircle className=" hover:text-red-600 transition-colors duration-200 text-4xl cursor-pointer" onClick={() => setIsOpenSideBar(!isOpenSideBar)} />
          </div>
          <div className="">
            <NavBarLinkMobile text={"Đầm"} path="/shop/dam" />
            <NavBarLinkMobile text={"Áo"} path="/shop/ao" />
            <NavBarLinkMobile text={"Quần"} path="/shop/quan" />
            <NavBarLinkMobile text={"Chân Váy"} path="/shop/chan-vay" />
            <NavBarLinkMobile text={"Áo Khoác"} path="/shop/ao-khoac" />
            <NavBarLinkMobile text={"Bộ Sưu Tập"} path="/collection" />
            <NavBarLinkMobile text={"Danh Sách Yêu Thích"} path="/wishlist" />
            <NavBarLinkMobile text={"Giỏ Hàng"} path="/cart" />
          </div>
        </div>
      </div>
      <Modal isOpen={isOpenModal} confirmModal={confirmModal} closeModal={closeModal} text="Bạn có muốn đăng xuất không" />
      <ToastAlert text={toastAlertText} isOk={true} isOpen={openToastAlert} />
    </>
  );
}
