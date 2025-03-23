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
import ProductBox, { IProductBox } from "../components/modules/ProductBox";

export interface ICart {
  id: number;
  name: string;
  price: number;
  images: [{ image: string }];
  counter: number;
}

export default function Collection() {
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

  const articles = [
    {
      date: "6 Tháng 1, 2025",
      title: "Thanh Lịch Giữa Phố Thị",
      image: "/images/product/productCategory1.jpeg",
    },
    {
      date: "30 Tháng 1, 2025",
      title: "Dành Cho Em",
      image: "/images/product/productCategory2.jpeg",
    },
    {
      date: "6 Tháng 2, 2025",
      title: "Thanh Âm Tối Giản",
      image: "/images/product/productCategory3.jpeg",
    },
    {
      date: "13 Tháng 2, 2025",
      title: "Mật | Valentine",
      image: "/images/product/productCategory4.jpeg",
    },
  ];

  return (
    <>
      <NavBar />
      <CategoryHeader label="Bộ sưu tập" path="Bộ sưu tập" />
      <div className="container mx-auto flex justify-center items-start flex-wrap  gap-10 my-20">
        <div className=" w-[80rem] overflow-x-scroll">
          <div className="p-8 grid md:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg overflow-hidden"
              >
                  <div className="relative ">
                    <img
                      src={article.image}
                      alt={article.title}
                      className=" h-full object-cover"
                    />
                  </div>
                  <div className="bg-red-200 p-4">
                    <span className="bg-black text-white text-xs py-1 px-2 rounded-md">
                      {article.date}
                    </span>
                    <h3 className="text-2xl font-bold mt-2">{article.title}</h3>
                    <a
                      href="#"
                      className="text-lg text-black mt-2 inline-block hover:underline"
                    >
                      Đọc thêm &rarr;
                    </a>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}