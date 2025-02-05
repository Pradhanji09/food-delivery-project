import { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogIn }) => {
  const [menu, setMenu] = useState("Home");

  const { food_list, cartItems, token, setToken } = useContext(StoreContext);

  const cartItemsList = food_list.filter((item) => cartItems[item._id] > 0);

  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="navbar flex justify-between py-5 items-center">
      <div className="logo w-36">
        <Link to="/">
          <img src={assets.logo} alt="logo" />
        </Link>
      </div>
      <ul className="navbar-menu flex gap-5 text-blue-400">
        <li>
          <Link
            to="/"
            onClick={() => setMenu("Home")}
            className={`cursor-pointer ${menu === "Home" ? "underline" : ""}`}
          >
            Home
          </Link>
        </li>
        <li>
          <a
            href="#explore-menu"
            onClick={() => setMenu("Menu")}
            className={`cursor-pointer ${menu === "Menu" ? "underline" : ""}`}
          >
            Menu
          </a>
        </li>
        <li>
          <a
            href="#app-download"
            onClick={() => setMenu("mobile-app")}
            className={`cursor-pointer ${
              menu === "mobile-app" ? "underline" : ""
            }`}
          >
            Mobile app
          </a>
        </li>
        <li>
          <a
            href="#footer"
            onClick={() => setMenu("contact-us")}
            className={`cursor-pointer ${
              menu === "contact-us" ? "underline" : ""
            }`}
          >
            Contact us
          </a>
        </li>
      </ul>
      <div className="navbar-right flex items-center gap-10">
        <img src={assets.search_icon} alt="search icon" />
        <div className="search-icon relative">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket icon" />
          </Link>
          <div className="absolute w-5 bg-orange-500 rounded top-[-8px] right-[-8px] text-center text-xs">
            {cartItemsList.length === 0 ? "" : cartItemsList.length}
          </div>
        </div>
        {!token ? (
          <button
            onClick={() => setShowLogIn(true)}
            className="bg-transparent text-base border text-blue-400 border-orange-500 px-5 py-1 rounded-xl text-[16px] hover:bg-gray-100"
          >
            Sign in
          </button>
        ) : (
          <div className="navbar-profile relative">
            <img src={assets.profile_icon} alt="profile icon" />
            <ul className="nav-profile-dropdown absolute right-0 mt-0.5 z-10 w-[120px] bg-white border border-gray-200 rounded-lg  shadow-lg ">
              <li
                onClick={() => navigate("/myorders")}
                className=" px-2 py-2 flex items-center hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src={assets.bag_icon}
                  alt="orders"
                  className="inline-block mr-2"
                />
                <span>Orders</span>
              </li>
              <hr />
              <li
                onClick={logOut}
                className="px-2 py-2 flex items-center hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src={assets.logout_icon}
                  alt="Logout"
                  className="inline-block mr-2"
                />
                <span>Logout</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
