import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar2";
import Popup from "./Popup";
import { data } from "./data";
import photo from "../images/social-media-34/png-96/deviantart-96x96-498419.png";

const Dashboard = () => {
  const navigator = useNavigate();
  const [show, setShow] = useState(true);

  const [popup, setPopup] = useState(false);
  const handleClick = () => {
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
    }, 3000);
  };
  return (
    <>
      <Navbar />

      {show ? (
        <section className="dashboardV1">
          <Popup popup={popup} />
          <h2>My platforms</h2>
          <div>
            <button onClick={() => navigator("/social-menu")}>
              Add New
              <span className="material-icons add">add</span>
            </button>
            <button onClick={handleClick}>Share Spool Account</button>
          </div>

          <ul>
            {data.map((item) => {
              const { id } = item;
              return (
                <div>
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 28.87 28.87"
                  >
                    <defs></defs>
                    <title>Asset 29</title>
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="Layer_1-2" data-name="Layer 1">
                        <rect
                          className="cls-1"
                          width="28.87"
                          height="28.87"
                          rx="6.48"
                          ry="6.48"
                          fill="#6e6e6e"
                        />
                        <path
                          class="cls-2"
                          d="M20.72 18c-.56 1.52-2.17 4.07-3.75 3.77-1.09-.21-1.57-.77-2.79-.54-.86.16-1.16.49-1.85.56a2.84 2.84 0 0 1-2.43-1.52 10.65 10.65 0 0 1-1.08-1.94 8 8 0 0 1-.54-4.93 3.85 3.85 0 0 1 2.54-2.75 4.59 4.59 0 0 1 3.41.38c.56.16 1-.08 1.67-.33a4 4 0 0 1 4.5 1.2c-2.31 1.65-2.23 4.49.4 5.86 0 .07-.01.07-.08.24z"
                          fill="#fff"
                          fill-rule="evenodd"
                        />
                        <path
                          class="cls-2"
                          d="M17.39 7.08a4.17 4.17 0 0 1 0 .61 3.2 3.2 0 0 1-3 3 3.24 3.24 0 0 1 0-.52 3.46 3.46 0 0 1 2.74-3z"
                          fill="#fff"
                          fill-rule="evenodd"
                        />
                      </g>
                    </g>
                  </svg> */}
                  <img src={photo} alt="logo" />
                  <span class="material-icons">highlight_off</span>
                </div>
              );
            })}
          </ul>
        </section>
      ) : (
        <section className="dashboardV2">
          <div className="emptyDashboard">
            <h1>Your dashboard is empty! Add an account.</h1>
            <button onClick={() => navigator("/social-menu")}>
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
