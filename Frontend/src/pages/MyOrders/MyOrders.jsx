import { useContext, useEffect, useState } from "react";
import "./MyOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/orders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
    console.log(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="orders mx-auto my-12 w-full">
      <p className="text-2xl font-semibold mb-4 ">My Orders</p>
      <div className="container flex flex-col gap-5 mt-4">
        {data.map((order, index) => {
          return (
            <div
              key={index}
              className="my-orders-order flex items-center gap-4 p-4 border border-orange-200 rounded-lg shadow-lg "
            >
              <img
                src={assets.parcel_icon}
                alt="Parcel Img"
                className="w-16 h-16"
              />
              <div className="flex flex-col">
                <p className="flex flex-wrap ">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " X " + item.quantity;
                    } else {
                      return item.name + " X " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p className="text-lg font-semibold">${order.amount}.00</p>
                <p className="text-sm text-gray-600">
                  Items: {order.items.length}
                </p>
                <p className="font-bold text-green-500">{order.status}</p>
              </div>
              <button className="ml-auto bg-orange-400  py-2 px-4 rounded-lg hover:bg-orange-300">
                Track Order
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
