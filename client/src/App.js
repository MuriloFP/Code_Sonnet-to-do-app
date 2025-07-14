import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import TodoStats from './components/TodoStats';
import './App.css';

const FILTER_OPTIONS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(FILTER_OPTIONS.ALL);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos from API
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/todos');
      setTodos(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos. Please try again.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load todos on component mount
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Add new todo
  const addTodo = async (text) => {
    try {
      const response = await axios.post('/api/todos', { text });
      setTodos(prev => [...prev, response.data]);
      setError(null);
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      console.error('Error adding todo:', err);
    }
  };

  // Update todo
  const updateTodo = async (id, updates) => {
    try {
      const response = await axios.put(`/api/todos/${id}`, updates);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? response.data : todo
      ));
      setError(null);
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Error updating todo:', err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error('Error deleting todo:', err);
    }
  };

  // Toggle todo completion
  const toggleTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      updateTodo(id, { completed: !todo.completed });
    }
  };

  // Clear completed todos
  const clearCompleted = async () => {
    try {
      await axios.delete('/api/todos');
      setTodos(prev => prev.filter(todo => !todo.completed));
      setError(null);
    } catch (err) {
      setError('Failed to clear completed todos. Please try again.');
      console.error('Error clearing completed todos:', err);
    }
  };

  // Filter todos based on current filter
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case FILTER_OPTIONS.ACTIVE:
        return !todo.completed;
      case FILTER_OPTIONS.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  });

  // Calculate stats
  const stats = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length
  };

  return (
    <div className="app">
      <div className="container">
        <motion.header 
          className="app-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="app-title">
            <span className="title-icon">✓</span>
            Todo App
          </h1>
          <p className="app-subtitle">
            Stay organized and get things done
          </p>
        </motion.header>

        <motion.main 
          className="app-main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {error && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <span className="error-icon">⚠️</span>
              {error}
              <button 
                className="btn btn-ghost btn-sm"
                onClick={() => setError(null)}
                aria-label="Dismiss error"
              >
                ✕
              </button>
            </motion.div>
          )}

          <TodoForm onSubmit={addTodo} />

          <TodoStats stats={stats} />

          <TodoFilters 
            currentFilter={filter}
            onFilterChange={setFilter}
            filterOptions={FILTER_OPTIONS}
          />

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner" />
              <p>Loading todos...</p>
            </div>
          ) : (
            <TodoList
              todos={filteredTodos}
              onToggle={toggleTodo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          )}

          {stats.completed > 0 && (
            <motion.div 
              className="clear-completed-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <button
                className="btn btn-secondary btn-sm"
                onClick={clearCompleted}
              >
                Clear {stats.completed} completed {stats.completed === 1 ? 'task' : 'tasks'}
              </button>
            </motion.div>
          )}
        </motion.main>

        <motion.footer 
          className="app-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>
            Made with <span className="heart">♥</span> using React & Node.js
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;