import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FileText,
  Download,
  Search,
  CheckCircle2,
  Clock3,
  Eye,
  X,
  ArrowUpRight,
  Filter,
  FileDown,
  Activity,
  CalendarDays,
  UserRound,
  ShieldCheck,
} from "lucide-react";

import WorkspaceLayout from "../components/WorkspaceLayout";
import "./ReportsSettings.css";


const initialReports = [
  {
    id: "RPT-001",
    patient: "Rahul Sharma",
    patientId: "PAT-001",
    date: "18 Nov 2026",
    stage: "No DR",
    confidence: "98.2%",
    status: "Completed",
  },
  {
    id: "RPT-002",
    patient: "Priya Verma",
    patientId: "PAT-002",
    date: "17 Nov 2026",
    stage: "Mild DR",
    confidence: "94.5%",
    status: "Completed",
  },
  {
    id: "RPT-003",
    patient: "Amit Kumar",
    patientId: "PAT-003",
    date: "16 Nov 2026",
    stage: "Moderate DR",
    confidence: "92.4%",
    status: "Completed",
  },
  {
    id: "RPT-004",
    patient: "Sneha Gupta",
    patientId: "PAT-004",
    date: "15 Nov 2026",
    stage: "Severe DR",
    confidence: "89.7%",
    status: "Pending",
  },
];


