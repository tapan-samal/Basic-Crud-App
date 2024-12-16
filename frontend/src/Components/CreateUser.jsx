import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const CreateUser = () => {
  const initialState = { name: "", email: "", phone: "" };
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormData = async (e) => {
    e.preventDefault();

    const { name, email, phone } = user;
    if (!name || !email || !phone) {
      toast.error("Please fill out all fields!", { position: "top-center" });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/create",
        user
      );
      toast.success("User created successfully!", { position: "top-center" });
      navigate("/");
    } catch (error) {
      toast.error("Error occured during API call!", { position: "top-center" });
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded py-4 px-5">
        <form onSubmit={handleFormData}>
          <h2>Add User:</h2>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              className="form-control"
              onChange={handleInput}
              name="name"
              value={user.name}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="form-control"
              onChange={handleInput}
              name="email"
              value={user.email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              placeholder="Enter Phone number"
              className="form-control"
              onChange={handleInput}
              name="phone"
              value={user.phone}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/" className="btn btn-dark ms-2">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
