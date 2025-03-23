import { IProductBox } from "../../components/modules/ProductBox";
import Shop from "../Shop";

export default function AoKhoacPC() {
  const tempProduct: IProductBox[] = [
    {
      id: 0,
      title: "Áo sơ mi dáng vừa cổ đức",
      inventory: 0,
      slug: "0",
      unit_price: 625000,
      collection: 0,
      price_with_tax: 0,
      images: [{ image: "images/product/product1.jpeg" }],
    },
    {
      id: 1,
      title: "Áo măng tô vạt bong ngực thắt đai",
      inventory: 0,
      slug: "0",
      unit_price: 727500,
      collection: 0,
      price_with_tax: 0,
      images: [{ image: "images/product/product2.jpeg" }],
    },
    {
      id: 2,
      title: "Áo sơ mi ngắn cổ thắt nơ tay bồng",
      inventory: 0,
      slug: "0",
      unit_price: 625000,
      collection: 0,
      price_with_tax: 0,
      images: [{ image: "images/product/product3.jpeg" }],
    },
  ];
  return <Shop label="Áo Khoác" products={tempProduct}></Shop>;
}
