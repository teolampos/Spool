import React from "react";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Profile from "./Components/Profile";
import SocialMenu from "./Components/SocialMenu";
import View from "./Components/View";
import Error from "./Components/Error";
import LoadingPage from "./Components/LoadingPage";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/social-menu" element={<SocialMenu />} />
      <Route path="/view/:user" element={<View />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
