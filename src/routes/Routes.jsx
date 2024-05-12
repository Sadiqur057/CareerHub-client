import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/home/Home";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import FoodDetails from "../pages/foodDetails/foodDetails";

import AddFood from "../pages/addFood/AddFood";
import MyFoods from "../pages/myFoods/MyFoods";
import AllFoods from "../pages/allFoods/AllFoods";
import EditFood from "../pages/editFood/EditFood";
import RequestedFoods from "../pages/requestedFoods/RequestedFoods";
import PrivateRoutes from "./PrivateRoutes";


const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/food-details/:id",
        element: <PrivateRoutes><FoodDetails></FoodDetails></PrivateRoutes>,
      },
      {
        path: "/edit-food/:id",
        element: <PrivateRoutes><EditFood></EditFood></PrivateRoutes>,
      },
      {
        path: "/all-foods",
        element: <AllFoods></AllFoods>,
      },
      {
        path: "/add-food",
        element: <PrivateRoutes><AddFood></AddFood></PrivateRoutes>
      },
      {
        path: "/my-foods",
        element: <PrivateRoutes><MyFoods></MyFoods></PrivateRoutes>
      },
      {
        path: "/requested-foods",
        element: <PrivateRoutes><RequestedFoods></RequestedFoods></PrivateRoutes>
      },
    ],
  },
]);
export default Routes;
