import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/task";

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
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">TODO</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Task"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Task Details"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingId ? "Update Task" : "Add Task"}
        </button>
      </form>

      {tasks.map((task) => (
        <div key={task.id} className="border p-4 mb-2 rounded">
          <h2 className="text-xl font-semibold">{task.title}</h2>
          <p>{task.content}</p>
          <div className="mt-2 space-x-2">
            <button
              className="bg-yellow-500 text-white px-2 py-1 rounded"
              onClick={() => handleEdit(task)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))} 
    </div>
  );
}

export default App;
// This code is a simple React application that allows users to create, read, update, and delete tasks.
// It uses the Fetch API to interact with a backend server that handles the CRUD operations.
// The application consists of a form for adding and editing tasks, and a list of existing tasks.