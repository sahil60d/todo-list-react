import './App.css';
import TaskForm from './TaksForm';
import Task from './Task';
import { useEffect, useState } from 'react';

/**
 * The main component of the Todo List application.
 * @returns {JSX.Element} The rendered Todo List application.
 */
function App() {
  const [tasks, setTasks] = useState([]);

  // Save tasks to local storage when they change
  useEffect(() => {
    if (tasks.length === 0) {
      return;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  /**
   * Adds a new task to the list.
   * @param {string} name - The name of the task.
   */
  function addTask(name) {
    setTasks(prev => {
      return [...prev, {name: name, done: false}];
    })
  }

  /**
   * Deletes a task from the list.
   * @param {number} taskIndex - The index of the task to delete.
   */
  function deleteTask(taskIndex) {
    setTasks(prev => {
      return prev.filter((taskObject, index) => index !== taskIndex);
    });
  }

  /**
   * Renames a task in the list.
   * @param {number} index - The index of the task to rename.
   * @param {string} newName - The new name for the task.
   */
  function renameTask(index, newName) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    });
  }

  /**
   * Updates the completion status of a task in the list.
   * @param {number} taskIndex - The index of the task to update.
   * @param {boolean} newDone - The new completion status for the task.
   */
  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  const numComplete = tasks.filter(task => task.done).length;
  const numTotal = tasks.length;
  const message = numComplete === numTotal ? 'You did it!' : 'Get Stuff Done!';

  return (
    <main>
      <h1>{numComplete}/{numTotal} Complete</h1>
      <h2>{message}</h2>
      <TaskForm onAdd={addTask}/>
      {tasks.map((task,index) => (
        <Task {...task}
              onToggle={done => updateTaskDone(index, done)} 
              onDelete={() => deleteTask(index)}
              onRename={newName => renameTask(index, newName)} />
      ))}
    </main>
  );
}

export default App;
