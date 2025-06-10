import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./pages/Header.jsx";
import "./components/landing.css";
import "../public/assets/lrt.png"

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("User");
  const [activeTicket, setActiveTicket] = useState(null);
  const navigate = useNavigate();

    useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedIn(true);
      setUserId(storedUser);
    } else {
      setLoggedIn(false);
      setUserId("User");
    }
  }, []);

  // Dummy login prompt
  function handleLogin() {
    const uname = prompt("Enter username:");
    const pwd = prompt("Enter password:");
    if (uname && pwd) {
      setLoggedIn(true);
      setUserId(uname);
      localStorage.setItem("loggedInUser", uname);
      alert("Login successful! Ticket section is now unlocked.");
    } else {
      alert("Please enter both username and password.");
    }
  }

  function logout() {
    setLoggedIn(false);
    setUserId("User");
    setActiveTicket(null);
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully. Ticket section is now locked.");
  }

  function handleTicketClick(idx) {
    if (!loggedIn) {
      alert("Please login first to access ticket purchasing.");
      navigate("/login");
    } else {
      setActiveTicket(idx);
      alert(
        "This content is locked. Please upgrade your account to access this feature."
      );
    }
  }

  // Hamburger menu toggle (for mobile)
  React.useEffect(() => {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    if (hamburger && navMenu) {
      const toggleMenu = () => navMenu.classList.toggle("active");
      hamburger.addEventListener("click", toggleMenu);
      return () => hamburger.removeEventListener("click", toggleMenu);
    }
  }, []);

  // Smooth scroll for anchor links
  React.useEffect(() => {
    const handler = (e) => {
      if (
        e.target.tagName === "A" &&
        e.target.getAttribute("href")?.startsWith("#")
      ) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Header scroll effect
  React.useEffect(() => {
    const onScroll = () => {
      const header = document.querySelector(".header");
      if (window.scrollY > 100) {
        header.style.background = "rgba(107, 115, 163, 0.95)";
        header.style.backdropFilter = "blur(10px)";
      } else {
        header.style.background = "#6B73A3";
        header.style.backdropFilter = "none";
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      {/* Login Status */}
      {loggedIn && (
        <div className="login-status" id="loginStatus">
          <span>
            Logged in as: <strong id="username">{userId}</strong>
          </span>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      )}

      {/* Header */}
      <div>
        <Header />
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Connecting All your transportation</h1>
          <div className="transport-showcase">
            <div className="transportVehicle">
              <img src="/public/assets/hero.jpg" alt="heropic" />
            </div>
          </div>
          <p className="tagline">Connecting All Your Transportation</p>
        </div>
      </section>

      {/* Weather Section */}
      <section className="weather-section">
        <div className="weather-info">
          <p>
            Recent Weather at Lebak Bulus: ☀️ Sunny, 32°C (15:21, Sunday, 15
            March 2025)
          </p>
        </div>
      </section>

      {/* Transportasi Section */}
      <section className="transportasi" id="transportasi">
        <div className="section-content">
          <h2 className="section-title">Transportasi</h2>
          <div className="transport-grid">
            <div className="transport-card">
              <div className="card-image mrt">
                <img src="/public/assets/mrt.png" alt="mrt" />
              </div>
              <div className="card-content">
                <h3 className="card-title">MRT</h3>
              </div>
            </div>
            <div className="transport-card">
              <Link
                to="/lrt"
                // style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="card-image lrt">
                  <img src="/public/assets/lrt.png" alt="lrt" />
                </div>
                <div className="card-content">
                  <h3 className="card-title">LRT</h3>
                </div>
              </Link>
            </div>
            <div className="transport-card">
              <div className="card-image krl">
                <img src="/public/assets/krl.png" alt="krl" />
              </div>
              <div className="card-content">
                <h3 className="card-title">KRL</h3>
              </div>
            </div>
            <div className="transport-card">
              <div className="card-image transjakarta">
                <img src="/public/assets/tj.png" alt="transjakarta" />
              </div>
              <div className="card-content">
                <h3 className="card-title">Trans Jakarta</h3>
              </div>
            </div>
          </div>
        </div>
        <p className="connecting-text">Connecting All Your Transportation</p>
      </section>

      {/* Help Button */}
      <div className="help-section">
        <Link to="/customer-service" className="help-btn">
          Need Help?
          <img src="/public/assets/customer services.png" alt="customer services" />
        </Link>
      </div>

      {/* Route Section */}
      <section className="route-section" id="route">
        <div className="section-content">
          <h2 className="route-title">Route</h2>
          <div className="route-maps">
            <div className="route-map">
              <div className="map-image">
                <div className="map-lines"></div>
                <img src="/public/assets/minimap%20mrt.png" alt="mrt map" />
              </div>
              <div className="map-label">MRT</div>
            </div>
            <div className="route-map">
              <div className="map-image">
                <div className="map-lines"></div>
                <img src="/public/assets/minimap%20lrt.png" alt="lrt map" />
              </div>
              <div className="map-label">LRT</div>
            </div>
            <div className="route-map">
              <div className="map-image">
                <div className="map-lines"></div>
                <img src="/public/assets/minimap%20krl.png" alt="krl map" />
              </div>
              <div className="map-label">KRL</div>
            </div>
            <div className="route-map">
              <div className="map-image">
                <div className="map-lines"></div>
                <img src="/public/assets/minimap%20tije.png" alt="trans jakarta map" />
              </div>
              <div className="map-label">Trans Jakarta</div>
            </div>
          </div>
        </div>
      </section>

      {/* Buy Ticket Section */}
      <section className="ticket-section" id="ticket">
        <div className="section-content">
          <h2 className="ticket-title">Buy Ticket</h2>
          <div className="ticket-options">
            {[
              {
                title: "MRT Ticket",
                img: "/assets/bticketMRT.png",
              },
              {
                title: "LRT Ticket",
                img: "/assets/bticketLRT.png",
              },
              {
                title: "KRL Ticket",
                img: "/assets/bticketKRL.png", // sudah benar, tanpa spasi
              },
              {
                title: "Trans Jakarta Ticket",
                img: "/assets/bticketTiJe.png",
              },
            ].map((ticket, idx) => (
              <div
                key={ticket.title}
                className={
                  "ticket-card locked-content" +
                  (activeTicket === idx ? " active-ticket" : "") +
                  (loggedIn ? " unlocked" : "")
                }
                onClick={() => handleTicketClick(idx)}
                style={{ cursor: "pointer" }}
              >
                <div>
                  <h3>{ticket.title}</h3>
                  <img src={ticket.img} alt={ticket.title.toLowerCase()} />
                </div>
                <div className="lock-overlay">
                  <div className="lock-icon">🔒</div>
                  <div className="lock-text">Content Locked</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
