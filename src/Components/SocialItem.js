import React from "react";

const SocialItem = ({
  setSocialName,
  name,
  id,
  url,
  selected,
  setSelected,
}) => {
  const handleClick = (e) => {
    setSelected(e.target.id);
    setSocialName(name);
  };

  return (
    <li
      className="socialItem"
      id={id}
      style={selected === id ? { background: "black" } : {}}
      onClick={handleClick}
    >
      <img src={url} alt="social icon" />
      <span style={selected === id ? { color: "white" } : {}}>{name}</span>
    </li>
  );
};

export default SocialItem;
