import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://192.168.1.6:5000/api/task"; // Replace with your actual IP


function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchTasks = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ title: "", content: "" });
    setEditingId(null);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setForm({ title: task.title, content: task.content });
    setEditingId(task.id);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  return (
    <div className="container">
      <h1 className="title">📝 Task List</h1>

      <form onSubmit={handleSubmit} className="task-form">
        <input
          className="input"
          placeholder="Task Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="textarea"
          placeholder="Task Details"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <button type="submit" className="submit-button">
          {editingId ? "Update Task" : "Add Task"}
        </button>
      </form>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <h2 className="task-title">{task.title}</h2>
            <p className="task-content">{task.content}</p>
            <div className="button-group">
              <button className="edit-button" onClick={() => handleEdit(task)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDelete(task.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
