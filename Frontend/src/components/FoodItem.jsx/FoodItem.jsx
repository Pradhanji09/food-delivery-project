import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = (props) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-image-container relative">
        <img
          src={url + "/images/" + props.image}
          alt="food image"
          className="w-full rounded-t-[15px] rounded-b-none"
        />
        {!cartItems[props.id] ? (
          <img
            className="w-[35px] absolute bottom-[15px] right-[15px] cursor-pointer rounded-full"
            onClick={() => addToCart(props.id)}
            src={assets.add_icon_white}
          />
        ) : (
          <div className="absolute bottom-[15px] right-[15px] flex items-center gap-[10px] p-[6px] rounded-full bg-white ">
            <img
              onClick={() => removeFromCart(props.id)}
              src={assets.remove_icon_red}
            />
            <p>{cartItems[props.id]}</p>
            <img
              onClick={() => addToCart(props.id)}
              src={assets.add_icon_green}
            />
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-center mt-[10px]">
          <p className="text-[20px] font-medium">{props.name}</p>
          <img
            src={assets.rating_starts}
            alt="ring starts"
            className="w-[70px]"
          />
        </div>

        <p className="text-gray-600 text-xs">{props.description}</p>
        <p className="text-red-500 text-2xl font-medium my-2">${props.price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
