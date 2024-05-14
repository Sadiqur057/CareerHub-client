import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] w-full flex justify-center items-center">
        <Spinner className="h-12 w-12" color="orange" />
      </div>
    );
  }
  if (user) {
    return children;
  } else {
    Swal.fire({
      title: "Login to proceed",
      text: "Please login to continue exploring various service of our website",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Login now"
    })
    return <Navigate to="/login" state={location?.pathname}></Navigate>;


  }
};

PrivateRoutes.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoutes;
