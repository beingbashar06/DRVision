import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import PublicScreening from "./pages/PublicScreening";
import Results from "./pages/Results";

import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import History from "./pages/History";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Public Pages */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/screening" element={<PublicScreening />} />

        <Route path="/screening/results" element={<Results />} />

        {/* Registered User Pages */}

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/patients" element={<Patients />} />

        <Route path="/history" element={<History />} />

        <Route path="/reports" element={<Reports />} />

        <Route path="/settings" element={<Settings />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;