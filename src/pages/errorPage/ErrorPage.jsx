import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const errorStatus = error.status || 404
  const errorText = error?.statusText || "Not Found";
  return (
<div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50 p-4 md:p-10">
  <div className="rounded-lg bg-white p-8 text-center shadow-xl max-w-[550px]">
    <h1 className="mb-4 text-4xl font-bold text-[#272222]"> Error: {errorStatus}</h1>
    <p className="text-gray-800 text-xl mb-3">This Page is  {errorText}
    </p>
    <p></p>
    <p className="text-gray-600">Oops! The content you are looking for could not be found. </p>
    <Link to="/" className="mt-4 btn bg-c-primary text-white hover:bg-c-hover border-none"> Back to Home</Link>
  </div>
</div>
  );
};

export default ErrorPage;