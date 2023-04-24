import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import SocialItem from "../Components/SocialItem";

const Menu = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const userInfo = useOutletContext();
  const [platforms, setPlatforms] = useState(userInfo.platforms);
  const [socialName, setSocialName] = useState(null);
  const [socialUrl, setSocialUrl] = useState("");
  const navigator = useNavigate();

  // RUNS WHEN WE SEARCH FOR DIFFERENT PLATFORMS
  useEffect(() => {
    if (search.length !== 0) {
      setPlatforms(
        userInfo.platforms.filter((element) => {
          return element.name
            .toLowerCase()
            .startsWith(search.toLowerCase().trim());
        })
      );
    } else {
      setPlatforms(userInfo.platforms);
    }
  }, [search]);

  //THIS FUNCTION SAVES THE USER'S SELECTED PLATFORM ALONG WITH THE URL, ON THE DATABASE
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (selected === null) throw new Error("Please select a social platform");
      if (!socialUrl) throw new Error("Please provide your platforms url");
      if (
        (socialUrl.startsWith("http://") ||
          socialUrl.startsWith("https://")) === false
      )
        throw new Error("Provide a correct URL");
      const resp = await fetch(`${process.env.REACT_APP_SERVER_API}/add`, {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userInfo.user.username,
          socialUrl,
          socialName,
        }),
      });
      if (resp.ok) {
        navigator(`/dashboard/${userInfo.user.username}`);
      } else {
        throw new Error("Please try again.");
      }
    } catch (err) {
      window.alert(err);
    }
  };

  return (
    <>
      <section className="menu">
        <div className="socialSearch">
          <input
            type="text"
            value={search}
            placeholder="Search for a specific platform"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <span className="material-icons" onClick={() => setSearch("")}>
            cancel
          </span>
        </div>
        <ul className="socialMenu">
          {platforms.length !== 0 ? (
            platforms.map((item) => {
              const { _id, name, url } = item;
              return (
                <SocialItem
                  key={_id}
                  name={name}
                  id={_id}
                  selected={selected}
                  setSelected={setSelected}
                  setSocialName={setSocialName}
                  url={url}
                />
              );
            })
          ) : (
            <h3>No platforms found...</h3>
          )}
        </ul>
        <input
          className="socialLink"
          type="text"
          value={socialUrl}
          onChange={(e) => setSocialUrl(e.target.value)}
          placeholder={`Paste account's URL here.`}
        />
        <div className="socialButtons">
          <button
            onClick={() => navigator(`/dashboard/${userInfo.user.username}`)}
          >
            Cancel
          </button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </section>
    </>
  );
};

export default Menu;
