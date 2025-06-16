import React from "react";
import {useNavigate} from "react-router-dom";


const stations = {
  jakarta: "Jakarta Pusat",
  bandung: "Bandung",
  surabaya: "Surabaya",
  yogyakarta: "Yogyakarta",
  semarang: "Semarang",
  solo: "Solo",
};

const paymentMethods = {
  credit: "Credit Card",
  debit: "Debit Card",
  gopay: "GoPay",
  ovo: "OVO",
  dana: "DANA",
  bank: "Bank Transfer",
};

function getUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    start: urlParams.get("start") || "jakarta",
    end: urlParams.get("end") || "bandung",
    price: urlParams.get("price") || "50000",
    payment: urlParams.get("payment") || "credit",
  };
}

function formatPrice(price) {
  return `Rp ${parseInt(price, 10).toLocaleString("id-ID")},-`;
}

function getCurrentDateTime() {
  const now = new Date();
  const date = now
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    .replace(/ /g, "/")
    .toUpperCase();
  const time = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return { date, time };
}

export default function Payment() {
const navigate = useNavigate();
  // Simulasi data dari query string atau default
  const params = getUrlParams();
  const { date, time } = getCurrentDateTime();

  function handleCheckTicket() {
    alert("Fitur Cek Tiket belum tersedia. Silahkan cek email anda untuk melihat tiket anda.");
  }

  function handleBack() {
    if (window.confirm("Kembali ke halaman pemesanan?")) {
      navigate("/");
    }
  }

  return (
    <>
      <style>{`
        .payment-bg {font-family:'Arial',sans-serif;background:linear-gradient(135deg,#f5f7fa 0%,#c3cfe2 100%); min-height:100%; width:100vw; display:flex;justify-content:center;align-items:center;position:relative;padding:32px;overflow:hidden;}
        .bg-decoration {position:absolute;width:150px;height:150px;border:2px solid #6366f1;border-radius:15px;opacity:0.08;transform:rotate(45deg);}
        .bg-decoration:nth-child(1) {top:-75px;left:-75px;animation:float 8s ease-in-out infinite;}
        .bg-decoration:nth-child(2) {bottom:-75px;right:-75px;animation:float 8s ease-in-out infinite reverse;}
        .bg-decoration:nth-child(3) {top:30%;right:-100px;animation:float 10s ease-in-out infinite;}
        @keyframes float {0%,100%{transform:rotate(45deg) translateY(0px);}50%{transform:rotate(45deg) translateY(-15px);}}
        .container {background:rgba(255,255,255,0.95);backdrop-filter:blur(15px);border-radius:25px;padding:40px;box-shadow:0 25px 50px rgba(0,0,0,0.1);border:1px solid rgba(255,255,255,0.3);width:100%;max-width:600px;position:relative;z-index:10;text-align:center;}
        .title {font-size:2.5rem;font-weight:bold;margin-bottom:20px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-transform:uppercase;letter-spacing:2px;}
        .subtitle {font-size:1.2rem;color:#6b7280;margin-bottom:30px;}
        .route-info {display:flex;justify-content:space-between;align-items:center;margin-bottom:30px;font-size:1.1rem;color:#4a5568;}
        .route-text {font-weight:600;}
        .price-text {font-weight:bold;color:#059669;font-size:1.3rem;}
        .ticket-container {background:linear-gradient(135deg,#f8fafc 0%,#e2e8f0 100%);border-radius:20px;padding:30px;margin:30px 0;border:2px solid #cbd5e0;position:relative;box-shadow:0 10px 25px rgba(0,0,0,0.1);}
        .ticket-header {display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;}
        .company-name {font-size:1.5rem;font-weight:bold;color:#2d3748;}
        .qr-code {width:80px;height:80px;background:#2d3748;border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-size:0.8rem;text-align:center;line-height:1.2;}
        .ticket-details {display:grid;grid-template-columns:1fr 1fr;gap:15px;text-align:left;}
        .detail-item {background:rgba(255,255,255,0.6);padding:15px;border-radius:10px;border:1px solid rgba(203,213,224,0.5);}
        .detail-label {font-size:0.9rem;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:5px;}
        .detail-value {font-size:1.1rem;font-weight:bold;color:#2d3748;}
        .ticket-dashed-line {border-top:2px dashed #cbd5e0;margin:25px -30px;position:relative;}
        .ticket-dashed-line::before,.ticket-dashed-line::after {content:'';position:absolute;top:-8px;width:16px;height:16px;background:linear-gradient(135deg,#f5f7fa 0%,#c3cfe2 100%);border-radius:50%;}
        .ticket-dashed-line::before {left:-8px;}
        .ticket-dashed-line::after {right:-8px;}
        .payment-info {margin-top:20px;padding:15px;background:rgba(16,185,129,0.1);border-radius:10px;border:1px solid rgba(16,185,129,0.2);}
        .payment-label {font-size:0.9rem;color:#6b7280;margin-bottom:5px;}
        .payment-value {font-size:1.1rem;font-weight:bold;color:#059669;}
        .button-group {display:flex;gap:20px;margin-top:40px;justify-content:center;}
        .btn {padding:15px 30px;border:none;border-radius:15px;font-size:1rem;font-weight:600;text-transform:uppercase;letter-spacing:1px;cursor:pointer;transition:all 0.3s ease;text-decoration:none;display:inline-block;}
        .btn-check {background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;box-shadow:0 8px 20px rgba(102,126,234,0.3);}
        .btn-check:hover {transform:translateY(-3px);box-shadow:0 12px 25px rgba(102,126,234,0.4);}
        .btn-back {background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:white;box-shadow:0 8px 20px rgba(245,158,11,0.3);}
        .btn-back:hover {transform:translateY(-3px);box-shadow:0 12px 25px rgba(245,158,11,0.4);}
        .btn:active {transform:translateY(0);}
        .success-icon {font-size:4rem;color:#10b981;margin-bottom:20px;animation:bounce 1s ease-in-out;}
        @keyframes bounce {0%,20%,50%,80%,100%{transform:translateY(0);}40%{transform:translateY(-10px);}60%{transform:translateY(-5px);}}
        @media (max-width:480px){.container{margin:10px;padding:25px 20px;}.title{font-size:2rem;}.ticket-details{grid-template-columns:1fr;}.button-group{flex-direction:column;align-items:center;}.btn{width:200px;}.ticket-header{flex-direction:column;gap:15px;}.qr-code{width:60px;height:60px;font-size:0.7rem;}}
        @media print {body{background:white;}.bg-decoration{display:none;}.container{box-shadow:none;border:1px solid #ddd;}.button-group{display:none;}}
      `}</style>
      <div className="payment-bg">
        <div className="bg-decoration"></div>
        <div className="bg-decoration"></div>
        <div className="bg-decoration"></div>
        <div className="container">
          <div className="success-icon">🎫</div>
          <h1 className="title">Thank You For Your Purchase</h1>
          <div className="subtitle">Your ticket has been successfully purchased!</div>
          <div className="route-info">
            <span className="route-text">
              Route: {stations[params.start]} &rarr; {stations[params.end]}
            </span>
            <span className="price-text">
              Price: {formatPrice(params.price)}
            </span>
          </div>
          <div className="ticket-container">
            <div className="ticket-header">
              <div className="company-name">MRT</div>
              <div className="qr-code">
                <div>
                  QR<br />
                  CODE
                </div>
              </div>
            </div>
            <div className="ticket-details">
              <div className="detail-item">
                <div className="detail-label">From</div>
                <div className="detail-value">{stations[params.start]}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">To</div>
                <div className="detail-value">{stations[params.end]}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Date</div>
                <div className="detail-value">{date}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Time</div>
                <div className="detail-value">{time}</div>
              </div>
            </div>
            <div className="ticket-dashed-line"></div>
            <div className="payment-info">
              <div className="payment-label">Payment Method</div>
              <div className="payment-value">
                {paymentMethods[params.payment]}
              </div>
            </div>
          </div>
          <div className="button-group">
            <button className="btn btn-check" onClick={handleCheckTicket}>
              CEK TIKET
            </button>
            <button className="btn btn-back" onClick={handleBack}>
              BACK
            </button>
          </div>
        </div>
      </div>
    </>
  );
}