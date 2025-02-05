import fs from "fs";
import foodModel from "../models/food.model.js";

// add food item
const addFood = async (req, res) => {
  let image_fiename = await `${req.file.filename}`;

  const food = await new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_fiename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "food added" });
  } catch (error) {
    res.json({ success: false, message: "Error in Add food" });
    console.log(error);
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in All list end point" });
  }
};

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    console.log(food.name);

    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) {
        console.log(`Failed to delete file: ${err.message}`);
      }
    });

    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in Remove API" });
  }
};

export { addFood, listFood, removeFood };
