import { Link } from "react-router-dom";

interface ILogo {
    className?: string
}

export function Logo({className}: ILogo) {
  return (
    <Link to="/">
      <img src={"/images/svg/logo.svg"} className={className} alt="logo" />
    </Link>
  );
}
