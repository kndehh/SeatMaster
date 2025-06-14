import React, { useState, useEffect } from "react";
import "./components/pageLRT.css";
import Header from "./pages/Header.jsx";
import Transportasi from "./pages/Transportasi.jsx";
import { Link, useNavigate } from "react-router-dom";

const stationStartOptions = [
  "Stasiun",
  "Kelapa Gading",
  "Boulevard Utara",
  "Boulevard Selatan",
  "Pegangsaan Dua",
  "Pulomas",
  "Velodrome",
];

const stationEndOptions = [
  "Stasiun",
  "Kelapa Gading",
  "Boulevard Utara",
  "Boulevard Selatan",
  "Pegangsaan Dua",
  "Pulomas",
  "Velodrome",
];

export default function PageLRT() {
  const [start, setStart] = useState("Stasiun");
  const [end, setEnd] = useState("Stasiun");

  // Status login dan tiket
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeTicket, setActiveTicket] = useState(null);
  const [userId, setUserId] = useState("User"); // tambahkan ini

  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleTransportasiClick = () => {
    navigate("/"); // balik ke page awal/home
  };

  const handleRouteClick = () => {
    navigate("/#route"); // balik ke section route di home
  };

  const handleCapacityClick = () => {
    scrollToSection("fastest-route-section"); // scroll ke section fastest route di page ini
  };

  const handleBuyTicketClick = () => {
    scrollToSection("buy-ticket-section"); // scroll ke bawah (section buy ticket)
  };
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

  const handleTicketClick = (idx) => {
    if (!loggedIn) {
      alert("Please login first to access ticket purchasing.");
      navigate("/login");
    } else {
      setActiveTicket(idx);
      alert("Connecting to purchasing tickets");
      navigate("/FastestRoute"); // tambahkan ini agar bisa navigate
    }
  };
  // Handler dummy agar tidak error
  const handleContact = () => {
    alert("Connecting to customer services");
  };

  const handleGo = () => {
    if (start === "Stasiun" || end === "Stasiun") {
      alert("Pilih stasiun awal dan tujuan terlebih dahulu.");
      return;
    }
    if (start === end) {
      alert("Stasiun awal dan tujuan tidak boleh sama.");
      return;
    }
    alert(`Rute tercepat dari ${start} ke ${end} akan ditampilkan (dummy).`);
    navigate("/FastestRoute");
  };

  function logout() {
    setLoggedIn(false);
    setUserId("User");
    setActiveTicket(null);
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully.");
  }

  return (
    <div>
      <div>
        <Header
          onTransportasiClick={handleTransportasiClick}
          onRouteClick={handleRouteClick}
          onCapacityClick={handleCapacityClick}
          onBuyTicketClick={handleBuyTicketClick}
          loggedIn={loggedIn}
          userId={userId}
          onLogout={logout}
        />{" "}
      </div>

      {/* Hero Section */}
      <section className="hero">
        <h1 className="h1LRT">Connecting All your transportation</h1>
        <div className="weather-info">
          Recent Weather at Lebak Bulus : <span className="sun-icon">☀</span>{" "}
          Sunny, 32°C (15:21, Sunday, 15 March 2025)
        </div>
        <div className="lrt-title">LRT (EDITION)</div>
        <div className="paragraph">
          <p>Connecting All Your Transportation</p>
        </div>
      </section>

      <main className="main-content">
        <div className="route-selector-lrt">
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

          <div className="fastest-route" id="fastest-route-section">
            <h2>Fastest Route</h2>

            <div className="station-input">
              <div className="location-icon"></div>
              <select
                id="start"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              >
                {stationStartOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="station-input">
              <div className="destination-icon"></div>
              <select
                id="end"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              >
                {stationEndOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <button className="go-btn" onClick={handleGo}>
              GO!
            </button>
          </div>
        </div>

        <div className="train-illustration">
          <div className="train-container">
            <div className="train">
              <img
                src="../public/assets/lrt.png"
                alt="lrt"
                className="posisiLRT"
              />
            </div>
            <div className="train-front"></div>
          </div>
        </div>
      </main>

      {/* Transportation Grid */}
      <div className="lrtFooter" id="buy-ticket-section">
        <Transportasi
          loggedIn={loggedIn}
          activeTicket={activeTicket}
          onTicketClick={handleTicketClick}
        />
      </div>

      {/*/!* Footer *!/*/}
      {/*<footer className="footer">*/}
      {/*  <p>Connecting All Your Transportation</p>*/}
      {/*  <button className="footer-contact" onClick={handleContact}>*/}
      {/*    💬*/}
      {/*  </button>*/}
      {/*</footer>*/}
    </div>
  );
}
