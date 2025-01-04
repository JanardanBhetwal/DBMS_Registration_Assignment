import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found.");
        }

        const response = await axios.get(
          "http://127.0.0.1:8000/api/dashboard/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data.");
        setLoading(false);
        console.error("Failed to fetch user data:", err);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-purple-900">
      <div className="bg-purple-800 p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h2 className="text-3xl text-white font-bold text-center mb-6">
          Admin Dashboard
        </h2>

        <div className="space-y-4 text-white">
          {users && users.length > 0 ? (
            users.map((user) => (
              <div key={user.id} className="flex justify-between items-center">
                <span>{user.name}</span>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => navigate(`/update/${user.id}`)}
                >
                  Edit
                </button>
              </div>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
