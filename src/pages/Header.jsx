import { Link } from "react-router-dom";
import React from "react";
import "../components/landing.css";

export default function Header({ loggedIn }) {
  return (
    <header className="allHeader">
      <div className="nav-container">
        <Link to="/" className="logo">
          SEAT MASTER
        </Link>
        <nav className="navbar">
          <ul className="nav-menu" id="navMenu">
            <li>
              <a href="#transportasi">Transportasi</a>
            </li>
            <li>
              <a href="#route">Route</a>
            </li>
            <li>
              <a href="#ticket">Capacity</a>
            </li>
            <li>
              <a href="#ticket">Buy Ticket</a>
            </li>
          </ul>
        </nav>
        {!loggedIn ? (
          <Link to="/login" className="loginBtn">
            LOGIN
          </Link>
        ) : <div className="user-icon">👤</div>}
        {/*<div className="hamburger" id="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>*/}
      </div>
    </header>
  );
}