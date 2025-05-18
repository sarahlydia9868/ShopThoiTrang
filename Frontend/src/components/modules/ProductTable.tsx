import { MdDelete } from "react-icons/md";
import { FaWrench } from "react-icons/fa6";
import { Link } from "react-router-dom";

export interface IProductTable {
  product: ProductModel;
  openDeleteProductModal: (id: string) => void;
}

export default function ProductTable({ product, openDeleteProductModal }: IProductTable) {
  return (
    <tr className=" border-b border-primary odd:hover:bg-primary even:hover:bg-secondary hover:text-black transition-colors duration-200">
      <th className="overflow-hidden px-3 py-4">
        <div className="relative h-30">
          <img src={product.images[0].url} alt="Left Image" className="absolute top-0 left-0 w-3/4 object-cover rounded-lg shadow-lg" />
          {product.images[1] ? <img src={product.images[1].url} alt="Right Image" className="absolute bottom-0 right-0 w-3/4 object-cover rounded-lg shadow-lg" /> : <></>}
        </div>
      </th>
      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
        {product.name}
      </th>
      <td className="px-6 py-4 text-red-500">{product.price.toLocaleString("vi-VN")}đ</td>
      <td className="px-6 py-4">{product.offerPrice.toLocaleString("vi-VN")}đ</td>
      <td className="px-6 py-4">{product.qty}</td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          {product.color.map((e) => (
            <div key={e} className={`w-5 h-5 rounded-full border-1 border-gray-400`} style={{ backgroundColor: e }}></div>
          ))}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-1">
          {product.size.map((e) => (
            <span key={e} className="px-2 py-1 border rounded-md text-sm text-zinc-800 capitalize">
              {e}
            </span>
          ))}
        </div>
      </td>
      <td className="px-6 py-4">{product.category}</td>
      <td className="px-6 py-4">{product.collectionName ?? "Không"}</td>
      <td className="px-4 py-4 align-middle">
        <div className="flex items-center justify-center gap-2">
          <Link to={`/admin/product-modify/${product._id}`}>
            <FaWrench className="text-2xl hover:text-rose-600 transition-colors cursor-pointer" />
          </Link>
          <MdDelete className="text-2xl hover:text-rose-600 transition-colors cursor-pointer" onClick={() => openDeleteProductModal(product._id)} />
        </div>
      </td>
    </tr>
  );
}
