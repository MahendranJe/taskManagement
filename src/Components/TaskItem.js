import React from "react";

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <h5>{task.title}</h5>
        <p className="mb-1 text-muted">User ID: {task.userId}</p>
        <span
          className={`badge ${task.completed ? "bg-success" : "bg-warning text-dark"}`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <div>
        <button onClick={onToggle} className="btn btn-sm btn-outline-secondary me-2">
          ✅
        </button>
        <button onClick={onEdit} className="btn btn-sm btn-outline-primary me-2">
          ✏️
        </button>
        <button onClick={onDelete} className="btn btn-sm btn-outline-danger">
          🗑️
        </button>
      </div>
    </div>
  );
};

export default React.memo(TaskItem);
