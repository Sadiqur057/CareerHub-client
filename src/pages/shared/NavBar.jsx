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
    "lg:border-b transition duration-300 ease-in-out px-3 border-c-primary font-bold hover:bg-c-primary hover:text-[#fff] text-[15px] my-2 lg:my-0 mx-0 hover:rounded py-2";
  const inactiveStyles =
    "px-3  font-medium border-y border-transparent   mx-1  hover:font-black-800 rounded hover:bg-base-200  text-[15px] my-2 lg:my-0 mx-0 py-2";

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? activeStyles : inactiveStyles)}
      >
        Home
      </NavLink>
      <NavLink
        to="/tourist-spots"
        className={({ isActive }) => (isActive ? activeStyles : inactiveStyles)}
      >
        All Jobs
      </NavLink>

      {user && (
        <>
          <NavLink
            to="/add-tourist-spot"
            className={({ isActive }) =>
              isActive ? activeStyles : inactiveStyles
            }
          >
            Applied Jobs
          </NavLink>
          <NavLink
            to="/my-tourist-spot"
            className={({ isActive }) =>
              isActive ? activeStyles : inactiveStyles
            }
          >
            Add A Job
          </NavLink>
          <NavLink
            to="/my-tourist-spot"
            className={({ isActive }) =>
              isActive ? activeStyles : inactiveStyles
            }
          >
            My Jobs
          </NavLink>
          <NavLink
            to="/my-tourist-spot"
            className={({ isActive }) =>
              isActive ? activeStyles : inactiveStyles
            }
          >
            Blogs
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
    <ul className="mt-2 mb-4 flex flex-col lg:gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {links}
    </ul>
  );

  const darkNav =
    "sticky top-0 z-10 h-max max-w-full rounded-none px-4 lg:px-8 l bg-neutral text-white border-none";
  const lightNav =
    "sticky top-0 z-10 h-max max-w-full rounded-none px-4 lg:px-8   text-c-black";
  return (
    <div className="max-h-[768px] w-full overflow-hidden border-0 outline-none">
      <Navbar className={theme === "light" ? lightNav : darkNav}>
        <div className="flex items-center justify-between h-[40px] md:h-[50px]">
          <Typography className="text-c-primary mr-4 cursor-pointer font-bold text-[28px] md:text-3xl ">
            <Link to="/">CareerHub</Link>
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <label className="cursor-pointer grid place-items-center">
              <input
                onChange={handleToggle}
                type="checkbox"
                checked={theme === "dark" ? true : false}
                className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
              />
              <svg
                className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <svg
                className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
            <div className="flex items-center gap-x-1">
              {user && (
                <>
                  <div id="user" className="btn-circle avatar flex items-center justify-center">
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
                  className="btn bg-c-primary text-white md::text-[15px] font-bold hidden lg:block"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : loading ? (
                <Spinner className="h-8 w-8" color="teal" />
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
              <Spinner className="h-8 w-8" color="teal" />
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
