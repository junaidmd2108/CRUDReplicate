import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`http://localhost:8080/api/tasks/${id}`);
        fetchTasks(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Task List</h2>
      <Link to="/add">
        <button style={{ marginBottom: "10px" }}>Add Task</button>
      </Link>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Duration</th>
            <th>Completed</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.duration}</td>
                <td>{task.completed ? "Yes" : "No"}</td>
                <td>
                  <Link to={`/edit/${task.id}`}>
                    <button>Edit</button>
                  </Link>
                </td>
                <td>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No tasks found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;