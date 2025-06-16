import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { lrtStations } from "./pages/StasiunLRT.js";
import "./components/buyTicket.css";
import { getCapacity, setCapacity as setGlobalCapacity } from "./pages/CapacityStorage.js";

// Add LRT stations to the stations object
const lrtStationsMap = {};
lrtStations.forEach((station, index) => {
  if (index > 0) { // Skip the first "Stasiun" placeholder
    const key = `lrt_${station.toLowerCase().replace(/\s+/g, '_')}`;
    lrtStationsMap[key] = station;
  }
});

const stations = {
  ...lrtStationsMap,
  jakarta: "Jakarta Pusat",
  bandung: "Bandung",
  surabaya: "Surabaya",
  yogyakarta: "Yogyakarta",
  semarang: "Semarang",
  solo: "Solo",
};

const basePrices = {
  "jakarta-bandung": 75000,
  "jakarta-surabaya": 150000,
  "jakarta-yogyakarta": 125000,
  "jakarta-semarang": 100000,
  "jakarta-solo": 110000,
  "bandung-surabaya": 200000,
  "bandung-yogyakarta": 100000,
  "bandung-semarang": 125000,
  "bandung-solo": 135000,
  "surabaya-yogyakarta": 100000,
  "surabaya-semarang": 75000,
  "surabaya-solo": 85000,
  "yogyakarta-semarang": 50000,
  "yogyakarta-solo": 25000,
  "semarang-solo": 35000,
};

const paymentMethods = [
  { value: "", label: "Payment Method" },
  { value: "credit", label: "Credit Card" },
  { value: "debit", label: "Debit Card" },
  { value: "gopay", label: "GoPay" },
  { value: "ovo", label: "OVO" },
  { value: "dana", label: "DANA" },
  { value: "bank", label: "Bank Transfer" },
];

function getRouteKey(start, end) {
  if (start === end) return null;
  return [start, end].sort().join("-");
}

function formatPrice(price) {
  return `Rp ${price.toLocaleString("id-ID")},-`;
}

