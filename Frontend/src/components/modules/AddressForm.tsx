import Button from "./Button";

interface IAddressForm {
  shippingAddress: ShippingAddress;
  removeShippingAddress: (e: any) => void;
}

export default function AddressForm({ shippingAddress, removeShippingAddress }: IAddressForm) {
  return (
      <div className="border border-gray-300 p-4 rounded-xl px-10 bg-white">
        <h2 className="text-lg font-semibold mb-2">Địa chỉ giao hàng</h2>
        <p>{shippingAddress.name}</p>
        <p>Sđt: 0{shippingAddress.phoneNumber}</p>
        <p>{shippingAddress.specificAddress}</p>
        <p>{shippingAddress.commune}, {shippingAddress.district}, {shippingAddress.province}</p>
        <button className="mt-4 flex gap-2" onClick={removeShippingAddress}>
          <Button text="Xoá" padding="px-3 py-1" />
        </button>
      </div>
  );
}
