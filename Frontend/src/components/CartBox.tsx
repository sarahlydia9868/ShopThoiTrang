import { LiaTimesCircle } from "react-icons/lia";
import { Link } from "react-router-dom";

export default function CartBox({ onRemove, _id, name, price, qty, allQty, image, color, size }: CartItem | any) {
  return (
    <tbody>
      <tr className=" border-y-1 border-stone-300 hover:shadow-lg shadow-secondary transition-shadow duration-500 ">
        <th scope="row" className="flex justify-start items-center gap-3 text-start px-6 py-4">
          <div className="overflow-hidden  rounded-xl">
            <img src={image} alt="product" className="max-h-20" />
          </div>
          <Link to={`/product/${_id}`}><div className="hover:text-red-500 after:transition-all after:ease-in-out after:duration-500 transition-all duration-300">{name}</div></Link>
        </th>
        <td className="px-6 py-4 text-center font-bold text-red-500">{price.toLocaleString("vi-VN")}đ</td>
        <td className="py-4 text-center">
          <div className="ml-4 w-7 h-7 rounded-full border border-gray-300" style={{ backgroundColor: `${color}` }}></div>
        </td>
        <td className="py-4 text-center">
          <div className=" w-8 h-8 rounded-full border border-black flex items-center justify-center">{size}</div>
        </td>
        <>
        {
          (qty < allQty) ? <> <td className={` font-bold text-red-500`}>Hết Hàng</td></> : <><td className="py-4 text-center">{qty}</td></>
        }
        </>
        <td className="cursor-pointer">
          <button onClick={() => onRemove(_id)}>
          <div className="flex justify-center items-center rounded-full text-black hover:text-rose-600 transition-colors duration-300">
            <LiaTimesCircle className="text-4xl" />
          </div>
          </button>
        </td>
      </tr>
    </tbody>
  );
}
