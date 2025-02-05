import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = ({ setShowLogIn }) => {
  const { removeFromCart, food_list, cartItems, getTotalCartItem, url, token } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const cartItemsList = food_list.filter((item) => cartItems[item._id] > 0);

  const onProceedToPayment = async () => {
    if (token) {
      navigate("/order");
    } else {
      setShowLogIn(true);
    }
  };
  return (
    <div className="cart mt-[100px]">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {cartItemsList.map((item, index) => (
          <div key={index}>
            <div className="cart-items-title cart-items-item mt-3 ">
              <img
                className="w-[50px]"
                src={url + "/images/" + item.image}
                alt=""
              />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>{cartItems[item._id]}</p>
              <p>${item.price * cartItems[item._id]}</p>
              <p
                onClick={() => removeFromCart(item._id)}
                className=" cursor-pointer remove-item"
              >
                Remove
              </p>
            </div>
            <hr className="mt-2" />
          </div>
        ))}
      </div>

      <div className="cart-bottom mt-[80px] flex justify-between gap-[max(12vw,20px)]">
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
          {cartItemsList.length !== 0 ? (
            <button
              onClick={() => onProceedToPayment()}
              className="w-full p-2 bg-orange-500 text-white hover:bg-orange-600 rounded-lg"
            >
              PROCEED TO CHECK OUT
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="cart-promocode flex-1">
          <div>
            <p className="text-gray-600">
              If you have a promo code, Enter it here.
            </p>
            <div className="cart-promocode-input mt-2.5 flex justify-between items-center bg-gray-200 rounded-md p-2">
              <input
                type="text"
                placeholder="promo-code"
                className="p-2 border border-gray-300 rounded-md flex-1 mr-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />

              <button className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
