import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ userInfo, image }) => {
  const navigator = useNavigate();

  const handleLogout = async () => {
    try {
      const resp = await fetch(`${process.env.REACT_APP_SERVER_API}/logout`, {
        credentials: "include",
        method: "DELETE",
      });
      if (resp.ok) {
        navigator("/");
      } else {
        throw new Error("Failed to logout. Try again");
      }
    } catch (err) {
      window.alert(err);
    }
  };

  return (
    <>
      <nav className="nav2">
        <div className="logo">
          <svg
            className="logos"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <defs></defs>
            <g id="social_media_network" data-name="social media network">
              <path
                className="cls-1"
                d="M41.5 25h-6a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2zM16 17c-.57 0-.35.06-5.7-5.29a1 1 0 0 1 1.41-1.41l5 5A1 1 0 0 1 16 17zM12.5 25h-6a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2zM8.81 40.19a1 1 0 0 1-.7-1.71l7-7a1 1 0 0 1 1.41 1.41c-7.52 7.55-7.12 7.3-7.71 7.3zM23 43.5v-8a1 1 0 0 1 2 0v8a1 1 0 0 1-2 0zM37.33 38.33c-.57 0-.35.06-5.71-5.29A1 1 0 0 1 33 31.62l5 5a1 1 0 0 1-.67 1.71zM23 12V5a1 1 0 0 1 2 0v7a1 1 0 0 1-2 0zM31.68 17.31a1 1 0 0 1-.7-1.7l6-6A1 1 0 0 1 38.39 11c-6.6 6.62-6.13 6.31-6.71 6.31z"
              />
              <path
                d="M36 24a12 12 0 0 1-12 12c-11.38 0-16.32-14.39-7.43-21.43A12 12 0 0 1 36 24z"
                style={{ fill: "#db5669" }}
              />
              <path
                d="M36 24a12 12 0 0 1-2.57 7.43 12 12 0 0 1-16.86-16.86A12 12 0 0 1 36 24z"
                style={{ fill: "#f26674" }}
              />
              <circle className="cls-4" cx="24" cy="3" r="2" />
              <path
                className="cls-4"
                d="M26 45a2 2 0 1 1-2.82-1.82A2 2 0 0 1 26 45z"
              />
              <path
                className="cls-5"
                d="M25.82 45.82a2 2 0 0 1-2.64-2.64 2 2 0 0 1 2.64 2.64zM25.82 3.82a2 2 0 0 1-2.64-2.64 2 2 0 0 1 2.64 2.64z"
              />
              <path
                className="cls-4"
                d="M7 24a3 3 0 1 1-5-2.24A3 3 0 0 1 7 24z"
              />
              <path
                className="cls-5"
                d="M7 24a1 1 0 0 1 0 .24A3 3 0 0 1 2 22a1 1 0 0 1 0-.24A3 3 0 0 1 7 24z"
              />
              <circle className="cls-4" cx="44" cy="24" r="3" />
              <circle className="cls-4" cx="7" cy="41" r="3" />
              <circle className="cls-4" cx="39" cy="9" r="3" />
              <path
                className="cls-4"
                d="M44 40a4 4 0 1 1-5.64-3.64A4 4 0 0 1 44 40z"
              />
              <path
                className="cls-5"
                d="M43.64 41.64a4 4 0 0 1-5.28-5.28 4 4 0 0 1 5.28 5.28z"
              />
              <path
                className="cls-4"
                d="M13 8a5 5 0 1 1-7.39-4.39A5 5 0 0 1 13 8z"
              />
              <path
                className="cls-5"
                d="M12.39 10.39a5 5 0 0 1-6.78-6.78 5 5 0 0 1 6.78 6.78z"
              />
              <path
                d="M29.12 25.6c-.23.19.25 0-7.33 3.21A2 2 0 0 1 19 27v-6a2 2 0 0 1 2.6-1.91l7.12 3.05a2 2 0 0 1 .4 3.46z"
                style={{ fill: "#dad7e5" }}
              />
              <path
                d="M29.12 25.6a7.93 7.93 0 0 1-9.86-5.6 2 2 0 0 1 2.34-.92l7.12 3.05a2 2 0 0 1 .4 3.47z"
                style={{ fill: "#edebf2" }}
              />
              <path
                className="cls-5"
                d="M47 24a1 1 0 0 1 0 .24A3 3 0 0 1 42 22a1 1 0 0 1 0-.24A3 3 0 0 1 47 24zM42 9a1 1 0 0 1 0 .24A3 3 0 0 1 37 7a1 1 0 0 1 0-.24A3 3 0 0 1 42 9zM10 41a1 1 0 0 1 0 .24A3 3 0 0 1 5 39a1 1 0 0 1 0-.24A3 3 0 0 1 10 41z"
              />
            </g>
          </svg>
          <h1>Spool</h1>
        </div>
        <div className="navbarMainIcons">
          <span
            onClick={() => navigator(`/profile/${userInfo.user.username}`)}
            style={image ? { backgroundImage: `url(${image.url})` } : {}}
          ></span>

          <span
            className="material-icons"
            onClick={() => navigator(`/dashboard/${userInfo.user.username}`)}
          >
            dashboard
          </span>

          <span className="material-icons" onClick={handleLogout}>
            logout
          </span>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
