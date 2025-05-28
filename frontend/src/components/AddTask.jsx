import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTask() {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    duration: "",
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/tasks", task);
      navigate("/");
    } catch (error) {
      // Optionally, you can show an alert if it fails
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Duration (minutes): </label>
          <input
            type="number"
            name="duration"
            value={task.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Completed: </label>
          <input
            type="checkbox"
            name="completed"
            checked={task.completed}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;
