import Footer from "../../components/Footer";

import CategoryHeader from "../../components/modules/CategoryHeader";
import TopUp from "../../components/modules/TopUp";
import NavBar from "../../components/NavBar";
import Panel from "../../components/Panel";

export default function ReturnRequest() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <TopUp />
      <div className="relative">
        <CategoryHeader label="Yêu cầu trả hàng" path="Bảng điều khiển" />
        <div className="container mx-auto px-30 relative flex items-start py-10 -mt-30 z-10 gap-6">
          <Panel />
          <div className="mx-5 flex-1 p-8 rounded-3xl mt-30 border border-gray-300 bg-[#fdf7f2]">
            <div className="min-h-100 flex flex-grow items-center justify-center text-center w-full">
              <div className="flex flex-col items-center">
                <p className="text-2xl font-semibold mb-6">Bạn không có yều cầu hoàn hàng.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
