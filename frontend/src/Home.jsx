import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleLoginButton = () => {
    navigate("/login");
  };
  const handleSignupButton = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-purple-900 text-white flex flex-col justify-center items-center">
      <h1 className="text-3xl">Welcome to the Home Page</h1>
      <div>
        <button
          onClick={handleSignupButton}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
        >
          Signup
        </button>
        <button
          onClick={handleLoginButton}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
