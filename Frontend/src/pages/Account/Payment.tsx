import Footer from "../../components/Footer";
import CategoryHeader from "../../components/modules/CategoryHeader";
import NavBar from "../../components/NavBar";
import Panel from "../../components/Panel";

export default function Payment() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="relative">
        <CategoryHeader label="Ngân hàng" path="Tài khoản" />
        <div className="container mx-auto px-30 relative flex items-start py-10 -mt-30 z-10 gap-6">
          <Panel />
          <div className="mx-5 flex-1 p-8 rounded-3xl mt-30 border border-gray-300 bg-[#fdf7f2]">
            <div className="min-h-100 flex flex-grow items-center justify-center text-center w-full">
              <div className="flex flex-col items-center">
                <p className="text-2xl font-semibold mb-6">Bạn không có ngân hàng.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
