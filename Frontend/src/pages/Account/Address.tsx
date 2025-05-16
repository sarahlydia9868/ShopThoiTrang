import Footer from "../../components/Footer";
import { BsFillHouseAddFill } from "react-icons/bs";

import CategoryHeader from "../../components/modules/CategoryHeader";
import NavBar from "../../components/NavBar";
import Panel from "../../components/Panel";
import Button from "../../components/modules/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import AddressForm from "../../components/modules/AddressForm";
import { useEffect, useState } from "react";
import { clearErrors, loadUser, updateProfile } from "../../actions/user";
import ToastAlert from "../../components/modules/ToastAlert";
import TopUp from "../../components/modules/TopUp";

export default function Address() {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.user);
  const [toastAlertText, setToastAlertText] = useState<string>("");
  const [openToastAlert, setOpenToastAlert] = useState<boolean>(false);
  const [isToastAlertOK, setIsToastAlertOK] = useState<boolean>(false);

  const { error, loading, isUpdated, message } = useSelector((state: RootState) => state.profile);
  const address = user?.address;
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (error && message) {
      dispatch(clearErrors());
      setIsToastAlertOK(false);
      setToastAlertText(message!);
      setOpenToastAlert(!openToastAlert);
      setTimeout(() => {
        setOpenToastAlert(false);
      }, 3000);
    }

    if (isUpdated && message) {
      setIsToastAlertOK(true);
      setToastAlertText("Đã xoá địa chỉ");
      setOpenToastAlert(!openToastAlert);
      dispatch(loadUser());
      setTimeout(() => {
        dispatch(clearErrors());
        setOpenToastAlert(false);
      }, 3000);
    }
  }, [dispatch, error, loading, isUpdated, message]);

  const removeShippingAddresss = (index: any) => {
    const newAddress: ShippingAddress[] = [];
    for (let i = 0; i < address!.length; i++) {
      if (i !== index) {
        newAddress.push(address![i]!);
      }
    }

    dispatch(
      updateProfile({
        name: user?.name,
        email: user?.email!,
        _id: user?._id,
        username: user?.username!,
        isAdmin: false,
        avatarImage: {
          url: user?.avatarImage.url!,
          public_id: user?.avatarImage.public_id!,
        },
        address: newAddress,
        cartItems: user?.cartItems!,
        wishList: user?.wishList!
      })
    );
  };
  return (
    <div className="min-h-screen">
      <NavBar />
      <TopUp />
      <div className="relative">
        <CategoryHeader label="Địa chỉ" path="Cài đặt tài khoản" />
        <div className="container mx-auto px-30 relative flex items-start py-10 -mt-30 z-10 gap-6">
          <Panel />
          <div className="mx-5 flex-1 p-8 mt-20">
            <p className="text-gray-600 mb-6">Các địa chỉ sau đây sẽ được sử dụng trên trang thanh toán theo mặc định.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {address?.map((shippingAddres: ShippingAddress, index: number) => (
                <AddressForm shippingAddress={shippingAddres} removeShippingAddress={() => {removeShippingAddresss(index)}} {...shippingAddres} />
              ))}
            </div>
            <div className="border-2 border-dashed border-red-300 bg-white mt-8 p-8 rounded-xl flex flex-col items-center justify-center">
              <div className="bg-red-500 text-white w-20 h-20 rounded-full flex items-center justify-center mb-4">
                <BsFillHouseAddFill className="w-8 h-8" />
              </div>

              <p className="text-xl font-semibold mb-4">Thêm địa chỉ mới</p>
              <Link to="../shipping-address">
                <Button text="Thêm" padding="px-4 py-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastAlert text={toastAlertText} isOk={isToastAlertOK} isOpen={openToastAlert} />
      <Footer />
    </div>
  );
}
