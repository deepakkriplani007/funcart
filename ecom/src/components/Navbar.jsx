import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FaCartShopping } from "react-icons/fa6";
import { auth } from "../auth/firebase";
import { signOut } from "firebase/auth";
const Navbar = ({ fullproducts, setTotalPage, setProducts, products }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [bar, setBar] = useState(true);
  const filterObjectsByComponentName = (p, sea) => {
    return p.filter((obj) =>
      obj.title.toLowerCase().includes(sea.toLowerCase())
    );
  };
  const handleSignout = () => {
    signOut(auth)
      .then((res) => {
        console.log(user);
        navigate("/login");
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
    const filteredObjects = filterObjectsByComponentName(fullproducts, search);
    setProducts(filteredObjects);
    setTotalPage(1);
    0;
  };
  // useEffect(() => {
  //   // fetch(`https://dummyjson.com/products?limit=100`).then(async (res) => {
  //   //   const data = await res.json();
  //   // console.log(data.products);
  //   const filteredObjects = filterObjectsByComponentName(fullproducts, search);
  //   setProducts(filteredObjects);
  //   // });
  // }, [search]);
  return (
    <>
      {/* <!-- component -->
  <!-- This is an example component --> */}
      <div className="bg-black">
        <nav className="border-gray-200 px-2">
          <div className=" text-white  py-[12px] flex flex-wrap items-center justify-between">
            <Link to="/" className="flex">
              <svg
                className="h-10 mr-3"
                width="51"
                height="70"
                viewBox="0 0 51 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M1 53H27.9022C40.6587 53 51 42.7025 51 30H24.0978C11.3412 30 1 40.2975 1 53Z"
                    fill="#76A9FA"
                  ></path>
                  <path
                    d="M-0.876544 32.1644L-0.876544 66.411C11.9849 66.411 22.4111 55.9847 22.4111 43.1233L22.4111 8.87674C10.1196 8.98051 0.518714 19.5571 -0.876544 32.1644Z"
                    fill="#A4CAFE"
                  ></path>
                  <path
                    d="M50 5H23.0978C10.3413 5 0 15.2975 0 28H26.9022C39.6588 28 50 17.7025 50 5Z"
                    fill="#1C64F2"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="51" height="70" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
              {/* usestate */}
              <span className="max-md:hidden self-center text-lg font-semibold whitespace-nowrap">
                FunCart
              </span>
            </Link>
            <div className="flex md:order-2">
              {/* use here usestate */}
              <div className="relative mr-3 md:mr-0 hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                {/* search */}
                <input
                  type="text"
                  id="email-adress-icon"
                  value={search}
                  onChange={(e) => handleChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
                  placeholder="Search..."
                />
              </div>
              <button
                data-collapse-toggle="mobile-menu-3"
                type="button"
                className="md:hidden text-gray-400 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
                aria-controls="mobile-menu-3"
                aria-expanded="false"
              >
                <div className="relative mr-3 md:mr-0 ">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  {/* search */}
                  <input
                    type="text"
                    id="email-adress-icon"
                    value={search}
                    onChange={(e) => handleChange(e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
                    placeholder="Search..."
                  />
                </div>
              </button>
              <button
                data-collapse-toggle="mobile-menu-3"
                type="button"
                onClick={() => setBar(!bar)}
                className="md:hidden  text-gray-400 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
                aria-controls="mobile-menu-3"
                aria-expanded="true"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>

              <Link to="/cart">
                <button className=" border-2 border-blue-600 rounded-full mr-[24px] ml-[20px] p-[12px] text-blue-400  hover:bg-gray-100 hover:text-gray-900 hover:rounded-full">
                  {/* <FontAwesomeIcon
                  icon={faCartShopping}
                  style={{ color: "#fcfcfc" }}
                /> */}
                  <FaCartShopping />
                </button>
              </Link>
              <button
                onClick={handleSignout}
                className="border-2 border-blue-600 rounded-lg px-3 py-2 text-blue-400 cursor-pointer  hover:text-white hover:border-2 hover:border-white hover:rounded-lg"
              >
                LogOut
              </button>
            </div>

            <div
              // write state here
              className={`${
                bar == true && "hidden"
              } md:flex justify-between items-center w-full md:w-auto md:order-1`}
              id="mobile-menu-3"
            >
              <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
                <li>
                  <Link
                    to="/"
                    className="text-gray-700 rounded hover:bg-blue-700 hover:text-white  mb-[1px] md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-white md:p-0"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-gray-700 rounded hover:bg-blue-700 hover:text-white  mb-[1px] md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-white md:p-0"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-gray-700 rounded hover:bg-blue-700 hover:text-white  mb-[1px] md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-white md:p-0"
                  >
                    Services
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
