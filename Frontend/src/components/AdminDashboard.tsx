import DashboardBox from "./modules/DashboardBox";
import SectionHeader from "./modules/SectionHeader";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import DashBoardTable from "./modules/DashBoardTable";
import { PiUsersDuotone } from "react-icons/pi";
import { FiShoppingBag } from "react-icons/fi";
import { IoPricetagOutline } from "react-icons/io5";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getAllUsers } from "../actions/user";
import { IUsersRoot } from "../redux/reducers/user";
import { IOrdersRoot } from "../redux/reducers/order";
import { getAllOrders } from "../actions/order";
import { IProductRoot } from "../redux/reducers/product";
import { getProduct } from "../actions/product";

const data = [
  {
    name: "Tháng 1",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Tháng 2",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Tháng 3",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Tháng 4",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Tháng 5",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Tháng 6",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Tháng 7",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function AdminDashboard() {
  const dispatch = useDispatch<AppDispatch>();

  const { users } = useSelector((state: RootState) => state.allUsers) as IUsersRoot;
  const { orders } = useSelector((state: RootState) => state.allOrders) as IOrdersRoot;
  const { productsCount } = useSelector((state: RootState) => state.products) as IProductRoot;

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllOrders());
    dispatch(getProduct({}));
  }, [dispatch]);

  return (
    <div className="container mx-auto p-10">
      <div className="flex justify-evenly items-center flex-wrap gap-5 mb-10">
        <DashboardBox text="Tổng Người Dùng" count={`${users?.length ?? "0"}`} bgColor="bg-sky-300" icon={<PiUsersDuotone className=" text-3xl" />} />
        <DashboardBox text="Tổng Sản Phẩm" count={`${productsCount ?? "0"}`} bgColor="bg-violet-300" icon={<FiShoppingBag className=" text-3xl" />} />
        <DashboardBox text="Tổng Đơn Hàng" count={`${orders?.length ?? "0"}`} bgColor="bg-teal-300" icon={<IoPricetagOutline className=" text-3xl" />} />
      </div>
      <div className="  flex justify-start items-start w-full flex-col gap-20 ">
        <div className="  w-full h-[25rem] my-30">
          <div className=" mb-10">
            <SectionHeader text="Thống kê bán hàng" />
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className=" mb-10 w-full">
          <div className=" mb-10 ">
            <SectionHeader text="Khách hàng gần đây" />
          </div>
          <div className="relative overflow-auto shadow-lg w-full shadow-gray-600 rounded-lg border-1 bg-white mb-15">
            <table className="w-full text-sm  rtl:text-right text-center ">
              <thead className=" text-black uppercase border-b ">
                <tr>
                  <th scope="col" className="px-6 py-3 ">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Khách hàng
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Tên đăng nhập
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {(users ?? [])
                  .slice(0, 10)
                  .reverse()
                  .filter((user: UserModel) => !user.isAdmin)
                  .map((user: UserModel, index: number) => (
                    <DashBoardTable key={user._id} name={user.name ?? user.username} userID={index + 1} {...user} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
