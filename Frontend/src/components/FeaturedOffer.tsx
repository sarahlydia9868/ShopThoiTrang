import { FaShippingFast, FaExchangeAlt, FaHeadset, FaCreditCard } from 'react-icons/fa';

const features = [
  {
    icon: <FaShippingFast size={40} />,
    title: "Miễn phí vận chuyển",
    description: "Áp dụng cho mọi đơn hàng từ 500k"
  },
  {
    icon: <FaExchangeAlt size={40} />,
    title: "Đổi hàng dễ dàng",
    description: "7 ngày đổi hàng vì bất kì lí do gì"
  },
  {
    icon: <FaHeadset size={40} />,
    title: "Hỗ trợ nhanh chóng",
    description: "HOTLINE 24/7 : 088888888"
  },
  {
    icon: <FaCreditCard size={40} />,
    title: "Thanh toán đa dạng",
    description: "Thanh toán khi nhận hàng, Chuyển Khoản"
  }
];

export default function Features() {
  return (
    <div
      data-aos="fade-up"
      className="flex justify-center items-center md:flex-row flex-col w-full h-full min-h-[320px]"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="text-black">{feature.icon}</div>
            <div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
