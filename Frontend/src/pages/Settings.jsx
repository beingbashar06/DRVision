import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  UserRound,
  Bell,
  Lock,
  ShieldCheck,
  Save,
  Mail,
  Phone,
  MapPin,
  Building2,
  Camera,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Settings as SettingsIcon,
  Monitor,
  CalendarDays,
  Trash2,
  X,
  KeyRound,
  Smartphone,
  Globe,
  ArrowRight,
  Activity,
} from "lucide-react";

import WorkspaceLayout from "../components/WorkspaceLayout";
import "./ReportsSettings.css";


const defaultProfile = {

  name: "User Name",

  email: "user@example.com",

  phone: "",

  role: "Healthcare Professional",

  organization: "",

  location: "",

};


const defaultNotifications = {

  email: true,

  screening: true,

  updates: false,

  security: true,

};


const defaultAccount = {

  language: "English",

  dateFormat: "DD MMM YYYY",

  dashboard: "Dashboard",

  compactMode: false,

};


export default function Settings() {


  // ACTIVE TAB

  const [activeTab, setActiveTab] = useState("profile");


  // PROFILE

  const [profile, setProfile] = useState(() => {

    try {

      return {
        ...defaultProfile,
        ...JSON.parse(localStorage.getItem("drvision_profile") || "{}"),
      };

    } catch {

      return defaultProfile;

    }

  });


  // NOTIFICATIONS

  const [notifications, setNotifications] = useState(() => {

    try {

      return {
        ...defaultNotifications,
        ...JSON.parse(localStorage.getItem("drvision_notifications") || "{}"),
      };

    } catch {

      return defaultNotifications;

    }

  });


  // ACCOUNT PREFERENCES

  const [account, setAccount] = useState(() => {

    try {

      return {
        ...defaultAccount,
        ...JSON.parse(localStorage.getItem("drvision_account") || "{}"),
      };

    } catch {

      return defaultAccount;

    }

  });


  // PASSWORD

  const [password, setPassword] = useState({

    current: "",

    newPassword: "",

    confirm: "",

  });


  const [showPasswords, setShowPasswords] = useState({

    current: false,

    newPassword: false,

    confirm: false,

  });


  // MESSAGE

  const [message, setMessage] = useState({

    text: "",

    type: "success",

  });


  // AUTO DISMISS MESSAGE

  useEffect(() => {

    if (!message.text) return;

    const timer = setTimeout(() => {

      setMessage({ text: "", type: "success" });

    }, 4000);

    return () => clearTimeout(timer);

  }, [message]);


  // SETTINGS TABS

  const tabs = [

    {
      id: "profile",
      name: "Profile Information",
      description: "Personal details",
      icon: UserRound,
    },

    {
      id: "notifications",
      name: "Notifications",
      description: "Manage alerts",
      icon: Bell,
    },

    {
      id: "security",
      name: "Security",
      description: "Password and protection",
      icon: Lock,
    },

    {
      id: "account",
      name: "Account Settings",
      description: "Account preferences",
      icon: ShieldCheck,
    },

  ];


  // SHOW MESSAGE

  const showMessage = (text, type = "success") => {

    setMessage({ text, type });

  };


  // SAVE PROFILE

  const saveProfile = (e) => {

    e.preventDefault();

    localStorage.setItem(
      "drvision_profile",
      JSON.stringify(profile)
    );

    showMessage("Profile information saved successfully.");

  };


  // SAVE NOTIFICATIONS

  const saveNotifications = () => {

    localStorage.setItem(
      "drvision_notifications",
      JSON.stringify(notifications)
    );

    showMessage("Notification preferences saved successfully.");

  };


  // SAVE ACCOUNT

  const saveAccount = (e) => {

    e.preventDefault();

    localStorage.setItem(
      "drvision_account",
      JSON.stringify(account)
    );

    showMessage("Account preferences saved successfully.");

  };


  // PASSWORD VALIDATION

  const savePassword = (e) => {

    e.preventDefault();


    if (!password.current.trim()) {

      showMessage("Please enter your current password.", "error");

      return;

    }


    if (password.newPassword.length < 8) {

      showMessage(
        "New password must contain at least 8 characters.",
        "error"
      );

      return;

    }


    if (password.newPassword !== password.confirm) {

      showMessage(
        "New password and confirmation do not match.",
        "error"
      );

      return;

    }


    if (password.current === password.newPassword) {

      showMessage(
        "Your new password must be different from the current password.",
        "error"
      );

      return;

    }


    showMessage(
      "Password validation successful. Backend authentication is required to update your actual password."
    );


    setPassword({

      current: "",

      newPassword: "",

      confirm: "",

    });

  };


  // UPDATE PROFILE FIELD

  const updateProfile = (key, value) => {

    setProfile((prev) => ({

      ...prev,

      [key]: value,

    }));

  };


  // UPDATE NOTIFICATION

  const toggleNotification = (key) => {

    setNotifications((prev) => ({

      ...prev,

      [key]: !prev[key],

    }));

  };


  // PASSWORD FIELD

  const passwordField = (key, label, placeholder) => {

    const visible = showPasswords[key];

    return (

      <div className="settings-field">

        <label>{label}</label>

        <div className="settings-password-input">

          <input
            required
            type={visible ? "text" : "password"}
            value={password[key]}
            placeholder={placeholder}
            onChange={(e) =>
              setPassword((prev) => ({
                ...prev,
                [key]: e.target.value,
              }))
            }
          />

          <button
            type="button"
            onClick={() =>
              setShowPasswords((prev) => ({
                ...prev,
                [key]: !prev[key],
              }))
            }
          >

            {visible
              ? <EyeOff size={18} />
              : <Eye size={18} />
            }

          </button>

        </div>

      </div>

    );

  };


  return (

    <WorkspaceLayout title="Settings">

      <div className="settings-page">


        {/* HEADER */}

        <motion.section
          className="settings-page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >

          <div>

            <span className="rs-eyebrow">
              ACCOUNT MANAGEMENT
            </span>

            <h1>
              Profile & <span>Settings.</span>
            </h1>

            <p>
              Manage your personal information, security and preferences.
            </p>

          </div>

        </motion.section>



        {/* MESSAGE */}

        <AnimatePresence>

          {message.text && (

            <motion.div
              className={`settings-message ${
                message.type === "error" ? "error" : "success"
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >

              {message.type === "error"
                ? <AlertCircle size={19} />
                : <CheckCircle2 size={19} />
              }

              <span>{message.text}</span>

              <button
                onClick={() =>
                  setMessage({ text: "", type: "success" })
                }
              >
                <X size={17} />
              </button>

            </motion.div>

          )}

        </AnimatePresence>



        {/* SETTINGS LAYOUT */}

        <div className="settings-layout">


          {/* LEFT SIDEBAR */}

          <aside className="settings-navigation">


            <div className="settings-user-card">

              <div className="settings-avatar">

                {profile.name.charAt(0).toUpperCase()}

                <span />

              </div>

              <h3>{profile.name}</h3>

              <p>{profile.role}</p>

              <span className="settings-user-status">
                <i />
                Active Account
              </span>

            </div>



            <span className="settings-nav-label">
              GENERAL SETTINGS
            </span>


            <div className="settings-tabs">

              {tabs.map((tab) => {

                const Icon = tab.icon;

                return (

                  <button
                    key={tab.id}
                    onClick={() => {

                      setActiveTab(tab.id);

                      setMessage({
                        text: "",
                        type: "success",
                      });

                    }}
                    className={`settings-tab ${
                      activeTab === tab.id ? "active" : ""
                    }`}
                  >

                    <div className="settings-tab-icon">
                      <Icon size={19} />
                    </div>

                    <div>

                      <strong>{tab.name}</strong>

                      <span>{tab.description}</span>

                    </div>

                    <ArrowRight size={15} />

                  </button>

                );

              })}

            </div>



            {/* HELP CARD */}

            <div className="settings-help-card">

              <ShieldCheck size={23} />

              <h4>Your Privacy Matters</h4>

              <p>
                DRVision is designed to support secure
                and responsible healthcare workflows.
              </p>

            </div>

          </aside>



          {/* RIGHT CONTENT */}

          <main className="settings-content">


            <AnimatePresence mode="wait">


              {/* =================================
                  PROFILE INFORMATION
              ================================= */}

              {activeTab === "profile" && (

                <motion.div
                  key="profile"
                  className="settings-section"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                >

                  <div className="settings-section-header">

                    <div className="settings-section-icon">
                      <UserRound size={22} />
                    </div>

                    <div>

                      <h2>Profile Information</h2>

                      <p>
                        Update your personal and professional details.
                      </p>

                    </div>

                  </div>



                  {/* PROFILE AVATAR */}

                  <div className="settings-profile-preview">

                    <div className="settings-large-avatar">
                      {profile.name.charAt(0).toUpperCase()}
                    </div>

                    <div>

                      <h3>{profile.name}</h3>

                      <p>{profile.email}</p>

                      <span>
                        Profile information is stored in this browser preview.
                      </span>

                    </div>

                  </div>



                  <form onSubmit={saveProfile}>

                    <div className="settings-form-grid">


                      <div className="settings-field">

                        <label>Full Name</label>

                        <div className="settings-input-icon">

                          <UserRound size={17} />

                          <input
                            required
                            value={profile.name}
                            onChange={(e) =>
                              updateProfile("name", e.target.value)
                            }
                            placeholder="Enter your full name"
                          />

                        </div>

                      </div>



                      <div className="settings-field">

                        <label>Email Address</label>

                        <div className="settings-input-icon">

                          <Mail size={17} />

                          <input
                            required
                            type="email"
                            value={profile.email}
                            onChange={(e) =>
                              updateProfile("email", e.target.value)
                            }
                            placeholder="Enter your email"
                          />

                        </div>

                      </div>



                      <div className="settings-field">

                        <label>Phone Number</label>

                        <div className="settings-input-icon">

                          <Phone size={17} />

                          <input
                            type="tel"
                            value={profile.phone}
                            onChange={(e) =>
                              updateProfile("phone", e.target.value)
                            }
                            placeholder="Enter phone number"
                          />

                        </div>

                      </div>



                      <div className="settings-field">

                        <label>Professional Role</label>

                        <select
                          value={profile.role}
                          onChange={(e) =>
                            updateProfile("role", e.target.value)
                          }
                        >

                          <option>Healthcare Professional</option>

                          <option>Doctor</option>

                          <option>Medical Student</option>

                          <option>Researcher</option>

                        </select>

                      </div>



                      <div className="settings-field">

                        <label>Organization</label>

                        <div className="settings-input-icon">

                          <Building2 size={17} />

                          <input
                            value={profile.organization}
                            onChange={(e) =>
                              updateProfile("organization", e.target.value)
                            }
                            placeholder="Hospital / Institution"
                          />

                        </div>

                      </div>



                      <div className="settings-field">

                        <label>Location</label>

                        <div className="settings-input-icon">

                          <MapPin size={17} />

                          <input
                            value={profile.location}
                            onChange={(e) =>
                              updateProfile("location", e.target.value)
                            }
                            placeholder="City, Country"
                          />

                        </div>

                      </div>


                    </div>


                    <div className="settings-form-footer">

                      <button
                        type="submit"
                        className="settings-save-button"
                      >

                        <Save size={17} />

                        Save Profile

                      </button>

                    </div>

                  </form>

                </motion.div>

              )}



              {/* =================================
                  NOTIFICATIONS
              ================================= */}

              {activeTab === "notifications" && (

                <motion.div
                  key="notifications"
                  className="settings-section"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                >

                  <div className="settings-section-header">

                    <div className="settings-section-icon blue">
                      <Bell size={22} />
                    </div>

                    <div>

                      <h2>Notification Preferences</h2>

                      <p>
                        Choose which notifications you want to receive.
                      </p>

                    </div>

                  </div>



                  <div className="settings-notification-group">

                    <span className="settings-group-label">
                      EMAIL & PLATFORM NOTIFICATIONS
                    </span>


                    {[
                      [
                        "email",
                        Mail,
                        "Email Notifications",
                        "Receive important account updates through email.",
                      ],
                      [
                        "screening",
                        Activity,
                        "Screening Updates",
                        "Get notified when screening results are available.",
                      ],
                      [
                        "security",
                        ShieldCheck,
                        "Security Alerts",
                        "Receive important account and security alerts.",
                      ],
                      [
                        "updates",
                        Globe,
                        "Product Updates",
                        "Stay informed about new DRVision features.",
                      ],
                    ].map(([key, Icon, title, description]) => (

                      <div className="settings-notification-row" key={key}>

                        <div className="settings-notification-icon">
                          <Icon size={19} />
                        </div>

                        <div className="settings-notification-info">

                          <h3>{title}</h3>

                          <p>{description}</p>

                        </div>


                        <button
                          type="button"
                          role="switch"
                          aria-checked={notifications[key]}
                          aria-label={title}
                          onClick={() => toggleNotification(key)}
                          className={`settings-switch ${
                            notifications[key] ? "on" : ""
                          }`}
                        >

                          <span />

                        </button>

                      </div>

                    ))}

                  </div>



                  <div className="settings-form-footer">

                    <button
                      onClick={saveNotifications}
                      className="settings-save-button"
                    >

                      <Save size={17} />

                      Save Preferences

                    </button>

                  </div>

                </motion.div>

              )}



              {/* =================================
                  SECURITY
              ================================= */}

              {activeTab === "security" && (

                <motion.div
                  key="security"
                  className="settings-section"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                >

                  <div className="settings-section-header">

                    <div className="settings-section-icon purple">
                      <Lock size={22} />
                    </div>

                    <div>

                      <h2>Security Settings</h2>

                      <p>
                        Manage your password and account protection.
                      </p>

                    </div>

                  </div>



                  {/* SECURITY CARD */}

                  <div className="settings-security-card">

                    <div className="settings-security-icon">
                      <ShieldCheck size={25} />
                    </div>

                    <div>

                      <h3>Account Protection</h3>

                      <p>
                        Keep your account credentials private and
                        use a strong password.
                      </p>

                    </div>

                    <span>PREVIEW</span>

                  </div>



                  <form
                    onSubmit={savePassword}
                    className="settings-password-form"
                  >

                    <h3>Change Password</h3>

                    <p>
                      Enter your current password and choose a new one.
                    </p>


                    {passwordField(
                      "current",
                      "Current Password",
                      "Enter current password"
                    )}


                    {passwordField(
                      "newPassword",
                      "New Password",
                      "Enter new password"
                    )}


                    {passwordField(
                      "confirm",
                      "Confirm New Password",
                      "Confirm new password"
                    )}


                    <div className="settings-password-hint">

                      <CheckCircle2 size={16} />

                      Password must contain at least 8 characters.

                    </div>


                    <button
                      type="submit"
                      className="settings-save-button"
                    >

                      <Lock size={17} />

                      Update Password

                    </button>

                  </form>



                  {/* SESSION INFORMATION */}

                  <div className="settings-session-card">

                    <div className="settings-session-heading">

                      <Smartphone size={21} />

                      <div>

                        <h3>Current Session</h3>

                        <p>Browser session information</p>

                      </div>

                    </div>


                    <div className="settings-session-info">

                      <Monitor size={17} />

                      <span>Current browser</span>

                      <strong>Active</strong>

                    </div>

                  </div>

                </motion.div>

              )}



              {/* =================================
                  ACCOUNT SETTINGS
              ================================= */}

              {activeTab === "account" && (

                <motion.div
                  key="account"
                  className="settings-section"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                >

                  <div className="settings-section-header">

                    <div className="settings-section-icon">
                      <ShieldCheck size={22} />
                    </div>

                    <div>

                      <h2>Account Settings</h2>

                      <p>
                        Customize your DRVision workspace preferences.
                      </p>

                    </div>

                  </div>



                  {/* ACCOUNT PREFERENCES */}

                  <div className="settings-account-group">

                    <span className="settings-group-label">
                      WORKSPACE PREFERENCES
                    </span>



                    <div className="settings-field">

                      <label>Language</label>

                      <div className="settings-input-icon">

                        <Globe size={17} />

                        <select
                          value={account.language}
                          onChange={(e) =>
                            setAccount({
                              ...account,
                              language: e.target.value,
                            })
                          }
                        >

                          <option>English</option>

                        </select>

                      </div>

                    </div>



                    <div className="settings-field">

                      <label>Date Format</label>

                      <div className="settings-input-icon">

                        <CalendarDays size={17} />

                        <select
                          value={account.dateFormat}
                          onChange={(e) =>
                            setAccount({
                              ...account,
                              dateFormat: e.target.value,
                            })
                          }
                        >

                          <option>DD MMM YYYY</option>

                          <option>DD/MM/YYYY</option>

                          <option>MM/DD/YYYY</option>

                          <option>YYYY-MM-DD</option>

                        </select>

                      </div>

                    </div>



                    <div className="settings-field">

                      <label>Default Dashboard Page</label>

                      <div className="settings-input-icon">

                        <Activity size={17} />

                        <select
                          value={account.dashboard}
                          onChange={(e) =>
                            setAccount({
                              ...account,
                              dashboard: e.target.value,
                            })
                          }
                        >

                          <option>Dashboard</option>

                          <option>Patients</option>

                          <option>History</option>

                          <option>Reports</option>

                        </select>

                      </div>

                    </div>



                    <div className="settings-account-toggle">

                      <div className="settings-notification-icon">
                        <Monitor size={19} />
                      </div>

                      <div className="settings-notification-info">

                        <h3>Compact Table View</h3>

                        <p>
                          Use a more compact layout for data tables.
                        </p>

                      </div>


                      <button
                        type="button"
                        role="switch"
                        aria-checked={account.compactMode}
                        onClick={() =>
                          setAccount({
                            ...account,
                            compactMode: !account.compactMode,
                          })
                        }
                        className={`settings-switch ${
                          account.compactMode ? "on" : ""
                        }`}
                      >

                        <span />

                      </button>

                    </div>

                  </div>



                  <div className="settings-form-footer">

                    <button
                      onClick={saveAccount}
                      className="settings-save-button"
                    >

                      <Save size={17} />

                      Save Account Settings

                    </button>

                  </div>



                  {/* ACCOUNT INFORMATION */}

                  <div className="settings-account-info">

                    <div className="settings-account-info-icon">
                      <ShieldCheck size={23} />
                    </div>

                    <div>

                      <h3>Account Information</h3>

                      <p>
                        Your DRVision account preferences are stored
                        locally in this browser preview. Secure
                        account management requires backend integration.
                      </p>

                    </div>

                  </div>



                  {/* DANGER ZONE */}

                  <div className="settings-danger-zone">

                    <div>

                      <h3>
                        <Trash2 size={18} />
                        Danger Zone
                      </h3>

                      <p>
                        Account deletion is unavailable in this preview.
                        It requires secure backend authentication and
                        confirmation.
                      </p>

                    </div>


                    <button disabled>
                      Delete Account
                    </button>

                  </div>

                </motion.div>

              )}

            </AnimatePresence>

          </main>

        </div>

      </div>

    </WorkspaceLayout>

  );

}