import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "../components/landing.css";

export default function Header({
  loggedIn,
  userId,
  onLogout,
  onTransportasiClick,
  onRouteClick,
  onCapacityClick,
  onBuyTicketClick,
}) {
  const navigate = useNavigate();

  return (
    <header className="allHeader">
      <div className="nav-container">
        <Link to="/" className="logo">
          SEAT MASTER
        </Link>
        <nav className="navbar">
          <ul className="nav-menu" id="navMenu">
            <li>
              {onTransportasiClick ? (
                <a className="nav-btn" onClick={onTransportasiClick}>Transportasi</a>
              ) : (
                <a href="#transportasi">Transportasi</a>
              )}
            </li>
            <li>
              {onRouteClick ? (
                <a className="nav-btn" onClick={onRouteClick}>Route</a>
              ) : (
                <a href="#route">Route</a>
              )}
            </li>
            <li>
              {onCapacityClick ? (
                <a className="nav-btn" onClick={onCapacityClick}>Capacity</a>
              ) : (
                <a href="#ticket">Capacity</a>
              )}
            </li>
            <li>
              {onBuyTicketClick ? (
                <a className="nav-btn" onClick={onBuyTicketClick}>Buy Ticket</a>
              ) : (
                <a href="#ticket">Buy Ticket</a>
              )}
            </li>
          </ul>
        </nav>
        {!loggedIn ? (
          <button
            className="loginBtn"
            onClick={() => navigate("/login")}
            title="Login"
          >
            LOGIN
          </button>
        ) : (
          <span className="user-info">
            <span className="user-id">{userId}</span>
            <button className="logoutBtn" onClick={onLogout} title="Logout">
              🔓 Logout
            </button>
          </span>
        )}
      </div>
    </header>
  );
}
