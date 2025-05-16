import { Link } from "react-router-dom";

interface ILogo {
    className?: string
}

export function Logo({className}: ILogo) {
  const scrollToUpHandler = () => {
    window.scrollTo(0, 0);
  };
  return (
    <Link to="/" onClick={scrollToUpHandler}>
      <img src={"/images/svg/logo.svg"} className={className} alt="logo" />
    </Link>
  );
}
