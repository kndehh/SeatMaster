import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Transportasi({
  loggedIn: parentLoggedIn,
  activeTicket: parentActiveTicket,
  onTicketClick,
}) {
  const [activeTicket, setActiveTicket] = useState(parentActiveTicket ?? null);
  const [loggedIn, setLoggedIn] = useState(parentLoggedIn ?? false);
  const [userId, setUserId] = useState("User");
  const navigate = useNavigate();

  useEffect(() => {
    if (parentLoggedIn !== undefined) setLoggedIn(parentLoggedIn);
    if (parentActiveTicket !== undefined) setActiveTicket(parentActiveTicket);
  }, [parentLoggedIn, parentActiveTicket]);

  useEffect(() => {
    if (parentLoggedIn === undefined) {
      const storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        setLoggedIn(true);
        setUserId(storedUser);
      } else {
        setLoggedIn(false);
        setUserId("User");
      }
    }
  }, [parentLoggedIn]);

  function handleTicketClick(idx) {
    if (onTicketClick) {
      onTicketClick(idx);
    } else {
      if (!loggedIn) {
        alert("Please login first to access ticket purchasing.");
        navigate("/login");
      } else {
        setActiveTicket(idx);
        alert("Relocating to Dummy Fastest Route.");
        navigate("FastestRoute");
      }
    }
  }

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
                  "ticket-card" +
                  (activeTicket === idx ? " active-ticket" : "") +
                  (!loggedIn ? " locked-content" : "") +
                  (loggedIn ? " unlocked" : "")
                }
                onClick={() => handleTicketClick(idx)}
                style={{ cursor: "pointer" }}
              >
                <div>
                  <h3>{ticket.title}</h3>
                  <img src={ticket.img} alt={ticket.title.toLowerCase()} />
                </div>
                {/* Lock overlay hanya muncul jika belum login */}
                {!loggedIn && (
                  <div className="lock-overlay">
                    <div className="lock-icon">🔒</div>
                    <div className="lock-text">Content Locked</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
