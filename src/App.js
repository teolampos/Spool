import React from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import Menu from "./Pages/Menu";
import View from "./Pages/View";
import Error from "./Pages/Error";
import Protected from "./Pages/Protected";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Protected />}>
        <Route path="/dashboard/:username" element={<Dashboard />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/menu" element={<Menu />} />
      </Route>
      <Route path="/view/:user" element={<View />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
