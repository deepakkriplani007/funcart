import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
const ProductDetail = (props) => {
  // const host = "http://localhost:5000";
  const host = "https://funcartback.onrender.com";

  const { id } = useParams();

  const [index, setIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const handleQuantityChange = (event) => {
    setSelectedQuantity(parseInt(event.target.value));
  };
  const [product, setProduct] = useState();
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`).then(async (res) => {
      const data = await res.json();
      console.log(data);
      setProduct(data);
    });
  }, []);

  const handleonSubmit = () => {
    const finalprice = Math.round(
      product?.price * ((100 - product?.discountPercentage) / 100)
    );
    const formData = {
      uid: props.user.uid,
      product: `https://dummyjson.com/products/${id}`,
      name: product.title,
      id: product.id,
      category: product.category,
      pic: product.thumbnail,
      price: finalprice,
      quantity: selectedQuantity,
      checkout: false,
    };
    console.log(formData);
    Axios.post(`${host}/cart/addproduct`, { formData })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar />
      <section className="py-20 overflow-hidden bg-white font-poppins dark:bg-gray-800">
        <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 md:w-1/2">
              <div className="sticky top-0 z-50 overflow-hidden ">
                <div className="relative mb-6 lg:mb-10 h-[450px]">
                  <img
                    src={product?.images[index]}
                    // src="https://i.postimg.cc/8zr7BpVj/long-sleeved-t-shirt-isolated-2021-08-26-17-06-58-utc-removebg-preview.png"
                    alt=""
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex-wrap hidden md:flex ">
                  {product?.images.map((product, i) => (
                    <div className="w-1/2 p-2 sm:w-1/4" key={i}>
                      <button
                        onClick={() => setIndex(i)}
                        className={`block border border-blue-100 dark:border-gray-700 dark:hover:border-gray-600$ hover:${
                          index != i && "border-blue-300 border-2"
                        } ${index == i && "border-red-600 border-2"} `}
                      >
                        <img
                          src={product}
                          alt=""
                          className="object-cover w-full lg:h-32"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2">
              <div className="lg:pl-20">
                <div className="pb-6 mb-8 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-lg font-medium text-rose-500 dark:text-rose-200">
                    New
                  </span>
                  <h2 className="max-w-xl mt-2 mb-6 text-xl font-bold dark:text-gray-300 md:text-4xl">
                    {product?.title}
                  </h2>
                  <div className="flex flex-wrap items-center mb-6">
                    <ul className="flex mb-4 mr-2 lg:mb-0">
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      </li>
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      </li>
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      </li>
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      </li>
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      </li>
                    </ul>
                  </div>
                  <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                    {product?.description}
                  </p>
                  <div className="p-4 mb-8 border border-gray-300 dark:border-gray-700">
                    <h2 className="mb-4 text-xl font-semibold dark:text-gray-400">
                      Real time{" "}
                      <span className="px-2 bg-blue-500 text-gray-50">
                        {Math.floor(Math.random() * (100 - 80 + 1)) + 80}
                      </span>
                      visitors right now!{" "}
                    </h2>
                    <div className="mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">
                      {`Hurry up! left ${product?.stock} in Stock`}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5  dark:bg-gray-600">
                      <div className="bg-blue-600 dark:bg-blue-400 h-2.5 rounded-full w-[45%]"></div>
                    </div>
                  </div>
                  <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                    <span>
                      $
                      {Math.round(
                        product?.price *
                          ((100 - product?.discountPercentage) / 100)
                      )}
                    </span>
                    <span className="text-base font-normal text-gray-500 line-through dark:text-gray-400">
                      ${product?.price}
                    </span>
                  </p>
                </div>

                <div className="mb-4 mr-4 lg:mb-0">
                  <div className="text-gray-500 mb-8 ">
                    <label
                      htmlFor="quantity"
                      className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                    >
                      Qty
                    </label>
                    <select
                      name="quantity"
                      id="quantity"
                      value={selectedQuantity}
                      onChange={handleQuantityChange}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <button
                    onClick={handleonSubmit}
                    className="w-full h-10 p-2 mr-4 rounded bg-blue-500 dark:text-gray-200 text-gray-50 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
