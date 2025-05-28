import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    duration: "",
    completed: false,
  });

  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/tasks`);
      const existingTask = response.data.find((t) => t.id.toString() === id);
      if (existingTask) {
        setTask(existingTask);
      } else {
        alert("Task not found");
        navigate("/");
      }
    } catch (error) {
      console.error("Error loading task:", error);
    }
  };

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
      await axios.put(`http://localhost:8080/api/tasks/${id}`, task);
      navigate("/");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input type="text" name="title" value={task.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Duration (minutes): </label>
          <input type="number" name="duration" value={task.duration} onChange={handleChange} required />
        </div>
        <div>
          <label>Completed: </label>
          <input type="checkbox" name="completed" checked={task.completed} onChange={handleChange} />
        </div>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
}

export default EditTask;