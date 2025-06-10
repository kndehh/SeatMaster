import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./components/Login.css";

export default function Login() {
  const [form, setForm] = useState({ userId: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loggingIn, setLoggingIn] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Input focus effect
  const [focus, setFocus] = useState({ userId: false, password: false });

  function validateUserId(userId) {
    return userId.trim().length > 0;
  }
  function validatePassword(password) {
    return password.length >= 6;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: undefined }));
  }

  function handleFocus(e) {
    setFocus((f) => ({ ...f, [e.target.name]: true }));
  }
  function handleBlur(e) {
    setFocus((f) => ({ ...f, [e.target.name]: false }));
  }

  function validateForm() {
    let valid = true;
    let newErrors = {};
    if (!validateUserId(form.userId)) {
      newErrors.userId = "ID tidak boleh kosong";
      valid = false;
    }
    if (!validatePassword(form.password)) {
      newErrors.password = "Password minimal 6 karakter";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    setLoggingIn(true);

    // Ambil user dari localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.userId === form.userId && u.password === form.password
    );
    setTimeout(() => {
      if (user) {
        localStorage.setItem("loggedInUser", form.userId);
        setSuccess(true);
        setLoggingIn(false);
        setTimeout(() => {
          setSuccess(false);
          setForm({ userId: "", password: "" });
          navigate("/");
        }, 1200);
      } else {
        setErrors({ password: "ID atau password salah" });
        setLoggingIn(false);
      }
    }, 800);
  }

  return (
    <>
      <div className="login-bg">
        <div className="bg-decoration"></div>
        <div className="bg-decoration"></div>
        <div className="bg-decoration"></div>
        <div className="container">
          <h1 className="titleLo">SEAT MASTER</h1>
          {success && (
            <div className="success-message">
              Login berhasil! Redirecting...
            </div>
          )}
          <h2 className="login-title">LOGIN</h2>
          {!success && (
            <form id="loginForm" onSubmit={handleSubmit} autoComplete="off">
              <div
                className={
                  "form-group" + (focus.userId ? " focused" : "")
                }
              >
                <label htmlFor="userId">ID</label>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  placeholder="Masukkan ID Anda"
                  value={form.userId}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={errors.userId ? "error" : ""}
                  autoComplete="username"
                />
                {errors.userId && (
                  <div className="error-message">{errors.userId}</div>
                )}
              </div>
              <div
                className={
                  "form-group" + (focus.password ? " focused" : "")
                }
              >
                <label htmlFor="password">PASSWORD</label>
                <div className="input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Masukkan Password"
                    value={form.password}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={errors.password ? "error" : ""}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                    aria-label="Toggle password"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>
              <button
                type="submit"
                className="login-btn"
                id="loginBtn"
                disabled={loggingIn}
              >
                {loggingIn ? "LOGGING IN..." : "LOGIN"}
              </button>
            </form>
          )}
          <div className="register-link">
            Not Register Yet?
            <br />
            <Link to="/register" id="registerLink">
              Register Here!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}