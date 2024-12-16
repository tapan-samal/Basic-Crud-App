import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router-dom";

const UpdateUser = () => {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const navigate = useNavigate();
  const { id } = useParams(); 

  // Fetch user details when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/get/${id}`
        );
        setUser(response.data);
      } catch (error) {
        toast.error("Failed to load user data!", { position: "top-center" });
      }
    };
    fetchUser();
  }, [id]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleUpdateData = async (e) => {
    e.preventDefault();

    const { name, email, phone } = user;
    if (!name || !email || !phone) {
      toast.error("Please fill out all fields!", { position: "top-center" });
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/api/user/update/${id}`,
        user
      );
      toast.success("User updated successfully!", { position: "top-center" });
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg || "Error occurred during API call!";
      toast.error(errorMessage, { position: "top-center" });
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-5">
        <form onSubmit={handleUpdateData}>
          <h2>Update User :</h2>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              name="name"
              value={user.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label>Phone</label>
            <input
              type="text"
              placeholder="Enter Phone Number"
              className="form-control"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
            />
          </div>
          <button className="btn btn-success">Update</button>
          <Link to="/" className="btn btn-dark ms-2">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
