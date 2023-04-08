import React, { useState, useRef } from "react";
import Navbar from "./Navbar2";
import Popup from "./Popup";

const Profile = () => {
  const [popup, setPopup] = useState(false);
  const textRef = useRef(null);

  const handleClick = () => {
    navigator.clipboard.writeText(textRef.current.textContent);
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
    }, 3000);
  };

  return (
    <>
      <Navbar />
      <section className="profile">
        <h1>My Profile</h1>
        <div className="profileImage">
          <span class="material-icons">file_upload</span>
        </div>

        <div className="info">
          <h2>User Info</h2>
          <h3>
            Username: <span>firstkillerFk</span>
          </h3>
          <h3>
            Email: <span>teolampos@gmail.com</span>
          </h3>
          <h3>
            Share Link:{" "}
            <span ref={textRef}>https://spool/view/firstkillerFk</span>
            <button onClick={handleClick}>
              Copy
              <span class="material-icons">content_copy</span>
            </button>
          </h3>
        </div>
        <Popup popup={popup} />
        <div className="deleteAccount">
          <h2>Delete account</h2>
          <p>
            Permanently delete your account and all data associated with it.
            Once you click the button below, your account seizes to exist!
          </p>
          <button>DELETE MY ACCOUNT</button>
        </div>
      </section>
    </>
  );
};

export default Profile;
