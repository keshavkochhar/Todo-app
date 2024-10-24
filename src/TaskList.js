import React from 'react';
import './TaskList.css'; // Import the CSS file

const TaskList = ({ tasks, editTask, updateTaskStatus, deleteTask }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id} className={`task-item ${task.status.toLowerCase()}`}>
          <div className="task-name">{task.name}</div>
          
          {/* Status Dropdown */}
          <div className="task-status">
            <select 
              value={task.status} 
              onChange={(e) => updateTaskStatus(task._id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="task-actions">
            <button className="edit-btn" onClick={() => editTask(task._id, prompt('Enter new task name:', task.name))}>
              ✏️
            </button>
            <button className="delete-btn" onClick={() => deleteTask(task._id)}>
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
