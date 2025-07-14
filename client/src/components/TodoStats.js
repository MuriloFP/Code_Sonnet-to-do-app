import React from 'react';
import { motion } from 'framer-motion';
import './TodoStats.css';

const TodoStats = ({ stats }) => {
  const { total, active, completed } = stats;
  
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  const statsData = [
    {
      label: 'Total',
      value: total,
      icon: '📊',
      color: 'var(--text-primary)',
      bgColor: 'var(--secondary)'
    },
    {
      label: 'Active',
      value: active,
      icon: '⏳',
      color: 'var(--primary)',
      bgColor: 'rgba(99, 102, 241, 0.1)'
    },
    {
      label: 'Completed',
      value: completed,
      icon: '✅',
      color: 'var(--accent)',
      bgColor: 'var(--accent-light)'
    }
  ];

  return (
    <motion.div 
      className="todo-stats"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="stats-container">
        <div className="stats-header">
          <h3 className="stats-title">Progress Overview</h3>
          {total > 0 && (
            <div className="completion-badge">
              <span className="completion-percentage">{completionPercentage}%</span>
              <span className="completion-label">Complete</span>
            </div>
          )}
        </div>

        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-card"
              style={{ 
                '--stat-color': stat.color,
                '--stat-bg-color': stat.bgColor
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: 0.1 + (index * 0.05),
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
              whileHover={{ 
                scale: 1.02,
                y: -2,
                transition: { type: "spring", stiffness: 400, damping: 17 }
              }}
            >
              <div className="stat-icon" aria-hidden="true">
                {stat.icon}
              </div>
              <div className="stat-content">
                <motion.div 
                  className="stat-value"
                  key={stat.value}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {stat.value}
                </motion.div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {total > 0 && (
          <motion.div 
            className="progress-bar-container"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="progress-bar">
              <motion.div 
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.4,
                  ease: "easeOut"
                }}
              />
            </div>
            <div className="progress-text">
              {completed} of {total} tasks completed
            </div>
          </motion.div>
        )}

        {total === 0 && (
          <motion.div 
            className="empty-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <p>Add your first task to see your progress!</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TodoStats;