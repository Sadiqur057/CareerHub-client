import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Input } from "@material-tailwind/react";
import authImg from "../../assets/images/auth.png"

const Register = () => {
  const { createUser, updateUserProfile, setReload, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleViewPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();

    const email = data.email;
    const password = data.password;
    const name = data.name;
    const photo = data.photo;
    // const userDetails = { email, name, photo };
    createUser(email, password).then((user) => {
      toast.success("Account created succesfully");
      setUser(user)
      updateUserProfile(name, photo)
        .then(() => {
          setReload(true);
          navigate(location?.state ? location.state : "/");
        })
        .catch((error) => {
          toast.error(error?.message.split("(")[1].split(")")[0]);
        });
    });
  };

  return (
    <section className=" lg:pt-6 flex py-[60px] items-center bg-cool lg:px-10">
      <Helmet>
        <title>CH | Register</title>
      </Helmet>
      <div className="flex justify-center w-[90%]  md:w-fit  mx-auto bg-base-100 items-center mt-6  rounded-xl">
      <div className="grid lg:grid-cols-2  justify-center w-[90%]   md:w-fit mx-auto bg-base-100 items-center mt-6  rounded-xl ">
        <div className="hidden lg:block w-full">
          <img src={authImg} className="w-full max-h-[410px]" alt="" />
        </div>
          <div className="m-0 p-0 md:p-10 space-y-3 rounded-sm mx-auto lg:w-full md:w-[400px] md:max-w-[400px] w-[93%] py-7 md:py-10">
            <h1 className="text-3xl font-bold text-center pb-4">
              Register Here
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col">
                <div className="relative w-full min-w-[200px] h-10 mb-2">
                  <Input
                    required
                    type="text"
                    autoComplete="current-name"
                    {...register("name", { required: "Name is required" })}
                    label="Name"
                    color="orange"
                  ></Input>
                </div>
                <p className="pb-2 text-left text-red-500">
                  {errors.name?.message}
                </p>
                <div className="relative w-full min-w-[200px] h-10 mb-2">
                  <Input
                    type="email"
                    required
                    autoComplete="current-email"
                    {...register("email", { required: "Email is required" })}
                    color="orange"
                    label="Email"
                  />
                </div>
                <p className="pb-2 text-left text-red-500">
                  {errors.email?.message}
                </p>
                {/* // photo */}
                <div className="relative w-full min-w-[200px] h-10 mb-2">
                  <Input
                    required
                    autoComplete="current-photo"
                    type="text"
                    label="Photo URL"
                    color="orange"
                    {...register("photo", {
                      required: "Photo URL is required",
                    })}
                  ></Input>
                </div>
                <p className="pb-2 text-left text-red-500">
                  {errors.photo?.message}
                </p>
                <div className="mt-1 relative w-full min-w-[200px] h-10">
                  <Input
                    required
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    label="Password"
                    color="orange"
                    {...register("password", {
                      required: "Password is Required",
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                        message:
                          "Password must contain at least one lowercase letter, one uppercase letter, and be at least 6 characters long",
                      },
                    })}
                  ></Input>

                  <p
                    onClick={handleViewPassword}
                    className="cursor-pointer absolute right-4 top-3 text-xl"
                  >
                    {showPassword ? <VscEyeClosed /> : <VscEye />}
                  </p>
                </div>
                <p className="pt-2 text-left text-red-500">
                  {errors.password?.message}
                </p>
              </div>

              <input
                type="submit"
                className="btn bg-c-primary  w-full text-white hover:bg-c-hover"
                value="Register"
              />
            </form>

            <p className="text-sm text-center ">
              Already have an account? &nbsp;
              <Link
                to="/login"
                rel="noopener noreferrer"
                className="font-semibold"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
