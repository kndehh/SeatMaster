// filepath: d:\Binus\SEMESTER 2\HCI\HCI AOL\seatmaster-app\src\App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import BuyTicket from "./BuyTicket";
import CustomerService from "./CustomerService";
import FastestRoute from "./FastestRoute";
import Payment from "./Payment";
import Login from "./login.jsx";
import Register from "./register.jsx";
import PageLRT from "./lrtPage.jsx";
// import halaman lain sesuai kebutuhan

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy-ticket" element={<BuyTicket />} />
        <Route path="/customer-service" element={<CustomerService />} />
        <Route path="FastestRoute" element={<FastestRoute />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lrt" element={<PageLRT />} />
      </Routes>
    </Router>
  );
}
