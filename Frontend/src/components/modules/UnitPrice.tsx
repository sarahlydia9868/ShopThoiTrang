interface IUnitPrice {
  price: number | undefined;
}

export default function UnitPrice({ price }: IUnitPrice) {
  return (
    <span className=" text-2xl text-red-500">
      {price?.toLocaleString("vi-VN")}đ
    </span>
  );
}
