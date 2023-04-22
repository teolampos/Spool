import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import Navbar from "../Components/Navbar2";
import Popup from "../Components/Popup";
import Loading from "../Components/Loading";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [file, setFile] = useState(null);
  const textRef = useRef(null);
  const [image, setImage] = useState(null);
  const userInfo = useOutletContext();
  const navigate = useNavigate();

  //THIS CHANGES THE URL BASED ON USER'S TOKEN
  useEffect(() => {
    window.history.replaceState(
      {},
      "",
      `http://localhost:3000/profile/${userInfo.username}`
    );
  }, []);

  //WE FETCH THE CURRENT USER AND SETTING THE IMAGE
  const fetchUser = async () => {
    try {
      const resp = await fetch(
        `http://localhost:5000/users/${userInfo.username}`
      );
      if (resp.ok) {
        const data = await resp.json();
        if (data.profile !== null) setImage(data.profile);
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

  const handleDelete = async () => {
    try {
      const resp = await fetch("http://localhost:5000/delete", {
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userInfo.username,
          public_id: image.public_id,
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      // IF A PROFILE IMAGE IS ALREADY SET, DELETE IT FROM THE DATABASE
      if (image !== null) {
        const resp1 = await fetch("http://localhost:5000/deletePicture", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            public_id: image.public_id,
          }),
        });
        if (!resp1.ok) {
          setLoading(false);
          throw new Error("Try again");
        }
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
      const resp2 = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (resp2.ok) {
        const data = await resp2.json();
        const resp3 = await fetch("http://localhost:5000/upload", {
          credentials: "include",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userInfo.username,
            url: data.url,
            public_id: data.public_id,
          }),
        });
        if (resp3.ok) {
          setImage(data);
          setLoading(false);
          setFile(null);
        }
      } else {
        setLoading(false);
        throw new Error("Could not upload image");
      }
    } catch (err) {
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
              to={`/view/${userInfo.username}`}
              ref={textRef}
            >{`http://localhost:3000/view/${userInfo.username}`}</Link>
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
          <button onClick={handleDelete}>DELETE MY ACCOUNT</button>
        </div>
      </section>
    </>
  );
};

export default Profile;
