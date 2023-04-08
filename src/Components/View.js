import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar1";
import ListItem from "./ListItem";
import { data } from "./data";

const View = () => {
  const { user } = useParams();

  return (
    <>
      <section className="view">
        <Navbar />
        <div className="viewContent">
          <div className="outline">
            <div className="img"></div>
          </div>

          <h1>
            {`${user.replace(
              user.charAt(0),
              user.charAt(0).toUpperCase()
            )}'s platforms`}
          </h1>
          <ul>
            {data.map((element) => {
              const { id, name, color } = element;
              return <ListItem id={id} name={name} color={color} />;
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default View;
