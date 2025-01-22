import React from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  return (
    <div className={`h-full bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg ${todo.completed ? 'opacity-75' : ''}`}>
      <div className="flex flex-col h-full">
        <div className="p-6 flex-grow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 pt-1">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo._id)}
                className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400 cursor-pointer"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className={`text-lg font-semibold text-gray-900 dark:text-white mb-2 ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                {todo.title}
              </h3>
              <p className={`text-sm text-gray-600 dark:text-gray-300 break-words mb-4 ${todo.completed ? 'line-through' : ''}`}>
                {todo.description}
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Created: {new Date(todo.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-auto p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onEdit(todo)}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 dark:text-blue-400 dark:bg-transparent dark:hover:text-blue-300 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo._id)}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 dark:text-red-400 dark:bg-transparent dark:hover:text-red-300 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
