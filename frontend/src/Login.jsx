import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading to true while making the request
    setError(null); // Clear any previous errors

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        // Store the access token in localStorage
        localStorage.setItem("token", response.data.access);

        // Optionally, store the refresh token if needed
        localStorage.setItem("refreshToken", response.data.refresh);

        // Redirect to the user profile or dashboard
        navigate("/me");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials or server error.");
    } finally {
      setLoading(false); // Set loading to false once the request is complete
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-400">
      <div className="bg-slate-800 p-8 rounded-xl shadow-lg max-w-sm w-full">
        <h2 className="text-3xl text-white font-bold text-center mb-6">
          Login
        </h2>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg  text-black focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg  text-black focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading} // Disable the button while loading
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div>
          <p className="text-white text-center mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-purple-300 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
