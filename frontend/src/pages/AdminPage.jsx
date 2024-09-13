import React, { useState, useEffect } from 'react';
import { getAllTasks, getAllUsers } from '../services/taskService';
import { useAuth } from '../context/AuthContext';

const AdminPage = () => {
    const { token } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedTasks = await getAllTasks(token);
            const fetchedUsers = await getAllUsers(token);
            setTasks(fetchedTasks);
            setUsers(fetchedUsers);
        };

        fetchData();
    }, [token]);

    return (

        <div>
            <h2>Admin Dashboard</h2>
            <div>
                <h3>All Users</h3>
                <ul>
                    {users.map((user) => (
                        <li key={user._id}>{user.username}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>All Tasks</h3>
                <ul>
                    {tasks.map((task) => (
                        <li key={task._id}>
                            <h4>{task.title}</h4>
                            <p>{task.description}</p>
                            <p>Assigned to: {task.user ? task.user.username : 'No user'}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
};

export default AdminPage;
