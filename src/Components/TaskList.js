import React, { useEffect, useState } from "react";
import { getTodos } from "../services/quoteService";
import TaskItem from "./TaskItem";
import AddTaskForm from "./AddtaskForm"


const TaskList = ({ onEdit }) => {
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // Fetch and normalize task data
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTodos();
        const formattedTasks = data.map((item) => ({
          id: item.id,
          title: item.todo,
          completed: item.completed,
          userId: item.userId,
        }));
        setTasks(formattedTasks);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  // Toggle task completion
  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Filter logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="btn-group mb-4 w-100" role="group">
        <button
          className={`btn ${filter === "All" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => {
            setFilter("All");
            setCurrentPage(1);
          }}
        >
          All
        </button>
        <button
          className={`btn ${filter === "Completed" ? "btn-success" : "btn-outline-success"}`}
          onClick={() => {
            setFilter("Completed");
            setCurrentPage(1);
          }}
        >
          Completed
        </button>
        <button
          className={`btn ${filter === "Pending" ? "btn-warning" : "btn-outline-warning"}`}
          onClick={() => {
            setFilter("Pending");
            setCurrentPage(1);
          }}
        >
          Pending
        </button>
      </div>

      <h3> Task List</h3>

      {/* Task List */}
      {currentTasks.length > 0 ? (
        currentTasks.map((task) => (
          <div className="bg-light rounded p-2 mb-3" key={task.id}>
            <TaskItem
              task={task}
              onToggle={() => handleToggle(task.id)}
              onDelete={() => handleDelete(task.id)}
              onEdit={onEdit}
            />
          </div>
        ))
      ) : (
        <p className="text-center text-muted">No tasks found for "{filter}"</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            {[...Array(totalPages)].map((_, idx) => (
              <li
                key={idx}
                className={`page-item ${currentPage === idx + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => handlePageChange(idx + 1)}>
                  {idx + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default TaskList;
