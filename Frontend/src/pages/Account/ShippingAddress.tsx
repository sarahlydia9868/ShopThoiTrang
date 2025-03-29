import axios from "axios";
import { useEffect, useState } from "react";

import CategoryHeader from "../../components/modules/CategoryHeader";
import NavBar from "../../components/NavBar";
import FormInput from "../../components/modules/FormInput";
import Panel from "../../components/Panel";
import Button from "../../components/modules/Button";
import Footer from "../../components/Footer";
import { clearErrors, updateProfile } from "../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import ToastAlert from "../../components/modules/ToastAlert";
import { useNavigate } from "react-router-dom";
import { UserConstants } from "../../constans/user";

export default function ShippingAddress() {
  //api from: https://github.com/qtv100291/Vietnam-administrative-division-json-server
  const apiUrl = "https://vietnam-administrative-division-json-server-swart.vercel.app";
  const apiEndpointDistrict = apiUrl + "/district/?idProvince=";
  const apiEndpointCommune = apiUrl + "/commune/?idDistrict=";

  const provinceList = [
    { idProvince: "0", name: "Chọn Tỉnh/Thành Phố..." },
    { idProvince: "01", name: "Thành phố Hà Nội" },
    { idProvince: "79", name: "Thành phố Hồ Chí Minh" },
    { idProvince: "31", name: "Thành phố Hải Phòng" },
    { idProvince: "48", name: "Thành phố Đà Nẵng" },
    { idProvince: "92", name: "Thành phố Cần Thơ" },
    { idProvince: "02", name: "Tỉnh Hà Giang" },
    { idProvince: "04", name: "Tỉnh Cao Bằng" },
    { idProvince: "06", name: "Tỉnh Bắc Kạn" },
    { idProvince: "08", name: "Tỉnh Tuyên Quang" },
    { idProvince: "10", name: "Tỉnh Lào Cai" },
    { idProvince: "11", name: "Tỉnh Điện Biên" },
    { idProvince: "12", name: "Tỉnh Lai Châu" },
    { idProvince: "14", name: "Tỉnh Sơn La" },
    { idProvince: "15", name: "Tỉnh Yên Bái" },
    { idProvince: "17", name: "Tỉnh Hoà Bình" },
    { idProvince: "19", name: "Tỉnh Thái Nguyên" },
    { idProvince: "20", name: "Tỉnh Lạng Sơn" },
    { idProvince: "22", name: "Tỉnh Quảng Ninh" },
    { idProvince: "24", name: "Tỉnh Bắc Giang" },
    { idProvince: "25", name: "Tỉnh Phú Thọ" },
    { idProvince: "26", name: "Tỉnh Vĩnh Phúc" },
    { idProvince: "27", name: "Tỉnh Bắc Ninh" },
    { idProvince: "30", name: "Tỉnh Hải Dương" },
    { idProvince: "33", name: "Tỉnh Hưng Yên" },
    { idProvince: "34", name: "Tỉnh Thái Bình" },
    { idProvince: "35", name: "Tỉnh Hà Nam" },
    { idProvince: "36", name: "Tỉnh Nam Định" },
    { idProvince: "37", name: "Tỉnh Ninh Bình" },
    { idProvince: "38", name: "Tỉnh Thanh Hóa" },
    { idProvince: "40", name: "Tỉnh Nghệ An" },
    { idProvince: "42", name: "Tỉnh Hà Tĩnh" },
    { idProvince: "44", name: "Tỉnh Quảng Bình" },
    { idProvince: "45", name: "Tỉnh Quảng Trị" },
    { idProvince: "46", name: "Tỉnh Thừa Thiên Huế" },
    { idProvince: "49", name: "Tỉnh Quảng Nam" },
    { idProvince: "51", name: "Tỉnh Quảng Ngãi" },
    { idProvince: "52", name: "Tỉnh Bình Định" },
    { idProvince: "54", name: "Tỉnh Phú Yên" },
    { idProvince: "56", name: "Tỉnh Khánh Hòa" },
    { idProvince: "58", name: "Tỉnh Ninh Thuận" },
    { idProvince: "60", name: "Tỉnh Bình Thuận" },
    { idProvince: "62", name: "Tỉnh Kon Tum" },
    { idProvince: "64", name: "Tỉnh Gia Lai" },
    { idProvince: "66", name: "Tỉnh Đắk Lắk" },
    { idProvince: "67", name: "Tỉnh Đắk Nông" },
    { idProvince: "68", name: "Tỉnh Lâm Đồng" },
    { idProvince: "70", name: "Tỉnh Bình Phước" },
    { idProvince: "72", name: "Tỉnh Tây Ninh" },
    { idProvince: "74", name: "Tỉnh Bình Dương" },
    { idProvince: "75", name: "Tỉnh Đồng Nai" },
    { idProvince: "77", name: "Tỉnh Bà Rịa - Vũng Tàu" },
    { idProvince: "80", name: "Tỉnh Long An" },
    { idProvince: "82", name: "Tỉnh Tiền Giang" },
    { idProvince: "83", name: "Tỉnh Bến Tre" },
    { idProvince: "84", name: "Tỉnh Trà Vinh" },
    { idProvince: "86", name: "Tỉnh Vĩnh Long" },
    { idProvince: "87", name: "Tỉnh Đồng Tháp" },
    { idProvince: "89", name: "Tỉnh An Giang" },
    { idProvince: "91", name: "Tỉnh Kiên Giang" },
    { idProvince: "93", name: "Tỉnh Hậu Giang" },
    { idProvince: "94", name: "Tỉnh Sóc Trăng" },
    { idProvince: "95", name: "Tỉnh Bạc Liêu" },
    { idProvince: "96", name: "Tỉnh Cà Mau" },
  ];

  async function getDistrict(idProvince: string) {
    const { data: districtList } = await axios.get(apiEndpointDistrict + idProvince);
    return districtList;
  }

  async function getCommune(idDistrict: string) {
    const { data: communeList } = await axios.get(apiEndpointCommune + idDistrict);
    return communeList;
  }
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<number>(0);
  const [districtList, setDistrictList] = useState<any>([]);
  const [communeList, setCommuneList] = useState<any>([]);
  const [provinceValue, setProvinceValue] = useState<string>("0");
  const [districtValue, setDistrictValue] = useState<string>("0");
  const [communeValue, setCommuneValue] = useState<string>("0");
  const [specificAddress, setSpecificAddress] = useState<string>("");
  const handleChangeProvince = async (event: { target: { value: any } }) => {
    const value = event.target.value;
    if (value === "0") {
      setDistrictList([]);
      setCommuneList([]);
      setDistrictValue("0");
      setCommuneValue("0");
      return;
    }
    setProvinceValue(value);
    const districtList = await getDistrict(value);
    setDistrictList(districtList);
  };
  const handleChangeDistrict = async (event: any) => {
    const value = event.target.value;
    setDistrictValue(value);
    if (value === "0") {
      setCommuneList([]);
      setCommuneValue("0");
    } else {
      const communeList = await getCommune(value);
      setCommuneList(communeList);
    }
  };
  const handleChangeCommune = (event: any) => {
    setCommuneValue(event.target.value);
  };

  const [toastAlertText, setToastAlertText] = useState<string>("");
  const [openToastAlert, setOpenToastAlert] = useState<boolean>(false);
  const [isToastAlertOK, setIsToastAlertOK] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  const addShippingAddress = (e: any) => {
    e.preventDefault();
    if (!name || !phoneNumber || provinceValue === "0" || districtValue === "0" || communeValue === "0" || !specificAddress) {
      dispatch({
        type: UserConstants.UPDATE_PROFILE_FAIL,
        message: "Vui lòng nhập đủ thông tin",
      });
      return;
    }
    dispatch(
      updateProfile({
        name: user?.name,
        email: user?.email!,
        _id: user?._id,
        username: user?.username!,
        isAdmin: false,
        avatarImage: {
          url: user?.avatarImage.url!,
          public_id: user?.avatarImage.public_id!,
        },
        address: [
          ...user?.address!,
          {
            name,
            phoneNumber,
            province: provinceList.find((e) => e.idProvince === provinceValue)!.name,
            district: districtList.find((e) => e.idDistrict === districtValue)!.name,
            commune: communeList.find((e) => e.idCommune === communeValue)!.name,
          },
        ],
        cartItems: user?.cartItems!,
        wishList: user?.wishList!,
      })
    );
  };

  const { error, loading, isUpdated, message } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (error && message) {
      dispatch(clearErrors());
      setIsToastAlertOK(false);
      setToastAlertText(message!);
      setOpenToastAlert(!openToastAlert);
      setTimeout(() => {
        setOpenToastAlert(false);
      }, 3000);
    }

    if (isUpdated && message) {
      setIsToastAlertOK(true);
      setToastAlertText("Đã thêm địa chỉ");
      setOpenToastAlert(!openToastAlert);
      setTimeout(() => {
        dispatch(clearErrors());
        navigate("/account/address");
        setOpenToastAlert(false);
      }, 1000);
    }
  }, [dispatch, error, loading, isUpdated, message]);

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="relative">
        <CategoryHeader label="Địa chỉ" path="Cài đặt tài khoản" />
        <div className="container mx-auto px-30 relative flex items-start py-10 -mt-30 z-10 gap-6">
          <Panel />
          <div className="mx-5 flex-1 p-8 rounded-3xl mt-30 border border-gray-300 bg-[#fdf7f2]">
            <h2 className="text-2xl font-bold mb-8 mx-1">Địa chỉ giao hàng</h2>
            <form className="grid grid-cols-2 gap-6">
              <FormInput type="text" label="Họ và tên" placeholder="Tên" onChange={(e) => setName(e.target.value)} />
              <FormInput type="number" label="Số điện thoại" placeholder={"Số điện thoại"} onChange={(e) => setPhoneNumber(e.target.value)} />
            </form>
            <div className="select-item py-4">
              <label htmlFor="city-province" className="flex justify-center  items-start flex-col gap-1 w-full">
                <span style={{ fontWeight: "bold" }}>{"Tỉnh/Thành Phố"}</span>
                <select
                  id="city-province"
                  className="w-full p-3 rounded-lg border-1 border-black text-black outline-hidden placeholder:text-sm  placeholder:text-zinc-600 focus:bg-primary transition-colors duration-500 bg-white"
                  onChange={handleChangeProvince}
                >
                  {provinceList.map((province: any) => (
                    <option key={province.idProvince} value={province.idProvince}>
                      &nbsp;{province.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="select-item district-town-select pb-4" onChange={handleChangeDistrict}>
              <label htmlFor="district-town" className="flex justify-center  items-start flex-col gap-1 w-full">
                <span style={{ fontWeight: "bold" }}>{"Quận/Huyện"}</span>
                <select
                  id="district-town"
                  className="w-full p-3 rounded-lg border-1 border-black text-black outline-hidden placeholder:text-sm  placeholder:text-zinc-600 focus:bg-primary transition-colors duration-500 bg-white"
                  value={districtValue}
                >
                  <option value="0">&nbsp;Chọn Quận/Huyện...</option>
                  {districtList.map((district: any) => (
                    <option value={district.idDistrict}>&nbsp;{district.name}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="select-item ward-commune-select pb-4" onChange={handleChangeCommune}>
              <label htmlFor="ward-commune" className="flex justify-center  items-start flex-col gap-1 w-full">
                <span style={{ fontWeight: "bold" }}>{"Xã/Phường"}</span>
                <select
                  id="ward-commune"
                  className="w-full p-3 rounded-lg border-1 border-black text-black outline-hidden placeholder:text-sm  placeholder:text-zinc-600 focus:bg-primary transition-colors duration-500 bg-white"
                  value={communeValue}
                >
                  <option value="0">&nbsp;Chọn Xã/Phường...</option>
                  {communeList.map((commune: any) => (
                    <option value={commune.idCommune}>&nbsp;{commune.name}</option>
                  ))}
                </select>
              </label>
            </div>
            <FormInput type="textarea" label="Địa chỉ cụ thể " placeholder="Nhập địa chỉ của bạn" onChange={setSpecificAddress} />
            <button className="col-span-2 flex justify-end pt-4" onClick={addShippingAddress}>
              <Button text="Thêm" padding="px-4 py-2" bgColor="white" />
            </button>
          </div>
        </div>
      </div>
      <ToastAlert text={toastAlertText} isOk={isToastAlertOK} isOpen={openToastAlert} />
      <Footer />
    </div>
  );
}
