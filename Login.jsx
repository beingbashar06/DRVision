import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Activity,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  BrainCircuit,
  ScanEye,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  HeartPulse,
} from "lucide-react";

import "../Auth.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Connect your existing backend login API here.
    alert("Login functionality will be connected with the backend.");
  };

  const features = [
    {
      icon: ScanEye,
      title: "Intelligent Screening",
      description: "AI-assisted retinal image analysis",
    },
    {
      icon: ShieldCheck,
      title: "Patient Management",
      description: "Secure and organized patient records",
    },
    {
      icon: BrainCircuit,
      title: "Explainable AI",
      description: "Understand predictions with Grad-CAM",
    },
  ];

  return (
    <main className="auth-page">

      {/* LEFT SIDE - LOGIN FORM */}

      <section className="auth-form-section">

        <motion.div
          className="auth-form-wrapper"
          initial={{ opacity: 0, x: -45 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
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

          <motion.div
            className="auth-heading"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <span className="auth-eyebrow">
              <Sparkles size={15} />
              WELCOME BACK
            </span>

            <h1>
              Sign in to your <span>portal.</span>
            </h1>

            <p>
              Welcome back! Access your intelligent retinal
              screening platform and manage your patient records.
            </p>
          </motion.div>

          {/* Form */}

          <motion.form
            onSubmit={handleSubmit}
            className="auth-form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >

            <div className="auth-field">
              <label htmlFor="email">Email Address</label>

              <div className="auth-input-wrapper">
                <Mail size={19} />

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <div className="auth-field">

              <div className="auth-label-row">
                <label htmlFor="password">Password</label>

                <Link to="/forgot-password">
                  Forgot Password?
                </Link>
              </div>

              <div className="auth-input-wrapper">
                <Lock size={19} />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}

            <div className="auth-options">

              <label className="remember-option">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />

                <span>Remember me</span>
              </label>

              <span className="secure-login">
                <ShieldCheck size={15} />
                Secure Login
              </span>

            </div>

            {/* Submit */}

            <motion.button
              type="submit"
              className="auth-submit"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Sign In

              <ArrowRight size={19} />
            </motion.button>

          </motion.form>

          {/* Register Link */}

          <motion.div
            className="auth-switch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Don't have an account?

            <Link to="/register">
              Create Account
            </Link>
          </motion.div>

          {/* Free Screening */}

          <motion.div
            className="auth-free-screening"
            whileHover={{ scale: 1.015 }}
          >
            <div>
              <ScanEye size={22} />

              <div>
                <strong>Just want to check a retinal image?</strong>

                <p>
                  Try our screening tool without registration.
                </p>
              </div>
            </div>

            <Link to="/screening">
              Try Free Screening
              <ArrowRight size={17} />
            </Link>
          </motion.div>

          <Link to="/" className="auth-back">
            <ArrowLeft size={16} />
            Back to Home
          </Link>

        </motion.div>

      </section>

      {/* RIGHT SIDE - ANIMATED MEDICAL PANEL */}

      <section className="auth-visual-section">

        <div className="auth-visual-background">

          {/* Animated Rings */}

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

          {/* Central Medical Icon */}

          <motion.div
            className="visual-center"
            animate={{
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <HeartPulse size={65} strokeWidth={1.5} />
          </motion.div>

          {/* Floating Cards */}

          <motion.div
            className="floating-card floating-card-top"
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="floating-icon">
              <BrainCircuit size={25} />
            </div>

            <div>
              <small>AI FRAMEWORK</small>
              <strong>ResNet50</strong>
              <span>Deep learning model</span>
            </div>
          </motion.div>

          <motion.div
            className="floating-card floating-card-bottom"
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="floating-icon blue">
              <ScanEye size={25} />
            </div>

            <div>
              <small>SCREENING SYSTEM</small>
              <strong>5 DR Stages</strong>
              <span>Severity classification</span>
            </div>
          </motion.div>

          <motion.div
            className="floating-status"
            animate={{ x: [0, 8, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            <Sparkles size={16} />
            Explainable AI
          </motion.div>

        </div>

        {/* Branding Content */}

        <motion.div
          className="auth-visual-content"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
        >
          <span className="visual-label">
            YOUR SCREENING PORTAL
          </span>

          <h2>
            Better Insights.
            <br />
            Brighter <span>Vision.</span>
          </h2>

          <p>
            Access intelligent retinal screening tools,
            manage patient records, and explore AI-assisted
            insights in one place.
          </p>

          <div className="visual-features">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  className="visual-feature"
                  key={feature.title}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.6 + index * 0.15,
                  }}
                >
                  <div className="visual-feature-icon">
                    <Icon size={22} />
                  </div>

                  <div>
                    <strong>{feature.title}</strong>
                    <span>{feature.description}</span>
                  </div>
                </motion.div>
              );
            })}

          </div>

          <div className="visual-footer">
            <Activity size={16} />
            AI Assists. Doctors Decide.
          </div>

        </motion.div>

      </section>

    </main>
  );
};

export default Login;