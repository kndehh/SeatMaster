import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import './components/fastestRoute.css';
import { Link, useNavigate } from 'react-router-dom';
import { lrtStations } from "./pages/StasiunLRT.js";
import { getCapacity } from "./pages/CapacityStorage.js";

// Build station key map
const lrtStationsMap = {};
lrtStations.forEach((station, index) => {
  if (index > 0) {
    const key = `lrt_${station.toLowerCase().replace(/\s+/g, '_')}`;
    lrtStationsMap[key] = station;
  }
});
const stationKeys = Object.keys(lrtStationsMap);

export default function TrainBooking() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [showStartDropdown, setShowStartDropdown] = useState(false);
  const [showEndDropdown, setShowEndDropdown] = useState(false);
  const [capacity, setCapacity] = useState({ used: 0, total: 100 });
  const navigate = useNavigate();

  useEffect(() => {
    if (!start || !end || start === end) {
      setCapacity({ used: 0, total: 100 });
      return;
    }
    setCapacity(getCapacity(start, end));
  }, [start, end]);

  const btnTicket = () => {
    if (!start || !end) {
      alert("Pilih stasiun awal dan tujuan terlebih dahulu.");
      return;
    }
    if (start === end) {
      alert("Stasiun awal dan tujuan tidak boleh sama.");
      return;
    }
    alert(`Rute tercepat dari ${lrtStationsMap[start]} ke ${lrtStationsMap[end]} akan ditampilkan (dummy).`);
    navigate("/buy-ticket", { state: { startStation: start, endStation: end } });
  };

  return (
    <div className="app-container">
      <div className="main-container">
        <div className="help-section">
          <h3>Need Help?</h3>
          <Link
            to="/customer-service"
            className="contact-btn"
            onClick={() => alert("Connecting to customer services")}
          >
            <span role="img" aria-label="chat">💬</span> Contact Us!
          </Link>
        </div>
        <h1 className="main-title">Fastest Route</h1>
        <div className="content-grid">
          <div className="train-section">
            <div className="train-container">
              <img src="../public/assets/lrt.png" alt="lrt" />
            </div>
          </div>
          <div className="form-section">
            <div className="station-controls">
              <div className="station-labels">
                <span>Start</span>
                <span className="endingStation">End</span>
              </div>
              <div className="station-dropdowns">
                <div className="dropdown-container">
                  <button
                    onClick={() => {
                      setShowStartDropdown(!showStartDropdown);
                      setShowEndDropdown(false);
                    }}
                    className="station-dropdown"
                  >
                    <span className="station-text">{start ? lrtStationsMap[start] : "Stasiun"}</span>
                    <ChevronDown className="dropdown-icon" />
                  </button>
                  {showStartDropdown && (
                    <div className="dropdown-menu">
                      {stationKeys.map((key) => (
                        <button
                          key={key}
                          className="dropdown-item"
                          disabled={key === end}
                          onClick={() => {
                            setStart(key);
                            setShowStartDropdown(false);
                          }}
                        >
                          {lrtStationsMap[key]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <ArrowRight className="arrow-icon" />
                <div className="dropdown-container">
                  <button
                    onClick={() => {
                      setShowEndDropdown(!showEndDropdown);
                      setShowStartDropdown(false);
                    }}
                    className="station-dropdown"
                  >
                    <span className="station-text">{end ? lrtStationsMap[end] : "Stasiun"}</span>
                    <ChevronDown className="dropdown-icon" />
                  </button>
                  {showEndDropdown && (
                    <div className="dropdown-menu">
                      {stationKeys.map((key) => (
                        <button
                          key={key}
                          className="dropdown-item"
                          disabled={key === start}
                          onClick={() => {
                            setEnd(key);
                            setShowEndDropdown(false);
                          }}
                        >
                          {lrtStationsMap[key]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="map-container">
              <div className="map-image">
                <img src="../public/assets/map.png" alt="map" />
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-section">
          <div className="capacity-info">
            Available Capacity: <span className="capacity-available">{capacity.used}</span>/<span className="capacity-total">{capacity.total}</span>
          </div>
          <button className="buy-button" onClick={btnTicket}>
            BUY TICKET
          </button>
        </div>
      </div>
    </div>
  );
}