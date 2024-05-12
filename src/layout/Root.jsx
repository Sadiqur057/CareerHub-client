import { Outlet } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import Footer from "../pages/shared/Footer";
import { NavBar } from "../pages/shared/NavBar";

const Root = () => {
  return (
    <>
      <NavBar></NavBar>
      {/* <ToastContainer></ToastContainer> */}
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default Root;
