import React, { useEffect, useRef } from "react";

const ListItem = ({ socialUrl, url }) => {
  const myRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        entries[0].target.classList.add("reveal");
      }
    });
    observer.observe(myRef.current);
  }, []);

  const handleClick = (e) => {
    window.open(socialUrl);
  };

  return (
    <>
      <img src={url} alt="social-icon" ref={myRef} onClick={handleClick} />
    </>
  );
};

export default ListItem;
