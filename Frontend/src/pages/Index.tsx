import Categories from "../components/Categories";
import Advertise from "../components/Advertise";
import Popular from "../components/Popular";
import BannerAdvertise from "../components/BannerAdvertise";
import FeaturedOffer from "../components/FeaturedOffer";
import ProductCategories from "../components/ProductCategories";
import SecondAdvertise from "../components/SecondAdvertise";
import NavBar from "../components/NavBar";
import TopUp from "../components/modules/TopUp";
import Footer from "../components/Footer";

export default function Index() {
  return (
    <>
      <NavBar />
      <TopUp />
      <Categories />
      <Advertise />
      <Popular />
      <BannerAdvertise />
      <ProductCategories />
      <SecondAdvertise />
      <FeaturedOffer />
      <Footer />
    </>
  );
}
