// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const LoginForm = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       // Simulating the login without real authentication (simplified)
//       const response = await axios.post("http://127.0.0.1:8000/api/login/", {
//         email: formData.email,
//         password: formData.password,
//       });

//       if (response.status === 200) {
//         // Simulate successful login
//         setSuccess(true);
//         setError(null); // Clear any previous error
//         // Redirect to user profile or dashboard (or any other route)
//         setTimeout(() => {
//           navigate("/me"); // Adjust this route as needed
//         }, 100);
//       }
//     } catch (err) {
//       setError("Invalid credentials.");
//       setSuccess(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-purple-900">
//       <div className="bg-purple-800 p-8 rounded-xl shadow-lg max-w-sm w-full">
//         <h2 className="text-3xl text-white font-bold text-center mb-6">
//           Login
//         </h2>

//         {error && (
//           <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
//             {error}
//           </div>
//         )}
//         {success && (
//           <div className="bg-green-500 text-white p-3 rounded-lg mb-4">
//             Login successful!
//           </div>
//         )}

//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-white">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full p-3 rounded-lg bg-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-white">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full p-3 rounded-lg bg-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

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
    <div className="min-h-screen flex justify-center items-center bg-purple-900">
      <div className="bg-purple-800 p-8 rounded-xl shadow-lg max-w-sm w-full">
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
              className="w-full p-3 rounded-lg bg-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
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
              className="w-full p-3 rounded-lg bg-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading} // Disable the button while loading
            className="w-full py-3 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
