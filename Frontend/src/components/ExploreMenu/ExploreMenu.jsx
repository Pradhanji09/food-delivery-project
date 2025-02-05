import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ setCategory, category }) => {
  return (
    <div className="explore-menu flex flex-col gap-4" id="explore-menu">
      <p className="font-semibold" style={{ fontSize: "max(2vw, 24px)" }}>
        Explore our menu
      </p>
      <p className="max-w-[60%] menu-text text-[#808080]">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to serve you delecious food, mission is to serve you
        delecious food
      </p>
      <div
        className=" explore-menu-list flex gap-4 justify-between items-center my-2 overflow-x-scroll "
        style={{ textAlign: "center" }}
      >
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img
                src={item.menu_image}
                className={
                  category === item.menu_name
                    ? "border-4 border-orange-500"
                    : ""
                }
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr className="mx-3 h-[2px] bg-cyan-50 " />
    </div>
  );
};

export default ExploreMenu;
