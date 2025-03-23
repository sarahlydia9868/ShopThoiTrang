import BreadCrumb from "./BreadCrumb";

interface ICategoryHeader {
  label?: string;
  path: string;
}

export default function CategoryHeader({ label, path }: ICategoryHeader) {
  return (
    <div className=" flex justify-center items-center w-full h-100 relative after:absolute after:bg-[url('/images/blooming-flowers.jpg')] after:w-full after:h-full after:z-0  after:bg-no-repeat after:bg-cover after:bg-center">
      <div className="flex justify-center items-center flex-col gap-4 z-50">
        <h1 className=" text-5xl font-bold z-50 capitalize">{label}</h1>
        <BreadCrumb path={path} />
      </div>
    </div>
  );
}
