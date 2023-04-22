import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import SocialItem from "../Components/SocialItem";
import LoadingPage from "./LoadingPage";

const Menu = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]); //used as a second storage for the platforms in order to search them later
  const [socialName, setSocialName] = useState(null);
  const [socialUrl, setSocialUrl] = useState("");
  const userInfo = useOutletContext();
  const navigator = useNavigate();

  //WE ARE FETCHING THE SOCIAL PLATFORMS NAMES AND PICTURES
  const fetchData = async () => {
    try {
      const resp = await fetch("http://localhost:5000/platforms", {
        credentials: "include",
      });
      const { platforms } = await resp.json();
      setLoading(false);
      setItems(platforms);
      setData(platforms);
    } catch (err) {
      console.log(err);
      navigator(`/dashboard/${userInfo.username}`);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // RUNS WHEN WE SEARCH FOR DIFFERENT PLATFORMS
  useEffect(() => {
    if (search.length !== 0) {
      setItems(
        data.filter((element) => {
          return element.name
            .toLowerCase()
            .startsWith(search.toLowerCase().trim());
        })
      );
    } else {
      setItems(data);
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
      const resp = await fetch("http://localhost:5000/add", {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userInfo.username,
          socialUrl,
          socialName,
        }),
      });
      if (resp.ok) {
        navigator(`/dashboard/${userInfo.username}`);
      } else {
        throw new Error("Please try again.");
      }
    } catch (err) {
      window.alert(err);
    }
  };

  if (loading) return <LoadingPage />;
  else
    return (
      <>
        <section className="menu">
          <div className="socialSearch">
            <input
              value={search}
              type="text"
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
            {items.length !== 0 ? (
              items.map((item) => {
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
            placeholder={`Paste account's URL here. `}
          />
          <div className="socialButtons">
            <button
              onClick={() => navigator(`/dashboard/${userInfo.username}`)}
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
