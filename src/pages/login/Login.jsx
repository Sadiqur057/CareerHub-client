import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { Input } from "@material-tailwind/react";

const Login = () => {
  // scroll to top on load
  const onLoad = () => {
    window.scrollTo(0, 0);
  };
  onLoad();

  const navigate = useNavigate();
  const location = useLocation();

  // handle show password button
  const [showPassword, setShowPassword] = useState(false);
  const handleViewPassword = () => {
    setShowPassword(!showPassword);
  };

  const { loginUser, googleLogin, githubLogin, setReload } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // social login
  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        // const user = userCredential.user;
        // const name = user.displayName;
        // const email = user.email;
        // const photo = user.photoURL;
        // const userDetails = { name, email, photo };
        setReload(true)
        toast.success("Login Success");
        // fetch("https://travelors-server.vercel.app/users", {
        //   method: "POST",
        //   headers: {
        //     "content-type": "application/json",
        //   },
        //   body: JSON.stringify(userDetails),
        // })
        //   .then()
        //   .then();
        navigate(location?.state ? location.state : "/");

      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleGithubLogin = () => {
    githubLogin()
      .then(() => {
        // const user = userCredential.user;
        // const name = user.displayName;
        // const email = user.email || "Not Found";
        // const photo = user.photoURL;
        // const userDetails = { name, email, photo };
        toast.success("Login Success");
        setReload(true)
        // fetch("https://travelors-server.vercel.app/users", {
        //   method: "POST",
        //   headers: {
        //     "content-type": "application/json",
        //   },
        //   body: JSON.stringify(userDetails),
        // })
        //   .then()
        //   .then();
        toast.success("Login Success");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  // handle form submit
  const onSubmit = (data, e) => {
    e.preventDefault();
    const email = data.email;
    const password = data.password;
    loginUser(email, password)
      .then(() => {
        toast.success("Login Success");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        const errorMsg = error.message.split("(")[1].split(")")[0];
        if (errorMsg === "auth/invalid-credential") {
          toast.error("Your email or password is incorrect");
        } else {
          toast.error(errorMsg);
        }
      });
  };

  return (
    <section className="lg:pt-6 flex py-[60px] items-center bg-cool">
      <Helmet>
        <title>Travellors | Login</title>
      </Helmet>
      <div className="flex justify-center w-[90%]  md:w-fit  mx-auto bg-base-100 items-center mt-6  rounded-xl">
        <div className="flex flex-col justify-center text-center rounded-sm w-full  md:w-[400px]  lg:text-left p-0 flex-1">
          <div className="m-0 p-4 md:p-8 space-y-3 rounded-sm mx-auto lg:w-full lg:max-w-[400px] w-[93%] py-7 md:py-10">
            <h1 className="text-3xl font-bold text-center pb-4">Login Here</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col">
                <div className="relative w-full min-w-[200px] h-10 mb-2">
                  <Input
                    type="email"
                    autoComplete="current-email"
                    {...register("email", { required: "Email is required" })}
                    color="teal"
                    label="Email"
                  />
                </div>
                <p className="pb-2 text-left text-red-500">
                  {errors.password?.message}
                </p>
                <div className="mt-1 relative w-full min-w-[200px] h-10">
                  <Input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    label="Password"
                    color="teal"
                  />
                  <p
                    onClick={handleViewPassword}
                    className="cursor-pointer absolute right-4 top-3 text-xl"
                  >
                    {showPassword ? <VscEyeClosed /> : <VscEye />}
                  </p>
                </div>
              </div>

              <input
                type="submit"
                className="btn bg-c-primary  w-full text-white hover:bg-c-hover"
                value="Login"
              />
            </form>
            <div className="flex items-center space-x-1 py-3">
              <div className="flex-1 h-px sm:w-16 bg-gray-400 dark:bg-gray-300"></div>
              <p className="px-3 text-sm text-gray-600">
                Login with social accounts
              </p>
              <div className="flex-1 h-px sm:w-16 bg-gray-400 dark:bg-gray-300"></div>
            </div>
            <div className="space-y-4 text-sm">
              <button
                aria-label="Login with Google"
                type="button"
                className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-c-primary text-c-primary"
                onClick={handleGoogleLogin}
              >
                <FaGoogle className="text-lg"></FaGoogle>
                <p>Login with Google</p>
              </button>
              <button
                aria-label="Login with GitHub"
                role="button"
                className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-c-primary text-c-primary"
                onClick={handleGithubLogin}
              >
                <FaGithub className="text-lg"></FaGithub>
                <p>Login with GitHub</p>
              </button>
            </div>

            <p className="text-sm text-center ">
              Dont have an account? &nbsp;
              <Link
                to="/register"
                rel="noopener noreferrer"
                className="font-semibold"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
