import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "../pages/shared/Footer";
import { NavBar } from "../pages/shared/NavBar";

const Root = () => {
  return (
    <>
      <NavBar></NavBar>
      <ToastContainer></ToastContainer>
      <div className="min-h-[calc(100vh-115px)]">
        <Outlet ></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Root;
