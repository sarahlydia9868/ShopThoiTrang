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
import { FaUser, FaComment } from "react-icons/fa";

export default function CollectionDetail() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex flex-grow w-full px-100 mt-15">
          <div className="flex flex-col items-start">
            <h1 className="text-3xl  items-center justify-center text-center font-bold mb-2 text-red-500">Thanh Lịch giữa Phố Thị Collection</h1>
            <div className="flex text-gray-600 text-sm mt-3 mb-4">
              <span className="bg-yellow-300 text-black py-1 px-3 rounded-md mr-2">22 Tháng 3, 2025</span>
              <span className="flex items-center">
                <FaComment className="mr-1" /> 0 Bình luận
              </span>
            </div>
            <p className="text-gray-600 mt-6 mb-10">
              <div className="text-lg leading-7 space-y-4">
                <p>
                  <strong>NEW COLLECTION | BỘ SƯU TẬP “THANH LỊCH GIỮA PHỐ THỊ!”</strong>
                </p>
                <p>
                  Lấy cảm hứng từ những người phụ nữ thành thị – hiện đại, tự tin nhưng vẫn giữ được nét duyên dáng, nữ tính truyền thống, bộ sưu tập “Thanh lịch giữa phố thị” là
                  sự giao thoa giữa hai giá trị: thanh lịch và cá tính, mềm mại và mạnh mẽ.
                </p>

                <p>
                  Mỗi thiết kế là một câu chuyện về người phụ nữ biết tận hưởng cuộc sống, biết yêu bản thân và dám thể hiện phong cách riêng. Từ những chiếc blazer nhẹ nhàng, áo
                  sơ mi cắt may tinh tế, đến chân váy dáng suông hay quần âu thanh lịch, tất cả đều mang đến sự thoải mái nhưng không kém phần sang trọng.
                </p>

                <p>
                  Bằng màu trung tính như trắng, be, ghi, đen giúp nàng dễ dàng phối đồ, trong khi những đường cắt tinh tế tạo điểm nhấn phá cách. Đây không chỉ là những bộ trang
                  phục công sở thông thường, mà còn là tuyên ngôn thời trang của những quý cô tự chủ, bản lĩnh giữa nhịp sống ồn ào nơi phố thị.
                </p>
              </div>
              <div className="grid grid-cols-4 gap-4 mt-8 ">
                <img src={"/images/collection/collection1.jpeg"} alt="Collection 1" className="rounded-lg shadow-lg" />
                <img src={"/images/collection/collection2.jpeg"} alt="Collection 2" className="rounded-lg shadow-lg" />
                <img src={"/images/collection/collection3.jpeg"} alt="Collection 3" className="rounded-lg shadow-lg" />
                <img src={"/images/collection/collection4.jpeg"} alt="Collection 4" className="rounded-lg shadow-lg" />
              </div>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );

  return (
    <>
      <NavBar />
      <div className="bg-white text-black p-8">
        {/* Tiêu đề */}
        <h1 className="text-3xl font-bold text-red-600 text-center mb-4">THANH LỊCH GIỮA PHỐ THỊ COLLECTION</h1>

        {/* Ngày đăng */}
        <div className="flex items-center text-gray-400 text-sm mb-6">
          <span className="bg-gray-200 px-3 py-1 rounded-full">📅 Ngày đăng: 06-03-2025</span>
        </div>

        {/* Nội dung mô tả */}
        <div className="text-lg leading-7 space-y-4">
          <p>
            <strong>NEW COLLECTION | BỘ SƯU TẬP “THANH LỊCH GIỮA PHỐ THỊ!”</strong>
          </p>

          <p>
            Lấy cảm hứng từ những người phụ nữ thành thị – hiện đại, tự tin nhưng vẫn giữ được nét duyên dáng, nữ tính truyền thống, bộ sưu tập “Thanh lịch giữa phố thị” là sự giao
            thoa giữa hai giá trị: thanh lịch và cá tính, mềm mại và mạnh mẽ.
          </p>

          <p>
            Mỗi thiết kế là một câu chuyện về người phụ nữ biết tận hưởng cuộc sống, biết yêu bản thân và dám thể hiện phong cách riêng. Từ những chiếc blazer nhẹ nhàng, áo sơ mi
            cắt may tinh tế, đến chân váy dáng suông hay quần âu thanh lịch, tất cả đều mang đến sự thoải mái nhưng không kém phần sang trọng.
          </p>

          <p>
            Bằng màu trung tính như trắng, be, ghi, đen giúp nàng dễ dàng phối đồ, trong khi những đường cắt tinh tế tạo điểm nhấn phá cách. Đây không chỉ là những bộ trang phục
            công sở thông thường, mà còn là tuyên ngôn thời trang của những quý cô tự chủ, bản lĩnh giữa nhịp sống ồn ào nơi phố thị.
          </p>
        </div>

        {/* Các tính năng nổi bật */}
        <div className="mt-6 space-y-2">
          <p>✅ Trải nghiệm trực tiếp tại hệ thống cửa hàng JM Dress Design trên toàn quốc.</p>
          <p>
            ✅ Đặt hàng online nhanh chóng qua website{" "}
            <a href="#" className="text-blue-500 underline">
              TẠI ĐÂY
            </a>
            .
          </p>
          <p>
            👉 <strong>Cập nhật xu hướng thời trang công sở nữ hiện đại ngay hôm nay cùng JM!</strong>
          </p>
        </div>

        {/* Hình ảnh sản phẩm */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <img src="/path-to-image1.jpg" alt="Fashion 1" className="rounded-lg shadow-lg" />
          <img src="/path-to-image2.jpg" alt="Fashion 2" className="rounded-lg shadow-lg" />
          <img src="/path-to-image3.jpg" alt="Fashion 3" className="rounded-lg shadow-lg" />
        </div>
      </div>
      <Footer />
    </>
  );
}
