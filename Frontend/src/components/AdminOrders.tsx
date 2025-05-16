import { useEffect, useState } from "react";
import SectionHeader from "./modules/SectionHeader";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "./modules/FormInput";
import Button from "./modules/Button";
import ToastAlert from "./modules/ToastAlert";
import Modal from "./modules/Modal";
import { MdClose, MdDelete } from "react-icons/md";
import { AppDispatch, RootState } from "../redux/store";
import { clearErrors, getAllOrders, sendOrderMail, updateOrder } from "../actions/order";
import { IOrdersRoot } from "../redux/reducers/order";
import { formatDate, getStatusStyle } from "../pages/Dashboard/Orders";
import { IUserRoot, IUsersRoot } from "../redux/reducers/user";

export interface ICollections {
  id: number;
  title: string;
  products_count: string;
}

export default function AdminOrders() {
  const dispatch = useDispatch<AppDispatch>();
  const [toastAlertText, setToastAlertText] = useState<string>("");
  const [openToastAlert, setOpenToastAlert] = useState<boolean>(false);
  const [isToastAlertOK, setIsToastAlertOK] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { orders } = useSelector((state: RootState) => state.allOrders) as IOrdersRoot;
  const [cancelID, setOrderCancelID] = useState<string>("");
  const [userCancelID, setUserCancelID] = useState<string>("");
  const [message, setNotifyMessage] = useState<string>("");

  const { isUpdated } = useSelector((state: RootState) => state.updateOrder);

  useEffect(() => {
    if (isUpdated) {
      setIsToastAlertOK(true);
      setToastAlertText(message);
      setOpenToastAlert(true);
      dispatch(clearErrors());
      setTimeout(() => {
        setOpenToastAlert(false);
      }, 3000);
    }

    dispatch(getAllOrders());
  }, [dispatch, isUpdated]);

  const closeModal = () => {
    setIsOpenModal(false);
  };
  
  
  const sendMail = (userID: string, title: string, content: string) => {
    dispatch(sendOrderMail(userID, title,  content));
  }

  
  const date = new Date();
  const format_time =  date.toLocaleString("vi-VN", {
    day:    "2-digit",
    month:  "2-digit",
    year:   "numeric",
    hour:   "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,      // 24h
    timeZone: "Asia/Ho_Chi_Minh"
  });

  const confirmModal = () => {
    setIsOpenModal(false);
    dispatch(updateOrder(cancelID!, "Đã huỷ"));
    sendMail(userCancelID, `Đơn hàng #${cancelID} đã huỷ`, `Đơn hàng #${cancelID} của bạn đã bị huỷ vào ${format_time}. \nVui lòng đăng nhập vào Fashion Store để kiểm tra lại đơn hàng của bạn`);
    setNotifyMessage("Đã huỷ đơn hàng");
  };


  const sendSubmit = (orderID: string, userID: string) => {
    dispatch(updateOrder(orderID!, "Đang giao hàng"));
    sendMail(userID, `Đơn hàng #${orderID} đã xác nhận`, `Đơn hàng #${orderID} của bạn đã được xác nhận vào ${format_time}. \nVui lòng đăng nhập vào Fashion Store để theo dõi đơn hàng của bạn`);

    setNotifyMessage("Đã xác nhận đơn hàng");
  };

  const openCancelOrderModal = async (orderID: string, userID: string) => {
    setIsOpenModal(true);
    setOrderCancelID(orderID);
    setUserCancelID(userID);
  };

  return (
    <>
      <div className=" container mx-auto p-10 w-full h-full">
        <div className="">
          <SectionHeader text="Danh sách đơn hàng" />
        </div>
        <div className=" p-10 flex justify-center  items-start flex-col  gap-10 w-full">
          {true && (
            <div className="relative bg-white overflow-auto shadow-lg w-full shadow-gray-600 rounded-lg border-1 mb-24 ">
              <table className="w-full text-sm  rtl:text-right text-center ">
                <thead className="text-xs uppercase  border-b ">
                  <tr>
                    <th scope="col" className="px-6 py-3 ">
                      ID đơn hàng
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                      ID người dùng
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                      Sản phẩm
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                      Ngày đặt hàng
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                      Số tiền
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                      Tình trạng
                    </th>
                    <th scope="col" className="px-12 py-3 ">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(orders ?? []).map((order: OrderModel) => (
                    <tr className=" border-b odd:hover:bg-primary even:hover:bg-secondary hover:text-black transition-colors duration-200">
                      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                        {order._id}
                      </th>
                      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                        {order.user}
                      </th>
                      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                        <div className="flex flex-col">
                          {order.cartItems.map((item, index) => (
                            <span key={index} className="block">
                              {item.name}
                            </span>
                          ))}
                        </div>
                      </th>
                      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                        {formatDate(order["createdAt"])}
                      </th>

                      <th scope="row" className="px-6 py-4 text-red-500 font-medium whitespace-nowrap ">
                        {order.totalPrice.toLocaleString("vi-VN")}đ
                      </th>
                      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                        <span className={`text-white px-3 py-2 rounded-lg ${getStatusStyle(order.progress)}`}>{order.progress}</span>
                      </th>
                      <td className="flex px-4 py-4 pr-4">
                        {order.progress !== "Đã huỷ" && order.progress !== "Đã giao" && (
                          <div className="flex gap-2">
                            {order.progress !== "Đang giao hàng" && (
                              <button onClick={() => sendSubmit(order._id, order.user)}>
                                <Button text="Xác nhận" padding="px-2 py-1" />
                              </button>
                            )}
                            <button onClick={() => openCancelOrderModal(order._id, order.user)}>
                              <Button text="Huỷ" padding="px-2 py-1" bgColor="black" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Modal closeModal={closeModal} confirmModal={confirmModal} isOpen={isOpenModal} text="Huỷ đơn hàng?" />
      <ToastAlert text={toastAlertText} isOk={isToastAlertOK} isOpen={openToastAlert} />
    </>
  );
}
