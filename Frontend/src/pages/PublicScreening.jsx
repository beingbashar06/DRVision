import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  Activity,
  Upload,
  X,
  FileImage,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  ScanEye,
  RefreshCw,
  LockKeyhole,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Eye,
  Microscope,
  BrainCircuit,
  HeartPulse,
  Zap,
  FileCheck2,
  UserRound,
} from "lucide-react";

import "./Screening.css";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const PublicScreening = () => {
  const fileInputRef = useRef(null);
  const previewRef = useRef(null);
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");

  useEffect(() => {
    return () => {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
      }
    };
  }, []);

  const handleFile = (file) => {
    setError("");

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a JPG, JPEG or PNG image.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10 MB.");
      return;
    }

    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
    }

    const imageUrl = URL.createObjectURL(file);

    previewRef.current = imageUrl;

    setSelectedFile(file);
    setPreview(imageUrl);
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      handleFile(file);
    }

    e.target.value = "";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();

    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const removeImage = () => {
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
      previewRef.current = null;
    }

    setSelectedFile(null);
    setPreview(null);
    setError("");
  };

  const handleAnalyze = () => {
    if (!selectedFile) {
      setError("Please upload a retinal image first.");
      return;
    }

    navigate("/screening/results", {
      state: {
        file: selectedFile,
        patientName: patientName.trim() || "Walk-in Patient",
        patientId: patientId.trim() || "Not linked",
      },
    });
  };

  const features = [
    {
      icon: ShieldCheck,
      title: "Secure Upload",
      description: "A simple and privacy-conscious upload experience.",
    },
    {
      icon: BrainCircuit,
      title: "AI-Assisted Analysis",
      description: "Deep learning-based retinal image assessment.",
    },
    {
      icon: FileCheck2,
      title: "Clear Results",
      description: "View preliminary screening insights and explanations.",
    },
  ];

  return (
    <div className="screening-page">

      {/* NAVIGATION */}

      <nav className="screening-navbar">

        <div className="screening-nav-inner">

          <Link to="/" className="screening-brand">

            <div className="screening-brand-icon">
              <Activity size={25} />
            </div>

            <span>
              DR<span>Vision</span>
            </span>

          </Link>

          <div className="screening-nav-right">

            <Link to="/" className="screening-home-link">
              <ArrowLeft size={16} />
              Back to Home
            </Link>

            <Link to="/login" className="screening-login">
              Login
            </Link>

            <Link to="/register" className="screening-nav-cta">
              Create Account
              <ArrowRight size={16} />
            </Link>

          </div>

        </div>

      </nav>

      {/* MAIN SECTION */}

      <main className="screening-main">

        <div className="screening-background-orb orb-one" />
        <div className="screening-background-orb orb-two" />

        <div className="screening-layout">

          {/* LEFT INFORMATION PANEL */}

          <motion.section
            className="screening-intro"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.13,
                },
              },
            }}
          >

            <motion.div variants={fadeUp}>
              <span className="screening-eyebrow">
                <span className="live-indicator" />
                AI-POWERED RETINAL SCREENING
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp}>
              A clearer view.
              <br />
              <span>Smarter screening.</span>
              <br />
              Better insights.
            </motion.h1>

            <motion.p
              className="screening-intro-description"
              variants={fadeUp}
            >
              Upload a retinal fundus image and experience
              AI-assisted diabetic retinopathy screening.
              Designed to support doctors with meaningful
              preliminary insights.
            </motion.p>

            {/* MEDICAL VISUAL */}

            <motion.div
              className="retinal-visual"
              variants={fadeUp}
            >

              <div className="retinal-orbit orbit-a" />
              <div className="retinal-orbit orbit-b" />
              <div className="retinal-orbit orbit-c" />

              <motion.div
                className="retinal-core"
                animate={{
                  scale: [1, 1.04, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="retinal-core-inner">
                  <Eye size={57} strokeWidth={1.3} />
                  <span>RETINAL ANALYSIS</span>
                </div>
              </motion.div>

              <motion.div
                className="retinal-scan-line"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="retinal-floating-card card-ai">
                <BrainCircuit size={20} />
                <div>
                  <strong>AI Analysis</strong>
                  <span>Deep learning</span>
                </div>
              </div>

              <div className="retinal-floating-card card-eye">
                <ScanEye size={20} />
                <div>
                  <strong>Image Screening</strong>
                  <span>Retinal assessment</span>
                </div>
              </div>

            </motion.div>

            {/* FEATURE LIST */}

            <motion.div
              className="screening-benefits"
              variants={fadeUp}
            >

              <div>
                <ShieldCheck size={19} />
                Secure experience
              </div>

              <div>
                <Microscope size={19} />
                AI-assisted analysis
              </div>

              <div>
                <Zap size={19} />
                Simple workflow
              </div>

            </motion.div>

            <motion.div
              className="screening-medical-note"
              variants={fadeUp}
            >
              <HeartPulse size={19} />

              <p>
                AI assists. Doctors decide.
                <span>
                  Designed for preliminary screening support,
                  not medical diagnosis.
                </span>
              </p>

            </motion.div>

          </motion.section>

          {/* RIGHT UPLOAD PANEL */}

          <motion.section
            className="screening-workspace"
            initial={{ opacity: 0, x: 45 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: "easeOut",
            }}
          >

            <div className="workspace-card">

              {/* HEADER */}

              <div className="workspace-header">

                <div>
                  <span className="workspace-label">
                    SCREENING WORKSPACE
                  </span>

                  <h2>
                    Upload retinal image
                  </h2>

                  <p>
                    Start your screening in a few simple steps.
                  </p>
                </div>

                <div className="workspace-header-icon">
                  <ScanEye size={26} />
                </div>

              </div>

              {/* PROGRESS */}

              <div className="screening-progress">

                <div className="progress-step active">
                  <span>01</span>
                  <div>
                    <strong>Upload</strong>
                    <small>Select image</small>
                  </div>
                </div>

                <div className="progress-line" />

                <div className="progress-step">
                  <span>02</span>
                  <div>
                    <strong>Analysis</strong>
                    <small>AI assessment</small>
                  </div>
                </div>

                <div className="progress-line" />

                <div className="progress-step">
                  <span>03</span>
                  <div>
                    <strong>Results</strong>
                    <small>View insights</small>
                  </div>
                </div>

              </div>

              {/* PATIENT INFORMATION */}

              <motion.section
                className="screening-patient-details"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.45 }}
              >
                <div className="screening-patient-heading">
                  <div className="screening-patient-icon">
                    <UserRound size={20} />
                  </div>
                  <div>
                    <h3>Patient information</h3>
                    <p>Link this screening to a patient record (optional).</p>
                  </div>
                </div>

                <div className="screening-patient-fields">
                  <label>
                    <span>Patient name</span>
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Enter patient name"
                      autoComplete="off"
                    />
                  </label>

                  <label>
                    <span>Patient ID</span>
                    <input
                      type="text"
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                      placeholder="Enter patient ID (optional)"
                      autoComplete="off"
                    />
                  </label>
                </div>
                <p className="screening-patient-hint">
                  If left blank, this screening will be saved as a walk-in patient.
                </p>
              </motion.section>

              {/* FILE INPUT */}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                onChange={handleFileChange}
                className="screening-hidden-input"
              />

              {/* UPLOAD AREA */}

              <AnimatePresence mode="wait">

                {!preview ? (

                  <motion.div
                    key="upload"
                    className={`screening-dropzone ${
                      dragActive ? "drag-active" : ""
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleBrowse}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleBrowse();
                      }
                    }}
                  >

                    <motion.div
                      className="upload-icon-wrapper"
                      animate={{
                        y: [0, -9, 0],
                        rotate: [0, -3, 3, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Upload size={34} />
                    </motion.div>

                    <h3>
                      {dragActive
                        ? "Drop your image here"
                        : "Drag & Drop your image"}
                    </h3>

                    <p>
                      Drag your retinal image here or browse
                      your device.
                    </p>

                    <button
                      type="button"
                      className="browse-file-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBrowse();
                      }}
                    >
                      <FileImage size={18} />
                      Browse Files
                    </button>

                    <div className="upload-formats">

                      <span>JPG</span>
                      <span>JPEG</span>
                      <span>PNG</span>

                      <i />

                      <span>Maximum 10 MB</span>

                    </div>

                  </motion.div>

                ) : (

                  /* IMAGE PREVIEW */

                  <motion.div
                    key="preview"
                    className="screening-preview"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                  >

                    <div className="preview-header">

                      <div className="preview-file-info">

                        <div className="preview-success-icon">
                          <CheckCircle2 size={21} />
                        </div>

                        <div>
                          <strong>Image uploaded</strong>
                          <span>Ready for screening</span>
                        </div>

                      </div>

                      <button
                        className="remove-preview"
                        onClick={removeImage}
                        aria-label="Remove image"
                      >
                        <X size={20} />
                      </button>

                    </div>

                    <div className="preview-image-container">

                      <img
                        src={preview}
                        alt="Uploaded retinal fundus"
                      />

                      <div className="preview-image-badge">
                        <ScanEye size={15} />
                        Image Preview
                      </div>

                    </div>

                    <div className="preview-details">

                      <div>
                        <span>FILE NAME</span>
                        <strong title={selectedFile.name}>
                          {selectedFile.name}
                        </strong>
                      </div>

                      <div>
                        <span>FILE SIZE</span>
                        <strong>
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </strong>
                      </div>

                    </div>

                    <button
                      className="change-image-button"
                      onClick={handleBrowse}
                    >
                      <RefreshCw size={16} />
                      Change Image
                    </button>

                  </motion.div>

                )}

              </AnimatePresence>

              {/* ERROR */}

              <AnimatePresence>
                {error && (

                  <motion.div
                    className="screening-error"
                    initial={{ opacity: 0, height: 0, y: -8 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <AlertCircle size={19} />
                    {error}
                  </motion.div>

                )}
              </AnimatePresence>

              {/* ANALYSIS BUTTON */}

              <motion.button
                className={`screening-submit ${
                  selectedFile ? "ready" : ""
                }`}
                onClick={handleAnalyze}
                disabled={!selectedFile}
                whileHover={selectedFile ? { scale: 1.015 } : {}}
                whileTap={selectedFile ? { scale: 0.98 } : {}}
              >

                Analyse Retinal Image
                <ArrowRight size={20} />

              </motion.button>

              <div className="workspace-security">
                <LockKeyhole size={15} />
                Secure upload experience
                <span />
                JPG / PNG supported
              </div>

            </div>

            {/* WORKSPACE FOOTER */}

            <div className="workspace-footer">

              <div>
                <ShieldCheck size={20} />
                <span>
                  <strong>Privacy-conscious</strong>
                  <small>Public screening experience</small>
                </span>
              </div>

              <div>
                <Activity size={20} />
                <span>
                  <strong>AI-assisted</strong>
                  <small>Preliminary screening support</small>
                </span>
              </div>

            </div>

          </motion.section>

        </div>

      </main>

      {/* BOTTOM FEATURE STRIP */}

      <section className="screening-features">

        <div className="screening-features-inner">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                className="screening-feature-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
              >

                <div className="feature-icon">
                  <Icon size={23} />
                </div>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

              </motion.div>
            );
          })}

        </div>

      </section>

      {/* DISCLAIMER */}

      <footer className="screening-footer">

        <div>
          <strong>DRVision</strong>
          <span> — Predict. Prepare. Protect.</span>
        </div>

        <p>
          Medical Disclaimer: DRVision provides AI-assisted
          preliminary screening support. It does not replace
          professional medical diagnosis or clinical evaluation.
        </p>

        <Link to="/">
          Back to Home <ArrowRight size={15} />
        </Link>

      </footer>

    </div>
  );
};

export default PublicScreening;