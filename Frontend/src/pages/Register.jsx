import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Activity,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  BrainCircuit,
  GraduationCap,
  Stethoscope,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

import "../Auth.css";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!formData.terms) {
      alert("Please accept the terms and conditions.");
      return;
    }

    // Connect your existing backend registration API here.
    alert("Registration functionality will be connected with the backend.");
  };

  return (
    <main className="auth-page register-page">

      {/* LEFT SIDE - VISUAL PANEL */}

      <section className="auth-visual-section register-visual">

        <div className="auth-visual-background">

          <motion.div
            className="visual-orbit orbit-one"
            animate={{ rotate: 360 }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.div
            className="visual-orbit orbit-two"
            animate={{ rotate: -360 }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.div
            className="visual-orbit orbit-three"
            animate={{ rotate: 360 }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.div
            className="visual-center"
            animate={{
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
          >
            <Activity size={65} strokeWidth={1.5} />
          </motion.div>

          <motion.div
            className="floating-card floating-card-top"
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            <div className="floating-icon">
              <Stethoscope size={25} />
            </div>

            <div>
              <small>FOR DOCTORS</small>
              <strong>Smart Screening</strong>
              <span>AI-assisted assessment</span>
            </div>
          </motion.div>

          <motion.div
            className="floating-card floating-card-bottom"
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
          >
            <div className="floating-icon blue">
              <GraduationCap size={25} />
            </div>

            <div>
              <small>FOR STUDENTS</small>
              <strong>Learn & Explore</strong>
              <span>Understand DR stages</span>
            </div>
          </motion.div>

        </div>

        <motion.div
          className="auth-visual-content"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >

          <span className="visual-label">
            JOIN DRVISION
          </span>

          <h2>
            Your Journey Towards
            <br />
            Smarter <span>Eye Care.</span>
          </h2>

          <p>
            Create your account and explore AI-assisted
            retinal screening, patient management,
            and educational resources.
          </p>

          <div className="visual-features">

            <div className="visual-feature">
              <div className="visual-feature-icon">
                <Stethoscope size={22} />
              </div>

              <div>
                <strong>For Healthcare Professionals</strong>
                <span>Manage screening and patient records</span>
              </div>
            </div>

            <div className="visual-feature">
              <div className="visual-feature-icon">
                <GraduationCap size={22} />
              </div>

              <div>
                <strong>For Medical Students</strong>
                <span>Explore and learn about DR</span>
              </div>
            </div>

          </div>

          <div className="visual-footer">
            <ShieldCheck size={16} />
            Predict. Prepare. Protect.
          </div>

        </motion.div>

      </section>

      {/* RIGHT SIDE - REGISTER FORM */}

      <section className="auth-form-section">

        <motion.div
          className="auth-form-wrapper register-form-wrapper"
          initial={{ opacity: 0, x: 45 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          {/* Logo */}

          <Link to="/" className="auth-logo">
            <span className="auth-logo-icon">
              <Activity size={25} />
            </span>

            <span>
              DR<span>Vision</span>
            </span>
          </Link>

          {/* Heading */}

          <div className="auth-heading">
            <span className="auth-eyebrow">
              <Sparkles size={15} />
              GET STARTED
            </span>

            <h1>
              Create your <span>account.</span>
            </h1>

            <p>
              Join DRVision and access your personalized
              retinal screening portal.
            </p>
          </div>

          {/* Register Form */}

          <form onSubmit={handleSubmit} className="auth-form">

            {/* Full Name */}

            <div className="auth-field">
              <label htmlFor="fullName">Full Name</label>

              <div className="auth-input-wrapper">
                <User size={19} />

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email */}

            <div className="auth-field">
              <label htmlFor="registerEmail">Email Address</label>

              <div className="auth-input-wrapper">
                <Mail size={19} />

                <input
                  id="registerEmail"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Role */}

            <div className="auth-field">
              <label htmlFor="role">Professional Role</label>

              <div className="auth-input-wrapper">
                <GraduationCap size={19} />

                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select your professional role
                  </option>

                  <option value="Healthcare Professional">
                    Healthcare Professional
                  </option>

                  <option value="Medical Student">
                    Medical Student
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>
            </div>

            {/* Password */}

            <div className="auth-field">
              <label htmlFor="registerPassword">Password</label>

              <div className="auth-input-wrapper">
                <Lock size={19} />

                <input
                  id="registerPassword"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}

            <div className="auth-field">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <div className="auth-input-wrapper">
                <Lock size={19} />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}

            <label className="terms-option">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
              />

              <span>
                I agree to the platform terms and understand
                that DRVision provides AI-assisted screening,
                not a medical diagnosis.
              </span>
            </label>

            {/* Submit */}

            <motion.button
              type="submit"
              className="auth-submit"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Create Account

              <ArrowRight size={19} />
            </motion.button>

          </form>

          {/* Login Link */}

          <div className="auth-switch">
            Already have an account?

            <Link to="/login">
              Sign In
            </Link>
          </div>

          <Link to="/" className="auth-back">
            <ArrowLeft size={16} />
            Back to Home
          </Link>

        </motion.div>

      </section>

    </main>
  );
};

export default Register;