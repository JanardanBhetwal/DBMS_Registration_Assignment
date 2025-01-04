import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve token from local storage
        const token = localStorage.getItem("token");

        // Check if token exists
        if (!token) {
          throw new Error("No token found.");
        }

        // Make API request to fetch user data
        const response = await axios.get("http://127.0.0.1:8000/api/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update state with fetched user data
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data.");
        setLoading(false);
        console.error("Failed to fetch user data:", err);
      }
    };

    // Fetch user data on component mount
    fetchUserData();
  }, []);

  // Show loading state while fetching data
  if (loading) return <p>Loading...</p>;

  // Show error message if there was a problem
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-purple-900">
      <div className="bg-purple-800 p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h2 className="text-3xl text-white font-bold text-center mb-6">
          User Profile
        </h2>

        {userData && (
          <div className="space-y-4 text-white">
            {/* Displaying user data */}
            <div>
              <strong>Name:</strong> {userData.name}
            </div>
            <div>
              <strong>Email:</strong> {userData.email}
            </div>
            <div>
              <strong>Phone Number:</strong> {userData.phone_number}
            </div>
            <div>
              <strong>Date of Birth:</strong> {userData.dob}
            </div>

            {/* Displaying admin label if the user is a superuser */}
            {userData.is_superuser && (
              <div>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
