import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  Activity,
  LayoutDashboard,
  Users,
  ScanEye,
  History,
  FileText,
  Settings,
  LogOut,
  Bell,
  Search,
  Plus,
  ArrowUpRight,
  ArrowRight,
  TrendingUp,
  CalendarDays,
  Menu,
  X,
  BrainCircuit,
  ShieldCheck,
  Clock3,
  ChevronDown,
  MoreHorizontal,
  Stethoscope,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  CircleHelp,
  Command,
  Eye,
} from "lucide-react";

import "./Dashboard.css";


const Dashboard = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  // Demonstration statistics
  const stats = [
    {
      title: "Total Patients",
      value: "128",
      change: "+12 this month",
      icon: Users,
      color: "teal",
      trend: "up",
    },
    {
      title: "Total Screenings",
      value: "256",
      change: "+18 this month",
      icon: ScanEye,
      color: "blue",
      trend: "up",
    },
    {
      title: "Pending Reviews",
      value: "08",
      change: "Needs attention",
      icon: Clock3,
      color: "amber",
      trend: "neutral",
    },
    {
      title: "Completed Reports",
      value: "198",
      change: "Reports generated",
      icon: FileText,
      color: "purple",
      trend: "up",
    },
  ];


  // Demonstration screening records
  const recentScreenings = [
    {
      name: "Rahul Sharma",
      id: "PAT-001",
      date: "18 Nov 2026",
      stage: "No DR",
      status: "Completed",
    },
    {
      name: "Priya Verma",
      id: "PAT-002",
      date: "17 Nov 2026",
      stage: "Mild DR",
      status: "Completed",
    },
    {
      name: "Amit Kumar",
      id: "PAT-003",
      date: "16 Nov 2026",
      stage: "Moderate DR",
      status: "Completed",
    },
    {
      name: "Sneha Gupta",
      id: "PAT-004",
      date: "15 Nov 2026",
      stage: "Severe DR",
      status: "Pending Review",
    },
  ];


  // Demonstration weekly activity
  const weeklyActivity = [
    { day: "Mon", value: 42 },
    { day: "Tue", value: 68 },
    { day: "Wed", value: 53 },
    { day: "Thu", value: 86 },
    { day: "Fri", value: 64 },
    { day: "Sat", value: 92 },
    { day: "Sun", value: 35 },
  ];


  // Sidebar navigation
  const navigation = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      active: true,
    },
    {
      title: "Patients",
      icon: Users,
      path: "/patients",
    },
    {
      title: "Screening",
      icon: ScanEye,
      path: "/screening",
    },
    {
      title: "History",
      icon: History,
      path: "/history",
    },
    {
      title: "Reports",
      icon: FileText,
      path: "/reports",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];


  // Search functionality
  const filteredScreenings = useMemo(() => {
    return recentScreenings.filter((record) => {
      const query = searchQuery.toLowerCase();

      return (
        record.name.toLowerCase().includes(query) ||
        record.id.toLowerCase().includes(query) ||
        record.stage.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);


  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.09,
      },
    },
  };


  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 22,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut",
      },
    },
  };


  return (

    <div className="dr-dashboard">

      {/* MOBILE OVERLAY */}

      <AnimatePresence>

        {sidebarOpen && (

          <motion.div
            className="dashboard-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />

        )}

      </AnimatePresence>


      {/* ================= SIDEBAR ================= */}

      <aside
        className={`dashboard-sidebar ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >

        {/* BRAND */}

        <div className="dashboard-brand">

          <Link to="/" className="dashboard-logo">

            <div className="dashboard-logo-icon">
              <Activity size={25} />
            </div>

            <span>
              DR<span>Vision</span>
            </span>

          </Link>


          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={21} />
          </button>

        </div>


        {/* NAVIGATION */}

        <div className="sidebar-navigation">

          <p className="sidebar-label">
            WORKSPACE
          </p>


          <div className="sidebar-links">

            {navigation.map((item) => {

              const Icon = item.icon;

              return (

                <Link
                  key={item.title}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`sidebar-link ${
                    item.active ? "sidebar-link-active" : ""
                  }`}
                >

                  <Icon size={19} />

                  <span>{item.title}</span>

                  {item.active && (
                    <span className="sidebar-active-indicator" />
                  )}

                </Link>

              );

            })}

          </div>


          {/* AI SCREENING CARD */}

          <motion.div
            className="sidebar-ai-card"
            whileHover={{ y: -4 }}
          >

            <div className="sidebar-ai-icon">
              <BrainCircuit size={25} />
            </div>

            <span className="sidebar-ai-label">
              DRVISION PLATFORM
            </span>

            <h4>
              AI Screening
            </h4>

            <p>
              Start a new retinal screening with intelligent
              image analysis.
            </p>

            <Link to="/screening">

              Start Screening

              <ArrowUpRight size={17} />

            </Link>

          </motion.div>

        </div>


        {/* SIDEBAR BOTTOM */}

        <div className="sidebar-bottom">

          <div className="sidebar-help">

            <CircleHelp size={17} />

            <span>Help & Support</span>

          </div>


          <Link to="/" className="sidebar-logout">

            <LogOut size={19} />

            <span>Logout</span>

          </Link>


          <div className="sidebar-version">
            DRVision · Version 1.0
          </div>

        </div>

      </aside>


      {/* ================= MAIN AREA ================= */}

      <main className="dashboard-main">


        {/* TOP NAVBAR */}

        <header className="dashboard-topbar">

          <div className="topbar-left">

            <button
              className="mobile-menu-button"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={23} />
            </button>


            <div>

              <div className="topbar-breadcrumb">
                Workspace <span>/</span> Dashboard
              </div>

              <h2>Dashboard</h2>

            </div>

          </div>


          <div className="topbar-right">


            {/* SEARCH */}

            <div className="dashboard-search">

              <Search size={17} />

              <input
                type="text"
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <span>
                <Command size={11} /> K
              </span>

            </div>


            {/* NOTIFICATIONS */}

            <div className="notification-wrapper">

              <button
                className="notification-button"
                onClick={() =>
                  setShowNotifications(!showNotifications)
                }
              >

                <Bell size={19} />

                <span className="notification-dot" />

              </button>


              <AnimatePresence>

                {showNotifications && (

                  <motion.div
                    className="notification-dropdown"
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10 }}
                  >

                    <div className="notification-heading">

                      <strong>Notifications</strong>

                      <span>2 NEW</span>

                    </div>


                    <div className="notification-item">

                      <div className="notification-icon amber">
                        <AlertCircle size={18} />
                      </div>

                      <div>
                        <strong>Pending Reviews</strong>
                        <p>8 screenings need attention.</p>
                      </div>

                    </div>


                    <div className="notification-item">

                      <div className="notification-icon teal">
                        <CheckCircle2 size={18} />
                      </div>

                      <div>
                        <strong>Reports Updated</strong>
                        <p>Screening reports are available.</p>
                      </div>

                    </div>

                  </motion.div>

                )}

              </AnimatePresence>

            </div>


            {/* PROFILE */}

            <div className="topbar-profile">

              <div className="profile-avatar">
                U
              </div>

              <div className="profile-information">

                <strong>User Name</strong>

                <span>Healthcare Professional</span>

              </div>

              <ChevronDown size={15} />

            </div>

          </div>

        </header>



        {/* ================= DASHBOARD CONTENT ================= */}

        <div className="dashboard-content">


          {/* WELCOME SECTION */}

          <motion.section
            className="dashboard-welcome"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >

            <div className="welcome-content">

              <span className="welcome-eyebrow">

                <span />

                YOUR WORKSPACE

              </span>


              <h1>
                Welcome back, <span>User!</span>
              </h1>


              <p>
                Here's an overview of your retinal screening
                activities and patient records.
              </p>


              <div className="welcome-meta">

                <div>
                  <CalendarDays size={16} />
                  November 2026
                </div>

                <span className="welcome-meta-divider" />

                <div>
                  <Activity size={16} />
                  Workspace Overview
                </div>

              </div>

            </div>


            <Link
              to="/screening"
              className="dashboard-new-screening"
            >

              <Plus size={20} />

              New Screening

              <ArrowRight size={17} />

            </Link>

          </motion.section>



          {/* STATISTICS */}

          <motion.section
            className="dashboard-stats-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >

            {stats.map((stat, index) => {

              const Icon = stat.icon;

              return (

                <motion.div
                  key={stat.title}
                  className="dashboard-stat-card"
                  variants={itemVariants}
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.25 },
                  }}
                >

                  <div className="stat-card-top">

                    <div className="stat-title">
                      {stat.title}
                    </div>

                    <div className={`stat-icon stat-${stat.color}`}>
                      <Icon size={23} />
                    </div>

                  </div>


                  <div className="stat-value">
                    {stat.value}
                  </div>


                  <div className="stat-card-footer">

                    <span className={`stat-change ${stat.trend}`}>

                      {stat.trend === "up" && (
                        <TrendingUp size={14} />
                      )}

                      {stat.trend === "neutral" && (
                        <Clock3 size={14} />
                      )}

                      {stat.change}

                    </span>

                    <MoreHorizontal size={19} />

                  </div>


                  <div className={`stat-decoration stat-decoration-${index}`} />

                </motion.div>

              );

            })}

          </motion.section>



          {/* QUICK ACTIONS */}

          <section className="dashboard-quick-section">

            <div className="dashboard-section-heading">

              <div>

                <span className="section-eyebrow">
                  SHORTCUTS
                </span>

                <h2>Quick Actions</h2>

                <p>
                  Access your frequently used tools.
                </p>

              </div>

            </div>


            <motion.div
              className="quick-actions-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >


              {/* SCREENING */}

              <motion.div variants={itemVariants}>

                <Link
                  to="/screening"
                  className="quick-action-card quick-screening"
                >

                  <div className="quick-card-top">

                    <div className="quick-action-icon">
                      <ScanEye size={25} />
                    </div>

                    <ArrowUpRight size={21} />

                  </div>


                  <h3>Start New Screening</h3>

                  <p>
                    Upload a retinal image for AI-assisted
                    screening.
                  </p>


                  <div className="quick-card-bottom">
                    Start now <ArrowRight size={16} />
                  </div>

                </Link>

              </motion.div>


              {/* PATIENTS */}

              <motion.div variants={itemVariants}>

                <Link
                  to="/patients"
                  className="quick-action-card"
                >

                  <div className="quick-card-top">

                    <div className="quick-action-icon blue">
                      <Users size={25} />
                    </div>

                    <ArrowUpRight size={21} />

                  </div>


                  <h3>Manage Patients</h3>

                  <p>
                    Create, organize and manage patient
                    information.
                  </p>


                  <div className="quick-card-bottom">
                    View patients <ArrowRight size={16} />
                  </div>

                </Link>

              </motion.div>


              {/* HISTORY */}

              <motion.div variants={itemVariants}>

                <Link
                  to="/history"
                  className="quick-action-card"
                >

                  <div className="quick-card-top">

                    <div className="quick-action-icon purple">
                      <History size={25} />
                    </div>

                    <ArrowUpRight size={21} />

                  </div>


                  <h3>Screening History</h3>

                  <p>
                    Review previous screening activities
                    and results.
                  </p>


                  <div className="quick-card-bottom">
                    View history <ArrowRight size={16} />
                  </div>

                </Link>

              </motion.div>


            </motion.div>

          </section>



          {/* ANALYTICS AND RECENT SCREENINGS */}

          <section className="dashboard-analytics-grid">


            {/* RECENT SCREENINGS */}

            <div className="dashboard-panel recent-panel">

              <div className="panel-header">

                <div>

                  <span className="section-eyebrow">
                    PATIENT ACTIVITY
                  </span>

                  <h2>Recent Screenings</h2>

                  <p>
                    Latest patient screening records.
                  </p>

                </div>


                <Link to="/history" className="panel-view-all">
                  View All <ArrowRight size={16} />
                </Link>

              </div>


              <div className="screening-table-wrapper">

                <table className="screening-table">

                  <thead>

                    <tr>
                      <th>Patient</th>
                      <th>Date</th>
                      <th>DR Classification</th>
                      <th>Status</th>
                    </tr>

                  </thead>


                  <tbody>

                    {filteredScreenings.length > 0 ? (

                      filteredScreenings.map((record, index) => (

                        <motion.tr
                          key={record.id}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.07 }}
                        >

                          <td>

                            <div className="table-patient">

                              <div className="patient-avatar">
                                {record.name.charAt(0)}
                              </div>

                              <div>

                                <strong>{record.name}</strong>

                                <span>{record.id}</span>

                              </div>

                            </div>

                          </td>


                          <td>
                            <span className="table-date">
                              {record.date}
                            </span>
                          </td>


                          <td>

                            <span className="classification-label">
                              {record.stage}
                            </span>

                          </td>


                          <td>

                            <span
                              className={`screening-status ${
                                record.status === "Completed"
                                  ? "completed"
                                  : "pending"
                              }`}
                            >

                              <span />

                              {record.status}

                            </span>

                          </td>

                        </motion.tr>

                      ))

                    ) : (

                      <tr>
                        <td colSpan="4" className="empty-search">
                          No matching screening records found.
                        </td>
                      </tr>

                    )}

                  </tbody>

                </table>

              </div>


              <div className="table-footer">

                <span>
                  Showing {filteredScreenings.length} of{" "}
                  {recentScreenings.length} demonstration records
                </span>

                <Link to="/history">
                  Explore History <ArrowRight size={14} />
                </Link>

              </div>

            </div>



            {/* SCREENING ACTIVITY */}

            <motion.div
              className="dashboard-panel activity-panel"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >

              <div className="panel-header activity-heading">

                <div>

                  <span className="section-eyebrow">
                    ANALYTICS
                  </span>

                  <h2>Screening Activity</h2>

                  <p>Weekly activity overview.</p>

                </div>


                <div className="activity-menu">
                  <MoreHorizontal size={20} />
                </div>

              </div>


              <div className="activity-summary">

                <div>

                  <strong>256</strong>

                  <span>Total Screenings</span>

                </div>


                <div className="activity-trend">
                  <TrendingUp size={15} />
                  +18 this month
                </div>

              </div>


              {/* BAR CHART */}

              <div className="activity-chart">

                <div className="chart-grid-lines">

                  <span />
                  <span />
                  <span />
                  <span />

                </div>


                <div className="chart-bars">

                  {weeklyActivity.map((item, index) => (

                    <div
                      className="chart-bar-column"
                      key={item.day}
                    >

                      <div className="chart-bar-track">

                        <motion.div
                          className={`chart-bar ${
                            index === 5 ? "chart-bar-highlight" : ""
                          }`}
                          initial={{ height: 0 }}
                          whileInView={{
                            height: `${item.value}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.9,
                            delay: index * 0.08,
                            ease: "easeOut",
                          }}
                        />

                      </div>

                      <span>{item.day}</span>

                    </div>

                  ))}

                </div>

              </div>


              <div className="activity-chart-footer">

                <div>
                  <span className="chart-legend-dot" />
                  Screening activity
                </div>

                <span>Illustrative data</span>

              </div>


            </motion.div>

          </section>



          {/* BOTTOM AI CTA */}

          <motion.section
            className="dashboard-ai-banner"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <div className="ai-banner-decoration" />
            <div className="ai-banner-decoration second" />


            <div className="ai-banner-content">

              <div className="ai-banner-icon">
                <BrainCircuit size={29} />
              </div>


              <div>

                <span>INTELLIGENT RETINAL SCREENING</span>

                <h2>
                  Better Insights. <strong>Better Eye Care.</strong>
                </h2>

                <p>
                  Use DRVision to support preliminary retinal
                  screening and organize patient information.
                  Clinical decisions remain with qualified doctors.
                </p>

              </div>

            </div>


            <Link to="/screening" className="ai-banner-button">

              Start Screening

              <ArrowRight size={18} />

            </Link>

          </motion.section>



          {/* FOOTER */}

          <footer className="dashboard-footer">

            <div>
              © 2026 DRVision. All rights reserved.
            </div>

            <div>
              <ShieldCheck size={15} />
              AI assists. Doctors decide.
            </div>

          </footer>


        </div>

      </main>

    </div>

  );

};


export default Dashboard;