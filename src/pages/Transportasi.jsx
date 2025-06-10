import React, { useState } from "react";

export default function Transportasi({  })
{
  const [activeTicket, setActiveTicket] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false); // bisa ubah sesuai autentikasi

  const handleTicketClick = (idx) => {
    if (loggedIn) {
      setActiveTicket(idx);
    } else {
      alert("Silakan login untuk membuka tiket ini.");
    }
  };

  return (
    <div>
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
                img: "/assets/bticketKRL.png",
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
