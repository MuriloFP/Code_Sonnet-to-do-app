import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './TodoForm.css';

const TodoForm = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedText = text.trim();
    
    if (!trimmedText) return;

    setIsSubmitting(true);
    try {
      await onSubmit(trimmedText);
      setText('');
    } catch (error) {
      console.error('Error submitting todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.div 
      className="todo-form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <label htmlFor="todo-input" className="sr-only">
            Add a new task
          </label>
          <div className="input-container">
            <input
              id="todo-input"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What needs to be done?"
              className="input todo-input"
              disabled={isSubmitting}
              maxLength={500}
              autoComplete="off"
              autoFocus
            />
            <motion.button
              type="submit"
              disabled={!text.trim() || isSubmitting}
              className="btn btn-primary add-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {isSubmitting ? (
                <span className="btn-loading">
                  <span className="loading-spinner-sm" />
                  Adding...
                </span>
              ) : (
                <span className="btn-content">
                  <span className="btn-icon">+</span>
                  Add Task
                </span>
              )}
            </motion.button>
          </div>
        </div>
        
        {text.length > 400 && (
          <motion.div 
            className="character-count"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {text.length}/500 characters
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default TodoForm;