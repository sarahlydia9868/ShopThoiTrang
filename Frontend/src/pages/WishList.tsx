import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CategoryHeader from "../components/modules/CategoryHeader";
import Button from "../components/modules/Button";
import ProductTransportation from "../components/modules/ProductTransportation";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { LuShip } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import CartBox from "../components/CartBox";

export interface ICart {
  id: number;
  name: string;
  price: number;
  images: [{ image: string }];
  counter: number;
}

export default function WishList() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
    /*
  useEffect(() => {
    const localCartData = localStorage.getItem("cart");
    const localCart = localCartData ? JSON.parse(localCartData) : [];
    setCart(localCart);
  }, []);

  useEffect(calcTotalPrice, [cart]);
    */
  function calcTotalPrice() {
    let price = 0;
    if (cart.length) {
      price = cart.reduce(
        (prev, current: { price: number; counter: number }) =>
          prev + current.price * current.counter,
        0
      );
      setTotalPrice(price);
    }
  }

  return (
    <>
      <NavBar />
      <CategoryHeader label="Danh sách yêu thích" path="Danh sách yêu thích" />
      <div className="container mx-auto flex justify-center items-start flex-wrap  gap-10 my-20">
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
                  <th scope="col" className="text-center px-6 py-4">
                    Số lượng
                  </th>
                </tr>
              </thead>
              {cart.map((cart: ICart) => (
                <CartBox key={cart.id} {...cart} />
                
              ))}
              <CartBox name="Test" id={0} price={0} counter={1} images={[{image: 'images/product/product1.jpeg'}]}></CartBox>
              <CartBox name="Test1" id={0} price={0} counter={1} images={[{image: 'images/product/product2.jpeg'}]}></CartBox>
              <CartBox name="Test2" id={0} price={0} counter={1} images={[{image: 'images/product/product3.jpeg'}]}></CartBox>

            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