export default function Reports() {

  const [reports] = useState(initialReports);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [selected, setSelected] = useState(null);


  // FILTER REPORTS

  const filteredReports = useMemo(() => {

    return reports.filter((report) => {

      const matchesSearch =

        `${report.patient} ${report.id} ${report.patientId}`
          .toLowerCase()
          .includes(search.toLowerCase());


      const matchesFilter =

        filter === "All" || report.status === filter;


      return matchesSearch && matchesFilter;

    });

  }, [reports, search, filter]);


  // STATISTICS

  const completed = reports.filter(
    (r) => r.status === "Completed"
  ).length;

  const pending = reports.filter(
    (r) => r.status === "Pending"
  ).length;


  // DOWNLOAD INDIVIDUAL REPORT

  const downloadReport = (report) => {

    const content = `

========================================
             DRVISION
       RETINAL SCREENING REPORT
========================================

Report Information

Report ID       : ${report.id}
Patient Name    : ${report.patient}
Patient ID      : ${report.patientId}
Screening Date  : ${report.date}

----------------------------------------

SCREENING RESULTS

DR Classification : ${report.stage}
Model Confidence  : ${report.confidence}
Report Status     : ${report.status}

----------------------------------------

IMPORTANT MEDICAL DISCLAIMER

This is a demonstration report generated
from sample frontend data.

It is NOT an actual medical diagnosis.

A qualified eye care professional must
evaluate the clinical findings before
making medical decisions.

========================================
        AI ASSISTS. DOCTORS DECIDE.
========================================

    `;


    const blob = new Blob(
      [content],
      { type: "text/plain;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `${report.id}.txt`;

    link.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);

  };


  // EXPORT CSV

  const exportCSV = () => {

    if (!filteredReports.length) return;

    const headers = [
      "Report ID",
      "Patient Name",
      "Patient ID",
      "Date",
      "Classification",
      "Confidence",
      "Status",
    ];


    const rows = filteredReports.map((r) => [

      r.id,
      r.patient,
      r.patientId,
      r.date,
      r.stage,
      r.confidence,
      r.status,

    ]);


    const csv = [

      headers,

      ...rows,

    ].map((row) =>

      row.map((value) =>

        `"${String(value).replace(/"/g, '""')}"`

      ).join(",")

    ).join("\n");


    const blob = new Blob(
      ["\uFEFF" + csv],
      { type: "text/csv;charset=utf-8;" }
    );


    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "DRVision_Reports.csv";

    link.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);

  };


  // SEVERITY CLASS

  const severityClass = (stage) => {

    const classes = {

      "No DR": "rs-severity-none",

      "Mild DR": "rs-severity-mild",

      "Moderate DR": "rs-severity-moderate",

      "Severe DR": "rs-severity-severe",

      "Proliferative DR": "rs-severity-proliferative",

    };

    return classes[stage] || "rs-severity-none";

  };


  return (

    <WorkspaceLayout title="Reports">

      <div className="rs-page">


        {/* HEADER */}

        <motion.section
          className="rs-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >

          <div>

            <span className="rs-eyebrow">
              REPORT MANAGEMENT
            </span>

            <h1>
              Screening <span>Reports.</span>
            </h1>

            <p>
              Access, review and download your retinal screening reports.
            </p>

          </div>


          <button
            className="rs-primary-button"
            onClick={exportCSV}
            disabled={!filteredReports.length}
          >

            <Download size={18} />

            Export Reports

            <ArrowUpRight size={17} />

          </button>

        </motion.section>



        {/* STATISTICS */}

        <section className="rs-stats">

          <div className="rs-stat-card">

            <div className="rs-stat-icon teal">
              <FileText size={23} />
            </div>

            <span>Total Reports</span>

            <h2>{reports.length}</h2>

            <p>All generated reports</p>

          </div>


          <div className="rs-stat-card">

            <div className="rs-stat-icon blue">
              <CheckCircle2 size={23} />
            </div>

            <span>Completed Reports</span>

            <h2>{completed}</h2>

            <p>Successfully generated</p>

          </div>


          <div className="rs-stat-card">

            <div className="rs-stat-icon amber">
              <Clock3 size={23} />
            </div>

            <span>Pending Reports</span>

            <h2>{pending}</h2>

            <p>Awaiting completion</p>

          </div>

        </section>



        {/* REPORT TABLE */}

        <section className="rs-panel">


          <div className="rs-panel-header">

            <div>

              <span className="rs-eyebrow">
                REPORT DIRECTORY
              </span>

              <h2>All Screening Reports</h2>

              <p>
                Manage and access your generated screening reports.
              </p>

            </div>


            <div className="rs-record-count">

              <FileText size={17} />

              {filteredReports.length} Reports

            </div>

          </div>



          {/* SEARCH AND FILTER */}

          <div className="rs-toolbar">

            <div className="rs-search">

              <Search size={18} />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search report or patient..."
              />

              {search && (

                <button onClick={() => setSearch("")}>
                  <X size={15} />
                </button>

              )}

            </div>


            <div className="rs-filter">

              <Filter size={17} />

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >

                <option value="All">All Reports</option>

                <option value="Completed">Completed</option>

                <option value="Pending">Pending</option>

              </select>

            </div>

          </div>



          {/* TABLE */}

          <div className="rs-table-wrapper">

            <table className="rs-table">

              <thead>

                <tr>
                  <th>REPORT ID</th>
                  <th>PATIENT</th>
                  <th>DATE</th>
                  <th>CLASSIFICATION</th>
                  <th>CONFIDENCE</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>

              </thead>


              <tbody>

                {filteredReports.map((report, index) => (

                  <motion.tr
                    key={report.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >

                    <td>

                      <span className="rs-report-id">
                        {report.id}
                      </span>

                    </td>


                    <td>

                      <div className="rs-patient">

                        <div className="rs-avatar">
                          {report.patient.charAt(0)}
                        </div>

                        <div>

                          <strong>{report.patient}</strong>

                          <span>{report.patientId}</span>

                        </div>

                      </div>

                    </td>


                    <td>
                      <span className="rs-date">
                        {report.date}
                      </span>
                    </td>


                    <td>

                      <span className={`rs-severity ${severityClass(report.stage)}`}>
                        {report.stage}
                      </span>

                    </td>


                    <td>

                      <strong className="rs-confidence">
                        {report.confidence}
                      </strong>

                    </td>


                    <td>

                      <span
                        className={`rs-status ${
                          report.status === "Completed"
                            ? "completed"
                            : "pending"
                        }`}
                      >

                        <i />

                        {report.status}

                      </span>

                    </td>


                    <td>

                      <div className="rs-actions">

                        <button
                          title="View Report"
                          onClick={() => setSelected(report)}
                        >
                          <Eye size={17} />
                        </button>


                        <button
                          title="Download Report"
                          onClick={() => downloadReport(report)}
                        >
                          <Download size={17} />
                        </button>

                      </div>

                    </td>

                  </motion.tr>

                ))}


                {filteredReports.length === 0 && (

                  <tr>

                    <td colSpan="7" className="rs-empty">
                      No reports found.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>



          <div className="rs-table-footer">

            Showing {filteredReports.length} of {reports.length} reports

            <span>
              <ShieldCheck size={14} />
              Secure report management
            </span>

          </div>

        </section>



        {/* REPORT DETAILS MODAL */}

        <AnimatePresence>

          {selected && (

            <motion.div
              className="rs-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >

              <motion.div
                className="rs-modal"
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >

                <div className="rs-modal-header">

                  <div className="rs-modal-icon">
                    <FileText size={24} />
                  </div>

                  <button onClick={() => setSelected(null)}>
                    <X size={21} />
                  </button>

                </div>


                <span className="rs-eyebrow">
                  SCREENING REPORT
                </span>

                <h2>Report Details</h2>

                <p className="rs-modal-description">
                  Review the screening report information.
                </p>


                <div className="rs-result-box">

                  <span>DR CLASSIFICATION</span>

                  <h3>{selected.stage}</h3>

                  <span className={`rs-severity ${severityClass(selected.stage)}`}>
                    {selected.stage}
                  </span>

                </div>


                {[
                  [FileText, "Report ID", selected.id],
                  [UserRound, "Patient Name", selected.patient],
                  [Activity, "Patient ID", selected.patientId],
                  [CalendarDays, "Screening Date", selected.date],
                  [CheckCircle2, "Confidence", selected.confidence],
                  [ShieldCheck, "Report Status", selected.status],
                ].map(([Icon, label, value]) => (

                  <div className="rs-detail-row" key={label}>

                    <Icon size={17} />

                    <span>{label}</span>

                    <strong>{value}</strong>

                  </div>

                ))}


                <button
                  className="rs-primary-button rs-download-button"
                  onClick={() => downloadReport(selected)}
                >

                  <Download size={18} />

                  Download Report

                </button>


                <button
                  className="rs-close-button"
                  onClick={() => setSelected(null)}
                >
                  Close
                </button>

              </motion.div>

            </motion.div>

          )}

        </AnimatePresence>


      </div>

    </WorkspaceLayout>

  );

}