import { useEffect } from "react";
import UsersBox from "./modules/UsersBox";
import SectionHeader from "./modules/SectionHeader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getAllUsers } from "../actions/user";
import { IUsersRoot } from "../redux/reducers/user";

export default function AdminUsers() {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.allUsers) as IUsersRoot;
  useEffect(() => {
    dispatch(getAllUsers(`sort=-isAdmin`));
  }, [dispatch, getAllUsers]);

  return (
    <div className="container mx-auto flex justify-center items-start flex-col p-10">
      <div className=" mb-10">
        <SectionHeader text="Danh sách người dùng" />
      </div>
      <div className=" flex justify-center items-center flex-wrap gap-10 mb-20">
        {users?.map((users: UserModel) => (
          <UsersBox key={users._id} {...users} />
        ))}
      </div>
    </div>
  );
}
