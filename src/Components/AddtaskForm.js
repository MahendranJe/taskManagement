import React, { useState } from "react";
import { addTodo } from "../services/quoteService";

const AddTaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const isPastDate = (date) => {
    const today = new Date().toISOString().split("T")[0];
    return date < today;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required.");
    if (!dueDate) return alert("Due date is required.");
    if (isPastDate(dueDate)) return alert("Due date cannot be in the past.");

    setLoading(true);
    try {
      const newTask = {
        todo: title,
        completed: false,
        userId: Math.floor(Math.random() * 100) + 1, // 🔒 userId random
      };

      const created = await addTodo(newTask);
      onTaskAdded(created);
      setTitle("");
      setDescription("");
      setDueDate("");
    } catch (err) {
      alert("Failed to add task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
        <h3> Add Task Form </h3>
      <div className="row g-3">
        {/* Title */}
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Due Date */}
        <div className="col-md-6">
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]} // ⛔️ past dates
          />
        </div>

        {/* Submit Button */}
        <div className="col-md-6 d-grid">
          <button className="btn btn-success" type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Task"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTaskForm;
