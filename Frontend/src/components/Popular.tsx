import SectionHeader from "./modules/SectionHeader";
import PopularFilterItem from "./modules/PopularFilterItem";
import ProductBox, { IProductBox } from "./modules/ProductBox";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

export type IProducts = [
  {
    collection: number;
    id: number;
    images: [] | undefined;
    inventory: number;
    price_with_tax: number;
    slug: string;
    title: string;
    unit_price: number;
  }
];

export default function Popular() {
  return (
    <div
      data-aos="fade-up"
      className="flex justify-center items-center md:flex-row flex-col w-full h-full min-h-[320px]"
    >
      <div className=" container mx-auto my-24 ">
        <div className=" flex justify-between md:flex-row flex-col gap-3 items-center">
          <SectionHeader text="Sản Phẩm Bán Chạy" />
          <div className=" lg:w-96 w-90 mx-10 flex gap-4 p-1.5 border-1 border-black rounded-full">
            <PopularFilterItem isSelected={true} text="Tất cả" />
            <PopularFilterItem text="Đầm" />
            <PopularFilterItem text="Áo" />
            <PopularFilterItem text="Quần" />
            <PopularFilterItem text="Váy" />
          </div>
        </div>
        <div className=" flex justify-center items-start flex-wrap gap-8 p-12 mx-auto ">

          <ProductBox
            id={0}
            title="Áo sơ mi dáng vừa cổ đức"
            inventory={0}
            collection={0}
            price_with_tax={0}
            slug={"0"}
            unit_price={625000}
            images={[{ image: "images/product/product1.jpeg" }]}
          />
          <ProductBox
            id={1}
            title="Áo măng tô vạt bong ngực thắt đai"
            inventory={0}
            collection={0}
            price_with_tax={0}
            slug={"0"}
            unit_price={727500}
            images={[{ image: "images/product/product2.jpeg" }]}
          />
          <ProductBox
            id={2}
            title="Áo sơ mi ngắn cổ thắt nơ tay bồng"
            inventory={0}
            collection={0}
            price_with_tax={0}
            slug={"0"}
            unit_price={625000}
            images={[{ image: "images/product/product3.jpeg" }]}
          />
          <ProductBox
            id={3}
            title="Chân váy A ngắn phối ren"
            inventory={0}
            collection={0}
            price_with_tax={0}
            slug={"0"}
            unit_price={217500}
            images={[{ image: "images/product/product4.jpeg" }]}
          />
          <ProductBox
            id={4}
            title="Đầm cổ U phối sơ mi poplin đai eo"
            inventory={0}
            collection={0}
            price_with_tax={0}
            slug={"0"}
            unit_price={307500}
            images={[{ image: "images/product/product5.jpeg" }]}
          />
          <ProductBox
            id={5}
            title="Quần 2 ly ống suông hai cạp A"
            inventory={0}
            collection={0}
            price_with_tax={0}
            slug={"0"}
            unit_price={425500}
            images={[{ image: "images/product/product6.jpeg" }]}
          />
        </div>
      </div>
    </div>
  );
}
