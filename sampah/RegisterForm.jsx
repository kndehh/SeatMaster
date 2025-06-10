import React, { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    userId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [strength, setStrength] = useState("");
  const [requirements, setRequirements] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
  });

  // Validation helpers
  const validateUserId = (userId) => /^[a-zA-Z0-9_]{3,}$/.test(userId.trim());
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const validatePassword = (password) => ({
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  });
  const getPasswordStrength = (password) => {
    const req = validatePassword(password);
    const score = Object.values(req).filter(Boolean).length;
    if (score === 0) return "";
    if (score === 1) return "weak";
    if (score === 2) return "fair";
    if (score === 3) return "good";
    return "strong";
  };

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));

    // Real-time validation
    if (name === "userId") {
      if (!value) {
        setErrors((e) => ({ ...e, userId: "" }));
        setSuccess((s) => ({ ...s, userId: false }));
      } else if (validateUserId(value)) {
        setErrors((e) => ({ ...e, userId: "" }));
        setSuccess((s) => ({ ...s, userId: true }));
      } else {
        setErrors((e) => ({
          ...e,
          userId:
            "ID harus minimal 3 karakter dan hanya boleh huruf, angka, underscore",
        }));
        setSuccess((s) => ({ ...s, userId: false }));
      }
    }
    if (name === "email") {
      if (!value) {
        setErrors((e) => ({ ...e, email: "" }));
        setSuccess((s) => ({ ...s, email: false }));
      } else if (validateEmail(value)) {
        setErrors((e) => ({ ...e, email: "" }));
        setSuccess((s) => ({ ...s, email: true }));
      } else {
        setErrors((e) => ({
          ...e,
          email: "Format email tidak valid",
        }));
        setSuccess((s) => ({ ...s, email: false }));
      }
    }
    if (name === "password") {
      const req = validatePassword(value);
      setRequirements(req);
      setStrength(getPasswordStrength(value));
      setErrors((e) => ({ ...e, password: "" }));
      // Validate confirm password if filled
      if (form.confirmPassword) {
        if (form.confirmPassword === value) {
          setErrors((e) => ({ ...e, confirmPassword: "" }));
          setSuccess((s) => ({ ...s, confirmPassword: true }));
        } else {
          setErrors((e) => ({
            ...e,
            confirmPassword: "Password tidak cocok",
          }));
          setSuccess((s) => ({ ...s, confirmPassword: false }));
        }
      }
    }
    if (name === "confirmPassword") {
      if (!value) {
        setErrors((e) => ({ ...e, confirmPassword: "" }));
        setSuccess((s) => ({ ...s, confirmPassword: false }));
      } else if (value === form.password) {
        setErrors((e) => ({ ...e, confirmPassword: "" }));
        setSuccess((s) => ({ ...s, confirmPassword: true }));
      } else {
        setErrors((e) => ({
          ...e,
          confirmPassword: "Password tidak cocok",
        }));
        setSuccess((s) => ({ ...s, confirmPassword: false }));
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};
    let newSuccess = {};

    // User ID
    if (!form.userId) {
      newErrors.userId = "ID tidak boleh kosong";
      valid = false;
    } else if (form.userId.length < 3) {
      newErrors.userId = "ID minimal 3 karakter";
      valid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(form.userId)) {
      newErrors.userId = "ID hanya boleh huruf, angka, dan underscore";
      valid = false;
    } else {
      newSuccess.userId = true;
    }

    // Email
    if (!form.email) {
      newErrors.email = "Email tidak boleh kosong";
      valid = false;
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Format email tidak valid (contoh: user@domain.com)";
      valid = false;
    } else {
      newSuccess.email = true;
    }

    // Password
    const req = validatePassword(form.password);
    if (!form.password) {
      newErrors.password = "Password tidak boleh kosong";
      valid = false;
    } else if (!req.length) {
      newErrors.password = "Password minimal 8 karakter";
      valid = false;
    } else if (!req.upper) {
      newErrors.password = "Password harus ada huruf besar";
      valid = false;
    } else if (!req.lower) {
      newErrors.password = "Password harus ada huruf kecil";
      valid = false;
    } else if (!req.number) {
      newErrors.password = "Password harus ada angka";
      valid = false;
    }

    // Confirm Password
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password tidak boleh kosong";
      valid = false;
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok";
      valid = false;
    } else if (form.password && form.confirmPassword === form.password) {
      newSuccess.confirmPassword = true;
    }

    setErrors(newErrors);
    setSuccess(newSuccess);
    setRequirements(req);
    setStrength(getPasswordStrength(form.password));
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registering) return;
    if (validateForm()) {
      setRegistering(true);
      setTimeout(() => {
        setRegistered(true);
        setRegistering(false);
        setTimeout(() => {
          setRegistered(false);
          setForm({
            userId: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          setErrors({});
          setSuccess({});
          setStrength("");
          setRequirements({
            length: false,
            upper: false,
            lower: false,
            number: false,
          });
        }, 3000);
      }, 1500);
    }
  };

  // Password strength bar class
  let strengthClass = "";
  if (strength) strengthClass = `strength-${strength}`;

  return (
    <>
      <style>{`
        * {margin:0;padding:0;box-sizing:border-box;}
        body, .register-bg {font-family:'Arial',sans-serif;background:linear-gradient(135deg,#f5f7fa 0%,#c3cfe2 100%);min-height:100vh;display:flex;justify-content:center;align-items:center;position:relative;overflow:hidden;padding:20px 0;}
        .bg-decoration {position:absolute;width:200px;height:200px;border:3px solid #6366f1;border-radius:20px;opacity:0.1;transform:rotate(45deg);}
        .bg-decoration:nth-child(1) {top:-100px;left:-100px;animation:float 6s ease-in-out infinite;}
        .bg-decoration:nth-child(2) {bottom:-100px;right:-100px;animation:float 6s ease-in-out infinite reverse;}
        .bg-decoration:nth-child(3) {top:50%;left:-150px;transform:rotate(45deg) translateY(-50%);animation:float 8s ease-in-out infinite;}
        .bg-decoration:nth-child(4) {top:20%;right:-100px;animation:float 7s ease-in-out infinite;}
        @keyframes float {0%,100%{transform:rotate(45deg) translateY(0px);}50%{transform:rotate(45deg) translateY(-20px);}}
        .container {background:rgba(255,255,255,0.95);backdrop-filter:blur(10px);border-radius:20px;padding:40px;box-shadow:0 20px 40px rgba(0,0,0,0.1);border:1px solid rgba(255,255,255,0.2);width:100%;max-width:450px;position:relative;z-index:10;}
        .title {font-size:2.5rem;font-weight:bold;text-align:center;margin-bottom:30px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-transform:uppercase;letter-spacing:2px;text-shadow:0 2px 4px rgba(0,0,0,0.1);}
        .register-title {font-size:1.5rem;font-weight:bold;text-align:center;margin-bottom:30px;color:#4a5568;text-transform:uppercase;letter-spacing:1px;}
        .form-group {margin-bottom:20px;}
        .form-group label {display:block;margin-bottom:8px;font-weight:600;color:#4a5568;text-transform:uppercase;font-size:0.9rem;letter-spacing:0.5px;}
        .input-container {position:relative;}
        .form-group input {width:100%;padding:15px 20px;border:2px solid #e2e8f0;border-radius:12px;font-size:1rem;background:#f8fafc;color:#4a5568;transition:all 0.3s ease;outline:none;}
        .form-group input:focus {border-color:#6366f1;background:#fff;box-shadow:0 0 0 3px rgba(99,102,241,0.1);}
        .form-group input.error {border-color:#ef4444;background:#fef2f2;}
        .form-group input.success {border-color:#10b981;background:#f0fdf4;}
        .password-toggle {position:absolute;right:15px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#6b7280;font-size:1.2rem;transition:color 0.3s ease;}
        .password-toggle:hover {color:#6366f1;}
        .error-message {color:#ef4444;font-size:0.85rem;margin-top:5px;}
        .success-message-inline {color:#10b981;font-size:0.85rem;margin-top:5px;}
        .register-btn {width:100%;padding:15px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;border:none;border-radius:12px;font-size:1.1rem;font-weight:600;text-transform:uppercase;letter-spacing:1px;cursor:pointer;transition:all 0.3s ease;box-shadow:0 4px 15px rgba(102,126,234,0.3);margin-top:10px;}
        .register-btn:hover {transform:translateY(-2px);box-shadow:0 6px 20px rgba(102,126,234,0.4);}
        .register-btn:active {transform:translateY(0);}
        .register-btn:disabled {opacity:0.7;cursor:not-allowed;transform:none;}
        .login-link {text-align:center;margin-top:25px;color:#6b7280;}
        .login-link a {color:#6366f1;text-decoration:none;font-weight:600;transition:color 0.3s ease;}
        .login-link a:hover {color:#4f46e5;text-decoration:underline;}
        .success-message {background:#f0fdf4;border:1px solid #bbf7d0;color:#166534;padding:12px;border-radius:8px;margin-bottom:20px;text-align:center;}
        .password-strength {margin-top:8px;height:4px;background:#e5e7eb;border-radius:2px;overflow:hidden;}
        .password-strength-bar {height:100%;transition:all 0.3s ease;width:0%;}
        .strength-weak {background:#ef4444;width:25%;}
        .strength-fair {background:#f59e0b;width:50%;}
        .strength-good {background:#3b82f6;width:75%;}
        .strength-strong {background:#10b981;width:100%;}
        .password-requirements {font-size:0.8rem;color:#6b7280;margin-top:5px;line-height:1.4;}
        .requirement {display:block;}
        .requirement.met {color:#10b981;}
        @media (max-width:480px){.container{margin:20px;padding:30px 25px;}.title{font-size:2rem;}}
      `}</style>
      <div className="register-bg">
        <div className="bg-decoration"></div>
        <div className="bg-decoration"></div>
        <div className="bg-decoration"></div>
        <div className="bg-decoration"></div>
        <div className="container">
          <h1 className="title">SEAT MASTER</h1>
          {registered && (
            <div className="success-message">
              Registrasi berhasil! Redirecting to login...
            </div>
          )}
          <h2 className="register-title">REGISTER</h2>
          {!registered && (
            <form id="registerForm" onSubmit={handleSubmit} autoComplete="off">
              <div className="form-group">
                <label htmlFor="userId">ID</label>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  placeholder="Masukkan ID unik Anda"
                  value={form.userId}
                  onChange={handleChange}
                  className={
                    errors.userId
                      ? "error"
                      : success.userId
                        ? "success"
                        : undefined
                  }
                />
                {errors.userId && (
                  <div className="error-message">{errors.userId}</div>
                )}
                {success.userId && (
                  <div className="success-message-inline">✓ ID tersedia</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">EMAIL</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Masukkan email Anda"
                  value={form.email}
                  onChange={handleChange}
                  className={
                    errors.email
                      ? "error"
                      : success.email
                        ? "success"
                        : undefined
                  }
                />
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
                {success.email && (
                  <div className="success-message-inline">✓ Email valid</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">PASSWORD</label>
                <div className="input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Masukkan password"
                    value={form.password}
                    onChange={handleChange}
                    className={errors.password ? "error" : undefined}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label="Toggle password"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                <div className="password-strength">
                  <div
                    className={`password-strength-bar ${strengthClass}`}
                  ></div>
                </div>
                <div className="password-requirements" id="passwordRequirements">
                  <span
                    className={`requirement${requirements.length ? " met" : ""}`}
                  >
                    • Minimal 8 karakter
                  </span>
                  <span
                    className={`requirement${requirements.upper ? " met" : ""}`}
                  >
                    • Minimal 1 huruf besar
                  </span>
                  <span
                    className={`requirement${requirements.lower ? " met" : ""}`}
                  >
                    • Minimal 1 huruf kecil
                  </span>
                  <span
                    className={`requirement${requirements.number ? " met" : ""}`}
                  >
                    • Minimal 1 angka
                  </span>
                </div>
                {errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
                <div className="input-container">
                  <input
                    type={showConfirm ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Konfirmasi password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={
                      errors.confirmPassword
                        ? "error"
                        : success.confirmPassword
                          ? "success"
                          : undefined
                    }
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    tabIndex={-1}
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label="Toggle confirm password"
                  >
                    {showConfirm ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="error-message">{errors.confirmPassword}</div>
                )}
                {success.confirmPassword && (
                  <div className="success-message-inline">✓ Password cocok</div>
                )}
              </div>
              <button
                type="submit"
                className="register-btn"
                id="registerBtn"
                disabled={registering}
              >
                {registering ? "REGISTERING..." : "REGISTER"}
              </button>
            </form>
          )}
          <div className="login-link">
            Already have an account?
            <br />
            <a href="/login">Login Here!</a>
          </div>
        </div>
      </div>
    </>
  );
}