import User from "../models/UserModel.js"
import mongoose from "mongoose";

export const getdata = async (req,res) => {
    try {
        const show = await User.find();
        res.status(200).json(show)
    } catch (error) {
        res.status(500).json({Message : error.Message})
    }
}

export const postdata = async (req,res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({Message : error.Message})
    }
}

export const deldata = async (req,res) => {
    try {
        const delUser = await User.findByIdAndDelete(req.params.id);
        if(!delUser) return res.status(404).json({Message : "User Not Found"})
        res.status(200).json(delUser);
    } catch (error) {
        res.json({Message : error.Message})
    }   
}



// Controller for updating a todo item
export const toggleCompleted = async (req, res) => {
  try {
    const { id } = req.params;  // Get the todo ID from the URL
    const { completed } = req.body; // Get the 'completed' status from the request body

    // Validate if the provided id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Todo ID' });
    }

    // Find the todo by ID and update the completed status
    const updatedTodo = await User.findByIdAndUpdate(
      id,
      { completed },  // Update the 'completed' field
      { new: true }  // Return the updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Send the updated todo back in the response
    res.json(updatedTodo);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating todo item', error });
  }
};
