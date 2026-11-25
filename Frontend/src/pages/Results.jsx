import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Eye,
  BrainCircuit,
  ShieldCheck,
  ScanEye,
  FileText,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Microscope,
  Info,
  Clock,
  Image,
  Sparkles,
  Download,
  LockKeyhole,
  TrendingUp,
} from "lucide-react";

import "./Results.css";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Compress the uploaded image before storing it in browser storage.
const createStoredImage = (file) => new Promise((resolve) => {
  const objectUrl = URL.createObjectURL(file);
  const image = new Image();

  image.onload = () => {
    const maxDimension = 900;
    const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(objectUrl);

    canvas.toBlob((blob) => {
      if (!blob) return resolve("");
      const reader = new FileReader();
      reader.onloadend = () => resolve(typeof reader.result === "string" ? reader.result : "");
      reader.onerror = () => resolve("");
      reader.readAsDataURL(blob);
    }, "image/jpeg", 0.68);
  };

  image.onerror = () => {
    URL.revokeObjectURL(objectUrl);
    resolve("");
  };
  image.src = objectUrl;
});

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const file = location.state?.file;

  const [imageUrl, setImageUrl] = useState(null);
  const [savedRecordId, setSavedRecordId] = useState("");
  const savedFileKeyRef = useRef("");

  // Create retinal image preview
  useEffect(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);

    setImageUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  // Save each completed preview screening to localStorage.
  // This stores frontend demonstration data only; it is not a real AI diagnosis.
  useEffect(() => {
    if (!file) return;

    const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
    if (savedFileKeyRef.current === fileKey) return;

    let cancelled = false;

    const saveRecord = async () => {
      let profile = {};
      try {
        profile = JSON.parse(localStorage.getItem("drvision_profile") || "{}");
      } catch {
        profile = {};
      }

      const imageData = await createStoredImage(file);
      if (cancelled) return;

      const record = {
        id: `SCR-${Date.now()}`,
        patient: location.state?.patientName || "Walk-in Patient",
        patientId: location.state?.patientId || "Not linked",
        date: new Date().toLocaleDateString("en-GB", {
          day: "2-digit", month: "short", year: "numeric",
        }),
        stage: "Moderate DR",
        confidence: "92.4%",
        status: "Completed",
        fileName: file.name,
        fileSize: (file.size / (1024 * 1024)).toFixed(2),
        imageData,
        ownerEmail: profile.email || "guest",
        createdAt: new Date().toISOString(),
        demoResult: true,
      };

      try {
        const existing = JSON.parse(localStorage.getItem("drvision_screening_history") || "[]");
        const updated = [record, ...existing.filter((item) => item.id !== record.id)].slice(0, 30);
        localStorage.setItem("drvision_screening_history", JSON.stringify(updated));
        savedFileKeyRef.current = fileKey;
        setSavedRecordId(record.id);
      } catch (storageError) {
        // If image data exceeds the browser quota, save the record without its image.
        try {
          record.imageData = "";
          const existing = JSON.parse(localStorage.getItem("drvision_screening_history") || "[]");
          localStorage.setItem("drvision_screening_history", JSON.stringify([record, ...existing].slice(0, 30)));
          savedFileKeyRef.current = fileKey;
          setSavedRecordId(record.id);
        } catch (finalError) {
          console.error("Could not save screening record in this browser:", finalError);
          savedFileKeyRef.current = "";
        }
      }
    };

    saveRecord();
    return () => { cancelled = true; };
  }, [file, location.state]);

  // Redirect if no image is available
  useEffect(() => {
    if (!file) {
      navigate("/screening", { replace: true });
    }
  }, [file, navigate]);

  if (!file) return null;

  // DEMONSTRATION DATA ONLY
  // Replace with actual backend response after ML integration.

  const result = {
    level: "Level 2",
    classification: "Moderate DR",
    confidence: 92.4,
    severity: "Moderate",

    description:
      "The demonstration result indicates retinal abnormalities associated with moderate diabetic retinopathy.",

    status: "Preview Mode",
  };

  const formattedSize = (file.size / (1024 * 1024)).toFixed(2);

  return (
    <div className="results-page">

      {/* ================= NAVBAR ================= */}

      <nav className="results-navbar">

        <div className="results-nav-inner">

          <Link to="/" className="results-brand">

            <div className="results-brand-icon">
              <Activity size={25} />
            </div>

            <span>
              DR<span>Vision</span>
            </span>

          </Link>

          <div className="results-nav-actions">

            <span className="results-secure-label">
              <LockKeyhole size={15} />
              Secure Screening
            </span>

            <Link to="/screening" className="results-new-button">
              <RefreshCw size={16} />
              New Screening
            </Link>

          </div>

        </div>

      </nav>


      {/* ================= MAIN CONTENT ================= */}

      <main className="results-main">

        {/* PAGE HEADER */}

        <motion.section
          className="results-heading"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >

          <motion.div variants={itemVariants}>

            <Link to="/screening" className="results-back-link">
              <ArrowLeft size={16} />
              Back to Screening
            </Link>

          </motion.div>

          <motion.div
            className="results-heading-content"
            variants={itemVariants}
          >

            <div>

              <span className="results-eyebrow">
                <span className="results-live-dot" />
                SCREENING REPORT
              </span>

              <h1>
                Your Screening <span>Results.</span>
              </h1>

              <p>
                Review your retinal image, preliminary classification
                and AI-assisted screening information.
              </p>

            </div>

            <div className="results-report-badge">

              <div className="report-badge-icon">
                <FileText size={23} />
              </div>

              <div>
                <strong>Screening Report</strong>
                <span>Public Screening</span>
              </div>

            </div>

          </motion.div>

        </motion.section>


        {/* DEMO NOTICE */}

        <motion.div
          className="results-demo-notice"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >

          <div className="demo-notice-icon">
            <Info size={21} />
          </div>

          <div>
            <strong>Demonstration Preview</strong>

            <p>
              The classification, confidence score and explanation
              displayed below are sample frontend data.
              No actual AI prediction has been performed.
            </p>
          </div>

        </motion.div>


        {/* ================= SUMMARY CARDS ================= */}

        <motion.section
          className="results-summary-grid"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >

          {/* CLASSIFICATION */}

          <motion.div
            className="result-stat-card classification-card"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >

            <div className="result-stat-top">

              <div>
                <span className="result-stat-label">
                  DR CLASSIFICATION
                </span>

                <h2>{result.classification}</h2>

                <p>{result.level}</p>
              </div>

              <div className="result-stat-icon amber-icon">
                <Eye size={25} />
              </div>

            </div>

            <div className="result-stat-bottom">

              <span className="severity-badge">
                {result.severity} Severity
              </span>

              <span className="stat-indicator">
                <span />
                Demo Result
              </span>

            </div>

          </motion.div>


          {/* CONFIDENCE */}

          <motion.div
            className="result-stat-card confidence-card"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >

            <div className="result-stat-top">

              <div>
                <span className="result-stat-label">
                  MODEL CONFIDENCE
                </span>

                <h2 className="confidence-number">
                  {result.confidence}%
                </h2>

                <p>Illustrative value only</p>
              </div>

              <div className="result-stat-icon teal-icon">
                <BrainCircuit size={25} />
              </div>

            </div>

            <div className="confidence-progress">

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.confidence}%` }}
                transition={{
                  duration: 1.5,
                  delay: 0.5,
                  ease: "easeOut",
                }}
              />

            </div>

            <div className="confidence-footer">
              <span>Sample confidence</span>
              <span>92.4%</span>
            </div>

          </motion.div>


          {/* STATUS */}

          <motion.div
            className="result-stat-card status-card"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >

            <div className="result-stat-top">

              <div>
                <span className="result-stat-label">
                  SCREENING STATUS
                </span>

                <h2>Demo Result</h2>

                <p>AI integration pending</p>
              </div>

              <div className="result-stat-icon blue-icon">
                <ShieldCheck size={25} />
              </div>

            </div>

            <div className="result-stat-bottom">

              <span className="preview-status-badge">
                <span />
                {result.status}
              </span>

            </div>

          </motion.div>

        </motion.section>


        {/* ================= IMAGE ANALYSIS ================= */}

        <section className="results-analysis-section">

          <div className="results-section-heading">

            <div>

              <span className="results-section-eyebrow">
                VISUAL ANALYSIS
              </span>

              <h2>
                Retinal Image <span>Analysis</span>
              </h2>

              <p>
                Review the uploaded image and AI explanation interface.
              </p>

            </div>

            <div className="analysis-section-icon">
              <ScanEye size={25} />
            </div>

          </div>


          <div className="results-image-grid">

            {/* ORIGINAL IMAGE */}

            <motion.div
              className="results-image-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >

              <div className="image-card-header">

                <div className="image-card-icon original-icon">
                  <ScanEye size={23} />
                </div>

                <div>
                  <h3>Original Retinal Image</h3>
                  <p>Uploaded fundus image</p>
                </div>

                <span className="image-card-tag">
                  ORIGINAL
                </span>

              </div>


              <div className="retinal-image-viewer">

                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Original uploaded retinal fundus"
                  />
                )}

                <div className="image-viewer-label">
                  <Image size={14} />
                  Original Image
                </div>

              </div>


              <div className="image-file-details">

                <div className="file-detail-icon">
                  <FileText size={19} />
                </div>

                <div className="file-detail-text">

                  <strong title={file.name}>
                    {file.name}
                  </strong>

                  <span>
                    {formattedSize} MB · Uploaded image
                  </span>

                </div>

                <CheckCircle2
                  size={20}
                  className="file-success-icon"
                />

              </div>

            </motion.div>


            {/* GRAD CAM */}

            <motion.div
              className="results-image-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >

              <div className="image-card-header">

                <div className="image-card-icon gradcam-icon">
                  <Microscope size={23} />
                </div>

                <div>
                  <h3>Grad-CAM Visualization</h3>
                  <p>Explainable AI visualization</p>
                </div>

                <span className="coming-soon-tag">
                  COMING SOON
                </span>

              </div>


              <div className="gradcam-placeholder">

                <motion.div
                  className="gradcam-visual-icon"
                  animate={{
                    scale: [1, 1.08, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <BrainCircuit size={55} />
                </motion.div>

                <h4>Visual Explanation</h4>

                <p>
                  Grad-CAM heatmaps will highlight important
                  retinal regions after AI model integration.
                </p>

                <div className="gradcam-status">
                  <span />
                  Backend Integration Pending
                </div>

              </div>


              <div className="gradcam-footer">

                <Info size={17} />

                <span>
                  Actual heatmap visualization is not available yet.
                </span>

              </div>

            </motion.div>

          </div>

        </section>


        {/* ================= AI EXPLANATION ================= */}

        <motion.section
          className="results-explanation-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >

          <div className="explanation-header">

            <div className="explanation-icon">
              <Sparkles size={25} />
            </div>

            <div>
              <span>INTELLIGENT SCREENING SUPPORT</span>

              <h2>AI Explanation</h2>

              <p>
                Understanding the screening classification.
              </p>
            </div>

          </div>


          <div className="explanation-content">

            <div className="explanation-main">

              <div className="explanation-indicator">
                <BrainCircuit size={19} />
                Demonstration Explanation
              </div>

              <p>
                {result.description}
              </p>

            </div>


            <div className="explanation-disclaimer">

              <AlertCircle size={21} />

              <div>
                <strong>Important Medical Information</strong>

                <p>
                  This is demonstration content, not an actual
                  medical finding. Actual predictions and
                  explanations will be supplied by the trained
                  ResNet50 model. Always consult a qualified
                  eye care professional for clinical evaluation.
                </p>
              </div>

            </div>

          </div>

        </motion.section>


        {/* ================= SCREENING INFORMATION ================= */}

        <motion.section
          className="results-information-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >

          <div className="information-heading">

            <div className="information-icon">
              <FileText size={23} />
            </div>

            <div>
              <h2>Screening Information</h2>

              <p>
                Details about your uploaded retinal image.
              </p>
            </div>

          </div>


          <div className="information-grid">

            <div className="information-item">
              <span>IMAGE NAME</span>
              <strong title={file.name}>
                {file.name}
              </strong>
            </div>

            <div className="information-item">
              <span>FILE SIZE</span>
              <strong>{formattedSize} MB</strong>
            </div>

            <div className="information-item">
              <span>PATIENT</span>
              <strong>{location.state?.patientName || "Walk-in Patient"}</strong>
            </div>

            <div className="information-item">
              <span>PATIENT ID</span>
              <strong>{location.state?.patientId || "Not linked"}</strong>
            </div>

            <div className="information-item">
              <span>SCREENING TYPE</span>
              <strong>Browser preview</strong>
            </div>

            <div className="information-item">
              <span>SCREENING ID</span>
              <strong>{savedRecordId || "Generating..."}</strong>
            </div>

            <div className="information-item">
              <span>STORAGE STATUS</span>
              <strong className={savedRecordId ? "saved-status" : "not-saved"}>
                {savedRecordId ? "Saved in this browser" : "Saving record..."}
              </strong>
            </div>

          </div>

          {savedRecordId && (
            <motion.div
              className="screening-saved-notice"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CheckCircle2 size={21} />
              <div>
                <strong>Screening record saved</strong>
                <p>This demonstration record is saved in this browser and will appear on the History page.</p>
              </div>
            </motion.div>
          )}

        </motion.section>


        {/* ================= ACTIONS ================= */}

        <motion.section
          className="results-actions"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >

          <div>

            <h3>Want to screen another image?</h3>

            <p>
              Start a new retinal screening whenever you're ready.
            </p>

          </div>

          <div className="results-action-buttons">

            <Link
              to="/screening"
              className="results-primary-action"
            >
              <RefreshCw size={18} />
              New Screening
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/"
              className="results-secondary-action"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>

          </div>

        </motion.section>


        {/* ================= DISCLAIMER ================= */}

        <footer className="results-disclaimer">

          <ShieldCheck size={19} />

          <p>
            <strong>Medical Disclaimer:</strong> DRVision provides
            AI-assisted preliminary screening information for
            educational and supportive purposes. It does not
            replace professional medical diagnosis, clinical
            examination or advice from qualified healthcare
            professionals.
          </p>

        </footer>

      </main>

    </div>
  );
};

export default Results;