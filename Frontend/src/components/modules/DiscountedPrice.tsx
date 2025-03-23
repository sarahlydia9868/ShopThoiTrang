interface IDiscountedPrice {
  price: number | undefined;
}
export default function DiscountedPrice({ price }: IDiscountedPrice) {
  return (
    <span className=" text-lg text-zinc-400 ml-1 line-through">
      {price?.toLocaleString("vi-VN")}đ
    </span>
  );
}
