import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { RootState } from "../redux/store";
import { IUserRoot } from "../redux/reducers/user";
import { Outlet, useNavigate } from "react-router-dom";

export default function UserRoute() {
  const { user } = useSelector((state: RootState) => state.user) as IUserRoot;
  const navigate = useNavigate();

  const timeoutRef = useRef<any | null>(null);

  useEffect(() => {
    if (!user) {
      timeoutRef.current = setTimeout(() => {
        if (!user || !(user as UserModel).isAdmin) {
          navigate("/");
        }
      }, 3000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [user, navigate]);

  return <Outlet />;
}
