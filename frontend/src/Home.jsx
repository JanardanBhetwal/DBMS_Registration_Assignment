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
    <div className="min-h-screen bg-slate-400 text-white flex flex-col justify-center items-center">
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg m-auto w-auto">
        <h1 className="text-3xl mb-4">Welcome to the Home Page</h1>
        <div className="flex justify-center items-center">
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
    </div>
  );
};

export default Home;
