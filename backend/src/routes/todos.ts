import express, { Request, Response } from 'express';
import Todo, { ITodo } from '../models/Todo';

const router = express.Router();

// Get all todos
router.get('/', async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos' });
  }
});

// Create a new todo
router.post('/', async (req: Request, res: Response) => {
  try {
    if (!req.body.title || !req.body.description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const todo = new Todo({
      title: req.body.title,
      description: req.body.description,
      completed: false
    });
    
    const newTodo = await todo.save();
    console.log('Todo saved successfully:', newTodo);
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    if (error instanceof Error) {
      res.status(400).json({ message: 'Error creating todo', error: error.message });
    } else {
      res.status(400).json({ message: 'Error creating todo' });
    }
  }
});

// Update a todo
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updateData: Partial<Pick<ITodo, 'title' | 'description' | 'completed'>> = {};
    // Only include fields that are present in the request body
    if (req.body.title !== undefined) updateData['title'] = req.body.title;
    if (req.body.description !== undefined) updateData['description'] = req.body.description;
    if (req.body.completed !== undefined) updateData['completed'] = req.body.completed;

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    if (error instanceof Error) {
      if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid todo ID format' });
      }
      res.status(500).json({ message: 'Error updating todo', error: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

// Delete a todo
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo' });
  }
});

export default router;
