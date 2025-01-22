import axios from 'axios';
import { Todo } from '../types/todo';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const todoService = {
  getAllTodos: async (): Promise<Todo[]> => {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data;
  },

  createTodo: async (todo: Omit<Todo, '_id' | 'createdAt'>): Promise<Todo> => {
    const response = await axios.post(`${API_URL}/todos`, todo);
    return response.data;
  },

  updateTodo: async (id: string, todo: Partial<Todo>): Promise<Todo> => {
    const response = await axios.put(`${API_URL}/todos/${id}`, todo);
    return response.data;
  },

  deleteTodo: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/todos/${id}`);
  }
};
