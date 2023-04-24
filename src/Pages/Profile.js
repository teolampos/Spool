import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import Navbar from "../Components/Navbar2";
import Popup from "../Components/Popup";
import Loading from "../Components/Loading";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const textRef = useRef(null);
  const userInfo = useOutletContext();
  const navigate = useNavigate();

  //WE FETCH THE CURRENT USER AND SETTING THE IMAGE
  const fetchUser = async () => {
    try {
      const resp = await fetch(
        `${process.env.REACT_APP_SERVER_API}/users/${userInfo.user.username}`
      );
      if (resp.ok) {
        const data = await resp.json();
        if (data.profilePicture !== null) setImage(data.profilePicture);
      } else throw new Error("Could not fetch user");
    } catch (err) {
      window.alert(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(textRef.current.textContent);
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
    }, 3000);
  };

  //DELETE USER
  const handleDeleteUser = async () => {
    try {
      const resp = await fetch(`${process.env.REACT_APP_SERVER_API}/delete`, {
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userInfo.user.username,
          public_id: image ? image.public_id : null,
        }),
      });

      if (resp.ok) {
        navigate("/");
      } else throw new Error("Internal Server Error");
    } catch (err) {
      window.alert(err);
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  //UPLOAD PROFILE PICTURE
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (!file) throw new Error("You need to select a file.");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
      const resp = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (resp.ok) {
        const data = await resp.json();
        const resp2 = await fetch(
          `${process.env.REACT_APP_SERVER_API}/upload`,
          {
            credentials: "include",
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: userInfo.user.username,
              url: data.url,
              public_id: data.public_id,
              delete_id: image ? image.public_id : null, //CURRENT PROFILE IMAGE ID
            }),
          }
        );

        if (resp2.ok) {
          setImage(data);
          setLoading(false);
          setFile(null);
        } else throw new Error("Could not upload image");
      } else {
        throw new Error("Could not upload image");
      }
    } catch (err) {
      setLoading(false);
      window.alert(err);
    }
  };

  return (
    <>
      <Navbar userInfo={userInfo} image={image} />
      <section className="profile">
        <h1>My Profile</h1>
        <form onSubmit={handleSubmit}>
          <div
            className="profileImage"
            style={image ? { backgroundImage: `url(${image.url})` } : {}}
          ></div>
          <input type="file" id="imageInp" onChange={handleChange} />
          <label
            htmlFor="imageInp"
            className="inputLabel"
            style={file ? { backgroundColor: "rgb(108, 166, 123)" } : {}}
          >
            {file ? "CHANGE" : "UPLOAD IMAGE"}
          </label>
          {loading ? (
            <Loading />
          ) : file ? (
            <button type="submit">SUBMIT</button>
          ) : null}
        </form>

        <div className="shareAccount">
          <h2>Share URL</h2>
          <div>
            <Link
              to={`/view/${userInfo.user.username}`}
              ref={textRef}
            >{`https://spool.onrender/view/${userInfo.user.username}`}</Link>
            <span className="material-icons" onClick={handleCopy}>
              content_copy
            </span>
          </div>
        </div>
        <Popup popup={popup} />

        <div className="deleteAccount">
          <h2>Delete account</h2>
          <p>
            Permanently delete your account and all data associated with it.
            Once you click the button below, your account seizes to exist!
          </p>
          <button onClick={handleDeleteUser}>DELETE MY ACCOUNT</button>
        </div>
      </section>
    </>
  );
};

export default Profile;
