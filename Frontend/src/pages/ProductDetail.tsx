import BreadCrumb from "../components/modules/BreadCrumb";
import Button from "../components/modules/Button";
import ProductTransportation from "../components/modules/ProductTransportation";
import FormInput from "../components/modules/FormInput";
import RelatedProducts from "../components/RelatedProducts";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Comment, { IComment } from "../components/Comment";

import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaCircleMinus } from "react-icons/fa6";
import { TbBox, TbTruckDelivery } from "react-icons/tb";
import "swiper/css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import Alert from "../components/modules/Alert";
import ToastAlert from "../components/modules/ToastAlert";
import RatingStars from "../components/modules/RatingStars";
import { getProductDetails } from "../actions/product";
import { clearErrors, loadUser } from "../actions/user";
import { LiaTimesCircle } from "react-icons/lia";
import { updateItems } from "../actions/user";
import { IProfileRoot, IUserRoot } from "../redux/reducers/user";

export default function ProductDetail() {
  const { productID } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user) as IUserRoot;
  const { isUpdated } = useSelector((state: RootState) => state.profile) as IProfileRoot;

  const { product, loading, error, message } = useSelector((state: RootState) => state.productDetails);

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [toastAlertText, setToastAlertText] = useState<string>("");
  const [openToastAlert, setOpenToastAlert] = useState<boolean>(false);
  const [isToastAlertOK, setIsToastAlertOK] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("Thông tin chi tiết");

  const [isImageBoxOpen, setIsImageBoxOpen] = useState(false);

  const incrementHandler = () => {
    setQuantity((prevCount) => prevCount + 1);
  };

  const decrementHandler = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };

  const navigate = useNavigate();

  const getItem = (): CartItem => {
    return {
      _id: productID,
      name: product?.name!,
      price: product?.price!,
      image: product?.images[0].url ?? "",
      color: selectedColor,
      size: selectedSize,
      qty: quantity,
    };
  };

  const addCartSubmit = (e: any) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    if (selectedColor === "" || selectedSize === "") {
      setIsToastAlertOK(false);
      setToastAlertText("Vui lòng chọn thông tin sản phẩm");
      setOpenToastAlert(true);
      setTimeout(() => {
        setOpenToastAlert(false);
      }, 3000);
      return;
    }

    const newCart = [...user?.cartItems!, getItem()];

    dispatch(updateItems(user?._id, newCart, user?.wishList!));
  };

  const addWishListSubmit = (e: any) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    if (selectedColor === "" || selectedSize === "") {
      setIsToastAlertOK(false);
      setToastAlertText("Vui lòng chọn thông tin sản phẩm");
      setOpenToastAlert(true);
      setTimeout(() => {
        setOpenToastAlert(false);
      }, 3000);
      return;
    }
    const newWishList = [...user?.wishList!, getItem()];

    dispatch(updateItems(user?._id, user?.cartItems, newWishList));
  };

  useEffect(() => {
    if (isUpdated) {
      dispatch(clearErrors());
      setIsToastAlertOK(true);
      setToastAlertText("Thêm sản phẩm thành công");
      setOpenToastAlert(true);
      dispatch(loadUser());
      setTimeout(() => {
        setOpenToastAlert(false);
      }, 3000);
    }

  }, [dispatch, isUpdated] )

  useEffect(() => {
    dispatch(getProductDetails(productID!));
    
  }, [dispatch, getProductDetails, productID]);

  const ProductDescription = ({ description }) => {
    const sentences = description
      .split(".")
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length > 0);

    const title = sentences[0] || "";
    const details = sentences.slice(1);

    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-black mb-4">{title}</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {details.map((sentence, index) => (
            <li key={index}>{sentence}.</li>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-5">
        <div className="flex justify-start items-start mt-5">
          <BreadCrumb path="Thông tin sản phẩm" />
        </div>
        {product ? (
          <>
            <div className="flex p-8 min-h-screen">
              <div className="w-1/2 p-4 flex">
                <div className="flex flex-col gap-3 overflow-y-auto max-h-[830px]">
                  {product?.images?.map((img, index) => (
                    <img
                      key={index}
                      src={img.url}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => setSelectedImage(index)}
                      className={`h-full max-h-25 rounded-md border cursor-pointer hover:opacity-80 ${selectedImage === index ? "border-black" : "border-gray-300"}`}
                    />
                  ))}
                </div>

                <div className="ml-6 overflow-hidden rounded-xl shadow-lg max-h-[830px] flex-1">
                  <img
                    src={product?.images?.[selectedImage]?.url}
                    alt="MainProduct"
                    className="h-full w-full object-cover cursor-pointer transition-transform duration-300 transform hover:scale-125"
                    onClick={() => setIsImageBoxOpen(true)}
                  />
                </div>
              </div>

              <div className="ml-10 max-w-3xl mx-auto mt-10">
                <h1 className="text-4xl font-bold my-4">{product!.name}</h1>
                <div className="flex items-center text-sm gap-2">
                  <RatingStars rating={product!.ratings} />
                  <span className="text-gray-500">{`${product!.ratings} sao (0 người đánh giá)`}</span>
                </div>

                <p className="text-gray-600 my-4 min-h-20">{}</p>

                <div className="flex items-center gap-4 my-4">
                  <span className="text-2xl font-bold text-red-500">{product!.price.toLocaleString("vi-VN")}đ</span>
                  {product!.offerPrice > 0 ? <span className="text-gray-400 line-through">{product!.offerPrice.toLocaleString("vi-VN")}đ</span> : <></>}
                </div>
                <hr className="my-4 border-gray-300  border-dashed " />
                <div className="flex items-center py-4 gap-2">
                  <span className="font-bold capitalize">{"Màu sắc"}:</span>
                  {product!.color.map((e) => (
                    <div className={`w-8 h-8 rounded-full  ${selectedColor === e ? "border-1 border-gray-400" : ""}  flex items-center justify-center`}>
                      <button
                        className={`w-5 h-5 border-1 border-gray-400 rounded-full`}
                        onClick={() => {
                          setSelectedColor(e);
                        }}
                        style={{ backgroundColor: e }}
                      ></button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center py-4 gap-2">
                  <span className="font-bold capitalize">{"Size"}:</span>
                  {product!.size.map((size) => (
                    <button
                      key={size}
                      className={` w-8 h-8 rounded-full border border-black flex items-center justify-center ${
                        selectedSize === size ? "bg-black text-white" : "bg-white text-black"
                      }`}
                      onClick={() => {
                        if (selectedColor === "") {
                          setIsToastAlertOK(false);
                          setToastAlertText("Vui lòng chọn màu trước");
                          setOpenToastAlert(true);
                          setTimeout(() => {
                            setOpenToastAlert(false);
                          }, 3000);
                          return;
                        }
                        setSelectedSize(size);
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {product.qty > 0 ? (
                  <div className="flex items-center py-4 gap-2">
                    <span className="font-bold capitalize">{"Số lượng"}:</span>
                    <div className="flex justify-center items-center gap-3 text-[2.5rem]">
                      <FaCircleMinus className=" cursor-pointer" onClick={decrementHandler} />
                      <input
                        type="number"
                        min={1}
                        value={quantity}
                        placeholder="0"
                        className="placeholder:text-black rounded-full w-10  h-10 text-sm text-center outline-none border-1 border-black  bg-primary "
                        onChange={(e) => setQuantity(+e.target.value)}
                      />
                      <BsFillPlusCircleFill className=" cursor-pointer" onClick={incrementHandler} />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center py-4 gap-2">
                    <div className={` overflow-hidden uppercase font-bold rounded-lg border-1 px-6 py-2 border-red-500 text-red-500`}>Hết Hàng</div>
                  </div>
                )}
                {product.qty > 0 ? (
                  <div className="flex gap-4 my-4 mb-8">
                    <button onClick={addCartSubmit}>
                      <Button padding="px-6 py-2" text="Thêm vào giỏ hàng" bgColor="black" />
                    </button>
                    <button onClick={addWishListSubmit}>
                      <Button padding="px-6 py-2" text=" Thêm vào danh sách yêu thích" />
                    </button>
                  </div>
                ) : (
                  <></>
                )}

                <hr className="my-4 border-gray-300 " />

                <div className="my-4">
                  <strong>SKU: </strong> {product._id.toUpperCase()}
                </div>
                <div className="flex justify-start items-start gap-3">
                  <span className="font-bold">Share:</span>
                  <a href="">
                    <FaLinkedinIn className="mt-1 text-sm" />
                  </a>
                  <a href="">
                    <FaInstagram className="mt-1 text-sm" />
                  </a>
                  <a href="">
                    <FaXTwitter className="mt-1 text-sm" />
                  </a>
                  <a href="">
                    <FaFacebookF className="mt-1 text-sm" />
                  </a>
                </div>
                <div className=" flex justify-start items-start mt-5 w-full gap-8">
                  <div className="">
                    <ProductTransportation title="Miễn Phí" text="Vận Chuyển" icon={<TbTruckDelivery className=" text-4xl" />} />
                  </div>
                  <ProductTransportation title="Hoàn Hàng" text="7 Ngày" icon={<TbBox className=" text-4xl" />} />
                </div>
              </div>
            </div>
            <div className=" flex justify-center items-center flex-col">
              <div className="border-b border-gray-300 w-full text-center border-b-1 border-zinc-300 gap-5">
                {["Thông tin chi tiết", "Đánh giá"].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 font-bold text-center text-lg ${activeTab === tab ? "border-b-2 border-black text-black" : "text-gray-500"}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>{" "}
            {activeTab === "Thông tin chi tiết" ? (
              <div className="max-w-4xl mx-auto p-6 text-xl">
                <ProductDescription description={product?.description} />
              </div>
            ) : (
              <div className="lg:px-30 mt-5">
                <span className=" font-bold text-start text-lg">Bình luận</span>
                {[].length > 0 ? (
                  [].map((comment: IComment) => <Comment key={comment.id} {...comment} />)
                ) : (
                  <Alert text={"Không có bình luận nào được tìm thấy cho sản phẩm này"} />
                )}
                <div className=" flex justify-start items-start flex-col gap-3 w-full mb-5">
                  <span className=" text-start font-bold text-lg">Để lại bình luận</span>
                  <span className=" text-sm text-zinc-500">Hãy để lại bình luận để chúng tôi biết về suy nghĩ của bạn.</span>
                </div>
                <div className=" flex flex-col gap-5 w-full">
                  <div className=" flex justify-center items-center flex-wrap md:flex-nowrap gap-5">
                    <FormInput placeholder="Tác giả" type="text" onChange={(e) => setName(e.target.value)} />
                    <FormInput placeholder="Email" type="email" />
                  </div>
                  <FormInput placeholder="Viết bình luận ở đây" type="textarea" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div
                  className=" flex justify-start items-center my-4"
                  onClick={() => {
                    //TODO:
                  }}
                >
                  <Button text="Bình luận" padding="px-6 py-3" bgColor="black" />
                </div>
              </div>
            )}
            <div className="mt-20">
              <RelatedProducts category={product!.category} />
            </div>
          </>
        ) : (
          <div>Không tìm thấy sản phẩm</div>
        )}
      </div>

      {isImageBoxOpen && (
        <div
          className=" flex justify-center items-center fixed right-0 top-0 left-0 bottom-0  bg-black/900 z-50 transition-all duration-300"
          onClick={() => setIsImageBoxOpen(false)}
        >
          <div
            className="bg-white relative lg:w-[100rem] h-[50rem] flex flex-wrap lg:flex-nowrap justify-center items-start m-28 rounded-xl lg:overflow-hidden overflow-y-auto shadow-2xl shadow-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div onClick={() => setIsImageBoxOpen(false)}>
              <LiaTimesCircle className="absolute top-8 right-8 text-3xl cursor-pointer hover:text-rose-600 transition-colors duration-300" />
            </div>
            <div className="flex flex-col items-center  min-h-screen">
              <div className="mt-8 max-w-[500px] h-full rounded-xl overflow-hidden shadow-lg">
                <img src={product!.images[selectedImage].url} alt="main-image" className="object-cover w-full h-[600px] " />
              </div>

              <div className="flex gap-3 mt-4 ">
                {product!.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`thumbnail-${index + 1}`}
                    onClick={() => setSelectedImage(index)}
                    className={`max-h-30 h-full object-cover rounded-md border-2 cursor-pointer transition 
                           ${selectedImage === index ? "border-black" : "border-transparent"}
                           hover:opacity-80`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastAlert text={toastAlertText} isOk={isToastAlertOK} isOpen={openToastAlert} />
      <Footer />
    </>
  );
}
