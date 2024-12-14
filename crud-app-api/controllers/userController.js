import User from "../models/userModel.js";

// @description: Create user
// @route: POST /api/create
// @access: Public
export const createUser = async (req, res) => {
  try {
    const userData = new User(req.body);
    const savedData = await userData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// @description: Get all users
// @route: GET /api/users
// @access: Public
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// @description: Get a user
// @route: GET /api/user/:id
// @access: Public
export const getUser = async (req, res) => {
  try {
    const userExist = await User.findById(req.params.id);
    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// @description: Update a user
// @route: PUT /api/user/:id
// @access: Public
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }
    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// @description: Delete a user
// @route: DELETE /api/user/:id
// @access: Public
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
