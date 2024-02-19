import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import Axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";

// const products = [
//   {
//     id: 1,
//     name: "Throwback Hip Bag",
//     href: "#",
//     color: "Salmon",
//     price: "$90.00",
//     quantity: 1,
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
//     imageAlt:
//       "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
//   },
//   {
//     id: 2,
//     name: "Medium Stuff Satchel",
//     href: "#",
//     color: "Blue",
//     price: "$32.00",
//     quantity: 1,
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
//     imageAlt:
//       "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
//   },
//   // More products...
// ];

const Cart = (props) => {
  const [totalCount, setTotalCount] = useState();
  const [totalamt, setTotalamt] = useState();
  const [products, setProducts] = useState();
  // const host = "http://localhost:5000";
  const host = "https://funcartback.onrender.com";
  const navigate = useNavigate();
  useEffect(() => {
    const fetchdata = async () => {
      await Axios.get(`${host}/cart/getall`, {
        params: {
          param1: props.user.uid,
        },
      })
        .then((res) => {
          console.log(props.user.uid);
          const data = res.data;
          console.log(data);
          let t = 0;
          let r = 0;
          data.map((produc) => {
            t = t + produc.price * produc.quantity;
            r = r + produc.quantity;
          });
          setTotalamt(t);
          setTotalCount(r);
          setProducts(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchdata();
  }, [props]);
  const handleCheckout = async () => {
    try {
      const response = await Axios.delete(`${host}/cart/checkout`);
      console.log(response.data);
      setProducts();
      setTotalCount(0);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className=" h-screen bg-gray-900">
      <div>
        <Navbar />
        <div className="py-24">
          <div className="mx-auto bg-white max-w-2xl px- sm:px-6 lg:px-8">
            <h1 className="text-4xl my-5 pt-5 font-bold tracking-tight text-gray-900">
              Cart
            </h1>
            {totalCount != 0 && (
              <div className="border-t border-gray-200 px-4 py-3 sm:px-6">
                <div className="flex justify-between text-lg font-medium text-gray-900">
                  <p>Total Product</p>
                  <p>{totalCount}</p>
                </div>
              </div>
            )}
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              {totalCount != 0 ? (
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {products?.map((product, index) => (
                      <li key={index} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.pic}
                            alt="productimage"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <Link
                                  to={`/productdetail/${product.id}`}
                                  className="text-3xl"
                                >
                                  {product.name}
                                </Link>
                              </h3>
                              <p className=" font-bold ml-4 mb-4">
                                ${product.price * product.quantity}
                              </p>
                            </div>
                            <span className="my-2 py-[4px] px-2 text-[15px] text-white bg-blue-500 rounded-full">
                              {product.category}
                            </span>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              Qty:{" "}
                              <span className="text-gray-900 font-bold">
                                {product.quantity}
                              </span>
                            </div>

                            <div className="flex">
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-lg flex justify-center font-medium text-gray-900">
                  <p>Cart is empty</p>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              {totalCount != 0 && (
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${totalamt}</p>
                  </div>

                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>

                  <div className="mt-6">
                    <div onClick={handleCheckout}>
                      <p className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                        Checkout
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <Link to="/">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
