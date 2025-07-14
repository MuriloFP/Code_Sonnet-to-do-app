import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './TodoItem.css';

const TodoItem = ({ todo, onToggle, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isDeleting, setIsDeleting] = useState(false);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = async () => {
    const trimmedText = editText.trim();
    if (trimmedText && trimmedText !== todo.text) {
      await onUpdate(todo.id, { text: trimmedText });
    }
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(todo.id);
    } catch (error) {
      setIsDeleting(false);
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggle = () => {
    onToggle(todo.id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <motion.div 
      className={`todo-item ${todo.completed ? 'completed' : ''} ${isDeleting ? 'deleting' : ''}`}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, x: -100 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="todo-content">
        <motion.button
          className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
          onClick={handleToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          <motion.div
            className="checkbox-inner"
            initial={false}
            animate={{
              scale: todo.completed ? 1 : 0,
              opacity: todo.completed ? 1 : 0
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            ✓
          </motion.div>
        </motion.button>

        <div className="todo-text-container">
          {isEditing ? (
            <div className="edit-container">
              <input
                ref={editInputRef}
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleSave}
                className="edit-input"
                maxLength={500}
              />
            </div>
          ) : (
            <div className="text-display">
              <motion.p 
                className={`todo-text ${todo.completed ? 'completed-text' : ''}`}
                layout
              >
                {todo.text}
              </motion.p>
              <div className="todo-meta">
                <span className="todo-date">
                  {todo.updatedAt !== todo.createdAt ? 'Updated' : 'Created'} {formatDate(todo.updatedAt)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="todo-actions">
        {!isEditing && (
          <>
            <motion.button
              className="btn btn-ghost btn-sm action-btn edit-btn"
              onClick={handleEdit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Edit todo"
            >
              <span className="action-icon">✏️</span>
            </motion.button>
            
            <motion.button
              className="btn btn-ghost btn-sm action-btn delete-btn"
              onClick={handleDelete}
              disabled={isDeleting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Delete todo"
            >
              {isDeleting ? (
                <span className="loading-spinner-sm" />
              ) : (
                <span className="action-icon">🗑️</span>
              )}
            </motion.button>
          </>
        )}
        
        {isEditing && (
          <div className="edit-actions">
            <motion.button
              className="btn btn-primary btn-sm"
              onClick={handleSave}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!editText.trim()}
            >
              Save
            </motion.button>
            <motion.button
              className="btn btn-secondary btn-sm"
              onClick={handleCancel}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TodoItem;