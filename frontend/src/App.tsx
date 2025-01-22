import { useState, useEffect } from 'react';
import { Todo } from './types/todo';
import { todoService } from './services/todoService';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { ThemeToggle } from './components/ThemeToggle';
import { Toast } from './components/Toast';

interface ToastState {
  message: string;
  type: 'success' | 'error';
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>(undefined);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const fetchTodos = async () => {
    try {
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (error) {
      showToast('Failed to fetch todos', 'error');
    }
  };

  const handleCreateTodo = async (title: string, description: string) => {
    try {
      const newTodo = await todoService.createTodo({
        title,
        description,
        completed: false
      });
      setTodos([...todos, newTodo]);
      showToast('Todo created successfully', 'success');
    } catch (error) {
      showToast('Failed to create todo', 'error');
    }
  };

  const handleUpdateTodo = async (title: string, description: string) => {
    if (!editingTodo) return;
    try {
      const updatedTodo = await todoService.updateTodo(editingTodo._id, {
        title,
        description,
        completed: editingTodo.completed,
      });
      setTodos(todos.map(todo => todo._id === editingTodo._id ? updatedTodo : todo));
      setEditingTodo(undefined);
      showToast('Todo updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update todo', 'error');
    }
  };

  const handleToggleTodo = async (id: string) => {
    if (!id) {
      console.error('Cannot toggle todo: missing ID');
      return;
    }
    const todo = todos.find(t => t._id === id);
    if (todo) {
      try {
        const updatedTodo = await todoService.updateTodo(id, { completed: !todo.completed });
        setTodos(todos.map(t => t._id === id ? updatedTodo : t));
        showToast(`Todo marked as ${updatedTodo.completed ? 'completed' : 'incomplete'}`, 'success');
      } catch (error) {
        showToast('Failed to update todo status', 'error');
      }
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
      showToast('Todo deleted successfully', 'success');
    } catch (error) {
      showToast('Failed to delete todo', 'error');
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="max-w-[2000px] mx-auto min-h-screen px-4 sm:px-6 lg:px-8 py-12">
        <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Todo Manager</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Organize your tasks efficiently</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
          <TodoForm
            onSubmit={editingTodo ? handleUpdateTodo : handleCreateTodo}
            editingTodo={editingTodo}
            onCancel={() => setEditingTodo(undefined)}
          />
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {todos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={setEditingTodo}
            />
          ))}
        </div>
        
        {todos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No todos yet. Create one to get started!</p>
          </div>
        )}

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
