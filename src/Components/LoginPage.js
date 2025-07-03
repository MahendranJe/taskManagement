import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react"; // Optional: Lucide icons

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "TenderSoft" && password === "Tender@Soft") {
      toast.success("Login successful!", { position: "top-center" });
      setTimeout(() => navigate("/App"), 2000); // Navigate after toast
    } else {
      toast.error("Invalid credentials", { position: "top-center" });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4 text-primary">TenderSoft Task List</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </div>

          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <input
              type={showPass ? "text" : "password"}
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="position-absolute end-0 top-50 translate-middle-y px-3 text-muted"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPass((prev) => !prev)}
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default LoginPage;
