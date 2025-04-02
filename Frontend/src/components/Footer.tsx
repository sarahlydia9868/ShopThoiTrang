
export default function Footer() {
  return (
    <div className=" bg-black border-t-1 border-black w-full  pt-5 px-8 ">
      <div className="text-white flex justify-start items-end flex-col md:px-20 gap-2">
        <span>Địa chỉ: Thanh Xuân, Hà Nội</span>
        <span>E-mail: shopthoitrang@info.com</span>
        <span>Sđt : +84 888 888 888</span>
      </div>
      <div className=" flex justify-between items-center gap-3 font-bold flex-wrap mt-5 py-5 border-t-1 border-zinc-300">
        <span className="text-white  text-sm ">
          © 2025 Fashion Store | All Rights Reserved.
        </span>
        <span className="text-white flex justify-center items-center flex-wrap gap-3 cursor-pointer">
          Chúng tôi nhận thanh toán qua:{" "}
          <img src="/images/logo-vnpay.png" className="w-10" alt="footer" />{" "}
        </span>
      </div>
    </div>
  );
}
