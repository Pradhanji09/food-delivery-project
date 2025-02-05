import { useState } from "react";
import "./Order.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets, url } from "../../assets/assets";
const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const statusHandler = async (orderId, event) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add p-6">
      <h3 className="text-3xl font-semibold mb-6">Order Page</h3>
      <div className="order-list space-y-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="order-item p-4 border border-gray-300 rounded-lg hover:shadow-lg"
          >
            <div className="flex items-start space-x-4">
              <img
                src={assets.parcel_icon}
                alt="parcel icon"
                className="w-16 h-16 flex-shrink-0"
              />
              <div className="flex-grow">
                <p className="order-item-food text-gray-800 font-medium">
                  {order.items.map((item, itemIndex) => (
                    <span key={itemIndex}>
                      {item.name} x {item.quantity}
                      {itemIndex < order.items.length - 1 && ", "}
                    </span>
                  ))}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Items: {order.items.length}
                </p>
              </div>
              <p className="font-semibold text-lg text-gray-800">
                ${order.amount}
              </p>
            </div>

            <div className="flex justify-between items-start mt-4">
              <div className="order-address text-gray-700 space-y-1">
                <p className="font-medium">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
                <p className="text-gray-600">{order.address.phone}</p>
              </div>
              <select
                onChange={(event) => statusHandler(order._id, event)}
                value={order.status}
                className="rounded-md p-2 bg-slate-300"
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
