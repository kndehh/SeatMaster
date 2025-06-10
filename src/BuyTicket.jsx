import React, { useState } from "react";

const stations = {
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
  const [form, setForm] = useState({
    startStation: "",
    endStation: "",
    paymentMethod: "",
  });
  const [routeInfo, setRouteInfo] = useState(null);
  const [capacity, setCapacity] = useState({ used: 40, total: 100 });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ show: false, routeData: null });

  // Update route info and capacity when station changes
  React.useEffect(() => {
    const { startStation, endStation } = form;
    if (
      startStation &&
      endStation &&
      startStation !== endStation &&
      stations[startStation] &&
      stations[endStation]
    ) {
      const routeKey = getRouteKey(startStation, endStation);
      const price = basePrices[routeKey] || 50000;
      // Simulate different capacities for different routes
      const capacities = [30, 40, 55, 70, 85];
      const randomCapacity =
        capacities[
        (startStation.charCodeAt(0) +
          endStation.charCodeAt(0) +
          price) %
        capacities.length
          ];
      setRouteInfo({
        start: startStation,
        end: endStation,
        price,
      });
      setCapacity({ used: randomCapacity, total: 100 });
    } else {
      setRouteInfo(null);
      setCapacity({ used: 40, total: 100 });
    }
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
      setCapacity((c) => ({
        ...c,
        used: Math.min(c.used + 1, c.total),
      }));
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
      setCapacity({ used: 40, total: 100 });
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
    setCapacity({ used: 40, total: 100 });
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
      <style>{`
        * {margin:0;padding:0;box-sizing:border-box;}
        body, .buyticket-bg {font-family:'Arial',sans-serif;background:linear-gradient(135deg,#f5f7fa 0%,#c3cfe2 100%);min-height:100vh;display:flex;justify-content:center;align-items:center;position:relative;overflow:hidden;padding:20px;}
        .bg-decoration {position:absolute;width:150px;height:150px;border:2px solid #6366f1;border-radius:15px;opacity:0.08;transform:rotate(45deg);}
        .bg-decoration:nth-child(1) {top:-75px;left:-75px;animation:float 8s ease-in-out infinite;}
        .bg-decoration:nth-child(2) {bottom:-75px;right:-75px;animation:float 8s ease-in-out infinite reverse;}
        .bg-decoration:nth-child(3) {top:30%;right:-100px;animation:float 10s ease-in-out infinite;}
        @keyframes float {0%,100%{transform:rotate(45deg) translateY(0px);}50%{transform:rotate(45deg) translateY(-15px);}}
        .container {background:rgba(255,255,255,0.95);backdrop-filter:blur(15px);border-radius:25px;padding:40px;box-shadow:0 25px 50px rgba(0,0,0,0.1);border:1px solid rgba(255,255,255,0.3);width:100%;max-width:500px;position:relative;z-index:10;}
        .title {font-size:2.5rem;font-weight:bold;text-align:center;margin-bottom:40px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-transform:uppercase;letter-spacing:2px;}
        .form-section {margin-bottom:30px;}
        .form-row {display:flex;gap:20px;margin-bottom:25px;}
        .form-group {flex:1;}
        .form-group.full-width {width:100%;}
        .form-group label {display:block;margin-bottom:8px;font-weight:600;color:#4a5568;text-transform:uppercase;font-size:0.9rem;letter-spacing:0.5px;}
        .select-container {position:relative;}
        .form-group select {width:100%;padding:15px 20px;border:2px solid #e2e8f0;border-radius:12px;font-size:1rem;background:#f8fafc;color:#4a5568;transition:all 0.3s ease;outline:none;appearance:none;cursor:pointer;}
        .form-group select:focus {border-color:#6366f1;background:#fff;box-shadow:0 0 0 3px rgba(99,102,241,0.1);}
        .select-container::after {content:'▼';position:absolute;right:15px;top:50%;transform:translateY(-50%);color:#6b7280;pointer-events:none;font-size:0.8rem;}
        .route-info {background:linear-gradient(135deg,#f8fafc 0%,#e2e8f0 100%);border-radius:15px;padding:25px;margin:25px 0;border:1px solid #cbd5e0;}
        .route-details {display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;}
        .route-text {font-size:1.1rem;font-weight:600;color:#2d3748;}
        .route-arrow {font-size:1.2rem;color:#6366f1;font-weight:bold;}
        .price-text {font-size:1.3rem;font-weight:bold;color:#059669;}
        .capacity-section {text-align:center;margin:30px 0;}
        .capacity-title {font-size:1.8rem;font-weight:bold;color:#2d3748;margin-bottom:15px;}
        .capacity-display {display:inline-flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:15px 30px;border-radius:20px;font-size:2rem;font-weight:bold;box-shadow:0 10px 25px rgba(102,126,234,0.3);margin-bottom:10px;}
        .capacity-bar {width:100%;height:12px;background:#e2e8f0;border-radius:6px;overflow:hidden;margin-top:10px;}
        .capacity-fill {height:100%;transition:width 0.5s ease;border-radius:6px;}
        .capacity-status {margin-top:8px;font-size:0.9rem;color:#6b7280;}
        .button-group {display:flex;gap:15px;margin-top:40px;}
        .btn {flex:1;padding:18px;border:none;border-radius:15px;font-size:1.1rem;font-weight:600;text-transform:uppercase;letter-spacing:1px;cursor:pointer;transition:all 0.3s ease;position:relative;overflow:hidden;}
        .btn-buy {background:linear-gradient(135deg,#10b981 0%,#059669 100%);color:white;box-shadow:0 8px 20px rgba(16,185,129,0.3);}
        .btn-buy:hover {transform:translateY(-3px);box-shadow:0 12px 25px rgba(16,185,129,0.4);}
        .btn-buy:disabled {background:#9ca3af;cursor:not-allowed;transform:none;box-shadow:none;}
        .btn-cancel {background:linear-gradient(135deg,#ef4444 0%,#dc2626 100%);color:white;box-shadow:0 8px 20px rgba(239,68,68,0.3);}
        .btn-cancel:hover {transform:translateY(-3px);box-shadow:0 12px 25px rgba(239,68,68,0.4);}
        .btn:active {transform:translateY(0);}
        .loading {display:inline-block;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);}
        .spinner {width:20px;height:20px;border:2px solid rgba(255,255,255,0.3);border-radius:50%;border-top-color:white;animation:spin 1s ease-in-out infinite;}
        @keyframes spin {to{transform:rotate(360deg);}}
        .modal {display:${modal.show ? "block" : "none"};position:fixed;z-index:1000;left:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,0.5);backdrop-filter:blur(5px);}
        .modal-content {background:white;margin:15% auto;padding:30px;border-radius:20px;width:90%;max-width:400px;text-align:center;box-shadow:0 25px 50px rgba(0,0,0,0.2);}
        .modal-icon {font-size:4rem;color:#10b981;margin-bottom:20px;}
        .modal-title {font-size:1.5rem;font-weight:bold;color:#2d3748;margin-bottom:15px;}
        .modal-text {color:#6b7280;margin-bottom:25px;line-height:1.5;}
        .modal-btn {background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;border:none;padding:12px 30px;border-radius:10px;font-weight:600;cursor:pointer;transition:all 0.3s ease;}
        .modal-btn:hover {transform:translateY(-2px);box-shadow:0 8px 20px rgba(102,126,234,0.3);}
        @media (max-width:480px){.container{margin:10px;padding:25px 20px;}.title{font-size:2rem;}.form-row{flex-direction:column;gap:15px;}.button-group{flex-direction:column;}.capacity-display{font-size:1.5rem;padding:12px 25px;}}
      `}</style>
      <div className="buyticket-bg">
        <div className="bg-decoration"></div>
        <div className="bg-decoration"></div>
        <div className="bg-decoration"></div>
        <div className="container">
          <h1 className="title">Buy Ticket</h1>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form-section">
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
          className="modal"
          style={{ display: modal.show ? "block" : "none" }}
          onClick={(e) => {
            if (e.target.className === "modal") closeModal();
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