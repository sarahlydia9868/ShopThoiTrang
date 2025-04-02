import SectionHeader from "./modules/SectionHeader";
import FormInput from "./modules/FormInput";
import ProductTable from "./modules/ProductTable";
import Button from "./modules/Button";
import { useEffect, useState } from "react";
import ToastAlert from "./modules/ToastAlert";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./modules/Modal";
import Loader from "./modules/Loader";
import { AppDispatch, RootState } from "../redux/store";
import { IDeleteProductRoot, INewProductRoot, IProductRoot } from "../redux/reducers/product";
import { clearErrors, createProduct, deleteProduct, getProduct } from "../actions/product";
import { MdClose } from "react-icons/md";
import { ICollectionRoot } from "../redux/reducers/collection";
import { getAllCollection } from "../actions/collection";

export default function AdminProducts() {
  const [isOkToastAlert, setIsOkToastAlert] = useState<boolean>(false);
  const [isOpenToastAlert, setIsOpenToastAlert] = useState<boolean>(false);
  const [toastAlertText, setToastAlertText] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const [images, setImages] = useState<any[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | null>(0);
  const [offerPrice, setOfferPrice] = useState<number | null>(0);
  const [inventory, setInventory] = useState<number | null>(0);
  const [selectCollection, setSelectCollection] = useState<string>("");
  const [selectCategory, setSelectCategory] = useState<string>("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [productId, setProductId] = useState<string>("");

  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const { collections } = useSelector((state: RootState) => state.collections) as ICollectionRoot;

  const { products, error } = useSelector((state: RootState) => state.products) as IProductRoot;
  const { success, message } = useSelector((state: RootState) => state.newProduct) as INewProductRoot;

  const { isDeleted } = useSelector((state: RootState) => state.deleteProduct) as IDeleteProductRoot;

  const clearInput = () => {
    setProductName("");
    setDescription("");
    setImages([]);
    setPrice(null);
    setOfferPrice(null);
    setSelectCollection("");
    setSelectedSizes([]);
    setSelectedColors([]);
  };

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
      setToastAlertText("Đã xoá sản phẩm");
      setIsOpenToastAlert(!isOpenToastAlert);
      dispatch(getAllCollection());
      setTimeout(() => {
        setIsOpenToastAlert(false);
      }, 3000);
    }
    clearErrors();
    dispatch(getAllCollection());
    dispatch(getProduct({ resultPerPage: -1 }));
  }, [dispatch, error, success, message, isDeleted]);

  const checkValidInput = () => {
    return (
      productName !== "" &&
      description !== "" &&
      price !== null &&
      inventory !== null &&
      selectCategory !== "" &&
      selectedSizes.length > 0 &&
      selectedColors.length > 0 &&
      images.length > 0
    );
  };

  const addProduct = (e: any) => {
    e.preventDefault();
    if (!checkValidInput()) {
      setIsOkToastAlert(false);
      setToastAlertText("Vui lòng hoàn thiện tất cả thuộc tính");
      setIsOpenToastAlert(true);
      setTimeout(() => {
        setIsOpenToastAlert(false);
      }, 3000);
      return;
    }
    const newProduct: ProductModel = {
      name: productName,
      description: description,
      price: price!,
      offerPrice: offerPrice ?? price!,
      qty: inventory!,
      category: selectCategory,
      color: selectedColors,
      size: selectedSizes,
      images: images.map((e) => {
        return {
          public_id: "collection",
          url: e,
        };
      }),
      collectionName: selectCollection,
      ratings: 5,
      buyCount: 0,
      reviews: [],
    };

    dispatch(createProduct(newProduct));
  };

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
  const sizes = ["S", "M", "L", "XL", "2XL"];

  const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "pink", "brown", "gold", "gray", "black", "white", "cyan", "hotpink", "maroon"];

  const categories = ["Đầm", "Áo", "Quần", "Chân Váy", "Áo Khoác"];

  const toggleColor = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]));
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
  };

  const createProductImagesChange = (e: any) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 15) {
      setIsOkToastAlert(false);
      setToastAlertText("Hình ảnh sản phẩm tối đa 15 ảnh");
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
      <div className="  container mx-auto p-10 w-full h-full">
        <div className="">
          <SectionHeader text="Thêm sản phẩm mới" />
        </div>
        <div className=" p-10 flex justify-center  items-start flex-col  gap-10 w-full">
          <div className=" flex justify-center items-start flex-col gap-5  w-full">
            <div className="flex justify-center items-center flex-wrap md:flex-nowrap gap-5 w-full ">
              <FormInput placeholder="Nhập tên sản phẩm" type="text" label="Tên" onChange={(e) => setProductName(e.target.value)} />

              <FormInput placeholder="Nhập số lượng" type="number" label="Số lượng" onChange={(e) => setInventory(e.target.value)} />
            </div>
            <div className="flex justify-center items-center flex-wrap md:flex-nowrap gap-5 w-full ">
              <FormInput placeholder="Nhập giá sản phẩm" type="number" label="Giá" onChange={(e) => setPrice(e.target.value)} />

              <FormInput placeholder="Nhập giá gốc sản phẩm" type="number" label="Giá gốc" onChange={(e) => setOfferPrice(e.target.value)} />
            </div>
            <div className="flex justify-start items-start flex-wrap md:flex-nowrap gap-5 w-full ">
              <label htmlFor="text" className="relative flex justify-start items-start flex-col gap-1 w-full">
                <span style={{ fontWeight: "bold" }}>{"Màu sắc"}</span>
                <div className="flex flex-wrap gap-2 p-4">
                  {colors.map((color) => (
                    <div
                      key={color}
                      onClick={() => toggleColor(color)}
                      className={`w-8 h-8 rounded-full cursor-pointer border-2 
                      transition ${selectedColors.includes(color) ? "border-black scale-110" : "border-gray-300"}`}
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </label>
              <label htmlFor="text" className="relative flex justify-start items-start flex-col gap-1 w-full">
                <span style={{ fontWeight: "bold" }}>{"Size"}</span>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`mt-2 px-4 py-2 border rounded-md text-sm text-gray-800 
                      transition ${selectedSizes.includes(size) ? "bg-gray-800 text-white" : "bg-white hover:bg-gray-200"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </label>
            </div>

            <div className="flex justify-start items-start flex-wrap md:flex-nowrap gap-5 w-full ">
              <label htmlFor="text" className="relative flex justify-start items-start flex-col gap-1 w-full">
                <span style={{ fontWeight: "bold" }}>{"Danh mục"}</span>
                <select
                  name=""
                  id=""
                  className="border-1 border-black bg-white mb-0.5 p-3 rounded-lg w-full cursor-pointer outline-none"
                  onChange={(e) => setSelectCategory(e.target.value)}
                >
                  <option className=" bg-zinc-100" value={0}>
                    Chọn danh mục
                  </option>
                  {categories?.map((category: string) => (
                    <option>{category}</option>
                  ))}
                </select>
              </label>
              <label htmlFor="text" className="relative flex justify-start items-start flex-col gap-1 w-full">
                <span style={{ fontWeight: "bold" }}>{"Bộ sưu tập"}</span>
                <select
                  name=""
                  id=""
                  className="border-1 border-black bg-white mb-0.5 p-3 rounded-lg w-full cursor-pointer outline-none"
                  onChange={(e) => setSelectCollection(e.target.value)}
                >
                  <option className=" bg-zinc-100" value={0}>
                    Chọn bộ sưu tập
                  </option>
                  {(collections ?? [])?.map((collection: CollectionModel) => (
                    <option value={collection.title}>{collection.title}</option>
                  ))}
                </select>
              </label>
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
            <div className="w-full">
              <FormInput placeholder="Nhập mô tả sản phẩm" type="textarea" label="Mô tả sản phẩm" onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="w-full text-center" onClick={addProduct}>
              <Button text="Thêm sản phẩm" bgColor="white" padding=" p-3 w-full" />
            </div>
          </div>
          {true ? (
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
                      Xoá
                    </th>
                  </tr>
                </thead>
                <tbody>{products && products?.map((product: ProductModel) => <ProductTable product={product} openDeleteProductModal={openDeleteProductModal} />)}</tbody>
              </table>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <Modal closeModal={closeModal} confirmModal={confirmModal} isOpen={isOpenModal} text="Xoá sản phẩm này?" />
      <ToastAlert isOk={isOkToastAlert} isOpen={isOpenToastAlert} text={toastAlertText} />
    </>
  );
}
