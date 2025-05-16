import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CategoryHeader from "../components/modules/CategoryHeader";
import Button from "../components/modules/Button";
import ProductTransportation from "../components/modules/ProductTransportation";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { TbBox, TbTruckDelivery } from "react-icons/tb";
import CartBox from "../components/CartBox";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { IUserRoot } from "../redux/reducers/user";
import { clearErrors, loadUser, updateItems } from "../actions/user";
import { Link } from "react-router-dom";
import TopUp from "../components/modules/TopUp";

export default function Cart() {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user) as IUserRoot;
  const cart = user?.cartItems ?? [];
  function calcTotalPrice() {
    if (cart.length) {
      const tPrice = cart.reduce((total, item) => total + item.price * item.qty, 0);
      setTotalPrice(tPrice);
    }
  }
  const removeItem = (id: string) => {
    const newCart: CartItem[] = [];
    for (let i = 0; i < user?.cartItems!.length!; i++) {
      if (user?.cartItems[i]._id !== id) {
        newCart.push(user?.cartItems[i]!);
      }
    }
    dispatch(updateItems(user?._id!, newCart, user?.wishList!));
  };

  const { isUpdated } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    calcTotalPrice();
    if (isUpdated) {
      dispatch(loadUser());
      dispatch(clearErrors());
    }
  }, [dispatch, isUpdated, calcTotalPrice]);
  return (
    <>
      <NavBar />
      <TopUp />
      <CategoryHeader label="Giỏ Hàng" path="giỏ hàng" />
      <div className="container mx-auto flex justify-center items-start flex-wrap  gap-10 my-20">
        {user ? ((cart as CartItem[]).length > 0) ? (
          <>
            <div className=" w-[50rem] overflow-x-scroll">
              <div className="relative overflow-x-scroll px-2 ">
                <table className="w-full">
                  <thead className="  text-zinc-700">
                    <tr>
                      <th scope="col" className="text-start px-6 py-4">
                        Sản Phẩm
                      </th>
                      <th scope="col" className="text-center px-6 py-4">
                        Giá
                      </th>
                      <th scope="col" className="text-center py-4">
                        Màu sắc
                      </th>
                      <th scope="col" className="text-center py-4">
                        Size
                      </th>
                      <th scope="col" className="text-center py-4">
                        Số lượng
                      </th>
                    </tr>
                  </thead>
                  {(cart as CartItem[]).map((cart: CartItem) => (
                    <CartBox onRemove={removeItem} {...cart} />
                  ))}
                </table>
              </div>
            </div>
            <div className=" flex flex-col">
              <span className=" font-bold text-lg mb-2">Tổng Sản Phẩm</span>
              <div className="flex gap-8 flex-col mt-6 p-7 border-1 border-black w-96 rounded-2xl hover:shadow-xl transition-all duration-500">
                <div className=" text-center w-full">
                  <Button padding="p-1 w-full" text="Sử dụng mã giảm giá" bgColor="" />
                </div>
                <div className=" flex justify-between items-center  w-full">
                  <div className=" border-1 rounded-2xl border-black  p-3">
                    <ProductTransportation title="Miễn Phí" text="Vận Chuyển" icon={<TbTruckDelivery className=" text-4xl" />} />
                  </div>
                  <div className="  border-1 rounded-2xl border-black p-3">
                    <ProductTransportation title="Hoàn Hàng" text="7 Ngày" icon={<TbBox className=" text-4xl" />} />
                  </div>
                </div>
                <div>
                  <div className=" w-full flex justify-center items-center gap-1 border-t-1 py-5">
                    <IoCheckmarkDoneCircleOutline className=" text-green-600 text-2xl" />
                    <span className=" text-sm">Bạn sẽ tiết kiệm được {(totalPrice * 0.05).toLocaleString("vi-VN")}đ</span>
                  </div>
                  <div className=" w-full flex justify-between items-center font-bold">
                    <span>Tổng</span>
                    <span className=" text-2xl">{totalPrice.toLocaleString("vi-VN")}đ</span>
                  </div>
                  <div className=" text-center mt-5">
                    <Link to="/account/check-out">
                      <Button padding=" w-full p-2" text="Đặt Hàng" bgColor="black" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) :  (
          <div className="flex flex-grow items-center justify-center text-center w-full">
            <div className="flex flex-col items-center">
              <p className="text-3xl font-semibold mb-6">Không có sản phẩm.</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-grow items-center justify-center text-center w-full">
            <div className="flex flex-col items-center">
              <p className="text-3xl font-semibold mb-6">Vui lòng đăng nhập.</p>
              <Link to="/login">
                <Button text="Đăng nhập" padding="px-4 py-2" bgColor="black" />
              </Link>
            </div>
          </div>
        ) }
      </div>
      <Footer />
    </>
  );
}
