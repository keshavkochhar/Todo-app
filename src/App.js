import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import './App.css';
const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add new task
  const addTask = async (taskName) => {
    try {
      const response = await axios.post(API_URL, { name: taskName });
      setTasks([...tasks, response.data]);
    } catch (err) {
      console.error(err);
    }
  };

  // Edit task
  const editTask = async (id, newName) => {
    try {
      await axios.put(`${API_URL}/${id}`, { name: newName });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Update task status
  const updateTaskStatus = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };


  // Delete task
  // const deleteTask = async (id) => {
  //   try {
  //     await axios.delete(`${API_URL}/${id}`);
  //     fetchTasks();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task._id !== taskId);
    setTasks(updatedTasks); // Update the state to trigger re-render
  };


  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <h1>To-Do Task Management</h1>
      <TaskForm addTask={addTask} />
      <TaskList 
        tasks={tasks} 
        editTask={editTask} 
        updateTaskStatus={updateTaskStatus} 
        deleteTask={deleteTask} 
      />
    </div>
  );
}

export default App;
