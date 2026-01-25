import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginApi from "../Api/LoginApi";

const SignInLayer = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ phoneNumber: "", pin: "" });
  const pinRefs = useRef([]);

  const handlePinChange = (index, value) => {
    if (isNaN(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setErrors((prev) => ({ ...prev, pin: "" }));

    if (value && index < 3) {
      pinRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      pinRefs.current[index - 1].focus();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Please enter your phone number";
    }
    const pinValue = pin.join("");
    if (pinValue.length !== 4) {
      newErrors.pin = "Please enter a complete 4-digit PIN";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const credentials = {
        phoneNumber: phoneNumber.trim(),
        pin: pinValue,
      };

      const result = await LoginApi.login(credentials);
      console.log("Login Result:", result); // Debugging log

      if (result.status) {
        // Handle potential token locations (direct or nested in data)
        const token =
          result.response.token ||
          result.response.data?.token ||
          result.response.accessToken;
        const user = result.response.user || result.response.data?.user;

        if (token) {
          localStorage.setItem("userToken", token);
          // Configure axios default immediately as well for redundancy
          // apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
          console.error("Token missing in response:", result.response);
          alert("Login successful but token missing from response.");
          setLoading(false);
          return;
        }

        if (user) {
          localStorage.setItem("userData", JSON.stringify(user));
        }

        // Small delay to ensure localStorage is set before navigation triggers new requests
        setTimeout(() => {
          navigate("/");
        }, 100);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="auth min-vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#C4161C" }}
    >
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .login-card {
            animation: fadeInUp 0.6s ease-out;
          }
        `}
      </style>

      <div
        className="login-card bg-white radius-16 p-32 p-sm-40 shadow-lg text-center mx-3"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <div className="mb-32">
          <Link to="/" className="d-inline-block mb-24">
            <img
              src="assets/images/logo.png"
              alt="Logo"
              style={{ maxHeight: "60px" }}
            />
          </Link>
          <h4 className="mb-12 fw-bold text-dark">Sign In</h4>
          <p className="text-secondary-light text-md">
            Enter your phone number and PIN to continue
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="icon-field mb-20 text-start">
            <label className="form-label text-secondary text-sm fw-medium mb-8">
              Phone Number
            </label>
            <div className="position-relative">
              <span className="icon top-50 translate-middle-y start-0 ms-3 text-secondary-light">
                <Icon icon="mage:phone" className="text-xl" />
              </span>
              <input
                type="tel"
                className="form-control h-56-px bg-neutral-50 radius-12 ps-5"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setErrors((prev) => ({ ...prev, phoneNumber: "" }));
                }}
                disabled={loading}
              />
            </div>
            {errors.phoneNumber && (
              <span className="text-danger text-sm mt-1">
                {errors.phoneNumber}
              </span>
            )}
          </div>

          <div className="mb-32 text-start">
            <label className="form-label text-secondary text-sm fw-medium mb-8">
              4-digit PIN
            </label>
            <div className="d-flex gap-12 justify-content-between">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (pinRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  className="form-control h-56-px bg-neutral-50 radius-12 text-center text-xl fw-bold border-2 focus-border-primary"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={loading}
                />
              ))}
            </div>
            {errors.pin && (
              <span className="text-danger text-sm mt-1">{errors.pin}</span>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-danger btn-lg w-100 radius-12 h-56-px fw-semibold"
            style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignInLayer;
