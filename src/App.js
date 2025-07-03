import React, { useCallback, useEffect, useState, lazy, Suspense } from "react";

// Lazy load components
const AddTaskForm = lazy(() => import("../src/Components/AddtaskForm"));
const TaskList = lazy(() => import("../src/Components/TaskList"));
const Sidebar = lazy(() => import("../src/Components/Sidebar"));

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [currentTab, setCurrentTab] = useState("profile");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Memoized handlers
  const handleAddTask = useCallback((task) => {
    if (editTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editTask.id ? { ...task, id: editTask.id } : t))
      );
      setEditTask(null);
    } else {
      setTasks((prev) => [...prev, task]);
    }
  }, [editTask]);

  const handleDelete = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const handleToggle = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const handleEdit = useCallback((task) => {
    setEditTask(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
      <div className="container-fluid">
        <div className="row min-vh-100">
          {/* Sidebar */}
          <div className="col-md-3 col-lg-2 p-0 bg-light">
            <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
          </div>

          {/* Main Content */}
          <div className="col-md-9 col-lg-10 p-4">
            {currentTab === "profile" && (
              <div className="card border rounded p-4 shadow-sm">
                <h3 className="mb-4 text-primary">👤 User Profile</h3>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Name</label>
                    <div className="form-control">Mahendran</div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Date of Birth</label>
                    <div className="form-control">1995-08-12</div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Position</label>
                    <div className="form-control">Frontend Developer</div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Gender</label>
                    <div className="form-control">Male</div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Pending Tasks</label>
                    <div className="form-control bg-warning-subtle">5</div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Completed Tasks</label>
                    <div className="form-control bg-success-subtle">10</div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Overall Tasks</label>
                    <div className="form-control bg-info-subtle">15</div>
                  </div>
                </div>
              </div>
            )}

            {currentTab === "tasks" && (
              <>
                <AddTaskForm onTaskAdded={handleAddTask} />
                <TaskList
                  tasks={tasks}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default App;
