import Footer from "../../components/Footer";
import { FaCamera } from "react-icons/fa";

import CategoryHeader from "../../components/modules/CategoryHeader";
import NavBar from "../../components/NavBar";
import FormInput from "../../components/modules/FormInput";
import Panel from "../../components/Panel";
import Button from "../../components/modules/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { clearErrors, loadUser, updateProfile } from "../../actions/user";
import ToastAlert from "../../components/modules/ToastAlert";

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.user);
  const [toastAlertText, setToastAlertText] = useState<string>("");
  const [openToastAlert, setOpenToastAlert] = useState<boolean>(false);
  const [isToastAlertOK, setIsToastAlertOK] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<number | undefined>(undefined);
  const [birthdate, setBirthDate] = useState<string>(user?.birthdate ?? "");
  const [avatar, setAvatar] = useState<string>(user?.avatarImage.url ?? "/images/profile.jpg");
  const { error, loading, isUpdated, message } = useSelector((state: RootState) => state.profile);
  const updateProfileDataChange = (e) => {
    const reader: any = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const changeUserDetailSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      updateProfile({
        name,
        email,
        phoneNumber,
        birthdate,
        _id: user?._id,
        username: user?.username!,
        isAdmin: false,
        avatarImage: {
          url: avatar,
          public_id: user?.avatarImage.public_id!,
        },
        cartItems: user?.cartItems!,
        wishList: user?.wishList!,
      })
    );
  };

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
      setToastAlertText(message!);
      setOpenToastAlert(!openToastAlert);
      dispatch(loadUser());
      setTimeout(() => {
        dispatch(clearErrors());
        setOpenToastAlert(false);
      }, 3000);
    }
  }, [dispatch, error, loading, isUpdated, message]);

  return (
    <div className="min-h-screen">
      <NavBar />
      <CategoryHeader label="Hồ Sơ Của Tôi" path="Cài đặt tài khoản" />
      <div className="container mx-auto px-30 relative flex items-start py-10 -mt-30 z-10 gap-6">
        <Panel />
        <div className="mx-5 flex-1 p-8 rounded-3xl mt-30 border border-gray-300 bg-[#fdf7f2]">
          <div className="mx-5 flex items-center bg-[#fdf7f2] w-full">
            <div className=" relative w-30 h-30">
              <label className="absolute top-0 left-0 hover:bg-red-700 cursor-pointer bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md ring-3 ring-white -translate-x-1/5 -translate-y-1/5">
                <FaCamera className="text-xl" />
                <input type="file" onChange={updateProfileDataChange} className="hidden" />
              </label>

              <img src={avatar} alt="profile" className="w-30 h-30 object-cover rounded-full border-5 border-white" />
            </div>
            <div className="ml-4 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-black">{user?.name ?? user?.username! ?? "‎ "}</h2>
              <p className="text-black text-lg font-medium">
                Tên đăng nhập:<span className="px-2 text-red-500">{user?.username}</span>
              </p>
            </div>
          </div>

          <hr className="my-4 border-gray-300 " />
          <form className="grid grid-cols-2 gap-6">
            {/** //TODO: add placeholder */}
            <FormInput type="text" label="Họ và tên" placeholder={user?.name ?? user?.username!} onChange={(e) => setName(e.target.value)} />
            <FormInput type="text" label="Địa chỉ email" placeholder={user?.email!} onChange={(e) => setEmail(e.target.value)} />
            <FormInput type="number" label="Số điện thoại" placeholder={`${user?.phoneNumber ?? "Số điện thoại"}`} onChange={(e) => setPhoneNumber(e.target.value)} />
            <FormInput type="date" label="Ngày sinh" value={birthdate} onChange={(e) => setBirthDate(e.target.value)} />
            <button className="col-span-2 flex justify-end" onClick={changeUserDetailSubmit}>
              <Button text="Lưu" padding="px-4 py-2" bgColor="white" />
            </button>
          </form>
        </div>
      </div>
      <ToastAlert text={toastAlertText} isOk={isToastAlertOK} isOpen={openToastAlert} />
      <Footer />
    </div>
  );
}
