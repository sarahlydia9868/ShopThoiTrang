import { useState, useEffect } from "react";

import CategoryHeader from "../../components/modules/CategoryHeader";
import NavBar from "../../components/NavBar";
import FormInput from "../../components/modules/FormInput";
import Panel from "../../components/Panel";
import Button from "../../components/modules/Button";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { clearErrors, sendCode, verifyCodePassword } from "../../actions/user";
import ToastAlert from "../../components/modules/ToastAlert";
import { UserConstants } from "../../constans/user";

export default function ChangePassword() {
  const [countdown, setCountdown] = useState<number>(0);
  const startCountdown = () => {
    if (countdown === 0) {
      setCountdown(60); // Bắt đầu từ 60 giây
    }
  };
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown]);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const [toastAlertText, setToastAlertText] = useState<string>("");
  const [openToastAlert, setOpenToastAlert] = useState<boolean>(false);
  const [isToastAlertOK, setIsToastAlertOK] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [code, setCode] = useState<number>(0);

  const { error, loading, isUpdated, message } = useSelector((state: RootState) => state.profile);

  const sendCodeSubmit = (e: any) => {
    e.preventDefault();
    dispatch(sendCode(user!.email!));
  };

  const submit = (e: any) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      dispatch({
        type: UserConstants.UPDATE_PROFILE_FAIL,
        message: "Vui lòng nhập mật khẩu",
      });
      return;
    }
    if (password !== confirmPassword) {
      dispatch({
        type: UserConstants.UPDATE_PROFILE_FAIL,
        message: "Hai mật khẩu không giống nhau",
      });
      return;
    }
    if (`${code}`.length !== 6) {
      dispatch({
        type: UserConstants.UPDATE_PROFILE_FAIL,
        message: "Vui lòng nhập mã xác thực đủ 6 số",
      });
      return;
    }
    dispatch(verifyCodePassword(user?.email!, code, password));
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
      setTimeout(() => {
        dispatch(clearErrors());
        setOpenToastAlert(false);
      }, 3000);
    }
  }, [dispatch, error, loading, isUpdated, message]);

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="relative">
        <CategoryHeader label="Thay đổi mật khẩu" path="Cài đặt tài khoản" />
        <div className="container mx-auto px-30 relative flex items-start py-10 -mt-30 z-10 gap-6">
          <Panel />
          <div className="mx-5 flex-1 p-8 rounded-3xl mt-30 border border-gray-300 bg-[#fdf7f2]">
            <h2 className="text-2xl font-bold mb-8 mx-1">Thay đổi mật khẩu</h2>
            <form className="grid grid-cols-2 gap-6">
              <FormInput type="password" label="Mật khẩu mới" placeholder={"Nhập mật khẩu mới"} onChange={(e) => setPassword(e.target.value)} />
              <FormInput type="password" label="Xác thực mật khẩu" placeholder={"Xác thực mật khẩu"} onChange={(e) => setConfirmPassword(e.target.value)} />
              <FormInput type="number" label="Mã xác thực" placeholder={"Nhập mã xác thực"} onChange={(e) => setCode(e.target.value)} />
              <div className="max-w-full  pt-7.5">
                <button
                  onClick={(value) => {
                    startCountdown();
                    sendCodeSubmit(value);
                  }}
                  disabled={countdown > 0}
                  className={`h-full px-4 overflow-hidden uppercase font-bold rounded-lg border-1 bg-white ${
                    countdown > 0
                      ? " cursor-not-allowed"
                      : " cursor-pointer relative after:absolute after:left-0 after:bottom-0 after:bg-[rgba(255,255,255,0.1)] after:border-0  hover:after:border-r-1 after:border-white  z-0 after:-z-10 after:w-0 after:h-full hover:after:w-[101%]  after:transition-all after:ease-in-out after:duration-500 transition-all duration-300 select-none border-black text-black hover:bg-black hover:text-white"
                  }  `}
                >
                  {countdown > 0 ? `Gửi lại mã (${countdown}s)` : "Gửi mã xác thực"}
                </button>
              </div>

              <button className="col-span-2 flex justify-end" onClick={submit}>
                <Button text="Lưu" padding="px-4 py-2" bgColor="white" />
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastAlert text={toastAlertText} isOk={isToastAlertOK} isOpen={openToastAlert} />
      <Footer />
    </div>
  );
}
