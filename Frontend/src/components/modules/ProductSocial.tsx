interface IProductSocial {
  text: string;
}

export default function ProductSocial({ text }: IProductSocial) {
  return (
    <a href="">
      <span className="uppercase font-bold text-sm hover:text-red-500 transition-colors duration-200 inline-block">
        {text}
      </span>
    </a>
  );
}
