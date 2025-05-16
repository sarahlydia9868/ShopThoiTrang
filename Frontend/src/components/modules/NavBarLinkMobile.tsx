import { Link } from "react-router-dom"

interface INavBarLinkMobile {
    text: string
    path: string
}

export default function NavBarLinkMobile({ text, path }: INavBarLinkMobile) {
    const scrollToUpHandler = () => {
        window.scrollTo(0, 0);
      };
    return (
        <Link to={path} onClick={scrollToUpHandler}>
            <div className="border-b-1 p-3 hover:bg-zinc-900 hover:text-primary transition-colors duration-300 cursor-pointer overflow-hidden  ">
                <span className=' font-bold '>{text}</span>
            </div>
        </Link>
    )
}
