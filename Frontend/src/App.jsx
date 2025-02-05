import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import LoginPopUp from "./components/LogIn Pop-up/LoginPopUp";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";

function App() {
  const [showLogIn, setShowLogIn] = useState(false);
  return (
    <>
      {showLogIn ? <LoginPopUp setShowLogIn={setShowLogIn} /> : <></>}
      <div className="app">
        <Navbar setShowLogIn={setShowLogIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart setShowLogIn={setShowLogIn} />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
