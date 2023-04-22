import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import { useSession } from "../useSession";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigator = useNavigate();
  useSession();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (!username || !password) throw new Error("Empty fields");
      const user = { username, password };
      const resp = await fetch("http://localhost:5000/login", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (resp.ok) {
        const data = await resp.json();
        navigator(`/dashboard/${data.username}`);
      } else if (resp.status == 404) {
        throw new Error("No such user");
      } else if (resp.status == 403) {
        setLoading(false);
        throw new Error("Wrong password");
      } else {
        setLoading(false);
        throw new Error("Server Error. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      window.alert(err);
    }
  };

  return (
    <>
      <section className="form">
        <form id="signInForm" className="form" onSubmit={handleLogin}>
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
          {loading ? (
            <Loading />
          ) : (
            <button className="submit" type="submit" onClick={handleLogin}>
              Login
            </button>
          )}
          <Link className="smallText" to="/register">
            <p>Don't have an account? Sign up.</p>
          </Link>
        </form>
      </section>
    </>
  );
};

export default Login;
