import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/home/Home";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import JobDetails from "../pages/jobDetails/JobDetails";
import AllJobs from "../pages/allJobs/AllJobs";
import AddJob from "../pages/addJob/AddJob";
import MyJobs from "../pages/myJobs/MyJobs";
import EditJob from "../pages/editJob/EditJob";
import PrivateRoutes from "../routes/PrivateRoutes"
import AppliedJobs from "../pages/appliedJobs/AppliedJobs";


const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement:<ErrorPage></ErrorPage>,
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
        path: "/job-details/:id",
        element:  <PrivateRoutes> <JobDetails></JobDetails></PrivateRoutes>,
      },
      {
        path: "/all-jobs",
        element: <AllJobs></AllJobs>,
      },
      {
        path: "/add-job",
        element:<PrivateRoutes><AddJob></AddJob></PrivateRoutes>
      },
      {
        path: "/my-jobs",
        element:<PrivateRoutes><MyJobs></MyJobs></PrivateRoutes>
      },
      {
        path: "/applied-jobs",
        element:<PrivateRoutes><AppliedJobs></AppliedJobs></PrivateRoutes>
      },
      {
        path: "/edit-job/:id",
        element:<PrivateRoutes><EditJob></EditJob></PrivateRoutes>
      },
    ],
  },
]);
export default Routes;
