import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SocialItem from "./SocialItem";
import { data } from "./data";

const SocialMenu = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [items, setItems] = useState(data);
  const navigator = useNavigate();

  //Runs when we search for the different platforms.
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

  return (
    <>
      <section className="social">
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
              const { id, name } = item;
              return (
                <SocialItem
                  key={id}
                  name={name}
                  id={id}
                  selected={selected}
                  setSelected={setSelected}
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
          placeholder={`Paste account's link here. `}
        />
        <div className="socialButtons">
          <button onClick={() => navigator("/dashboard")}>Cancel</button>
          <button onClick={() => navigator("/dashboard")}>Submit</button>
        </div>
      </section>
    </>
  );
};

export default SocialMenu;
