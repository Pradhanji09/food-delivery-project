import { useContext, useEffect, useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/assets";
import { url } from "../../../../Admin/src/assets/assets";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const LoginPopUp = ({ setShowLogIn }) => {
  const { token, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newURL = url;
    if (currState === "Login") {
      newURL += "/api/user/login";
    } else {
      newURL += "/api/user/register";
    }

    const response = await axios.post(newURL, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogIn(false);
      window.location.reload();
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popoup fixed z-10 w-full h-screen bg-black bg-opacity-65 grid">
      <form
        onSubmit={onLogin}
        className="login-container place-self-center w-[max(23vw,330px)] text-gray-500 bg-white flex flex-col gap-6 p-6 px-8 rounded-lg text-sm animate-fadeIn"
      >
        <div className="login-title flex justify-between items-center text-black">
          <p>{currState}</p>
          <img
            className="w-4 cursor-pointer"
            src={assets.cross_icon}
            onClick={() => setShowLogIn(false)}
            alt="cross"
          />
        </div>
        <div className="login-inputs flex flex-col gap-5 ">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              className="w-full mb-4 p-2 border border-black rounded-sm"
              type="text"
              placeholder="Your name"
              required
              value={data.name}
            />
          )}

          <input
            name="email"
            onChange={onChangeHandler}
            type="email"
            className="w-full mb-4 p-2 border border-black rounded-sm"
            placeholder="Your email"
            required
            value={data.email}
          />
          <input
            name="password"
            onChange={onChangeHandler}
            type="password"
            placeholder="Enter Password"
            className="w-full mb-4 p-2 border border-black rounded-sm"
            required
          />
        </div>
        <button
          type="submit"
          className=" w-full p-2 bg-orange-500 text-white hover:bg-orange-600 rounded-lg"
        >
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-terms flex items-center gap-2">
          <input type="checkbox" required />
          <p className="text-gray-700">
            By continuing, i agee to the terms of use & privacy policy.
          </p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account{" "}
            <span
              className=" text-orange-600 font-medium cursor-pointer"
              onClick={() => setCurrState("Sign Up")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account{" "}
            <span
              className="font-medium text-orange-600 cursor-pointer"
              onClick={() => setCurrState("Login")}
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp;
