import { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] w-full flex justify-center items-center">
        <Spinner className="h-12 w-12" color="teal" />
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={location?.pathname}></Navigate>;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoutes;
