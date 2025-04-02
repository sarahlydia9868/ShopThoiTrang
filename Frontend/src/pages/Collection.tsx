import { useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CategoryHeader from "../components/modules/CategoryHeader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { ICollectionRoot } from "../redux/reducers/collection";
import { getAllCollection } from "../actions/collection";
import { formatDate } from "./Dashboard/Orders";

export default function Collection() {
  const dispatch = useDispatch<AppDispatch>();
  const { collections } = useSelector((state: RootState) => state.collections) as ICollectionRoot;
  useEffect(() => {
    dispatch(getAllCollection());
  }, [dispatch]);
  return (
    <>
      <NavBar />
      <CategoryHeader label="Bộ sưu tập" path="Bộ sưu tập" />
      <div className="container mx-auto flex justify-center items-start flex-wrap gap-10 my-20">
        <div className="w-[80rem] overflow-x-scroll">
          <div className="p-8 grid md:grid-cols-3 gap-6">
            {(collections ?? []).map((collection: CollectionModel, index: number) => (
              <div key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col">
                {/* Phần ảnh */}
                <div className="relative aspect-[3/4] w-full">
                  <img src={collection.images[0].url} alt={collection.title} className="h-full w-full object-cover" />
                </div>

                {/* Phần nội dung (nền hồng) */}
                <div className="bg-red-200 p-4 flex flex-col flex-1 justify-between">
                  {/* Khối trên: date + title */}
                  <div>
                    <span className="bg-black text-white text-xs py-1 px-2 rounded-md">{formatDate(collection["createdAt"])}</span>
                    <h3 className="text-2xl font-bold mt-2">{collection.title}</h3>
                  </div>

                  {/* Khối dưới: nút Đọc thêm */}
                  <div>
                    <Link to={`/collection/${collection._id}`}>
                      <span className="text-lg text-black mt-2 inline-block hover:underline">Đọc thêm &rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
