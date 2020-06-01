import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios"
import qs from 'querystring'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(AuthContext);

  const fetchToken = (e) => {
    // Login user and save token on device
    e.preventDefault();
    axios
        .post("http://localhost:5000/api/users/login",qs.stringify({
            "email":email,
            "password":password
        }))
        .then(res=> setToken(res.data.token))
        .catch(err=> console.log(err))
  };

  return (
    <div className="max-w-full mx-auto vertical-middle h-screen flex">
      <div className="w-6/12 mx-auto my-auto ">
        <div className="flex flex-wrap">
          <div className="w-full relative">
            <div className="mt-6 my-auto">
              <div className="text-center font-semibold text-black">
                Welcome back!
              </div>

              <form className="mt-8">
                <div className="mx-auto max-w-lg">
                  <div className="py-2">
                    <span className="px-1 text-sm text-gray-600">Email</span>
                    <input
                      placeholder=""
                      type="text"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      className="text-md  px-3 py-2  rounded-lg w-full 
                bg-white border-2 border-gray-300 placeholder-gray-600 focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    />
                  </div>
                  <div className="py-2">
                    <span className="px-1 text-sm text-gray-600">Password</span>
                    <div className="relative">
                      <input
                        placeholder=""
                        type="password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        className="text-md  px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 
                focus:placeholder-gray-500
                focus:bg-white 
                focus:border-gray-600  
                focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between"></div>{" "}
                  <button
                    className="mt-3 text-lg font-semibold 
                bg-gray-800 w-full text-white rounded-lg
                px-6 py-3  shadow-xl hover:text-white hover:bg-black"
                type="submit"
                onClick={fetchToken}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
