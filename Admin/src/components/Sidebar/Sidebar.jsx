import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div
      className="sidebar w-[18%] min-h-screen  border-[1.5px] border-solid border-[#a9a9a9] border-t-0 "
      style={{ fontSize: "max(1vw, 10px)" }}
    >
      <div className="sidebar-options pt-12 pl-[20%] flex flex-col gap-5 ">
        <NavLink to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt="add icon" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <img src={assets.order_icon} alt="add icon" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <img src={assets.order_icon} alt="add icon" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
