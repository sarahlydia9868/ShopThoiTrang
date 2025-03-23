import Footer from "../../components/Footer";
import { FaCamera } from "react-icons/fa";

import CategoryHeader from "../../components/modules/CategoryHeader";
import NavBar from "../../components/NavBar";
import FormInput from "../../components/modules/FormInput";
import Panel from "../../components/Panel";

export default function Review() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="relative">
        <CategoryHeader label="Đánh giá" path="Bảng điều khiển" />
        <div className="container mx-auto px-30 relative flex items-start py-10 -mt-30 z-10 gap-6">
          <Panel/>
          {/* //TODO:  */}
        </div>
      </div>

      <Footer />
    </div>
  );
}
