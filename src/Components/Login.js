import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="formSection">
        <form
          id="signInForm"
          className="form"
          action="/register"
          method="GET"
          onSubmit={handleSubmit}
        >
          <h1>User Login</h1>
          <div className="inputField">
            <span className="material-icons">account_circle</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div className="inputField">
            <span className="material-icons hide">lock</span>
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <i className="material-icons hide" onClick={() => setShow(!show)}>
              visibility
            </i>
          </div>
          <button className="submit" type="submit">
            Login
          </button>
          <Link className="smallText" to="/register">
            <p>Don't have an account? Sign up.</p>
          </Link>
        </form>
      </section>
    </>
  );
};

export default Login;
