import React, { useState } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="formSection">
        <form
          class="form"
          action="/register"
          method="GET"
          onSubmit={handleSubmit}
        >
          <h1>Sign Up</h1>
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
            <span className="material-icons">email</span>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="inputField">
            <span className="material-icons hide">lock</span>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          {loading ? (
            <Loading />
          ) : (
            <button
              className="submit"
              type="submit"
              onClick={() => setLoading(!loading)}
            >
              Create Account
            </button>
          )}

          <Link className="smallText" to="/login">
            <p>Already have an account? Sign in.</p>
          </Link>
        </form>
      </section>
    </>
  );
};

export default Register;
