import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users from the API
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user/getall");
      setUsers(response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg || error.message || "Failed to fetch users.";
      toast.error(errorMessage, { position: "top-center" });
    }
  };

  // Handle user deletion
  const handleUserDelete = async (deletedId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/user/delete/${deletedId}`);
      toast.success("User deleted successfully!", { position: "top-center" });

      // Update state to reflect deleted user
      const updatedUsers = users.filter((user) => user._id !== deletedId);
      setUsers(updatedUsers);
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg || error.message || "Failed to delete user.";
      toast.error(errorMessage, { position: "top-center" });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-75 bg-white rounded p-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Users Dashboard</h2>
          <Link to="/create" className="btn btn-success">
            Create User
          </Link>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td className="text-center">
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-success btn-sm"
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-danger ms-2 btn-sm"
                      onClick={() => handleUserDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  <h1> No users found! </h1>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
