import React, { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ userId: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loggingIn, setLoggingIn] = useState(false);
  const [success, setSuccess] = useState(false);

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
    setTimeout(() => {
      setSuccess(true);
      setLoggingIn(false);
      setTimeout(() => {
        setSuccess(false);
        setForm({ userId: "", password: "" });
      }, 2000);
    }, 1000);
  }

  return (
    <>
      <style>{`
        * {margin:0;padding:0;box-sizing:border-box;}
        body, .login-bg {font-family:'Arial',sans-serif;background:linear-gradient(135deg,#f5f7fa 0%,#c3cfe2 100%);min-height:100vh;display:flex;justify-content:center;align-items:center;position:relative;overflow:hidden;}
        .bg-decoration {position:absolute;width:200px;height:200px;border:3px solid #6366f1;border-radius:20px;opacity:0.1;transform:rotate(45deg);}
        .bg-decoration:nth-child(1) {top:-100px;left:-100px;animation:float 6s ease-in-out infinite;}
        .bg-decoration:nth-child(2) {bottom:-100px;right:-100px;animation:float 6s ease-in-out infinite reverse;}
        .bg-decoration:nth-child(3) {top:50%;left:-150px;transform:rotate(45deg) translateY(-50%);animation:float 8s ease-in-out infinite;}
        @keyframes float {0%,100%{transform:rotate(45deg) translateY(0px);}50%{transform:rotate(45deg) translateY(-20px);}}
        .container {background:rgba(255,255,255,0.95);backdrop-filter:blur(10px);border-radius:20px;padding:40px;box-shadow:0 20px 40px rgba(0,0,0,0.1);border:1px solid rgba(255,255,255,0.2);width:100%;max-width:400px;position:relative;z-index:10;}
        .title {font-size:2.5rem;font-weight:bold;text-align:center;margin-bottom:40px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-transform:uppercase;letter-spacing:2px;text-shadow:0 2px 4px rgba(0,0,0,0.1);}
        .login-title {font-size:1.5rem;font-weight:bold;text-align:center;margin-bottom:30px;color:#4a5568;text-transform:uppercase;letter-spacing:1px;}
        .form-group {margin-bottom:25px;transition:transform 0.2s;}
        .form-group.focused {transform:scale(1.02);}
        .form-group label {display:block;margin-bottom:8px;font-weight:600;color:#4a5568;text-transform:uppercase;font-size:0.9rem;letter-spacing:0.5px;}
        .input-container {position:relative;}
        .form-group input {width:100%;padding:15px 20px;border:2px solid #e2e8f0;border-radius:12px;font-size:1rem;background:#f8fafc;color:#4a5568;transition:all 0.3s ease;outline:none;}
        .form-group input:focus {border-color:#6366f1;background:#fff;box-shadow:0 0 0 3px rgba(99,102,241,0.1);}
        .form-group input.error {border-color:#ef4444;background:#fef2f2;}
        .password-toggle {position:absolute;right:15px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#6b7280;font-size:1.2rem;transition:color 0.3s ease;}
        .password-toggle:hover {color:#6366f1;}
        .error-message {color:#ef4444;font-size:0.85rem;margin-top:5px;}
        .login-btn {width:100%;padding:15px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;border:none;border-radius:12px;font-size:1.1rem;font-weight:600;text-transform:uppercase;letter-spacing:1px;cursor:pointer;transition:all 0.3s ease;box-shadow:0 4px 15px rgba(102,126,234,0.3);}
        .login-btn:hover {transform:translateY(-2px);box-shadow:0 6px 20px rgba(102,126,234,0.4);}
        .login-btn:active {transform:translateY(0);}
        .login-btn:disabled {opacity:0.7;cursor:not-allowed;transform:none;}
        .register-link {text-align:center;margin-top:25px;color:#6b7280;}
        .register-link a {color:#6366f1;text-decoration:none;font-weight:600;transition:color 0.3s ease;}
        .register-link a:hover {color:#4f46e5;text-decoration:underline;}
        .success-message {background:#f0fdf4;border:1px solid #bbf7d0;color:#166534;padding:12px;border-radius:8px;margin-bottom:20px;text-align:center;}
        @media (max-width:480px){.container{margin:20px;padding:30px 25px;}.title{font-size:2rem;}}
      `}</style>
      <div className="login-bg">
        <div className="bg-decoration"></div>
        <div className="bg-decoration"></div>
        <div className="bg-decoration"></div>
        <div className="container">
          <h1 className="title">SEAT MASTER</h1>
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
            <a href="Regist.HTML" id="registerLink">
              Register Here!
            </a>
          </div>
        </div>
      </div>
    </>
  );
}