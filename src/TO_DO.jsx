import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";   // 👈 import uuid
import './TO_DO.css'

export default function TO_DO() {
  const [tasks, setTasks] = useState([]);   
  const [newTask, setNewTask] = useState(""); 
  const [isEditing, setIsEditing] = useState(false); 
  const [editId, setEditId] = useState(null);  
  const inputRef = useRef(null);

  // Autofocus input when editing
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // add a new task
  const addTask = () => {
    if (newTask.trim() === "") return; 
    const newItem = { id: uuidv4(), text: newTask, completed: false }; // 👈 UUID assigned
    setTasks(prev => [...prev, newItem]);
    setNewTask(""); 
  };

  // delete a task by id
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // start editing a task by id
  const editTask = (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    setIsEditing(true);
    setEditId(id);
    setNewTask(task.text); 
  };

  // update the edited task by id
  const updateTask = () => {
    if (newTask.trim() === "" || !editId) return;
    setTasks(prev => prev.map(t => t.id === editId ? { ...t, text: newTask } : t));
    setNewTask("");
    setIsEditing(false);
    setEditId(null);
  };

  // toggle completed status by id
  const toggleComplete = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="App">
      <div className="container-card">
        <h1>✨ TO-DO LIST ✨</h1>

        {/* input row */}
        <div className="container">
          <input
            ref={inputRef}
            type="text"
            placeholder="Add your new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          {isEditing ? (
            <button onClick={updateTask} className="update-btn">Update</button>
          ) : (
            <button onClick={addTask} className="add-btn">Add</button>
          )}
        </div>

        {/* task list */}
        {tasks.length === 0 ? (
          <div className="empty">No tasks yet. Add one above! 🚀</div>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className={`${task.completed ? "completed" : ""} animate`}>
                <span className="task-text">{task.text}</span>
                <div className="btn-group">
                  <button 
                    className="mark-complete"
                    onClick={() => toggleComplete(task.id)}>
                    {task.completed ? "Undo" : "Complete"}
                  </button>
                  <button 
                    className="edit-btn"
                    onClick={() => editTask(task.id)}>
                    Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
