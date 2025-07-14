const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data', 'todos.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ensure data directory exists
fs.ensureDirSync(path.dirname(DATA_FILE));

// Initialize data file if it doesn't exist
const initializeDataFile = async () => {
  try {
    await fs.access(DATA_FILE);
  } catch (error) {
    await fs.writeJson(DATA_FILE, []);
  }
};

// Helper functions
const readTodos = async () => {
  try {
    return await fs.readJson(DATA_FILE);
  } catch (error) {
    return [];
  }
};

const writeTodos = async (todos) => {
  await fs.writeJson(DATA_FILE, todos, { spaces: 2 });
};

// Routes

// GET /api/todos - Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await readTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// POST /api/todos - Create a new todo
app.post('/api/todos', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Todo text is required' });
    }

    const todos = await readTodos();
    const newTodo = {
      id: uuidv4(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    todos.push(newTodo);
    await writeTodos(todos);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// PUT /api/todos/:id - Update a todo
app.put('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;

    const todos = await readTodos();
    const todoIndex = todos.findIndex(todo => todo.id === id);

    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const updatedTodo = {
      ...todos[todoIndex],
      ...(text !== undefined && { text: text.trim() }),
      ...(completed !== undefined && { completed }),
      updatedAt: new Date().toISOString()
    };

    todos[todoIndex] = updatedTodo;
    await writeTodos(todos);
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// DELETE /api/todos/:id - Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todos = await readTodos();
    const filteredTodos = todos.filter(todo => todo.id !== id);

    if (filteredTodos.length === todos.length) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    await writeTodos(filteredTodos);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// DELETE /api/todos - Delete all completed todos
app.delete('/api/todos', async (req, res) => {
  try {
    const todos = await readTodos();
    const activeTodos = todos.filter(todo => !todo.completed);
    await writeTodos(activeTodos);
    res.json({ deletedCount: todos.length - activeTodos.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear completed todos' });
  }
});

// Initialize and start server
const startServer = async () => {
  await initializeDataFile();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();