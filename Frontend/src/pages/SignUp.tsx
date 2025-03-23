import SectionHeader from "../components/modules/SectionHeader";
import BreadCrumb from "../components/modules/BreadCrumb";
import FormInput from "../components/modules/FormInput";
import Button from "../components/modules/Button";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { clearErrors, register } from "../actions/user";
import ToastAlert from "../components/modules/ToastAlert";

export default function SignUp() {
  const dispatch = useDispatch<AppDispatch>();
  const [loginUserName, setLoginUserName] = useState<string>("");
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [toastAlertText, setToastAlertText] = useState<string>("");
  const [openToastAlert, setOpenToastAlert] = useState<boolean>(false);
  const [isToastAlertOK, setIsToastAlertOK] = useState<boolean>(false);

  const navigate = useNavigate();
  const signUpSubmit = (e: any) => {
    e.preventDefault();
    dispatch(register(loginUserName, loginEmail, loginPassword));
  };

  const { error, loading, isAuthenticated, message } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
      setIsToastAlertOK(false);
      setToastAlertText(message!);
      setOpenToastAlert(!openToastAlert);
      setTimeout(() => {
        setOpenToastAlert(false);
      }, 3000);
    }

    if (isAuthenticated) {
      setIsToastAlertOK(true);
      setToastAlertText(message!);
      setOpenToastAlert(!openToastAlert);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [dispatch, error, loading, isAuthenticated, message]);
  return (
    <>
      <div className="flex flex-col h-screen justify-between">
        <NavBar />
        <div className="mb-auto lg:flex justify-start items-start flex-col gap-3 pt-5 lg:px-20 px-5 py-10 w-full">
          <SectionHeader text="Tài khoản của tôi" />
          <BreadCrumb path={"Đăng kí"} />
          <div className="flex justify-center items-center px-5  w-full py-10">
            <div className="flex justify-center items-center flex-col gap-8 border-1 bg-surface border-black py-20 lg:px-24 px-10 text-center rounded-3xl w-[34rem] ">
              <div className=" flex justify-center items-center flex-col gap-3">
                <span className=" font-bold text-3xl">{"Đăng kí"}</span>
              </div>
              <div className=" w-full flex justify-center items-center flex-col gap-5">
                <FormInput
                  label="Tên Đăng Nhập"
                  type="text"
                  placeholder="Nhập tên đăng nhập của bạn"
                  onChange={(e) => {
                    setLoginUserName(e.target.value);
                  }}
                />
                <FormInput
                  label="Địa Chỉ Email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                  }} //TODO:
                />
                <FormInput
                  label="Mật Khẩu"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                  }} //TODO:
                />
              </div>
              <div className="flex justify-evenly items-center flex-wrap gap-3 w-full">
                <div onClick={signUpSubmit}>
                  <Button padding="px-8 py-3" text="Đăng Kí" bgColor="black" />
                </div>
                <Link to={"/login"}>
                  <Button padding="px-8 py-3" text={"Đăng Nhập"} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <ToastAlert text={toastAlertText} isOk={isToastAlertOK} isOpen={openToastAlert} />
        <Footer />
      </div>
    </>
  );
}
