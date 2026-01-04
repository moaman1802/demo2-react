import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState(() => {
    // Load from localStorage on initial render
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toLocaleString()
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="app">
      <Header />
      
      <div className="container">
        <AddTodo onAdd={addTodo} />
        
        <div className="todo-container">
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </div>

        <TodoStats todos={todos} />

        {todos.length > 0 && (
          <div className="actions">
            <button
              onClick={clearCompleted}
              className="clear-btn"
              disabled={!todos.some(todo => todo.completed)}
            >
              🧹 Clear Completed
            </button>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>💡 Tip: Click on a task to mark it complete</p>
      </footer>
    </div>
  );
};

export default App;