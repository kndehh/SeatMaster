import React, { useState, useEffect } from "react";
import "./components/pageLRT.css";
import Header from "./pages/Header.jsx";
import Transportasi from "./pages/Transportasi.jsx";
import {Link} from "react-router-dom";

const stationStartOptions = [
  "Stasiun",
  "Lebak Bulus",
  "Fatmawati",
  "Cipete Raya",
  "Haji Nawi",
  "Blok A",
  "Blok M",
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

const transportList = [
  {
    key: "MRT",
    icon: <img src="/public/assets/mrt.png" alt="mrt" />,
    label: "MRT",
  },
  { key: "LRT", icon: "🚊", label: "LRT" },
  { key: "KRL", icon: "🚂", label: "KRL" },
  { key: "TransJakarta", icon: "🚌", label: "Trans Jakarta" },
];

export default function PageLRT() {
  const [start, setStart] = useState("Stasiun");
  const [end, setEnd] = useState("Stasiun");
  const [activeTransport, setActiveTransport] = useState(null);

  // Status login dan tiket
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeTicket, setActiveTicket] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    setLoggedIn(!!storedUser);
  }, []);

  const handleTicketClick = (idx) => {
    if (!loggedIn) {
      alert("Please login first to access ticket purchasing.");
      window.location.href = "/login";
    } else {
      setActiveTicket(idx);
      alert(
        "This content is locked. Please upgrade your account to access this feature."
      );
    }
  };

  // Handler dummy agar tidak error
  const handleContact = () => {
    alert("Contact feature coming soon!");
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
  };

  return (
    <div>
      <div>
        <Header />
      </div>

      {/* Hero Section */}
      <section className="hero">
        <h1>Connecting All your transportation</h1>
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
        <div className="route-selector">
          <div className="help-section">
            <h3>Need Help?</h3>
            <button className="contact-btn" onClick={handleContact}>
              <span role="img" aria-label="chat">
                💬
              </span>{" "}
              Contact Us!
            </button>
          </div>

          <div className="fastest-route">
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
            <Link to="/FastestRoute" className="go-btn" onClick={handleGo}>
              GO!
            </Link>
          </div>
        </div>

        <div className="train-illustration">
          <div className="train-container">
            <div className="train">
              <div className="train-window"></div>
              <div className="train-door"></div>
              <div className="train-lights">
                <div className="light red"></div>
                <div className="light green"></div>
                <div className="light blue"></div>
              </div>
            </div>
            <div className="train-front"></div>
          </div>
        </div>
      </main>

      {/* Transportation Grid */}
      <div>
        <Transportasi
          loggedIn={loggedIn}
          activeTicket={activeTicket}
          onTicketClick={handleTicketClick}
        />
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>Connecting All Your Transportation</p>
        <button className="footer-contact" onClick={handleContact}>
          💬
        </button>
      </footer>
    </div>
  );
}