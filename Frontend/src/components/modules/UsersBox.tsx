import { MdDelete } from "react-icons/md";
import { IoBan } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { LuUserRoundCog } from "react-icons/lu";
import SpinnerIcon from "../modules/SpinnerIcon";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { clearErrors, deleteUser, getAllUsers, promoteUser } from "../../actions/user";
import ToastAlert from "./ToastAlert";
import { VscBlank } from "react-icons/vsc";
import Modal from "./Modal";

export default function UsersBox({ _id, name, avatarImage, username, isAdmin, banned, email }: UserModel) {
  const userName = name ?? username;
  const dispatch = useDispatch<AppDispatch>();
  const [toastAlertText, setToastAlertText] = useState<string>("");
  const [openToastAlert, setOpenToastAlert] = useState<boolean>(false);
  const [isToastAlertOK, setIsToastAlertOK] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const openRemoveModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const confirmModal = () => {
    dispatch(deleteUser(_id));
    setIsOpenModal(false);
  };

  const changePromote = (isAdmin: boolean, banned: boolean) => {
    dispatch(promoteUser(_id, isAdmin, banned));
  };
  const { user } = useSelector((state: RootState) => state.user);
  const { error, loading, isUpdated, isDeleted, message } = useSelector((state: RootState) => state.profile);
  useEffect(() => {
    if ((isUpdated && message) || (isDeleted && message)) {
      // setIsToastAlertOK(true);
      // setToastAlertText(message!);
      // setOpenToastAlert(true);
      dispatch(getAllUsers(`sort=-isAdmin`));
      setTimeout(() => {
        dispatch(clearErrors());
        setOpenToastAlert(false);
      }, 3000);
    }
  }, [dispatch, getAllUsers, clearErrors, error, loading, isDeleted, isUpdated, message]);

  return (
    <>
      <div
        className={` flex justify-between flex-col relative overflow-hidden w-80 h-80 shadow-lg hover:shadow-gray-600  ${
          isAdmin ? "border-red-300 bg-rose-200" : banned ? "bg-gray-300" : "bg-white"
        } border-1  rounded-3xl p-5 transition-all duration-200`}
      >
        <div className=" flex justify-between border-b-1 pb-3  font-bold items-center  ">
          <img src={avatarImage.url} alt="Profile" className="w-10 h-10 rounded-full " />
          <span>{userName.length > 20 ? `${userName.slice(0, 20)}...` : userName}</span>
        </div>
        <div className="flex flex-col gap-5 my-3">
          <div className="flex justify-between items-center text-sm">
            <span>Id:</span>
            <span>{_id}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Username:</span>
            <span>{email.length > 20 ? `${email.slice(0, 20)}...` : username}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Email:</span>
            <span>{email.length > 20 ? `${email.slice(0, 20)}...` : email}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Vai Trò:</span>
            <span>{isAdmin ? "Quản trị" : banned ? "Người dùng (Bị cấm)" : "Người dùng"}</span>
          </div>
        </div>
        <div className="border-t-1 border-primary pt-5">
          <div className=" flex justify-start items-center gap-5 text-xl ">
            {!isAdmin && (
              <>
                <button onClick={openRemoveModal}>
                  <MdDelete className=" cursor-pointer text-red-600" />
                </button>
                <button onClick={() => changePromote(false, !banned)}>
                  {banned ? <IoBan className=" cursor-pointer text-red-600" /> : <IoBan className=" cursor-pointer text-zinc-600" />}
                </button>{" "}
              </>
            )}
            {user?._id !== _id ? (
              <button onClick={() => changePromote(!isAdmin, false)}>
                {isAdmin ? <LuUserRoundCog className=" cursor-pointer text-zinc-600" /> : <LuUserRound className=" cursor-pointer text-zinc-600" />}
              </button>
            ) : (
              <VscBlank />
            )}
            <div className="absolute -right-16 -bottom-16">
              <SpinnerIcon color="text-black" />
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpenModal} confirmModal={confirmModal} closeModal={closeModal} text="Chắc chắn xoá người dùng này?" />
      <ToastAlert text={toastAlertText} isOk={isToastAlertOK} isOpen={openToastAlert} />
    </>
  );
}
