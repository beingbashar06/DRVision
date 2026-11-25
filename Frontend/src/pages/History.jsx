import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  History as HistoryIcon,
  Search,
  Eye,
  CalendarDays,
  Filter,
  Download,
  ScanEye,
  CheckCircle2,
  Clock3,
  X,
  ArrowUpRight,
  FileText,
  TrendingUp,
} from "lucide-react";

import WorkspaceLayout from "../components/WorkspaceLayout";
import "./Management.css";


const demoRecords = [

  {
    id: "SCR-001",
    patient: "Rahul Sharma",
    patientId: "PAT-001",
    date: "18 Nov 2026",
    stage: "No DR",
    confidence: "98.2%",
    status: "Completed",
  },

  {
    id: "SCR-002",
    patient: "Priya Verma",
    patientId: "PAT-002",
    date: "17 Nov 2026",
    stage: "Mild DR",
    confidence: "94.5%",
    status: "Completed",
  },

  {
    id: "SCR-003",
    patient: "Amit Kumar",
    patientId: "PAT-003",
    date: "16 Nov 2026",
    stage: "Moderate DR",
    confidence: "92.4%",
    status: "Completed",
  },

  {
    id: "SCR-004",
    patient: "Sneha Gupta",
    patientId: "PAT-004",
    date: "15 Nov 2026",
    stage: "Severe DR",
    confidence: "89.7%",
    status: "Pending Review",
  },

  {
    id: "SCR-005",
    patient: "Rohit Singh",
    patientId: "PAT-005",
    date: "14 Nov 2026",
    stage: "Proliferative DR",
    confidence: "96.1%",
    status: "Completed",
  },

];


