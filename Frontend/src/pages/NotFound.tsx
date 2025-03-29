import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Button from "../components/modules/Button";
import NavBar from "../components/NavBar";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex flex-grow items-center justify-center text-center w-full">
          <div className="flex flex-col items-center">
            <h1 className="text-9xl font-bold">404</h1>
            <p className="text-3xl font-semibold mb-6">Trang không tồn tại.</p>
            <Link to="/">
              <Button text="Trở về trang chính" padding="px-4 py-2" bgColor="black" />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
