import { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../../assets/assets";

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
        toast.success("Add Fetched");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };

  const removeFood = async (foodID) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodID,
      });

      if (response.data.success) {
        toast.success("Food Removed");
      }

      await fetchList();
    } catch (error) {
      console.log(error);
      toast.error("Error removing");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="container mx-auto">
      <p className="font-semibold p-3">All food List</p>
      <table className="min-w-full bg-white border border-gray-200  overflow-hidden">
        <thead>
          <tr className="bg-orange-400 text-white">
            <th className="py-3 px-4 text-left">Image</th>
            <th className="py-3 px-4 text-left">Category</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Price</th>
            <th className="py-3 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => {
            return (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-3 px-4">
                  <img
                    src={`${url}/images/` + item.image}
                    alt="image"
                    className="w-16 h-16 object-cover rounded-sm"
                  />
                </td>
                <td className="py-3 px-4">{item.category}</td>
                <td className="py-3 px-4">{item.name}</td>
                <td className="py-3 px-4">${item.price}</td>

                <td className="py-3 px-4">
                  <button
                    onClick={() => removeFood(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <hr />
    </div>
  );
};

export default List;
