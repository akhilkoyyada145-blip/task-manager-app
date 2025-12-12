import React, { useState, useEffect } from 'react';
import { taskService } from '../services/api';
import '../styles/TaskManager.css';

function TaskManager({ onLogout }) {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const username = localStorage.getItem('username');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await taskService.getAllTasks();
            setTasks(response.data);
        } catch (err) {
            setError('Failed to fetch tasks');
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!newTask.title.trim()) return;

        setLoading(true);
        try {
            await taskService.createTask({
                ...newTask,
                completed: false
            });
            setNewTask({ title: '', description: '' });
            fetchTasks();
        } catch (err) {
            setError('Failed to create task');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleComplete = async (task) => {
        try {
            await taskService.updateTask(task.id, {
                ...task,
                completed: !task.completed
            });
            fetchTasks();
        } catch (err) {
            setError('Failed to update task');
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await taskService.deleteTask(taskId);
            fetchTasks();
        } catch (err) {
            setError('Failed to delete task');
        }
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    return (
        <div className="task-manager">
            <header className="task-header">
                <h1>Task Manager</h1>
                <div className="user-info">
                    <span>Welcome, {username}!</span>
                    <button onClick={onLogout} className="btn-logout">Logout</button>
                </div>
            </header>

            <div className="task-container">
                <form onSubmit={handleCreateTask} className="task-form">
                    <input
                        type="text"
                        placeholder="Task title"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Task description (optional)"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    />
                    <button type="submit" disabled={loading} className="btn-add">
                        {loading ? 'Adding...' : 'Add Task'}
                    </button>
                </form>

                {error && <div className="error-message">{error}</div>}

                <div className="filter-buttons">
                    <button 
                        className={filter === 'all' ? 'active' : ''} 
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button 
                        className={filter === 'active' ? 'active' : ''} 
                        onClick={() => setFilter('active')}
                    >
                        Active
                    </button>
                    <button 
                        className={filter === 'completed' ? 'active' : ''} 
                        onClick={() => setFilter('completed')}
                    >
                        Completed
                    </button>
                </div>

                <div className="task-list">
                    {filteredTasks.length === 0 ? (
                        <p className="no-tasks">No tasks to display</p>
                    ) : (
                        filteredTasks.map(task => (
                            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                                <div className="task-content">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => handleToggleComplete(task)}
                                    />
                                    <div>
                                        <h3>{task.title}</h3>
                                        {task.description && <p>{task.description}</p>}
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleDeleteTask(task.id)}
                                    className="btn-delete"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default TaskManager;