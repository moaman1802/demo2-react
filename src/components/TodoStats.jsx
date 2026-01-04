import React from 'react';
import './TodoStats.css';

const TodoStats = ({ todos }) => {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const pending = total - completed;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>📋 Total</h3>
        <p className="stat-number">{total}</p>
      </div>
      <div className="stat-card">
        <h3>✅ Completed</h3>
        <p className="stat-number">{completed}</p>
      </div>
      <div className="stat-card">
        <h3>⏳ Pending</h3>
        <p className="stat-number">{pending}</p>
      </div>
    </div>
  );
};

export default TodoStats;