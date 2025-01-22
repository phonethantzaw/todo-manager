import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ServerApiVersion } from 'mongodb';
import Todo from '../models/todo';

dotenv.config();

const sampleTodos = [
  {
    title: 'Complete Project Proposal',
    description: 'Draft and submit the project proposal for client review',
    completed: false,
  },
  {
    title: 'Schedule Team Meeting',
    description: 'Arrange weekly team sync-up to discuss project progress',
    completed: true,
  },
  {
    title: 'Update Documentation',
    description: 'Review and update project documentation with latest changes',
    completed: false,
  },
  {
    title: 'Code Review',
    description: 'Review pull requests and provide feedback to team members',
    completed: false,
  },
  {
    title: 'System Testing',
    description: 'Perform comprehensive testing of new features',
    completed: true,
  }
];

async function seedDatabase() {
  try {
    const username = process.env.MONGODB_USER || 'blinkdeyo';
    const password = process.env.MONGODB_PASSWORD || 'password';
    const uri = `mongodb+srv://${username}:${password}@todocluster.o6qba.mongodb.net/?retryWrites=true&w=majority&appName=TodoCluster`;

    await mongoose.connect(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    console.log('Connected to MongoDB successfully!');

    // Clear existing todos
    await Todo.deleteMany({});
    console.log('Cleared existing todos');

    // Insert new todos
    const insertedTodos = await Todo.insertMany(sampleTodos);
    console.log(`Successfully seeded ${insertedTodos.length} todos`);

    // Log the inserted todos
    console.log('\nSeeded Todos:');
    insertedTodos.forEach((todo, index) => {
      console.log(`\n${index + 1}. ${todo.title}`);
      console.log(`   Description: ${todo.description}`);
      console.log(`   Status: ${todo.completed ? 'Completed' : 'Pending'}`);
    });

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

// Run the seed function
seedDatabase().catch(console.error);
