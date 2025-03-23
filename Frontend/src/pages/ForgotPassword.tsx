import SectionHeader from "../components/modules/SectionHeader";
import BreadCrumb from "../components/modules/BreadCrumb";
import FormInput from "../components/modules/FormInput";
import Button from "../components/modules/Button";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { clearErrors, login } from "../actions/user";
import ToastAlert from "../components/modules/ToastAlert";

export default function ForgotPassword() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [toastAlertText, setToastAlertText] = useState<string>("");
  const [openToastAlert, setOpenToastAlert] = useState<boolean>(false);
  const [isToastAlertOK, setIsToastAlertOK] = useState<boolean>(false);

  const navigate = useNavigate();
  const submit = (e: any) => {
    e.preventDefault();
    //TODO
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
          <BreadCrumb path={"Khôi Phục Mật Khẩu"} />
          <div className="flex justify-center items-center px-5 w-full py-10">
            <div className="flex justify-center items-center flex-col gap-8 border-1 bg-surface border-black py-20 lg:px-24 px-10 text-center rounded-3xl w-[34rem] ">
              <div className=" flex justify-center items-center flex-col gap-3">
                <span className=" font-bold text-3xl">{"Khôi Phục Mật Khẩu"}</span>
              </div>
              <div className=" w-full flex justify-center items-center flex-col gap-5">
              <span className="">Vui lòng nhập địa chỉ email chúng tôi sẽ gửi mã xác thực cho bạn</span>
                <FormInput label="Địa Chỉ Email" type="email" placeholder="Nhập email của bạn" onChange={setEmail} />
              </div>
              <div className="flex justify-evenly items-center flex-wrap gap-3 w-full">
                <div onClick={() => {}}>
                  <Link to="/verify-email">
                    <Button padding="px-8 py-3" text="Xác nhận" bgColor="black" />
                  </Link>
                </div>
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
