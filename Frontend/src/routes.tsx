import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import ContactUs from "./pages/ContactUs";
import Cart from "./pages/Cart";
import WishList from "./pages/WishList";
import Collection from "./pages/Collection";
import DamPC from "./pages/Shop/DamPC";
import AoPC from "./pages/Shop/AoPC";
import QuanPC from "./pages/Shop/QuanPC";
import ChanVayPC from "./pages/Shop/ChanVay";
import AoKhoacPC from "./pages/Shop/AoKhoac";
import CollectionDetail from "./pages/CollectionDetail";
import Profile from "./pages/Account/Profile";
import Address from "./pages/Account/Address";
import ChangePassword from "./pages/Account/ChangePassword";
import Payment from "./pages/Account/Payment";
import Dashboard from "./pages/Dashboard/Dashboard";
import Orders from "./pages/Dashboard/Orders";
import ReturnRequest from "./pages/Dashboard/ReturnRequest";
import Review from "./pages/Dashboard/Review";

const routes = [
  { path: "/", element: <Index /> },
  { path: "/product/:productID", element: <ProductDetail /> },
  { path: "/login", element: <Login /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/verify-email", element: <VerifyEmail /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/contact-us", element: <ContactUs /> },
  { path: "/wishlist", element: <WishList /> },
  { path: "/cart", element: <Cart /> },
  { path: "/collection", element: <Collection /> },
  { path: "/collection/:collectionID", element: <CollectionDetail /> },
  { path: "/shop/dam", element: <DamPC /> },
  { path: "/shop/ao", element: <AoPC /> },
  { path: "/shop/quan", element: <QuanPC /> },
  { path: "/shop/chan-vay", element: <ChanVayPC /> },
  { path: "/shop/ao-khoac", element: <AoKhoacPC /> },
  { path: "/account/profile", element: <Profile /> },
  { path: "/account/address", element: <Address /> },
  { path: "/account/change-password", element: <ChangePassword /> },
  { path: "/account/payment", element: <Payment /> },
  { path: "/dashboard/dashboard", element: <Dashboard /> },
  { path: "/dashboard/orders", element: <Orders /> },
  { path: "/dashboard/return-request", element: <ReturnRequest /> },
  { path: "/dashboard/review", element: <Review /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
