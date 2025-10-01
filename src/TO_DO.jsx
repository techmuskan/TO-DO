import { useState, useRef, useEffect } from "react";
import './TO_DO.css'

export default function TO_DO() {
  const [tasks, setTasks] = useState([]);   
  const [newTask, setNewTask] = useState(""); 
  const [isEditing, setIsEditing] = useState(false); 
  const [editIndex, setEditIndex] = useState(null);  
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
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask(""); 
  };

  // delete a task with fade-out effect
  const deleteTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  // start editing a task
  const editTask = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setNewTask(tasks[index].text); 
  };

  // update the edited task
  const updateTask = () => {
    if (newTask.trim() === "") return;
    const updatedTasks = [...tasks];
    updatedTasks[editIndex].text = newTask;
    setTasks(updatedTasks);
    setNewTask("");
    setIsEditing(false);
    setEditIndex(null);
  };

  // toggle completed status
  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
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
            {tasks.map((task, index) => (
              <li key={index} className={`${task.completed ? "completed" : ""} animate`}>
                <span className="task-text">{task.text}</span>
                <div className="btn-group">
                  <button 
                    className="mark-complete"
                    onClick={() => toggleComplete(index)}>
                    {task.completed ? "Undo" : "Complete"}
                  </button>
                  <button 
                    className="edit-btn"
                    onClick={() => editTask(index)}>
                    Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => deleteTask(index)}>
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
