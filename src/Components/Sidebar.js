import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ currentTab, setCurrentTab }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <>
      <div className="d-flex flex-column bg-light p-3 border-end h-100">
        <h4 className="mb-4">Task Manager</h4>

        <ul className="nav nav-pills flex-column gap-2">
          <li className="nav-item">
            <button
              className={`nav-link text-start ${currentTab === "profile" ? "active" : ""}`}
              onClick={() => setCurrentTab("profile")}
            >
              👤 Profile
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link text-start ${currentTab === "tasks" ? "active" : ""}`}
              onClick={() => setCurrentTab("tasks")}
            >
              ✅ Task List
            </button>
          </li>
          <li className="nav-item mt-auto">
            <button
              className="nav-link text-start text-danger"
              onClick={handleLogout}
            >
              🔒 Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to logout?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  No
                </button>
                <button className="btn btn-danger" onClick={confirmLogout}>
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
