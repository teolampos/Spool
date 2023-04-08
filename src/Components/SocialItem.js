import React from "react";

const SocialItem = ({ name, id, selected, setSelected }) => {
  const handleClick = (e) => {
    setSelected(e.target.id);
  };
  return (
    <li
      className="socialItem"
      id={id}
      style={selected == id ? { background: "black" } : {}}
      onClick={handleClick}
    >
      <span className="material-icons add">add</span>
      <span style={selected == id ? { color: "white" } : {}}>{name}</span>
    </li>
  );
};

export default SocialItem;
