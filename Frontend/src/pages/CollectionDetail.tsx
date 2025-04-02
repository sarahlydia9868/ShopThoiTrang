import { useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { FaComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { ICollectionDetailRoot } from "../redux/reducers/collection";
import { getCollectionDetail } from "../actions/collection";
import { formatDate } from "./Dashboard/Orders";

export default function CollectionDetail() {
  const { collectionID } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { collection } = useSelector((state: RootState) => state.collectionDetail) as ICollectionDetailRoot;
  useEffect(() => {
    dispatch(getCollectionDetail(collectionID!));
  }, [dispatch]);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex flex-grow w-full px-100 mt-15">
          <div className="flex flex-col items-start">
            <h1 className="text-3xl  items-center justify-center text-center font-bold mb-2 text-red-500">{collection?.title}</h1>
            <div className="flex text-gray-600 text-sm mt-3 mb-4">
              <span className="bg-yellow-300 text-black py-1 px-3 rounded-md mr-2">{formatDate(collection?.createdAt)}</span>
              <span className="flex items-center">
                <FaComment className="mr-1" /> 0 Bình luận
              </span>
            </div>
            <p className="text-gray-600 mt-6 mb-10">
              <div className="text-lg leading-7 space-y-4">
                <p>
                  <strong>{collection?.titleContent}</strong>
                </p>
                {collection?.content}
              </div>
              <div className="grid grid-cols-4 gap-4 mt-8 ">
                {(collection?.images ?? []).map((image: Image, index) => (
                  <img src={image.url} alt={`image ${index}`} className="rounded-lg shadow-lg" />
                ))}
                ;
              </div>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
