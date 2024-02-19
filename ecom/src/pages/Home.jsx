// import Navbar from "./Navbar";
import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
// import RangeSlider from "./RangeSlider";
import Navbar from "../components/Navbar";

import Slider from "@mui/material/Slider";

const Home = ({}) => {
  const [totalpage, setTotalPage] = useState(10);
  const [products, setProducts] = useState({});
  const [oldproducts, setOldproducts] = useState({});
  const [fullproducts, setFullproducts] = useState({});
  const [page, setPage] = useState(1);
  const [change, setChange] = useState([]);
  const [filter, setFilter] = useState("");
  const findMaximumPrice = (arr) => {
    let maxPrice = -Infinity;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].price > maxPrice) {
        maxPrice = arr[i].price;
      }
    }
    return maxPrice;
  };

  const maximumPrice = findMaximumPrice(fullproducts);
  const [value, setValue] = useState([0, 10000]);
  const filterObjectsByPriceRange = (arr, range) => {
    const [lowerBound, upperBound] = range;
    return arr.filter(
      (obj) => obj.price >= lowerBound && obj.price <= upperBound
    );
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value);
    const filteredObjects = filterObjectsByPriceRange(fullproducts, value);
    setProducts(filteredObjects);
    setTotalPage(1);
    setFilter("Searchrange Results");
  };
  const handlefilter = (obj, event) => {
    setFilter(obj);
    event.preventDefault();
    if (obj == "all") {
      setProducts(oldproducts);
    } else {
      fetch(`https://dummyjson.com/products/category/${obj}`).then(
        async (res) => {
          const data = await res.json();
          setProducts(data.products);
          console.log(products);
          setPik(true);
        }
      );
    }
  };

  const items = Array.from({ length: totalpage }, (_, index) => index + 1);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const handlepageprev = () => {
    if (page != 1) setPage(page - 1);
    else console.log("it is on first page");
  };
  const handlepage = (item) => {
    setPage(item);
    setPik(false);
  };
  const handlepagenext = () => {
    if (page != 10) setPage(page + 1);
    else console.log("it is on last page");
  };

  const [pik, setPik] = useState(false);

  useEffect(() => {
    fetch(
      `https://dummyjson.com/products?limit=${10}&skip=${(page - 1) * 10}`
    ).then(async (res) => {
      const data = await res.json();
      setProducts(data.products);
      setOldproducts(data.products);
      console.log(products);
      setPik(true);
    });
  }, [page]);
  useEffect(() => {
    fetch(`https://dummyjson.com/products?limit=100`).then(async (res) => {
      const data = await res.json();
      setFullproducts(data.products);
    });
  }, []);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  return (
    <>
      <Navbar
        setFilter={setFilter}
        fullproducts={fullproducts}
        setTotalPage={setTotalPage}
        setProducts={setProducts}
        products={products}
      />
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">Categories</h3>

                      <Disclosure
                        as="div"
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  Category
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            {/* comehere for mobile */}
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-4">
                                <div className="flex items-center">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      handlefilter("all", e);
                                    }}
                                    className={`
                              ml-3 text-sm text-gray-600 ${
                                filter == "all" && "font-bold"
                              } `}
                                  >
                                    All
                                  </button>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div className="flex items-center">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      handlefilter("smartphones", e);
                                    }}
                                    className={`
                              ml-3 text-sm text-gray-600 ${
                                filter == "smartphones" && "font-bold"
                              } `}
                                  >
                                    smartphones
                                  </button>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div
                                  key="skincare"
                                  className="flex items-center"
                                >
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      handlefilter("laptops", e);
                                    }}
                                    className={`
                              ml-3 text-sm text-gray-600 ${
                                filter == "laptops" && "font-bold"
                              } `}
                                  >
                                    laptops
                                  </button>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div
                                  key="fragrances"
                                  className="flex items-center"
                                >
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      handlefilter("fragrances", e);
                                    }}
                                    className={`
                              ml-3 text-sm text-gray-600 ${
                                filter == "fragrances" && "font-bold"
                              } `}
                                  >
                                    fragrances
                                  </button>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div
                                  key="skincare"
                                  className="flex items-center"
                                >
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      handlefilter("skincare", e);
                                    }}
                                    className={`
                              ml-3 text-sm text-gray-600 ${
                                filter == "skincare" && "font-bold"
                              } `}
                                  >
                                    skincare{" "}
                                  </button>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div
                                  key="groceries"
                                  className="flex items-center"
                                >
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      handlefilter("groceries", e);
                                    }}
                                    className={`
                              ml-3 text-sm text-gray-600 ${
                                filter == "groceries" && "font-bold"
                              } `}
                                  >
                                    groceries
                                  </button>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div
                                  key="homedecoration"
                                  className="flex items-center"
                                >
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      handlefilter("home-decoration", e);
                                    }}
                                    className={`
                              ml-3 text-sm text-gray-600 ${
                                filter == "home-decoration" && "font-bold"
                              } `}
                                  >
                                    homedecoration{" "}
                                  </button>
                                </div>
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </form>
                    <div className="border-t border-gray-200">
                      <div className="flex">
                        <span className="font-medium text-gray-900 flex w-full items-center justify-between bg-white px-4 py-3 ">
                          Price
                        </span>
                        <button
                          type="button"
                          className="mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                          onClick={() => {
                            window.location.reload();
                          }}
                        >
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <form className="mx-4 mt-12 ">
                        <Slider
                          value={value}
                          aria-labelledby="range-slidder"
                          onChange={handleChange}
                          valueLabelDisplay="auto"
                          min={0}
                          max={maximumPrice + 50}
                          step={50}
                        />
                      </form>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              {filter && filter != "all" ? (
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  {filter}
                </h1>
              ) : (
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  All Products
                </h1>
              )}

              <div className="flex items-center">
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <div className=" grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 ">
                {/* Filters */}
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  <Disclosure
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              Category
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  onClick={() => {
                                    window.location.reload();
                                  }}
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            <div key="laptops" className="flex items-center">
                              <button
                                type="button"
                                onClick={(e) => {
                                  handlefilter("all", e);
                                }}
                                className="ml-3 text-sm text-gray-600"
                              >
                                ALL
                              </button>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <button
                                type="button"
                                onClick={(e) => {
                                  handlefilter("smartphones", e);
                                }}
                                className={`
                              ml-3 text-sm text-gray-600 ${
                                filter == "smartphones" && "font-bold"
                              } `}
                              >
                                smartphones
                              </button>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div key="laptops" className="flex items-center">
                              <button
                                type="button"
                                onClick={(e) => {
                                  handlefilter("laptops", e);
                                }}
                                className={`
                              ml-3 text-sm text-gray-600 ${
                                filter == "laptops" && "font-bold"
                              } `}
                              >
                                laptops
                              </button>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div key="fragrances" className="flex items-center">
                              <button
                                type="button"
                                onClick={(e) => {
                                  handlefilter("fragrances", e);
                                }}
                                className={`
                              ml-3 text-sm text-gray-600 ${
                                filter == "fragrances" && "font-bold"
                              } `}
                              >
                                fragrances
                              </button>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div key="skincare" className="flex items-center">
                              <button
                                type="button"
                                onClick={(e) => {
                                  handlefilter("skincare", e);
                                }}
                                className={`
                              ml-3 text-sm text-gray-600 ${
                                filter == "skincare" && "font-bold"
                              } `}
                              >
                                skincare{" "}
                              </button>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div key="groceries" className="flex items-center">
                              <button
                                type="button"
                                onClick={(e) => {
                                  handlefilter("groceries", e);
                                }}
                                className={`
                              ml-3 text-sm text-gray-600 ${
                                filter == "groceries" && "font-bold"
                              } `}
                              >
                                groceries
                              </button>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div
                              key="homedecoration"
                              className="flex items-center"
                            >
                              <button
                                type="button"
                                onClick={(e) => {
                                  handlefilter("home-decoration", e);
                                }}
                                className={`
                              ml-3 text-sm text-gray-600 ${
                                filter == "home-decoration" && "font-bold"
                              } `}
                              >
                                homedecoration{" "}
                              </button>
                            </div>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              Price
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  onClick={() => {
                                    window.location.reload();
                                  }}
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="border-t border-gray-200">
                            <form className="mx-4 mt-12 ">
                              <Slider
                                value={value}
                                aria-labelledby="range-slidder"
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                min={0}
                                max={maximumPrice + 50}
                                step={50}
                              />
                            </form>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                      <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        {pik ? (
                          products.map((product) => (
                            <Link
                              to={`/productdetail/${product.id}`}
                              key={product.id}
                            >
                              <div className="group relative border-solid border-2 p-2 border-gray-200">
                                <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                                  <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                  />
                                </div>
                                <div className="mt-4 flex justify-between">
                                  <div>
                                    <h3 className="text-sm text-gray-700">
                                      <a href={product.thubnail}>
                                        <span
                                          aria-hidden="true"
                                          className="absolute inset-0"
                                        />
                                        {product.title}
                                      </a>
                                    </h3>
                                    <div className="mt-1 text-sm text-gray-500">
                                      <span className="align-bottom">
                                        {product.rating}{" "}
                                      </span>
                                      <FaStar className="w-6 h-6 text-yellow-400 inline" />
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-400 line-through">
                                      ${product.price}
                                    </p>
                                    <p className="text-sm font-medium text-gray-900">
                                      $
                                      {Math.round(
                                        product.price *
                                          ((100 - product.discountPercentage) /
                                            100)
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* pagination */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <button
                  onClick={() => handlepageprev()}
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlepagenext()}
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">{(page - 1) * 10 + 1}</span>{" "}
                    to <span className="font-medium">{page * 10}</span> of{" "}
                    <span className="font-medium">100</span> results
                  </p>
                </div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => handlepageprev()}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Prev</span>
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

                    {items.map((item) => (
                      <button
                        key={item} // It's important to assign a unique key to each repeated element
                        onClick={() => {
                          handlepage(item);
                        }}
                        aria-current="page"
                        className="ring-1 ring-inset ring-gray-300 relative z-10 inline-flex items-center text-gray-900 hover:bg-indigo-600 px-4 py-2 text-sm font-semibold hover:text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {item}
                      </button>
                    ))}

                    <button
                      onClick={() => handlepagenext()}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
