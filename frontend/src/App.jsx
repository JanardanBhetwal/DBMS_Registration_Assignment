import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpForm from "./Signup.jsx"; // Path to your signup form
import Home from "./Home"; // Path to your home component
import Login from "./Login"; // Path to your login component
import UserProfile from "./UserProfile.jsx";
import Dashboard from "./Dashboard.jsx";
import UpdateUser from "./EditUsers.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup/" element={<SignUpForm />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/me/" element={<UserProfile />} />
        <Route path="/dashboard/" element={<Dashboard />} />
        <Route path="/update/:userId" element={<UpdateUser />} />
      </Routes>
    </Router>
  );
};

export default App;
