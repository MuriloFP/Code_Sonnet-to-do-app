const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// For Vercel, we need to use /tmp directory for file storage
const DATA_FILE = path.join('/tmp', 'todos.json');

// Helper functions
const readTodos = async () => {
  try {
    await fs.ensureFile(DATA_FILE);
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

const writeTodos = async (todos) => {
  await fs.ensureFile(DATA_FILE);
  await fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2));
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method, query } = req;
  const { id } = query;

  try {
    switch (method) {
      case 'GET':
        // GET /api/todos - Get all todos
        const todos = await readTodos();
        return res.status(200).json(todos);

      case 'POST':
        // POST /api/todos - Create a new todo
        const { text } = req.body;
        if (!text || text.trim() === '') {
          return res.status(400).json({ error: 'Todo text is required' });
        }

        const allTodos = await readTodos();
        const newTodo = {
          id: uuidv4(),
          text: text.trim(),
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        allTodos.push(newTodo);
        await writeTodos(allTodos);
        return res.status(201).json(newTodo);

      case 'PUT':
        // PUT /api/todos/[id] - Update a todo
        if (!id) {
          return res.status(400).json({ error: 'Todo ID is required' });
        }

        const { text: updateText, completed } = req.body;
        const todosToUpdate = await readTodos();
        const todoIndex = todosToUpdate.findIndex(todo => todo.id === id);

        if (todoIndex === -1) {
          return res.status(404).json({ error: 'Todo not found' });
        }

        const updatedTodo = {
          ...todosToUpdate[todoIndex],
          ...(updateText !== undefined && { text: updateText.trim() }),
          ...(completed !== undefined && { completed }),
          updatedAt: new Date().toISOString()
        };

        todosToUpdate[todoIndex] = updatedTodo;
        await writeTodos(todosToUpdate);
        return res.status(200).json(updatedTodo);

      case 'DELETE':
        if (id) {
          // DELETE /api/todos/[id] - Delete a specific todo
          const todosToDelete = await readTodos();
          const filteredTodos = todosToDelete.filter(todo => todo.id !== id);

          if (filteredTodos.length === todosToDelete.length) {
            return res.status(404).json({ error: 'Todo not found' });
          }

          await writeTodos(filteredTodos);
          return res.status(204).end();
        } else {
          // DELETE /api/todos - Delete all completed todos
          const allTodosToFilter = await readTodos();
          const activeTodos = allTodosToFilter.filter(todo => !todo.completed);
          await writeTodos(activeTodos);
          return res.status(200).json({ deletedCount: allTodosToFilter.length - activeTodos.length });
        }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}