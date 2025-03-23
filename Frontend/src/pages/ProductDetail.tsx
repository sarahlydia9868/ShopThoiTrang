import BreadCrumb from "../components/modules/BreadCrumb";
import Button from "../components/modules/Button";
import ProductSocial from "../components/modules/ProductSocial";
import ProductTransportation from "../components/modules/ProductTransportation";
import FormInput from "../components/modules/FormInput";
import RelatedProducts from "../components/RelatedProducts";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProductDetailsButtons from "../components/modules/ProductDetailsButtons";
import Comment, { IComment } from "../components/Comment";

import { LuShip } from "react-icons/lu";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaCircleMinus } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProductBox } from "../components/modules/ProductBox";
import UnitPrice from "../components/modules/UnitPrice";
import DiscountedPrice from "../components/modules/DiscountedPrice";
import Tag from "../components/modules/Tag";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import Alert from "../components/modules/Alert";
import toastAlert from "../utils/toastAlert";
import ToastAlert from "../components/modules/ToastAlert";
import product1 from "../../public/images/product/product1.jpeg";
import product2 from "../../public/images/product/product2.jpeg";
import product3 from "../../public/images/product/product3.jpeg";

export interface SingleCollection {
  title: string | number;
}

export default function ProductDetail() {
  return (<div></div>);
}
