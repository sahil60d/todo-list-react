import React, { useState } from 'react';

/**
 * TaskForm component for adding tasks.
 * @param {Object} props - The props object.
 * @param {Function} props.onAdd - The function to be called when a task is added.
 * @returns {JSX.Element} The TaskForm component.
 */
export default function TaskForm({ onAdd }) {
    const [taskName, setTaskName] = useState('');

    /**
     * Handles form submission.
     * @param {Event} ev - The form submit event.
     */
    function handleSubmit(ev) {
        ev.preventDefault();
        onAdd(taskName);
        setTaskName('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={taskName} onChange={ev => setTaskName(ev.target.value)} placeholder="Add Task" />
            <button>+</button>
        </form>
    );
}