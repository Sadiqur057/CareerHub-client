import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Spinner,
} from "@material-tailwind/react";



export function NavBar() {
  const [openNav, setOpenNav] = React.useState(false);

  const prevTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(prevTheme);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const { user, logOutUser, loading } = useContext(AuthContext);
  const handleLogout = () => {
    logOutUser().then(() => {
      toast.success("Logged out successfully");
    });
  };


  const activeStyles =
    "lg:border-y transition duration-300 ease-in-out px-2 border-c-primary font-bold hover:bg-c-primary hover:text-[#fff] text-[15px] my-2 lg:my-0 mx-0 hover:rounded py-2";
  const inactiveStyles =
    " px-1 xl:px-2 font-medium border-y border-transparent   mx-1  hover:font-black-800 rounded hover:bg-base-200  text-[15px] my-2 lg:my-0 mx-0 py-2";

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? activeStyles : inactiveStyles)}
      >
        Home
      </NavLink>
      <NavLink
        to="/all-jobs"
        className={({ isActive }) => (isActive ? activeStyles : inactiveStyles)}
      >
        All Jobs
      </NavLink>
      <NavLink
        to="/blogs"
        className={({ isActive }) =>
          isActive ? activeStyles : inactiveStyles
        }
      >
        Blogs
      </NavLink>

      {user && (
        <>
          <NavLink
            to="/applied-jobs"
            className={({ isActive }) =>
              isActive ? activeStyles : inactiveStyles
            }
          >
            Applied Jobs
          </NavLink>
          <NavLink
            to="/add-job"
            className={({ isActive }) =>
              isActive ? activeStyles : inactiveStyles
            }
          >
            Add A Job
          </NavLink>
          <NavLink
            to="/my-jobs"
            className={({ isActive }) =>
              isActive ? activeStyles : inactiveStyles
            }
          >
            My Jobs
          </NavLink>
        </>
      )}
    </>
  );

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col  lg: gap-[6px] xl:gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {links}
    </ul>
  );

  const darkNav =
    "sticky top-0 z-10 h-max max-w-full rounded-none px-4 lg:px-0 l bg-neutral text-white border-none";
  const lightNav =
    "sticky top-0 z-10 h-max max-w-full rounded-none px-4 lg:px-0   text-c-black";
  return (
    <div className="max-h-[768px] w-full overflow-hidden border-0 outline-none">
      <Navbar className={theme === "light" ? lightNav : darkNav}>
        <div className="flex items-center justify-between h-[40px] md:h-[50px] px-2 xl:px-10">
          <Typography className="text-c-primary mr-4 cursor-pointer font-bold text-2xl md:text-3xl flex items-center gap-2">
            <img className="w-7 h-7" src="/logo.png" alt="" />
            <Link to="/">CareerHub</Link>
          </Typography>
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">{navList}</div>
            <label className="swap swap-rotate">
              <input
                onChange={handleToggle}
                type="checkbox"
                checked={theme === "dark" ? true : false}
                className="theme-controller"
              />
              {/* sun icon */}
              <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

              {/* moon icon */}
              <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

            </label>
            <div className="flex items-center gap-x-1">
              {user && (
                <>
                  <div id="user" className="btn-circle avatar  items-center justify-center hidden sm:flex">
                    <div className="w-full max-w-[40px] max-h-[40px] rounded-full">
                      <img
                        className="w-full h-full"
                        alt="Profile Picture"
                        src={user?.photoURL}
                      />
                    </div>
                  </div>
                  <Tooltip anchorSelect="#user">{user?.displayName}</Tooltip>
                </>
              )}
              {user ? (
                <button
                  className="btn bg-c-primary text-white rounded-lg md::text-[15px] font-bold hidden lg:block"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : loading ? (
                <Spinner className="h-8 w-8" color="orange" />
              ) : (
                <>
                  {" "}
                  <Link to="/login" className="hidden lg:block">
                    <button className="btn bg-c-primary  rounded-xl hover:bg-c-hover text-white md:text-[15px] font-bold mr-2">
                      Login
                    </button>
                  </Link>
                  <Link to="/register" className="hidden lg:block">
                    <button className="btn bg-c-primary  rounded-xl hover:bg-c-hover text-white md:text-[15px] font-bold ">
                      Register
                    </button>
                  </Link>
                </>
              )}
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6  hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className={
                    theme === "dark" ? "h-6 w-6 text-white" : "h-6 w-6"
                  }
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    theme === "dark" ? "h-6 w-6 text-white" : "h-6 w-6"
                  }
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          <div className="mr-4">{navList}</div>
          <div className="flex items-center gap-x-1">
            {user ? (
              <button
                className="btn bg-c-primary text-white md:text-[15px] font-bold"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : loading ? (
              <Spinner className="h-8 w-8" color="orange" />
            ) : (
              <>
                {" "}
                <Link to="/login" className="">
                  <button className="btn bg-c-primary  rounded-xl hover:bg-c-hover text-white md:text-[15px] font-bold mr-2">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="btn bg-c-primary  rounded-xl hover:bg-c-hover text-white md:text-[15px] font-bold ">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}
