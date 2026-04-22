'use client';

import { useState } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: inputValue,
        completed: false,
        createdAt: new Date(),
      };
      setTodos([newTodo, ...todos]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen todo-bg">
      {/* Header */}
      <div className="header-section">
        <div className="header-content">
          <h1 className="header-title">My Tasks</h1>
          <p className="header-subtitle">Stay organized and boost productivity</p>
          {totalCount > 0 && (
            <div className="progress-section">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                ></div>
              </div>
              <p className="progress-text">
                {completedCount} of {totalCount} completed
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        <div className="max-w-2xl mx-auto">
          {/* Input Section */}
          <div className="input-section">
            <div className="input-container">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a new task..."
                className="todo-input"
              />
              <button
                onClick={addTodo}
                className="add-button"
              >
                +
              </button>
            </div>
          </div>

          {/* Todos List */}
          <div className="todos-container">
            {todos.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">✨</div>
                <h3 className="empty-title">No tasks yet</h3>
                <p className="empty-text">Create your first task to get started!</p>
              </div>
            ) : (
              <div className="todos-list">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`todo-item ${todo.completed ? 'completed' : ''}`}
                  >
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`checkbox-button ${todo.completed ? 'checked' : ''}`}
                      aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
                    >
                      {todo.completed ? '✓' : '○'}
                    </button>
                    <span className={`todo-text ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                      {todo.text}
                    </span>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="delete-button"
                      aria-label="Delete task"
                    >
                      🗑
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stats */}
          {todos.length > 0 && (
            <div className="stats-section">
              <div className="stat-item">
                <span className="stat-label">Total</span>
                <span className="stat-value">{totalCount}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Completed</span>
                <span className="stat-value">{completedCount}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Remaining</span>
                <span className="stat-value">{totalCount - completedCount}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .todo-bg {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding-bottom: 2rem;
        }

        .header-section {
          padding: 3rem 1rem 2rem;
          text-align: center;
          color: white;
        }

        .header-content {
          max-width: 2xl;
          margin: 0 auto;
        }

        .header-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .header-subtitle {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 1.5rem;
        }

        .progress-section {
          margin-top: 1.5rem;
          opacity: 0.95;
        }

        .progress-bar {
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-fill {
          height: 100%;
          background: rgba(255, 255, 255, 0.8);
          transition: width 0.3s ease;
          border-radius: 999px;
        }

        .progress-text {
          font-size: 0.875rem;
          opacity: 0.8;
        }

        .content-wrapper {
          max-width: 100%;
          padding: 0 1rem;
        }

        .input-section {
          margin-bottom: 1.5rem;
          animation: slideUp 0.4s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .input-container {
          display: flex;
          gap: 0.75rem;
          background: white;
          padding: 0.75rem;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .todo-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 1rem;
          padding: 0.75rem;
          font-family: inherit;
          color: #1f2937;
        }

        .todo-input::placeholder {
          color: #d1d5db;
        }

        .add-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .add-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .add-button:active {
          transform: translateY(0);
        }

        .todos-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          min-height: 200px;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 1rem;
          text-align: center;
          color: #9ca3af;
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .empty-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        .empty-text {
          font-size: 0.95rem;
          color: #9ca3af;
        }

        .todos-list {
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .todo-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-bottom: 1px solid #f3f4f6;
          transition: all 0.2s ease;
        }

        .todo-item:last-child {
          border-bottom: none;
        }

        .todo-item:hover {
          background: #f9fafb;
        }

        .todo-item.completed {
          opacity: 0.7;
        }

        .checkbox-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
          font-size: 1.5rem;
          color: #d1d5db;
          width: 32px;
          height: 32px;
        }

        .checkbox-button.checked {
          color: #22c55e;
        }

        .checkbox-button:hover {
          transform: scale(1.1);
        }

        .todo-text {
          flex: 1;
          font-size: 1rem;
          word-break: break-word;
        }

        .delete-button {
          background: none;
          border: none;
          color: #d1d5db;
          cursor: pointer;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
          font-size: 1.1rem;
        }

        .delete-button:hover {
          color: #ef4444;
          transform: scale(1.2);
        }

        .stats-section {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .stat-item {
          background: white;
          padding: 1rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .stat-label {
          display: block;
          color: #6b7280;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stat-value {
          display: block;
          font-size: 1.75rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (max-width: 640px) {
          .header-title {
            font-size: 2rem;
          }

          .header-subtitle {
            font-size: 0.95rem;
          }

          .stats-section {
            grid-template-columns: 1fr;
          }

          .todo-text {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
}
