import React from 'react';
import './landing.css'; // Assuming you have a CSS file for styles

const Index = () => {
  const logout = () => {
    // Implement logout functionality
  };

  return (
    <div>
      {/* Login Status (hidden by default) */}
      <div className="login-status" id="loginStatus" style={{ display: 'none' }}>
        <span>Logged in as: <strong id="username">User</strong></span>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      {/* Header */}
      <header className="header">
        <div className="nav-container">
          <a href="#" className="logo">SEAT MASTER</a>
          <nav>
            <ul className="nav-menu" id="navMenu">
              <li><a href="#transportasi">Transportasi</a></li>
              <li><a href="#route">Route</a></li>
              <li><a href="#ticket">Capacity</a></li>
              <li><a href="/BuyTicket/BuyTicket.html">Buy Ticket</a></li>
            </ul>
          </nav>
          <a href="./login.html" className="login-btn">LOGIN</a>
          <div className="hamburger" id="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Connecting All your transportation</h1>
          <div className="transport-showcase">
            <div className="transportVehicle">
              <img src="../public/assets/hero.jpg" alt="" />
            </div>
          </div>
          <p className="tagline">Connecting All Your Transportation</p>
        </div>
      </section>

      {/* Weather Section */}
      <section className="weather-section">
        <div className="weather-info">
          <p>Recent Weather at Lebak Bulus: ☀️ Sunny, 32°C (15:21, Sunday, 15 March 2025)</p>
        </div>
      </section>

      {/* Transportasi Section */}
      <section className="transportasi" id="transportasi">
        <div className="section-content">
          <h2 className="section-title">Transportasi</h2>
          <div className="transport-grid">
            <div className="transport-card">
              <div className="card-image mrt">
                <img src="../public/assets/mrt.png" alt="mrt" />
              </div>
              <div className="card-content">
                <h3 className="card-title">MRT</h3>
              </div>
            </div>
            <div className="transport-card">
              <a href="./pageLRT.html" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card-image lrt">
                  <img src="../public/assets/lrt.png" alt="lrt" />
                </div>
                <div className="card-content">
                  <h3 className="card-title">LRT</h3>
                </div>
              </a>
            </div>
            <div className="transport-card">
              <div className="card-image krl">
                <img src="../public/assets/krl.png" alt="krl" />
              </div>
              <div className="card-content">
                <h3 className="card-title">KRL</h3>
              </div>
            </div>
            <div className="transport-card">
              <div className="card-image transjakarta">
                <img src="../public/assets/tj.png" alt="transjakarta" />
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
      <div className="help-section">
        <a href="./Cs.html" className="help-btn">
          Need Help?
          <img src="../public/assets/customer services.png" alt="" />
        </a>
      </div>

      {/* Route Section */}
      <section className="route-section" id="route">
        <div className="section-content">
          <h2 className="route-title">Route</h2>
          <div className="route-maps">
            <div className="route-map">
              <div className="map-image">
                <div className="map-lines"></div>
                <img src="../public/assets/minimap%20mrt.png" alt="mrt map" />
              </div>
              <div className="map-label">MRT</div>
            </div>
            <div className="route-map">
              <div className="map-image">
                <div className="map-lines"></div>
                <img src="../public/assets/minimap%20lrt.png" alt="" />
              </div>
              <div className="map-label">LRT</div>
            </div>
            <div className="route-map">
              <div className="map-image">
                <div className="map-lines"></div>
                <img src="../public/assets/minimap%20krl.png" alt="" />
              </div>
              <div className="map-label">KRL</div>
            </div>
            <div className="route-map">
              <div className="map-image">
                <div className="map-lines"></div>
                <img src="../public/assets/minimap%20tije.png" alt="" />
              </div>
              <div className="map-label">Trans Jakarta</div>
            </div>
          </div>
        </div>
      </section>

      {/* Buy Ticket Section */}
      <section className="ticket-section" id="ticket">
        <div className="section-content">
          <h2 className="ticket-title">Buy Ticket</h2>
          <div className="ticket-options">
            <div className="ticket-card">
              <div className="ticket-card locked-content">
                <div>
                  <h3>MRT Ticket</h3>
                  <img src="../public/assets/bticketMRT.png" alt="mrt ticket" />
                </div>
                <div className="lock-overlay">
                  <div className="lock-icon">🔒</div>
                  <div className="lock-text">Content Locked</div>
                </div>
              </div>
              <div className="ticket-card locked-content">
                <div>
                  <h3>LRT Ticket</h3>
                  <img src="../public/assets/bticketLRT.png" alt="lrt ticket" />
                </div>
                <div className="lock-overlay">
                  <div className="lock-icon">🔒</div>
                  <div className="lock-text">Content Locked</div>
                </div>
              </div>
              <div className="ticket-card locked-content">
                <div>
                  <h3>KRL Ticket</h3>
                </div>
                <div className="lock-overlay"></div>
              </div>
              <div className="ticket-card locked-content">
                <div></div>
                <div className="lock-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script src="landing.js"></script>
    </div>
  );
};

export default Index;