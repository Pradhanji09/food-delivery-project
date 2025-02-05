import { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  const { cartItems, food_list, getTotalCartItem, token, url } =
    useContext(StoreContext);
  const cartItemsList = food_list.filter((item) => cartItems[item._id] > 0);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async () => {
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartItem() + 2,
    };
    console.log(orderData);
    try {
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
      console.log("Order placed successfully:", response.data);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartItem() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form
      onSubmit={placeOrder}
      className="place-order flex items-center justify-between mt-[80px] gap-[50px] "
    >
      <div className="place-order-left  w-full max-w-[max(30%,500px)]">
        <p className="title text-3xl font-semibold mb-12">
          Delivery Information
        </p>
        <div className="multi-fields">
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="firstName"
            value={data.firstName}
            placeholder="First name"
          />
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="lastName"
            value={data.lastName}
            placeholder="Last name"
          />
        </div>
        <input
          type="text"
          onChange={onChangeHandler}
          name="email"
          value={data.email}
          placeholder="Email address"
        />
        <input
          required
          type="text"
          onChange={onChangeHandler}
          name="street"
          value={data.street}
          placeholder=" Street"
        />
        <div className="multi-fields">
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="city"
            value={data.city}
            placeholder="City"
          />
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="state"
            value={data.state}
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="zipcode"
            value={data.zipcode}
            placeholder="Zip Code"
          />
          <input
            type="text"
            onChange={onChangeHandler}
            name="country"
            value={data.country}
            placeholder="Country"
          />
        </div>
        <input
          required
          type="text"
          onChange={onChangeHandler}
          name="phone"
          value={data.phone}
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right max-w-[max(40%,500px)] w-full">
        <div className="cart-total flex-1 flex flex-col gap-5">
          <p className="">Cart Totals</p>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartItem()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>$ {cartItemsList.length === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Total</p>
            <p className="text-xl font-medium">
              ${cartItemsList.length === 0 ? 0 : 2 + getTotalCartItem()}
            </p>
          </div>
          <hr />
          <button
            type="submit"
            className="w-full p-2 bg-orange-500 text-white hover:bg-orange-600 rounded-lg"
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
