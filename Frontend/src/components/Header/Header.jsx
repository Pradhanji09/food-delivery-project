import "./Header.css";

const Header = () => {
  return (
    <div className="header relative ">
      <div className="header-contents absolute flex items-center">
        <h2
          className="font-medium text-white "
          style={{ fontSize: "max(4.5vw, 22px)" }}
        >
          Order your favourite food here
        </h2>
        <p className="text-white size " style={{ fontSize: "1vw" }}>
          Choose froma diverse menu featuring a delectable array of dishes
          crafted with the food.
        </p>
        <button className="border bg-white rounded-lg p-1 hover:bg-slate-500 hover:text-white">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
