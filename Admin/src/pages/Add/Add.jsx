import { useState } from "react";
import { assets, url } from "../../assets/assets";
import "./Add.css";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const [image, setImage] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); //it gets first uploaded files in file object
  };

  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        price: "",
        description: "",
        category: "Salad",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload   flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              width="120px"
              src={image ? URL.createObjectURL(image) : assets.upload_area} // Here it creates a temporary URL
              alt="upload area"
            />
          </label>
          <input
            onChange={handleFileChange}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            type="text"
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          />
        </div>
        <div className="add-category-price flex gap-7 ">
          <div className="add-category flex flex-col ">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category" className="">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              type="number"
              name="price"
              placeholder="$20"
              className=""
            />
          </div>
        </div>
        <button
          type="submit"
          className="add-button w-full p-1 bg-orange-500 text-white hover:bg-orange-600 rounded-lg"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
