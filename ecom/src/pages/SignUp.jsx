import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../auth/firebase";
const SignUp = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [submitbutton, setSubmitbutton] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const handleOnSubmit = () => {
    if (!value.name || !value.email || !value.pass) {
      setErrorMsg("Please enter all fields");
      return;
    }
    setErrorMsg("");
    // console.log(value);
    setSubmitbutton(true);
    createUserWithEmailAndPassword(auth, value.email, value.pass)
      .then(async (res) => {
        setSubmitbutton(false);
        const user = res.user;
        await updateProfile(user, { displayName: value.name });
        // console.log(user)
        navigate("/");
        console.log(res);
      })
      .catch((err) => {
        setSubmitbutton(false);
        setErrorMsg(err.message);
        // console.log("Error", err);
      });
  };
  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transhtmlForm -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">SignUp</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="name"
                      name="name"
                      type="text"
                      onChange={(event) =>
                        setValue((prev) => ({
                          ...prev,
                          name: event.target.value,
                        }))
                      }
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="name"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      onChange={(event) =>
                        setValue((prev) => ({
                          ...prev,
                          email: event.target.value,
                        }))
                      }
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      onChange={(event) =>
                        setValue((prev) => ({
                          ...prev,
                          pass: event.target.value,
                        }))
                      }
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <b className="font-bold text-[0.875rem] text-[#ff3300]">
                      {errorMsg}
                    </b>
                    <p>
                      <button
                        disabled={submitbutton}
                        onClick={handleOnSubmit}
                        className="bg-blue-500 text-white rounded-md px-2 py-1 disabled:opacity-75"
                      >
                        Submit
                      </button>
                    </p>
                    <p className="font-bold text-black">
                      I have an account?{" "}
                      <span className="text-[#9900FF]">
                        <Link to="/Login">Login</Link>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
