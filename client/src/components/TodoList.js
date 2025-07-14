import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ todos, onToggle, onUpdate, onDelete }) => {
  if (todos.length === 0) {
    return (
      <motion.div 
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="empty-state-icon">📝</div>
        <h3>No tasks yet</h3>
        <p>
          Add your first task above to get started organizing your day!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="todo-list-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="todo-list">
        <AnimatePresence mode="popLayout">
          {todos.map((todo, index) => (
            <motion.div
              key={todo.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  delay: index * 0.05
                }
              }}
              exit={{ 
                opacity: 0, 
                y: -20, 
                scale: 0.95,
                transition: {
                  duration: 0.2
                }
              }}
              whileHover={{ 
                y: -2,
                transition: { type: "spring", stiffness: 400, damping: 17 }
              }}
            >
              <TodoItem
                todo={todo}
                onToggle={onToggle}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TodoList;