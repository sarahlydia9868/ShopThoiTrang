import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col h-screen justify-between">
        <NavBar />
        <div className="mb-auto lg:flex justify-start items-start flex-col gap-3 pt-5 lg:px-20 px-5 py-10 w-full"> 
          {/* //TODO:  */}
          404 Not Found 
        </div>
        <Footer />
      </div>
    </>
  );
}
