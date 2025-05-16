import SectionHeader from "./modules/SectionHeader";
import ProductTable from "./modules/ProductTable";
import Button from "./modules/Button";
import { useEffect, useState } from "react";
import ToastAlert from "./modules/ToastAlert";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./modules/Modal";
import { AppDispatch, RootState } from "../redux/store";
import { IDeleteProductRoot, INewProductRoot, IProductRoot } from "../redux/reducers/product";
import { clearErrors, deleteProduct, getProduct } from "../actions/product";
import { getAllCollection } from "../actions/collection";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const [isOkToastAlert, setIsOkToastAlert] = useState<boolean>(false);
  const [isOpenToastAlert, setIsOpenToastAlert] = useState<boolean>(false);
  const [toastAlertText, setToastAlertText] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [productId, setProductId] = useState<string>("");

  const { products, error } = useSelector((state: RootState) => state.products) as IProductRoot;
  const { success, message } = useSelector((state: RootState) => state.newProduct) as INewProductRoot;

  const { isDeleted } = useSelector((state: RootState) => state.deleteProduct) as IDeleteProductRoot;

  useEffect(() => {
    if (success && message) {
      setIsOkToastAlert(true);
      setToastAlertText(message!);
      setIsOpenToastAlert(!isOpenToastAlert);
      dispatch(getAllCollection());
      setTimeout(() => {
        setIsOpenToastAlert(false);
      }, 3000);
    }
    if (isDeleted) {
      setIsOkToastAlert(true);
      setToastAlertText("Đã xoá sản phẩm");
      setIsOpenToastAlert(!isOpenToastAlert);
      dispatch(getAllCollection());
      setTimeout(() => {
        setIsOpenToastAlert(false);
      }, 3000);
    }
    clearErrors();
    dispatch(getAllCollection());
    dispatch(getProduct({ sort: "-updatedAt", resultPerPage: -1, }));
  }, [dispatch, error, success, message, isDeleted]);

  const openDeleteProductModal = (id: string) => {
    setIsOpenModal(true);
    setProductId(id);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const confirmModal = () => {
    setIsOpenModal(false);
    dispatch(deleteProduct(productId));
  };
  return (
    <>
      <div className="  container mx-auto p-10 w-full h-full">
        <div className="">
          <SectionHeader text="Danh sách sản phẩm" />
        </div>
        <div className=" p-10 flex justify-center  items-start flex-col  gap-10 w-full">
          
          <div className="w-full text-center">
          <Link to={"/admin/product-modify/add"}>
            <Button text="Thêm sản phẩm" bgColor="white" padding=" p-3 w-full" />
            </Link>
          </div>
          
          <div className="relative overflow-auto shadow-lg w-full shadow-gray-600 rounded-xl border-1 bg-white mb-24 ">
            <table className="w-full text-sm  rtl:text-right text-center ">
              <thead className="text-xs uppercase  border-b ">
                <tr>
                  <th scope="col" className="px-6 py-3 ">
                    Hình ảnh
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Tên
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Giá
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Giá gốc
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Màu sắc
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Size
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Danh mục
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Bộ sưu tập
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Công cụ
                  </th>
                </tr>
              </thead>
              <tbody>{products && products?.map((product: ProductModel) => <ProductTable product={product} openDeleteProductModal={openDeleteProductModal} />)}</tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal closeModal={closeModal} confirmModal={confirmModal} isOpen={isOpenModal} text="Xoá sản phẩm này?" />
      <ToastAlert isOk={isOkToastAlert} isOpen={isOpenToastAlert} text={toastAlertText} />
    </>
  );
}
