import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const Protected = () => {
  const [success, setSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigator = useNavigate();

  const Auth = async () => {
    try {
      const resp = await fetch("http://localhost:5000/auth", {
        credentials: "include",
      });
      if (resp.ok) {
        const data = await resp.json();
        setSuccess(data.success);
        setUserInfo(data.user);
      } else {
        navigator("/login");
        window.alert("You are not logged in. Redirect to login page.");
      }
    } catch (err) {
      window.alert(err);
    }
  };

  useEffect(() => {
    Auth();
  }, []);

  return <>{success ? <Outlet context={userInfo} /> : <LoadingPage />}</>;
};

export default Protected;
