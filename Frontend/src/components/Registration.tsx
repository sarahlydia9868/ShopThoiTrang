import SectionHeader from "./modules/SectionHeader";
import BreadCrumb from "./modules/BreadCrumb";
import FormInput from "./modules/FormInput";
import Button from "./modules/Button";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useState } from "react";
import ToastAlert from "./modules/ToastAlert";
import { useDispatch } from "react-redux";
import { loginUserAction, registerUserAction } from "../redux/reducers/user";
import { AppDispatch } from "../redux/store";

export enum RegistrationType {
  Login,
  SignUp
}

interface IRegistration {
  type: RegistrationType;
}

export default function Registration({ type }: IRegistration) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [toastAlertText, setToastAlertText] = useState<string>("");
  const [openToastAlert, setOpenToastAlert] = useState<boolean>(false);
  const [isToastAlertOK, setIsToastAlertOK] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const firstNameOnChange = (e) => {
    setFirstName(e.target.value);
  };
  const lastNameOnChange = (e) => {
    setLastName(e.target.value);
  };
  const userNameOnChange = (e) => {
    setUsername(e.target.value);
  };
  const emailOnChange = (e) => {
    setEmail(e.target.value);
  };
  const passwordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = () => {
    if (username.trim() && password.trim()) {
      const newUserInfoForGetToken = {
        username,
        password,
      };

      dispatch(loginUserAction(newUserInfoForGetToken)).then((res) => {
        if (res.payload.username) {
          setUsername("");
          setPassword("");
          setToastAlertText(`You have signed in successfully`);
          setIsToastAlertOK(true);
          setOpenToastAlert(!openToastAlert);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          setToastAlertText("Invalid username or password !");
          setIsToastAlertOK(false);
          setOpenToastAlert(!openToastAlert);
          setTimeout(() => {
            setOpenToastAlert(false);
          }, 3000);
        }
      });
    } else {
      setToastAlertText("Please fill up all fields !");
      setIsToastAlertOK(false);
      setOpenToastAlert(!openToastAlert);
      setTimeout(() => {
        setOpenToastAlert(false);
      }, 3000);
    }
  };

  const registerNewUser = () => {
    if (
      username.trim() &&
      password.trim() &&
      email.trim() &&
      firstName.trim() &&
      lastName.trim()
    ) {
      const newUserInfo = {
        username,
        password,
        email,
        first_name: firstName,
        last_name: lastName,
      };

      dispatch(registerUserAction(newUserInfo)).then((res) => {
        if (res.payload.username) {
          setFirstName("");
          setLastName("");
          setEmail("");
          setUsername("");
          setPassword("");
          setToastAlertText(`You have signed up successfully`);
          setIsToastAlertOK(true);
          setOpenToastAlert(!openToastAlert);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          setToastAlertText("Invalid username or password !");
          setIsToastAlertOK(false);
          setOpenToastAlert(!openToastAlert);
          setTimeout(() => {
            setOpenToastAlert(false);
          }, 3000);
        }
      });
    } else {
      setToastAlertText("Please fill up all fields !");
      setIsToastAlertOK(false);
      setOpenToastAlert(!openToastAlert);
      setTimeout(() => {
        setOpenToastAlert(false);
      }, 3000);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex justify-between items-center  ">
        <div className=" hidden lg:flex justify-start items-start flex-col gap-3 bg-secondary pt-5 pl-20 w-full">
          <SectionHeader text="Tài khoản của tôi" />
          <BreadCrumb path={type === RegistrationType.Login ? "Đăng Nhập" : "Đăng Kí"} />
          <div className="flex justify-center items-center px-5 lg:py-10 py-24  w-full ">
            <div className="flex justify-center items-center flex-col gap-8 border-1 bg-surface border-black py-10 lg:px-24 px-10 text-center rounded-3xl w-[34rem] ">
              <div className=" flex justify-center items-center flex-col  gap-3">
                <span className=" font-bold text-3xl">
                  {type === RegistrationType.Login ? "Đăng nhập" : "Đăng kí"}
                </span>
              </div>
              <div className=" w-full flex justify-center items-center flex-col gap-5">
                {type === RegistrationType.SignUp && (
                  <>
                    <FormInput
                      label="Tên Đăng Nhập"
                      type="text"
                      placeholder="Nhập tên đăng nhập"
                      onChange={userNameOnChange}
                    />
                  </>
                )}
                <FormInput
                  label="Địa chỉ Email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  onChange={emailOnChange}
                />
                <FormInput
                  label="Mật Khẩu"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  onChange={passwordOnChange}
                />
                {type === RegistrationType.Login && (
                  <div className="w-full flex justify-end">
                    <button className="text-red-500 font-bold cursor-pointer">
                      {"Quên Mật Khẩu"}
                    </button>
                  </div>
                )}
              </div>
              <div className="flex justify-evenly items-center flex-wrap gap-3 w-full">
                {type === RegistrationType.Login ? (
                  <div onClick={registerNewUser}>
                    <Button
                      padding="px-8 py-3"
                      text="Đăng Kí"
                      bgColor="black"
                    />
                  </div>
                ) : (
                  <div onClick={loginHandler}>
                    <Button
                      padding="px-8 py-3"
                      text="Đăng Nhập"
                      bgColor="black"
                    />
                  </div>
                )}
                <Link to={type === RegistrationType.Login ? "/sign-up" : "/login"}>
                  <Button
                    padding="px-8 py-3"
                    text={type === RegistrationType.Login ? "Đăng Kí" : "Đăng Nhập"}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastAlert
        text={toastAlertText}
        isOk={isToastAlertOK}
        isOpen={openToastAlert}
      />
      <Footer />
    </>
  );
}
