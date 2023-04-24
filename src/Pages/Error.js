import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigator = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigator("/");
    }, 3000);
  }, []);

  return (
    <section className="errorSection">
      <h1 className="errorMessage">
        The page your are looking for does not exist. You are being
        redirected...
      </h1>
      <span className="material-icons">waving_hand</span>
    </section>
  );
};

export default Error;
