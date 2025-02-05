import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem.jsx/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="my-4" id="food-display">
      <h2 className="font-semibold" style={{ fontSize: "max(2vw, 24px)" }}>
        Top dishes near you
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mt-7 gap-7 row-gap-[50px]">
        {food_list.map((item, index) => {
          if (category == "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
