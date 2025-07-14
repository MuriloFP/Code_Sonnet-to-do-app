import React from 'react';
import { motion } from 'framer-motion';
import './TodoFilters.css';

const TodoFilters = ({ currentFilter, onFilterChange, filterOptions }) => {
  const filters = [
    { key: filterOptions.ALL, label: 'All', icon: '📋' },
    { key: filterOptions.ACTIVE, label: 'Active', icon: '⏳' },
    { key: filterOptions.COMPLETED, label: 'Completed', icon: '✅' }
  ];

  return (
    <motion.div 
      className="todo-filters"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="filters-container">
        <h3 className="filters-title">Filter tasks</h3>
        <div className="filter-buttons" role="tablist" aria-label="Filter todos">
          {filters.map((filter) => (
            <motion.button
              key={filter.key}
              className={`filter-btn ${currentFilter === filter.key ? 'active' : ''}`}
              onClick={() => onFilterChange(filter.key)}
              role="tab"
              aria-selected={currentFilter === filter.key}
              aria-controls="todo-list"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="filter-icon" aria-hidden="true">
                {filter.icon}
              </span>
              <span className="filter-label">{filter.label}</span>
              {currentFilter === filter.key && (
                <motion.div
                  className="active-indicator"
                  layoutId="activeFilter"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TodoFilters;