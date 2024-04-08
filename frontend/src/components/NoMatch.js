import React from "react";
import { Link } from "react-router-dom";
import "../styles/NoMatch.css";
import "../media/NoMatch.css";

function NoMatch() {
  return (
    <>
      <section className="not-found-main-section">
        <div className="not-found-container">
          <img
            src="https://res.cloudinary.com/dhrxlyj5c/image/upload/v1711217461/ehflvfsfg0qjhqamdwrm.jpg"
            alt="page not found"
            className="page-not-found-img"
          />
        </div>
        <div className="home-page-link">
          <Link to={"/"}>Click here to Home Page</Link>
        </div>
      </section>
    </>
  );
}

export default NoMatch;
