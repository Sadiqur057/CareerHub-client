import { Link } from "react-router-dom";
import errorImg from '../../assets/images/404.png'
import { Helmet } from "react-helmet-async";
const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50 p-4 md:p-10">
      <Helmet>
        <title>CH | Not Found</title>
      </Helmet>
      <div className="rounded-lg  p-8 text-center max-w-[650px] px-10">
        <img src={errorImg} className=" h-80 w-80 md:w-[400px] md:h-[400px] mx-auto mb-6" alt="" />

        <Link to="/" className="mt-4 btn bg-c-primary text-white hover:bg-c-hover border-none"> Back to Home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;