import { useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CategoryHeader from "../components/modules/CategoryHeader";
import CartBox from "../components/CartBox";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { IUserRoot } from "../redux/reducers/user";
import { clearErrors, loadUser, updateItems } from "../actions/user";
import { Link } from "react-router-dom";
import Button from "../components/modules/Button";
import TopUp from "../components/modules/TopUp";

export default function WishList() {
  const { user } = useSelector((state: RootState) => state.user) as IUserRoot;
  const wishList = user?.wishList ?? [];
  const dispatch = useDispatch<AppDispatch>();

  const removeItem = (id: string) => {
    const newWishList: CartItem[] = [];
    for (let i = 0; i < user?.wishList!.length!; i++) {
      if (user?.wishList[i]._id !== id) {
        newWishList.push(user?.wishList[i]!);
      }
    }
    dispatch(updateItems(user?._id!, user!.cartItems, newWishList));
  };

  const { isUpdated } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (isUpdated) {
      dispatch(loadUser());
      dispatch(clearErrors());
    }
  }, [dispatch, isUpdated]);
  return (
    <>
      <NavBar />
      <TopUp />
      <CategoryHeader label="Danh sách yêu thích" path="Danh sách yêu thích" />
      <div className="container mx-auto flex justify-center items-start flex-wrap  gap-10 my-20">
        {user ? (wishList as CartItem[]).length > 0 ? (
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
                {wishList.map((cart: CartItem) => (
                  <CartBox onRemove={removeItem} {...cart} />
                ))}
              </table>
            </div>
          </div>
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
        )}
      </div>
      <Footer />
    </>
  );
}
