import React, { useState } from "react";
import "./components/fastestRoute.css"; // Pastikan path sesuai struktur project-mu

const stations = ["Lebak Bulus", "Dukuh Atas", "Bekasi"];

export default function FastestRoute() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [capacity, setCapacity] = useState({ used: 40, total: 100 });

  function handleStartChange(e) {
    setStart(e.target.value);
  }
  function handleEndChange(e) {
    setEnd(e.target.value);
  }

  function handleBuy() {
    if (!start || !end || start === end) {
      alert("Pilih stasiun awal dan akhir yang berbeda!");
      return;
    }
    if (capacity.used >= capacity.total) {
      alert("Maaf, kapasitas penuh!");
      return;
    }
    setCapacity((c) => ({
      ...c,
      used: Math.min(c.used + 1, c.total),
    }));
    alert("Tiket berhasil dipesan!");
  }

  return (
    <div className="container">
      <header className="header">Fastest Route</header>
      <div className="main-content">
        <div className="train-ascii">
          <img src="../public/assets/LRTFastest.png"/>
        </div>
        <div className="route-section">
          <form
            className="route-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleBuy();
            }}
          >
            <div className="select-row">
              <div className="select-group">
                <label className="select-label" htmlFor="start">
                  Start
                </label>
                <select
                  id="start"
                  name="start"
                  value={start}
                  onChange={handleStartChange}
                >
                  <option value="">Stasiun</option>
                  {stations.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <span className="arrow">&#8646;</span>
              <div className="select-group">
                <label className="select-label" htmlFor="end">
                  End
                </label>
                <select
                  id="end"
                  name="end"
                  value={end}
                  onChange={handleEndChange}
                >
                  <option value="">Stasiun</option>
                  {stations.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
          <div className="map-container" id="map-container">
            {/* Ganti dengan komponen map jika ada, atau pakai placeholder */}
            <div className="fake-map" style={{
              width: "100%",
              height: "180px",
              background: "#e5e7eb",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6366f1",
              fontWeight: "bold",
              fontSize: "1.2rem",
              margin: "20px 0"
            }}>
              [Map Placeholder]
            </div>
          </div>
          <div className="capacity">
            Available Capacity :{" "}
            <span id="capacity">
              {capacity.used}/{capacity.total}
            </span>
          </div>
          <button className="buy-btn" onClick={handleBuy}>
            BUY TICKET
          </button>
        </div>
      </div>
    </div>
  );
}