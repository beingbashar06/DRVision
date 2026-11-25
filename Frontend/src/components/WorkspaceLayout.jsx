import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
  Menu,
  X,
  BrainCircuit,
  ArrowUpRight,
  ChevronDown,
  ShieldCheck,
  CircleHelp,
} from "lucide-react";

import "./WorkspaceLayout.css";


export default function WorkspaceLayout({ children, title }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { title: "Patients", icon: Users, path: "/patients" },
    { title: "Screening", icon: ScanEye, path: "/screening" },
    { title: "History", icon: History, path: "/history" },
    { title: "Reports", icon: FileText, path: "/reports" },
    { title: "Settings", icon: Settings, path: "/settings" },
  ];

  return (

    <div className="workspace-layout">

      {sidebarOpen && (
        <div
          className="workspace-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}


      {/* SIDEBAR */}

      <aside className={`workspace-sidebar ${sidebarOpen ? "open" : ""}`}>

        <div className="workspace-brand">

          <Link to="/" className="workspace-logo">

            <div className="workspace-logo-icon">
              <Activity size={25} />
            </div>

            <span>
              DR<span>Vision</span>
            </span>

          </Link>

          <button
            className="workspace-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={21} />
          </button>

        </div>


        <div className="workspace-navigation">

          <p className="workspace-label">WORKSPACE</p>

          {navigation.map((item) => {

            const Icon = item.icon;

            const active = location.pathname === item.path;

            return (

              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`workspace-nav-link ${active ? "active" : ""}`}
              >

                <Icon size={19} />

                <span>{item.title}</span>

                {active && <i />}

              </Link>

            );

          })}


          {/* AI CARD */}

          <div className="workspace-ai-card">

            <div className="workspace-ai-icon">
              <BrainCircuit size={24} />
            </div>

            <span>DRVISION PLATFORM</span>

            <h4>AI Screening</h4>

            <p>
              Start a new retinal screening with intelligent
              image analysis.
            </p>

            <Link to="/screening">
              Start Screening
              <ArrowUpRight size={17} />
            </Link>

          </div>

        </div>


        {/* SIDEBAR BOTTOM */}

        <div className="workspace-sidebar-bottom">

          <div>
            <CircleHelp size={17} />
            Help & Support
          </div>

          <Link to="/">
            <LogOut size={18} />
            Logout
          </Link>

          <p>DRVision · Version 1.0</p>

        </div>

      </aside>


      {/* MAIN */}

      <main className="workspace-main">

        {/* TOPBAR */}

        <header className="workspace-topbar">

          <div className="workspace-topbar-left">

            <button
              className="workspace-menu"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={23} />
            </button>

            <div>

              <div className="workspace-breadcrumb">
                Workspace <span>/</span> {title}
              </div>

              <h2>{title}</h2>

            </div>

          </div>


          <div className="workspace-profile-area">

            <button className="workspace-notification">
              <Bell size={19} />
              <i />
            </button>

            <div className="workspace-profile">

              <div className="workspace-avatar">U</div>

              <div>
                <strong>User Name</strong>
                <span>Healthcare Professional</span>
              </div>

              <ChevronDown size={15} />

            </div>

          </div>

        </header>


        {/* PAGE CONTENT */}

        <div className="workspace-content">
          {children}
        </div>


        {/* FOOTER */}

        <footer className="workspace-footer">

          <span>© 2026 DRVision. All rights reserved.</span>

          <span>
            <ShieldCheck size={15} />
            AI assists. Doctors decide.
          </span>

        </footer>

      </main>

    </div>

  );

}