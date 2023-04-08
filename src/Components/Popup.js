import React from "react";

const Popup = ({ popup }) => {
  return (
    <>
      {popup ? (
        <h3 className="popup">Spool account link copied successfully!</h3>
      ) : (
        <></>
      )}
    </>
  );
};

export default Popup;
