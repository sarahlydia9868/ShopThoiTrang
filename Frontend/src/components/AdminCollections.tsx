import { useEffect, useState } from "react";
import SectionHeader from "./modules/SectionHeader";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "./modules/FormInput";
import Button from "./modules/Button";
import ToastAlert from "./modules/ToastAlert";
import Modal from "./modules/Modal";
import { MdClose, MdDelete } from "react-icons/md";
import { AppDispatch, RootState } from "../redux/store";
import { createCollection, deleteCollection, getAllCollection } from "../actions/collection";
import { ICollectionRoot, IDeleteCollectionRoot, INewCollectionRoot } from "../redux/reducers/collection";
import { clearErrors } from "../actions/collection";

export interface ICollections {
  id: number;
  title: string;
  products_count: string;
}

export default function AdminCollections() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [titleContent, setTitleContent] = useState<string>("");
  const [toastAlertText, setToastAlertText] = useState<string>("");
  const [isOpenToastAlert, setIsOpenToastAlert] = useState<boolean>(false);
  const [isOkToastAlert, setIsOkToastAlert] = useState<boolean>(false);
  const [collectionID, setCollectionID] = useState<string>();
  const [images, setImages] = useState<any[]>([]);
  const [content, setContent] = useState<string>("");

  const { collections } = useSelector((state: RootState) => state.collections) as ICollectionRoot;
  const { error, success, message } = useSelector((state: RootState) => state.newCollection) as INewCollectionRoot;
  const { isDeleted} = useSelector((state: RootState) => state.deleteCollection) as IDeleteCollectionRoot;
  const dispatch = useDispatch<AppDispatch>();

  const clearInput = () => {
    setTitle("");
    setTitleContent("");
    setImages([]);
    setContent("");
  }

  useEffect(() => {
    if (success && message) {
      setIsOkToastAlert(true);
      setToastAlertText(message!);
      setIsOpenToastAlert(!isOpenToastAlert);
      clearInput();
      dispatch(getAllCollection());
      setTimeout(() => {
        setIsOpenToastAlert(false);
      }, 3000);
    }
    if (isDeleted) {
      setIsOkToastAlert(true);
      setToastAlertText("Đã xoá bộ sưu tập");
      setIsOpenToastAlert(!isOpenToastAlert);
      dispatch(getAllCollection());
      setTimeout(() => {
        
        setIsOpenToastAlert(false);
      }, 3000);
    }
    clearErrors();
    dispatch(getAllCollection());
  }, [dispatch, getAllCollection, clearInput, error, success, message, isDeleted]);

  const addNewCollection = (e: any) => {
    e.preventDefault();

    if (title === ""  || content === "") {
      setIsOkToastAlert(false);
      setToastAlertText("Vui lòng nhập đủ tiêu đề, nội dung");
      setIsOpenToastAlert(true);
      setTimeout(() => {
        setIsOpenToastAlert(false);
      }, 3000);
      return;
    }

    dispatch(
      createCollection({
        title,
        titleContent,
        content,
        images: images.map((e) => {
          return {
            public_id: "collection",
            url: e,
          };
        }),
      })
    );
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const openDeleteCollectionModal = async (collectionID: string) => {
    setIsOpenModal(true);
    setCollectionID(collectionID);
  };

  const confirmModal = () => {
    dispatch(deleteCollection(collectionID!));
  };

  const createProductImagesChange = (e: any) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 50) {
      setIsOkToastAlert(false);
      setToastAlertText("Hình ảnh bộ sưu tập tối đa 50 ảnh");
      setIsOpenToastAlert(true);
      setTimeout(() => {
        setIsOpenToastAlert(false);
      }, 3000);
      return;
    }

    files.forEach((file: any) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old: any) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className=" container mx-auto p-10 w-full h-full">
        <div className="">
          <SectionHeader text="Thêm bộ sưu tập" />
        </div>
        <div className=" p-10 flex justify-center  items-start flex-col  gap-10 w-full">
          <div className=" flex justify-center items-start flex-col gap-5  w-full">
            <div className=" flex justify-center items-end flex-wrap md:flex-nowrap gap-5  w-full">
              <FormInput placeholder="Nhập tiêu đề bộ sưu tập" type="text" label="Tiêu đề lớn" onChange={(e) => setTitle(e.target.value)} />
              <FormInput placeholder="Nhập tiêu đề nội dung" type="text" label="Tiêu đề nội dung" onChange={(e) => setTitleContent(e.target.value)} />
            </div>
            <div className="w-full">
              <FormInput placeholder="Nhập nội dung" type="textarea" label="Nội dung" onChange={(e) => setContent(e.target.value)} />
            </div>
            <div className="w-full">
              <FormInput type="file" label="Hình ảnh sản phẩm" onChange={createProductImagesChange} />
            </div>

            <div id="createProductFormImage" className="flex flex-wrap gap-5 w-full">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image} alt="Product Preview" className="max-h-40 rounded-lg" />

                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-700 transition  -translate-y-1/2 translate-x-1/2"
                  >
                    <MdClose size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="w-full text-center" onClick={addNewCollection}>
              <Button text="Thêm bộ sưu tập" bgColor="white" padding=" p-3 w-full" />
            </div>
          </div>
          {collections && (
            <div className="relative bg-white overflow-auto shadow-lg w-full shadow-gray-600 rounded-lg border-1 mb-24 ">
              <table className="w-full text-sm  rtl:text-right text-center ">
                <thead className="text-xs uppercase  border-b ">
                  <tr>
                    <th scope="col" className="px-6 py-3 ">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                      Tiêu đề
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                      Tiêu đề nội dung
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                      Nội dung
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {collections ? (
                    collections.map((collection: CollectionModel) => (
                      <tr className=" border-b odd:hover:bg-primary even:hover:bg-secondary hover:text-black transition-colors duration-200">
                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                          {collection._id}
                        </th>
                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                          {collection.title}
                        </th>
                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                          {collection.titleContent!.length > 30 ? collection.titleContent!.slice(0, 30) : collection.titleContent!}
                          {collection.titleContent!.length > 30 ? "..." : null}
                        </th>
                        <th scope="row" className="px-20 py-4 font-medium whitespace-nowrap ">
                          {collection.content.length > 50 ? collection.content.slice(0, 50) : collection.content}
                          {collection.content.length > 50 ? "..." : null}
                        </th>
                        <td className="pl-8 py-4 px-6" onClick={() => openDeleteCollectionModal(collection._id)}>
                          <MdDelete className=" text-2xl hover:text-rose-600 transition-colors cursor-pointer" />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <span></span>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Modal closeModal={closeModal} confirmModal={confirmModal} isOpen={isOpenModal} text="Xoá bộ sưu tập này?" />
      <ToastAlert isOk={isOkToastAlert} isOpen={isOpenToastAlert} text={toastAlertText} />
    </>
  );
}
