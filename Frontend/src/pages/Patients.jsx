import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Users,
  UserRound,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  X,
  Calendar,
  Phone,
  Mail,
  Activity,
  MapPin,
  ArrowUpRight,
  UserPlus,
  Venus,
  Mars,
  MoreHorizontal,
} from "lucide-react";

import WorkspaceLayout from "../components/WorkspaceLayout";
import "./Management.css";


const initialPatients = [

  {
    id: "PAT-001",
    name: "Rahul Sharma",
    age: 52,
    gender: "Male",
    phone: "9876543210",
    email: "rahul@example.com",
    condition: "Diabetes Type 2",
    lastVisit: "18 Nov 2026",
  },

  {
    id: "PAT-002",
    name: "Priya Verma",
    age: 45,
    gender: "Female",
    phone: "9876543211",
    email: "priya@example.com",
    condition: "Diabetes Type 1",
    lastVisit: "17 Nov 2026",
  },

  {
    id: "PAT-003",
    name: "Amit Kumar",
    age: 61,
    gender: "Male",
    phone: "9876543212",
    email: "amit@example.com",
    condition: "Diabetes Type 2",
    lastVisit: "16 Nov 2026",
  },

  {
    id: "PAT-004",
    name: "Sneha Gupta",
    age: 49,
    gender: "Female",
    phone: "9876543213",
    email: "sneha@example.com",
    condition: "Diabetes Type 2",
    lastVisit: "15 Nov 2026",
  },

];


const emptyForm = {
  name: "",
  age: "",
  gender: "Male",
  phone: "",
  email: "",
  condition: "",
};


