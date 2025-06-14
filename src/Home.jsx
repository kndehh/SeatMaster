import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./pages/Header.jsx";
import Transport from "./pages/Transportasi.jsx";
import "./components/landing.css";
import "../public/assets/lrt.png";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("User");
  const [activeTicket, setActiveTicket] = useState(null);
  const [modalMap, setModalMap] = useState(null);

  const handleContact = () => {
    alert("Connecting to customer services");
  };

  const routeMaps = [
    {
      label: "MRT",
      imgThumb: "/public/assets/minimap mrt.png", // gambar kecil di card
      imgFull: "/public/assets/full mrt.png", // gambar besar di modal
    },
    {
      label: "LRT",
      imgThumb: "/public/assets/minimap lrt.png",
      imgFull: "/public/assets/full lrt.png",
    },
    {
      label: "KRL",
      imgThumb: "/public/assets/minimap krl.png",
      imgFull: "/public/assets/full krl.png",
    },
    {
      label: "Trans Jakarta",
      imgThumb: "/public/assets/minimap tije.png",
      imgFull: "/public/assets/integrasi (1).jpg",
    },
  ];

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


  function logout() {
    setLoggedIn(false);
    setUserId("User");
    setActiveTicket(null);
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully. Ticket section is now locked.");
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
      {/* Header */}
      <Header loggedIn={loggedIn} userId={userId} onLogout={logout} />
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
              <Link to="/lrt">
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
      <div className="route-selector">
        <div className="help-section">
          <h3>Need Help?</h3>
          <Link
            to="/customer-service"
            className="contact-btn"
            onClick={handleContact}
          >
            <span role="img" aria-label="chat">
              💬
            </span>{" "}
            Contact Us!
          </Link>
        </div>
      </div>
      {/* Route Section */}
      <section className="route-section" id="route">
        <div className="section-content">
          <h2 className="route-title">Route</h2>
          <div className="route-maps">
            {routeMaps.map((route) => (
              <div
                className="route-map"
                key={route.label}
                onClick={() => setModalMap(route.imgFull)}
                style={{ cursor: "pointer" }}
              >
                <div className="map-image">
                  <img src={route.imgThumb} alt={route.label + " map"} />
                </div>
                <div className="map-label">{route.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {modalMap && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setModalMap(null)}
        >
          <img
            src={modalMap}
            alt="Full Map"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: 16,
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              background: "#fff",
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      {/* Buy Ticket Section */}
      <Transport />
    </div>
  );
}
