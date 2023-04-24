import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar1";
import ListItem from "../Components/ListItem";

const View = () => {
  const { user } = useParams();
  const [empty, setEmpty] = useState(null);
  const [userPlatforms, setUserPlatforms] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [image, setImage] = useState(null);
  const navigator = useNavigate();

  const fetchData = async () => {
    try {
      const resp = await fetch(
        `${process.env.REACT_APP_SERVER_API}/users/${user}`
      );
      if (resp.status === 404) {
        navigator("/");
        throw new Error("No such user exists");
      }
      if (resp.ok) {
        const data = await resp.json();
        setUserPlatforms(data.userPlatforms);
        setPlatforms(data.platforms);
        if (data.profilePicture !== null) setImage(data.profilePicture.url);
        if (data.userPlatforms.length === 0) setEmpty(true);
      } else throw new Error("Internal Server Error");
    } catch (err) {
      window.alert(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="view">
        <Navbar />
        <div className="viewContent">
          <div className="outline">
            <div
              className="img"
              style={image ? { backgroundImage: `url(${image})` } : {}}
            ></div>
          </div>

          <h1>
            {`${user.replace(
              user.charAt(0),
              user.charAt(0).toUpperCase()
            )}'s platforms`}
          </h1>
          {empty ? (
            <p>The user has not shared any accounts yet.</p>
          ) : (
            <ul>
              {userPlatforms.map((element) => {
                const { id, socialUrl, socialName } = element;
                let platform = platforms.find(
                  (element) => element.name === socialName
                );
                let url = platform.url;
                return <ListItem key={id} socialUrl={socialUrl} url={url} />;
              })}
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default View;
