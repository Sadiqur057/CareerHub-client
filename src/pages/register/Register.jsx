import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Input } from "@material-tailwind/react";

const Register = () => {
  const { createUser, updateUserProfile, setReload } = useContext(AuthContext);
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
    createUser(email, password).then(() => {
      toast.success("Account created succesfully");

      // fetch("https://travelors-server.vercel.app/users", {
      //   method: "POST",
      //   headers: {
      //     "content-type": "application/json",
      //   },
      //   body: JSON.stringify(userDetails),
      // })
      //   .then((res) => res.json())
      //   .then();

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
    <section className=" lg:pt-6 flex py-[60px] items-center bg-cool">
      <Helmet>
        <title>Travellors | Register</title>
      </Helmet>
      <div className="flex justify-center w-[90%]  md:w-fit  mx-auto bg-base-100 items-center mt-6  rounded-xl">
        <div className="flex flex-col justify-center text-center rounded-sm w-full  md:w-[400px]  lg:text-left p-0 flex-1">
          <div className="m-0 p-4 md:p-8 space-y-3 rounded-sm mx-auto lg:w-full lg:max-w-[400px] w-[93%] py-7 md:py-10">
            <h1 className="text-3xl font-bold text-center pb-4">
              Register Here
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col">
                <div className="relative w-full min-w-[200px] h-10 mb-2">
                  <Input
                    type="text"
                    autoComplete="current-name"
                    {...register("name", { required: "Name is required" })}
                    label="Name"
                    color="teal"
                  ></Input>
                </div>
                <p className="pb-2 text-left text-red-500">
                  {errors.name?.message}
                </p>
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
                  {errors.email?.message}
                </p>
                {/* // photo */}
                <div className="relative w-full min-w-[200px] h-10 mb-2">
                  <Input
                    autoComplete="current-photo"
                    type="text"
                    label="Photo URL"
                    color="teal"
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
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    label="Password"
                    color="teal"
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
