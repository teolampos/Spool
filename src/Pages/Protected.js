import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const Protected = () => {
  const [success, setSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigator = useNavigate();

  const auth = async () => {
    try {
      const resp = await fetch(`${process.env.REACT_APP_SERVER_API}/auth`, {
        credentials: "include",
      });
      if (resp.ok) {
        const user = await resp.json();
        //WE FETCH THE DIFFERENT PLATFORMS THAT OUR MENU COMPONENT IS GOING TO DISPLAY
        //WE DO THAT IN ORDER TO AVOID MULTIPLE FETCHES WHEN NAVIGATING TO MENU COMPONENT
        //THIS TECHNIQUE IS ALSO CALLED PRE-FETCHING
        const resp2 = await fetch(
          `${process.env.REACT_APP_SERVER_API}/platforms`
        );
        if (resp2.ok) {
          const platforms = await resp2.json();
          setSuccess(true);
          setUserInfo({ user, platforms });
        } else throw new Error("Could not fetch user");
      } else {
        throw new Error(
          "Failure during login/signup. Your session has expired or you may need to enable third-party cookies if you are on Safari"
        );
      }
    } catch (err) {
      window.alert(err);
      navigator("/");
    }
  };

  useEffect(() => {
    auth();
  }, []);

  return <>{success ? <Outlet context={userInfo} /> : <LoadingPage />}</>;
};

export default Protected;