export default function History() {

  const [records, setRecords] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("drvision_screening_history") || "[]");
      return [...saved, ...demoRecords];
    } catch {
      return demoRecords;
    }
  });

  // Refresh the list when another tab saves a screening.
  useEffect(() => {
    const refreshRecords = () => {
      try {
        const saved = JSON.parse(localStorage.getItem("drvision_screening_history") || "[]");
        setRecords([...saved, ...demoRecords]);
      } catch {
        setRecords(demoRecords);
      }
    };
    window.addEventListener("storage", refreshRecords);
    return () => window.removeEventListener("storage", refreshRecords);
  }, []);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [selected, setSelected] = useState(null);


  // FILTER RECORDS

  const filteredRecords = records.filter((record) => {

    const matchesSearch =

      `${record.patient} ${record.patientId} ${record.id}`
        .toLowerCase()
        .includes(search.toLowerCase());


    const matchesFilter =

      filter === "All" || record.stage === filter;


    return matchesSearch && matchesFilter;

  });


  // STATISTICS

  const completed = records.filter(
    (r) => r.status === "Completed"
  ).length;

  const pending = records.filter(
    (r) => r.status === "Pending Review"
  ).length;


  // CSV EXPORT

  const exportCSV = () => {

    const headers = [
      "Screening ID",
      "Patient",
      "Patient ID",
      "Date",
      "DR Classification",
      "Confidence",
      "Status",
    ];

    const rows = filteredRecords.map((r) => [

      r.id,
      r.patient,
      r.patientId,
      r.date,
      r.stage,
      r.confidence,
      r.status,

    ]);


    const csvContent = [

      headers,

      ...rows,

    ].map((row) =>

      row.map((value) =>

        `"${String(value).replace(/"/g, '""')}"`

      ).join(",")

    ).join("\n");


    const blob = new Blob(
      [csvContent],
      { type: "text/csv;charset=utf-8;" }
    );


    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "DRVision_Screening_History.csv";

    link.click();

    URL.revokeObjectURL(url);

  };


  // SEVERITY COLORS

  const severityColors = {

    "No DR": "severity-none",

    "Mild DR": "severity-mild",

    "Moderate DR": "severity-moderate",

    "Severe DR": "severity-severe",

    "Proliferative DR": "severity-proliferative",

  };


  return (

    <WorkspaceLayout title="History">

      <div className="management-page">


        {/* HEADER */}

        <motion.section
          className="management-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >

          <div>

            <span className="management-eyebrow">
              SCREENING RECORDS
            </span>

            <h1>
              Screening <span>History.</span>
            </h1>

            <p>
              Review, track and manage previous retinal screening
              results.
            </p>

          </div>


          <button
            className="management-primary-button"
            onClick={exportCSV}
          >

            <Download size={18} />

            Export Records

            <ArrowUpRight size={17} />

          </button>

        </motion.section>



        {/* STATISTICS */}

        <section className="management-stats history-stats">

          <div className="management-stat-card">

            <div className="management-stat-icon teal">
              <HistoryIcon size={23} />
            </div>

            <span>Total Screenings</span>

            <h2>{records.length}</h2>

            <p>All recorded screenings</p>

          </div>


          <div className="management-stat-card">

            <div className="management-stat-icon blue">
              <CheckCircle2 size={23} />
            </div>

            <span>Completed</span>

            <h2>{completed}</h2>

            <p>Successfully completed</p>

          </div>


          <div className="management-stat-card">

            <div className="management-stat-icon amber">
              <Clock3 size={23} />
            </div>

            <span>Pending Reviews</span>

            <h2>{pending}</h2>

            <p>Awaiting review</p>

          </div>

        </section>



        {/* HISTORY TABLE */}

        <section className="management-panel">


          {/* HEADER */}

          <div className="management-panel-header">

            <div>

              <span className="management-eyebrow">
                SCREENING ACTIVITY
              </span>

              <h2>Screening Records</h2>

              <p>
                Complete overview of previous screening activities.
              </p>

            </div>


            <div className="history-record-count">

              <FileText size={17} />

              {filteredRecords.length} Records

            </div>

          </div>



          {/* FILTERS */}

          <div className="history-filters">

            <div className="management-search">

              <Search size={18} />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search patient or screening ID..."
              />

              {search && (

                <button onClick={() => setSearch("")}>
                  <X size={15} />
                </button>

              )}

            </div>


            <div className="history-select">

              <Filter size={17} />

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >

                <option value="All">All Stages</option>

                <option value="No DR">No DR</option>

                <option value="Mild DR">Mild DR</option>

                <option value="Moderate DR">Moderate DR</option>

                <option value="Severe DR">Severe DR</option>

                <option value="Proliferative DR">
                  Proliferative DR
                </option>

              </select>

            </div>

          </div>



          {/* TABLE */}

          <div className="management-table-wrapper">

            <table className="management-table history-table">

              <thead>

                <tr>
                  <th>SCREENING ID</th>
                  <th>PATIENT</th>
                  <th>DATE</th>
                  <th>DR CLASSIFICATION</th>
                  <th>CONFIDENCE</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>

              </thead>


              <tbody>

                {filteredRecords.map((record, index) => (

                  <motion.tr
                    key={record.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >

                    <td>

                      <span className="management-id">
                        {record.id}
                      </span>

                    </td>


                    <td>

                      <div className="management-patient">

                        <div className="management-patient-avatar">
                          {record.patient.charAt(0)}
                        </div>

                        <div>

                          <strong>{record.patient}</strong>

                          <span>{record.patientId}</span>

                        </div>

                      </div>

                    </td>


                    <td>

                      <span className="management-date">
                        {record.date}
                      </span>

                    </td>


                    <td>

                      <span
                        className={`history-severity ${
                          severityColors[record.stage]
                        }`}
                      >

                        {record.stage}

                      </span>

                    </td>


                    <td>

                      <div className="history-confidence">

                        <strong>{record.confidence}</strong>

                        <div>
                          <span
                            style={{
                              width: record.confidence,
                            }}
                          />
                        </div>

                      </div>

                    </td>


                    <td>

                      <span
                        className={`management-status ${
                          record.status === "Completed"
                            ? "status-completed"
                            : "status-pending"
                        }`}
                      >

                        <i />

                        {record.status}

                      </span>

                    </td>


                    <td>

                      <button
                        className="management-action-button"
                        title="View Details"
                        onClick={() => setSelected(record)}
                      >

                        <Eye size={18} />

                      </button>

                    </td>

                  </motion.tr>

                ))}


                {filteredRecords.length === 0 && (

                  <tr>

                    <td colSpan="7" className="management-empty">
                      No screening records found.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>


          {/* TABLE FOOTER */}

          <div className="management-table-footer">

            Showing {filteredRecords.length} of {records.length} records

            <span>
              <TrendingUp size={14} />
              Screening activity
            </span>

          </div>

        </section>

      </div>



      {/* SCREENING DETAILS MODAL */}

      <AnimatePresence>

        {selected && (

          <motion.div
            className="management-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >

            <motion.div
              className="management-modal"
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >

              <div className="management-modal-header">

                <div>

                  <div className="management-modal-icon">
                    <ScanEye size={23} />
                  </div>

                  <h2>Screening Details</h2>

                  <p>
                    Detailed information about this screening.
                  </p>

                </div>


                <button onClick={() => setSelected(null)}>
                  <X size={21} />
                </button>

              </div>


              <div className="history-detail-status">

                <span className="management-eyebrow">
                  SCREENING RESULT
                </span>

                <h3>{selected.stage}</h3>

                <span
                  className={`history-severity ${
                    severityColors[selected.stage]
                  }`}
                >
                  {selected.stage}
                </span>

              </div>


              {[
                ["Screening ID", selected.id],
                ["Patient", selected.patient],
                ["Patient ID", selected.patientId],
                ["Date", selected.date],
                ["Confidence", selected.confidence],
                ["Status", selected.status],
              ].map(([label, value]) => (

                <div className="details-row" key={label}>

                  <span>{label}</span>

                  <strong>{value}</strong>

                </div>

              ))}


              <button
                className="management-save details-close"
                onClick={() => setSelected(null)}
              >
                Close
              </button>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </WorkspaceLayout>

  );

}