export default function Patients() {

  const [patients, setPatients] = useState(initialPatients);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editing, setEditing] = useState(null);

  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState(emptyForm);


  // SEARCH

  const filteredPatients = patients.filter((patient) =>

    `${patient.name} ${patient.id} ${patient.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())

  );


  // STATISTICS

  const maleCount = patients.filter(
    (p) => p.gender === "Male"
  ).length;

  const femaleCount = patients.filter(
    (p) => p.gender === "Female"
  ).length;


  // ADD PATIENT

  const openAddModal = () => {

    setEditing(null);

    setForm(emptyForm);

    setShowModal(true);

  };


  // EDIT PATIENT

  const openEditModal = (patient) => {

    setEditing(patient.id);

    setForm({
      name: patient.name,
      age: String(patient.age),
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
      condition: patient.condition,
    });

    setShowModal(true);

  };


  // SAVE PATIENT

  const handleSubmit = (e) => {

    e.preventDefault();

    if (editing) {

      setPatients((prev) =>

        prev.map((p) =>

          p.id === editing

            ? { ...p, ...form, age: Number(form.age) }

            : p

        )

      );

    } else {

      const newPatient = {

        ...form,

        id: `PAT-${String(Date.now()).slice(-6)}`,

        age: Number(form.age),

        lastVisit: "Not visited yet",

      };

      setPatients((prev) => [newPatient, ...prev]);

    }

    setShowModal(false);

    setForm(emptyForm);

    setEditing(null);

  };


  // DELETE PATIENT

  const deletePatient = (id) => {

    if (window.confirm("Are you sure you want to delete this patient?")) {

      setPatients((prev) => prev.filter((p) => p.id !== id));

      setSelected(null);

    }

  };


  return (

    <WorkspaceLayout title="Patients">

      <div className="management-page">


        {/* HEADER */}

        <motion.section
          className="management-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >

          <div>

            <span className="management-eyebrow">
              PATIENT MANAGEMENT
            </span>

            <h1>
              Patient <span>Management.</span>
            </h1>

            <p>
              Manage, organize and monitor your patient records
              from one place.
            </p>

          </div>


          <button
            className="management-primary-button"
            onClick={openAddModal}
          >

            <Plus size={19} />

            Add New Patient

            <ArrowUpRight size={17} />

          </button>

        </motion.section>



        {/* STATISTICS */}

        <section className="management-stats">

          <div className="management-stat-card">

            <div className="management-stat-icon teal">
              <Users size={23} />
            </div>

            <span>Total Patients</span>

            <h2>{patients.length}</h2>

            <p>Registered patient records</p>

          </div>


          <div className="management-stat-card">

            <div className="management-stat-icon blue">
              <Mars size={23} />
            </div>

            <span>Male Patients</span>

            <h2>{maleCount}</h2>

            <p>Male patient records</p>

          </div>


          <div className="management-stat-card">

            <div className="management-stat-icon purple">
              <Venus size={23} />
            </div>

            <span>Female Patients</span>

            <h2>{femaleCount}</h2>

            <p>Female patient records</p>

          </div>

        </section>



        {/* PATIENT TABLE */}

        <section className="management-panel">

          <div className="management-panel-header">

            <div>

              <span className="management-eyebrow">
                PATIENT DIRECTORY
              </span>

              <h2>All Patients</h2>

              <p>
                View and manage registered patient information.
              </p>

            </div>


            <div className="management-search">

              <Search size={18} />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search patients..."
              />

              {search && (

                <button onClick={() => setSearch("")}>
                  <X size={15} />
                </button>

              )}

            </div>

          </div>



          {/* TABLE */}

          <div className="management-table-wrapper">

            <table className="management-table">

              <thead>

                <tr>
                  <th>PATIENT</th>
                  <th>PATIENT ID</th>
                  <th>AGE / GENDER</th>
                  <th>CONDITION</th>
                  <th>LAST VISIT</th>
                  <th>ACTIONS</th>
                </tr>

              </thead>


              <tbody>

                {filteredPatients.map((patient, index) => (

                  <motion.tr
                    key={patient.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >

                    <td>

                      <div className="management-patient">

                        <div className="management-patient-avatar">
                          {patient.name.charAt(0)}
                        </div>

                        <div>
                          <strong>{patient.name}</strong>
                          <span>{patient.email}</span>
                        </div>

                      </div>

                    </td>


                    <td>
                      <span className="management-id">
                        {patient.id}
                      </span>
                    </td>


                    <td>

                      <div className="management-age">

                        <strong>{patient.age} years</strong>

                        <span>{patient.gender}</span>

                      </div>

                    </td>


                    <td>
                      <span className="management-condition">
                        {patient.condition}
                      </span>
                    </td>


                    <td>
                      <span className="management-date">
                        {patient.lastVisit}
                      </span>
                    </td>


                    <td>

                      <div className="management-actions">

                        <button
                          className="view"
                          title="View Details"
                          onClick={() => setSelected(patient)}
                        >
                          <Eye size={17} />
                        </button>


                        <button
                          className="edit"
                          title="Edit Patient"
                          onClick={() => openEditModal(patient)}
                        >
                          <Edit size={17} />
                        </button>


                        <button
                          className="delete"
                          title="Delete Patient"
                          onClick={() => deletePatient(patient.id)}
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                    </td>

                  </motion.tr>

                ))}


                {filteredPatients.length === 0 && (

                  <tr>
                    <td colSpan="6" className="management-empty">
                      No patients found.
                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>


          <div className="management-table-footer">

            Showing {filteredPatients.length} of {patients.length} patients

            <span>
              <Activity size={14} />
              Patient records
            </span>

          </div>

        </section>

      </div>



      {/* ADD / EDIT MODAL */}

      <AnimatePresence>

        {showModal && (

          <motion.div
            className="management-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
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
                    <UserPlus size={23} />
                  </div>

                  <h2>
                    {editing ? "Edit Patient" : "Add New Patient"}
                  </h2>

                  <p>
                    Enter the patient's information below.
                  </p>

                </div>


                <button onClick={() => setShowModal(false)}>
                  <X size={21} />
                </button>

              </div>



              <form
                className="management-form"
                onSubmit={handleSubmit}
              >

                {[
                  ["name", "Full Name", "text"],
                  ["age", "Age", "number"],
                  ["phone", "Phone Number", "tel"],
                  ["email", "Email Address", "email"],
                  ["condition", "Medical Condition", "text"],
                ].map(([name, label, type]) => (

                  <div className="management-form-group" key={name}>

                    <label>{label}</label>

                    <input
                      required
                      type={type}
                      min={name === "age" ? 1 : undefined}
                      max={name === "age" ? 120 : undefined}
                      value={form[name]}
                      onChange={(e) =>
                        setForm({ ...form, [name]: e.target.value })
                      }
                    />

                  </div>

                ))}


                <div className="management-form-group">

                  <label>Gender</label>

                  <select
                    value={form.gender}
                    onChange={(e) =>
                      setForm({ ...form, gender: e.target.value })
                    }
                  >

                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>

                  </select>

                </div>


                <div className="management-form-buttons">

                  <button
                    type="button"
                    className="management-cancel"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="management-save"
                  >
                    {editing ? "Save Changes" : "Add Patient"}
                    <ArrowUpRight size={17} />
                  </button>

                </div>

              </form>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>



      {/* PATIENT DETAILS */}

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
              className="management-modal details-modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >

              <div className="management-modal-header">

                <div>

                  <div className="management-modal-icon">
                    <UserRound size={23} />
                  </div>

                  <h2>Patient Details</h2>

                  <p>Patient information and medical records.</p>

                </div>


                <button onClick={() => setSelected(null)}>
                  <X size={21} />
                </button>

              </div>


              <div className="details-patient-heading">

                <div className="details-patient-avatar">
                  {selected.name.charAt(0)}
                </div>

                <div>
                  <h3>{selected.name}</h3>
                  <span>{selected.id}</span>
                </div>

              </div>


              {[
                [Calendar, "Age / Gender", `${selected.age} years / ${selected.gender}`],
                [Phone, "Phone Number", selected.phone],
                [Mail, "Email Address", selected.email],
                [MapPin, "Medical Condition", selected.condition],
                [Activity, "Last Visit", selected.lastVisit],
              ].map(([Icon, label, value]) => (

                <div className="details-row" key={label}>

                  <Icon size={18} />

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