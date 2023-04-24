import React, { useState } from "react";
import Loading from "../Components/Loading";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../useSession";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  //IF ALREADY LOGGED IN, REDIRECT TO DASHBOARD
  useSession();

  //REGISTER
  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      setUsername(username.trim());
      setEmail(email.trim());

      //CHECK FOR EMPTY FIELDS
      if (!username || !email || !password) {
        throw new Error("Empty fields");
      }
      //CHECK IF A @ EXISTS IN EMAIL STRING(SIMPLE EMAIL VALIDATION)
      if (email.indexOf("@") === -1) {
        throw new Error("Invalid Email!");
      }
      //SIMPLE PASSWORD VALIDATION
      if (password.length < 4) {
        throw new Error("Password is too short!");
      }

      const user = { username, email, password };
      const resp = await fetch(`${process.env.REACT_APP_SERVER_API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });
      if (resp.ok) {
        const data = await resp.json();
        navigator(`/dashboard/${data.user.username}`);
      } else if (resp.status === 400) {
        const data = await resp.json();
        throw new Error(data.msg);
      } else {
        throw new Error("Failed to register. Please try again.");
      }
    } catch (err) {
      window.alert(err);
      setLoading(false);
    }
  };

  return (
    <>
      <section className="form">
        <form className="form" onSubmit={handleRegister}>
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
            <button className="submit" type="submit" onClick={handleRegister}>
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
