const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let task = [];
let id = 1;

app.get('/checkserver', (req, res) => {
  res.send('Server is in good condition');
});

app.get('/api/task', (req, res) => {
  res.json(task);
});

app.post('/api/task', (req, res) => {
  const date = new Date();
  const { title, content } = req.body;
  const newTask = { id: id++, title, content, date };
  task.push(newTask);
  res.status(201).json(newTask);
});

app.put('/api/task/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, content } = req.body;
  const t = task.find(t => t.id === taskId);
  if (t) {
    t.title = title;
    t.content = content;
    t.date = new Date();
    res.json(t);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

app.delete('/api/task/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  task = task.filter(t => t.id !== taskId);
  res.status(204).end();
});

// Listen on all interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://192.168.1.6:${PORT}`);
});
