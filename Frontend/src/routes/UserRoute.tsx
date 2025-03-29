import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../redux/store";
import { IUserRoot } from "../redux/reducers/user";
import { Outlet, useNavigate } from "react-router-dom";

export default function UserRoute() {
  const { user } = useSelector((state: RootState) => state.user) as IUserRoot;
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);
  return <Outlet/>;
}