export default function BuyTicket() {
  const location = useLocation();
  const [form, setForm] = useState({
    startStation: "",
    endStation: "",
    paymentMethod: "",
  });
  const [routeInfo, setRouteInfo] = useState(null);
  const [capacity, setCapacity] = useState({ used: 0, total: 100 });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ show: false, routeData: null });

  // Set form state from navigation (FastestRoute)
  useEffect(() => {
    if (location.state) {
      const { startStation, endStation } = location.state;
      if (startStation && endStation) {
        setForm((prev) => ({
          ...prev,
          startStation,
          endStation,
        }));
      }
    }
    // eslint-disable-next-line
  }, [location.state]);

  // Always get capacity from shared store when stations change
  useEffect(() => {
    const { startStation, endStation } = form;
    if (!startStation || !endStation || startStation === endStation) {
      setRouteInfo(null);
      setCapacity({ used: 0, total: 100 });
      return;
    }
    const routeKey = getRouteKey(startStation, endStation);
    const price = basePrices[routeKey] || 50000;
    setRouteInfo({
      start: startStation,
      end: endStation,
      price,
    });
    setCapacity(getCapacity(startStation, endStation));
    // eslint-disable-next-line
  }, [form.startStation, form.endStation]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validateForm() {
    const { startStation, endStation, paymentMethod } = form;
    if (!startStation) {
      alert("Please select start station");
      return false;
    }
    if (!endStation) {
      alert("Please select end station");
      return false;
    }
    if (startStation === endStation) {
      alert("Start and end stations cannot be the same");
      return false;
    }
    if (!paymentMethod) {
      alert("Please select payment method");
      return false;
    }
    if (capacity.used >= capacity.total) {
      alert("Sorry, this route is fully booked");
      return false;
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const newUsed = Math.min(capacity.used + 1, capacity.total);
      setCapacity((c) => ({ ...c, used: newUsed }));
      setGlobalCapacity(form.startStation, form.endStation, newUsed); // update global store
      setModal({ show: true, routeData: { ...routeInfo, paymentMethod: form.paymentMethod } });
    }, 1500);
  }

  function handleCancel() {
    if (window.confirm("Are you sure you want to cancel?")) {
      setForm({
        startStation: "",
        endStation: "",
        paymentMethod: "",
      });
      setRouteInfo(null);
      setCapacity({ used: 0, total: 100 });
    }
  }

  function closeModal() {
    setModal({ show: false, routeData: null });
    setForm({
      startStation: "",
      endStation: "",
      paymentMethod: "",
    });
    setRouteInfo(null);
    setCapacity({ used: 0, total: 100 });
  }

  // Capacity bar
  const percentage = Math.round((capacity.used / capacity.total) * 100);
  let fillColor =
    percentage >= 90
      ? "linear-gradient(90deg, #ef4444 0%, #dc2626 100%)"
      : percentage >= 70
        ? "linear-gradient(90deg, #f59e0b 0%, #d97706 100%)"
        : "linear-gradient(90deg, #10b981 0%, #059669 100%)";

  return (
    <>
      <div className="buyticket-bg">
        <div className="bg-decoration"></div>
        <div className="bg-decoration"></div>
        <div className="bg-decoration"></div>
        <div className="container">
          <h1 className="title">Buy Ticket</h1>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form-section-buyTicket">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="startStation">Start</label>
                  <div className="select-container">
                    <select
                      id="startStation"
                      name="startStation"
                      value={form.startStation}
                      onChange={handleChange}
                    >
                      <option value="">Stasiun</option>
                      {Object.entries(stations).map(([val, label]) => (
                        <option key={val} value={val}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="endStation">End</label>
                  <div className="select-container">
                    <select
                      id="endStation"
                      name="endStation"
                      value={form.endStation}
                      onChange={handleChange}
                    >
                      <option value="">Stasiun</option>
                      {Object.entries(stations).map(([val, label]) => (
                        <option key={val} value={val}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group full-width">
                <label htmlFor="paymentMethod">Payment Method</label>
                <div className="select-container">
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={form.paymentMethod}
                    onChange={handleChange}
                  >
                    {paymentMethods.map((pm) => (
                      <option key={pm.value} value={pm.value}>
                        {pm.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {routeInfo && (
              <div className="route-info" id="routeInfo">
                <div className="route-details">
                  <span className="route-text" id="routeDisplay">
                    {stations[routeInfo.start]}{" "}
                    <span className="route-arrow">→</span>{" "}
                    {stations[routeInfo.end]}
                  </span>
                </div>
                <div className="price-text" id="priceDisplay">
                  {formatPrice(routeInfo.price)}
                </div>
              </div>
            )}
            <div className="capacity-section">
              <div className="capacity-title">Available Capacity</div>
              <div className="capacity-display" id="capacityDisplay">
                {capacity.used}/{capacity.total}
              </div>
              <div className="capacity-bar">
                <div
                  className="capacity-fill"
                  id="capacityFill"
                  style={{
                    width: `${percentage}%`,
                    background: fillColor,
                  }}
                ></div>
              </div>
              <div className="capacity-status" id="capacityStatus">
                {percentage}% filled • {capacity.total - capacity.used} seats
                available
              </div>
            </div>
            <div className="button-group">
              <button
                type="submit"
                className="btn btn-buy"
                id="buyBtn"
                disabled={loading || capacity.used >= capacity.total}
              >
                <span className="btn-text">
                  {capacity.used >= capacity.total ? "SOLD OUT" : "BUY"}
                </span>
                {loading && (
                  <span className="loading">
                    <span className="spinner"></span>
                  </span>
                )}
              </button>
              <button
                type="button"
                className="btn btn-cancel"
                id="cancelBtn"
                onClick={handleCancel}
                disabled={loading}
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
        {/* Modal */}
        <div
          className={`modal ${modal.show ? 'modal-visible' : 'modal-hidden'}`}
          onClick={(e) => {
            if (e.target.className.includes('modal') && !e.target.className.includes('modal-content')) closeModal();
          }}
        >
          <div className="modal-content">
            <div className="modal-icon">🎫</div>
            <div className="modal-title">Ticket Purchased!</div>
            <div className="modal-text" id="modalText">
              {modal.routeData && (
                <>
                  Your ticket from <strong>{stations[modal.routeData.start]}</strong> to{" "}
                  <strong>{stations[modal.routeData.end]}</strong> has been successfully purchased!
                  <br />
                  <strong>Total: {formatPrice(modal.routeData.price)}</strong>
                  <br />
                  <strong>
                    Payment:{" "}
                    {
                      paymentMethods.find(
                        (pm) => pm.value === modal.routeData.paymentMethod
                      )?.label
                    }
                  </strong>
                </>
              )}
            </div>
            <a
              href="/payment"
              className="modal-btn"
              id="modalBtn"
              onClick={closeModal}
            >
              OK
            </a>
          </div>
        </div>
      </div>
    </>
  );
}