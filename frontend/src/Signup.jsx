import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    dob: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const csrfToken = getCookie("csrftoken"); // Retrieve CSRF token from cookies

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/signup/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        setError(null); // Clear previous errors
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after 1 second
        }, 1000);
      }
    } catch (err) {
      if (err.response && typeof err.response.data === "object") {
        // Process structured error messages from the backend
        const errorMessages = Object.values(err.response.data)
          .flat() // Flatten any nested arrays
          .join(", "); // Combine messages into a single string
        setError(errorMessages);
      } else {
        // Handle unexpected errors
        setError("Something went wrong.");
      }
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone_number"
        value={formData.phone_number}
        onChange={handleChange}
      />
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
      />
      <button type="submit">Sign Up</button>
      {error && <div>{error}</div>}
      {success && <div>Signup Successful!</div>}
    </form>
  );
};

export default SignupForm;
