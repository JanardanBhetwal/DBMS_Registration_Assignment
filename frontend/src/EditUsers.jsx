import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const [user, setUser] = useState({
    name: "",
    phone_number: "",
    dob: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams(); // Assuming you pass userId in the URL
  const navigate = useNavigate();

  // Fetch current user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found.");
        }

        // Fetch current user data to pre-populate the form
        const response = await axios.get(
          `http://127.0.0.1:8000/api/update/${userId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data); // Set current user data to state
        response.data.forEach((data) => {
          if (data.id == userId) {
            // console.log(data);
            setUser(data);
          }
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data.");
        setLoading(false);
        console.error("Error fetching user data:", err);
      }
    };

    fetchUser();
  }, [userId]);

  // Handle form submit to update user data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found.");
      }

      // Make PUT request to update user
      await axios.put(
        `http://127.0.0.1:8000/api/update/${userId}/`, // Correct URL with userId
        user, // Passing the user data from the form
        // userId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Redirect to admin dashboard or some other page after update
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to update user.");
      console.error("Error updating user:", err);
    }
  };

  // Show loading state while fetching data
  if (loading) return <p>Loading...</p>;

  // Show error message if there was a problem
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-400">
      <div className="bg-slate-800 p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h2 className="text-3xl text-white font-bold text-center mb-6">
          Update User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white">Name:</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full p-2 rounded"
            />
          </div>
          <div>
            <label className="text-white">Phone Number:</label>
            <input
              type="text"
              value={user.phone_number}
              onChange={(e) =>
                setUser({ ...user, phone_number: e.target.value })
              }
              className="w-full p-2 rounded"
            />
          </div>
          <div>
            <label className="text-white">Date of Birth:</label>
            <input
              type="date"
              value={user.dob}
              onChange={(e) => setUser({ ...user, dob: e.target.value })}
              className="w-full p-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
