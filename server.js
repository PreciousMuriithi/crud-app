const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.')); // serve index.html and any static files

const DB_FILE = './db.json';

// Ensure db.json exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ students: [] }, null, 2));
}

// Helper functions
function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// --- ROUTES ---

// Get all students
app.get('/api/students', (req, res) => {
  res.json(readDB().students);
});

// Add a student
app.post('/api/students', (req, res) => {
  const db = readDB();
  const { name, age } = req.body;
  if (!name || !age) return res.status(400).json({ error: 'Missing fields' });
  const newStudent = { id: Date.now(), name, age };
  db.students.push(newStudent);
  writeDB(db);
  res.status(201).json(newStudent);
});

// Delete a student
app.delete('/api/students/:id', (req, res) => {
  const db = readDB();
  db.students = db.students.filter(s => s.id != req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// --- Start server ---
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
