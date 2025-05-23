import SectionHeader from "../components/modules/SectionHeader";
import BreadCrumb from "../components/modules/BreadCrumb";
import FormInput from "../components/modules/FormInput";
import Button from "../components/modules/Button";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { clearErrors, sendCode, verifyCode, verifyCodePassword } from "../actions/user";
import ToastAlert from "../components/modules/ToastAlert";
import { UserConstants } from "../constans/user";

export default function ForgotPassword() {
  const dispatch = useDispatch<AppDispatch>();
  const [code, setCode] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [toastAlertText, setToastAlertText] = useState<string>("");
  const [openToastAlert, setOpenToastAlert] = useState<boolean>(false);
  const [isToastAlertOK, setIsToastAlertOK] = useState<boolean>(false);
  const [isSendCodeOK, setSendCodeOK] = useState<boolean>(false);
  const [isVerifyCodeOK, setVerifyCodeOK] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();
  const sendCodeSubmit = (e: any) => {
    e.preventDefault();
    dispatch(sendCode(email));
  };

  const verifyCodeSumbit = (e: any) => {
    e.preventDefault();
    if (`${code}`.length !== 6) {
      dispatch({
        type: UserConstants.UPDATE_PROFILE_FAIL,
        message: "Vui lòng nhập mã xác thực đủ 6 số",
      });
      return;
    }
    dispatch(verifyCode(email, code));
  };

  const verifyPassword = (e: any) => {
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
    dispatch(verifyCodePassword(email, code, password));
  };

  const { error, loading, isUpdated, isSendCoded, isVerifyCoded, message } = useSelector((state: RootState) => state.profile);
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

    if (isSendCoded && message) {
      setIsToastAlertOK(true);
      setToastAlertText(message!);
      setOpenToastAlert(!openToastAlert);
      setSendCodeOK(true);
      setTimeout(() => {
        setOpenToastAlert(false);
      }, 3000);
    }

    if (isVerifyCoded && message) {
      setVerifyCodeOK(true);
      setTimeout(() => {
      }, 3000);
    }

    if (isUpdated && message) {
      setIsToastAlertOK(true);
      setToastAlertText(message!);
      setOpenToastAlert(!openToastAlert);
      setTimeout(() => {
        navigate("/login");
        setOpenToastAlert(false);
      }, 3000);
    }
  }, [dispatch, error, loading, isUpdated, isSendCoded, isVerifyCoded, message]);
  return (
    <>
      <div className="flex flex-col h-screen justify-between">
        <NavBar />
        <div className="mb-auto lg:flex justify-start items-start flex-col gap-3 pt-5 lg:px-20 px-5 py-10 w-full">
          <SectionHeader text="Tài khoản của tôi" />
          <BreadCrumb path={"Khôi Phục Mật Khẩu"} />
          <div className="flex justify-center items-center px-5 w-full py-10">
            <div className="flex justify-center items-center flex-col gap-8 border-1 bg-surface border-black py-20 lg:px-24 px-10 text-center rounded-3xl w-[34rem] ">
              <div className=" flex justify-center items-center flex-col gap-3">
                <span className=" font-bold text-3xl">{"Khôi Phục Mật Khẩu"}</span>
              </div>
              {!isSendCodeOK ? (
                <>
                  <div className=" w-full flex justify-center items-center flex-col gap-5">
                    <span className="">Vui lòng nhập địa chỉ email chúng tôi sẽ gửi mã xác thực cho bạn</span>
                    <FormInput label="Địa Chỉ Email" type="email" placeholder="Nhập email của bạn" onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="flex justify-evenly items-center flex-wrap gap-3 w-full">
                    <div onClick={sendCodeSubmit}>
                      <Button padding="px-8 py-3" text="Xác nhận" bgColor="black" />
                    </div>
                  </div>
                </>
              ) : !isVerifyCodeOK ? (
                <>
                  <div className=" w-full flex justify-center items-center flex-col gap-5">
                    <span className="">Vui lòng kiểm tra email của bạn để biết tin nhắn có mã của bạn. Mã của bạn gồm 6 số.</span>
                    <FormInput label="Mã xác thực" type="number" placeholder="Nhập mã xác thực" onChange={(e) => setCode(e.target.value)} />
                  </div>
                  <div className="flex justify-evenly items-center flex-wrap gap-3 w-full">
                    <div onClick={verifyCodeSumbit}>
                      <Button padding="px-8 py-3" text="Xác nhận" bgColor="black" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className=" w-full flex justify-center items-center flex-col gap-5">
                    <FormInput label="Mật khẩu mới" type="password" placeholder="Nhập mật khẩu mới" onChange={(e) => setPassword(e.target.value)} />
                    <FormInput label="Xác thực mật khẩu" type="password" placeholder="Nhập mật khẩu xác thực" onChange={(e) => setConfirmPassword(e.target.value)} />
                  </div>
                  <div className="flex justify-evenly items-center flex-wrap gap-3 w-full">
                    <div onClick={verifyPassword}>
                      <Button padding="px-8 py-3" text="Xác nhận" bgColor="black" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <ToastAlert text={toastAlertText} isOk={isToastAlertOK} isOpen={openToastAlert} />
        <Footer />
      </div>
    </>
  );
}
