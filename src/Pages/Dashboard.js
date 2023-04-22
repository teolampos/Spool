import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar2";
import Popup from "../Components/Popup";

const Dashboard = () => {
  const [popup, setPopup] = useState(false);
  const [empty, setEmpty] = useState(true);
  const [userPlatforms, setUserPlatforms] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  //GETTING THE CONTEXT FROM THE <OUTLET/> COMPONENT
  const userInfo = useOutletContext();

  //COPY ACCOUNT LINK TO CLIPBOARD
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `http://localhost:3000/view/${userInfo.username}`
    );
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
    }, 3000);
  };
  //DELETE THE PLATFORM THE USER NO LONGER WANTS
  const deleteHandler = async (e) => {
    try {
      const resp = await fetch("http://localhost:5000/remove", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userInfo.username,
          updates: {
            id: e.target.id,
            socialUrl: e.target.attributes.url.nodeValue,
            socialName: e.target.attributes.name.nodeValue,
          },
        }),
      });
      if (resp.ok) {
        setUserPlatforms(
          userPlatforms.filter((element) => element.id !== e.target.id)
        );
      } else {
        throw new Error("Server error.. Please try again");
      }
    } catch (err) {
      window.alert(err);
    }
  };

  //THE URL GETS SET AUTOMATICALLY WITH THE TOKEN INFORMATION
  useEffect(() => {
    window.history.replaceState(
      {},
      "",
      `http://localhost:3000/dashboard/${userInfo.username}`,
      []
    );
  }, []);
  // WE CHECK TO SEE IF THE USER HAS ANY CONNECTED ACCOUNTS AND IF SO DISPLAY THEM
  const fetchUser = async () => {
    try {
      const resp = await fetch(
        `http://localhost:5000/users/${userInfo.username}`
      );
      if (resp.ok) {
        const data = await resp.json();
        setEmpty(data.empty);
        setUserPlatforms(data.socials);
        setPlatforms(data.platforms);
        if (data.profile !== null) setImage(data.profile);
      } else {
        throw new Error("Could not fetch user");
      }
    } catch (err) {
      window.alert(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} image={image} />

      {!empty ? (
        <section className="dashboardV1">
          <Popup popup={popup} />
          <h2>My platforms</h2>
          <div>
            <button onClick={() => navigate("/menu")}>
              Add New
              <span className="material-icons add">add</span>
            </button>
            <button onClick={handleCopy}>Share Spool </button>
          </div>

          <ul>
            {userPlatforms.map((item) => {
              const { id, socialName, socialUrl } = item;
              let platform = platforms.find(
                (element) => element.name === socialName
              );
              let url = platform.url;

              return (
                <div key={id}>
                  <span
                    className="material-icons"
                    name={socialName}
                    url={socialUrl}
                    id={id}
                    onClick={deleteHandler}
                  >
                    highlight_off
                  </span>
                  <img src={url} alt="social-icon" />
                </div>
              );
            })}
          </ul>
        </section>
      ) : (
        <section className="dashboardV2">
          <div className="emptyDashboard">
            <h1>Your dashboard is empty! Add an account.</h1>
            <button onClick={() => navigate("/menu")}>
              Add
              <span className="material-icons add">add</span>
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default Dashboard;
