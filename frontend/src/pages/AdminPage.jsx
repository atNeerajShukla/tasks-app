import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllUsers, getUserTasksByUserId } from '../services/taskService';

// UserCard Component: Display user/admin details
const UserCard = ({ user, onClick, isSelected }) => (
    <div
        key={user._id}
        className={`bg-white shadow hover:shadow-md p-4 rounded-lg transition-shadow cursor-pointer ${isSelected ? 'border-2 border-blue-500' : ''}`}
        onClick={() => onClick(user._id)}
    >
        <p className="font-semibold text-gray-800">{user.username}</p>
        <p className="text-gray-500 text-sm">{user.email}</p>
    </div>
);

// AdminCard Component: Display admin details (non-clickable, compact)
const AdminCard = ({ admin }) => (
    <div
        key={admin._id}
        className="bg-white shadow p-3 rounded-lg text-center"
    >
        <p className="font-semibold text-gray-800">{admin.username}</p>
        <p className="text-gray-500 text-sm">{admin.email}</p>
        <p className="text-gray-400 text-xs">(Admin)</p>
    </div>
);

// TaskCard Component: Display individual task details
const TaskCard = ({ task }) => (
    <div key={task._id} className="bg-white shadow hover:shadow-md p-6 rounded-lg transition-shadow">
        <h4 className="mb-2 font-bold text-gray-800 text-lg">{task.title}</h4>
        <p className="mb-2 text-gray-600">{task.description}</p>
    </div>
);

const AdminPage = () => {
    const { token, logout } = useAuth();
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [selectedUserTasks, setSelectedUserTasks] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserName, setSelectedUserName] = useState(''); // Store selected user's name
    const [loading, setLoading] = useState(false);
    const [taskLoading, setTaskLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch users and separate into regular users and admins
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const fetchedUsers = await getAllUsers(token);
            setUsers(fetchedUsers.filter(user => !user.isAdmin));
            setAdmins(fetchedUsers.filter(user => user.isAdmin));
        } catch (err) {
            setError('Failed to load users.');
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Fetch tasks for the selected user
    const handleUserClick = async (userId) => {
        try {
            setTaskLoading(true);
            const userTasks = await getUserTasksByUserId(token, userId);
            const clickedUser = users.find(user => user._id === userId);
            setSelectedUserTasks(userTasks);
            setSelectedUser(userId);
            setSelectedUserName(clickedUser.username); // Set the selected user's name
        } catch (err) {
            setError('Failed to load tasks.');
        } finally {
            setTaskLoading(false);
        }
    };

    if (loading) {
        return <div className="py-10 text-center">Loading...</div>;
    }

    if (error) {
        return <div className="py-10 text-center text-red-500">{error}</div>;
    }

    return (
        <div className="bg-gray-100 p-6 min-h-screen">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="bg-white shadow p-4 md:p-6 rounded-lg">
                    <div className="flex md:flex-row flex-col md:justify-between md:items-center">
                        <h2 className="mb-4 md:mb-0 font-bold text-center text-gray-800 text-xl md:text-2xl md:text-left">
                            Admin Dashboard
                        </h2>

                        <button
                            onClick={() => {
                                logout();
                                navigate('/');
                            }}
                            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded w-full md:w-auto text-center text-white"
                        >
                            Logout
                        </button>
                    </div>
                </div>


                {/* Admins Section */}
                <Section title="All Admins">
                    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {admins.map((admin) => (
                            <AdminCard key={admin._id} admin={admin} />
                        ))}
                    </div>
                </Section>

                {/* Users Section */}
                <Section title="All Users">
                    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {!users.length ?
                            <p>No users found.</p> :
                            users.map((user) => (
                                <UserCard
                                    key={user._id}
                                    user={user}
                                    onClick={handleUserClick}
                                    isSelected={user._id === selectedUser}
                                />
                            ))}
                    </div>
                </Section>

                {/* Tasks Section for Selected User */}
                {selectedUser && (
                    taskLoading ? (
                        <div className="py-10 text-center">Loading...</div>
                    ) : (
                        <Section title={`Tasks for ${selectedUserName}`}>
                            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {selectedUserTasks.length > 0 ? (
                                    selectedUserTasks.map((task) => <TaskCard key={task._id} task={task} />)
                                ) : (
                                    <p>No tasks found for this user.</p>
                                )}
                            </div>
                        </Section>
                    )
                )}
            </div>
        </div>
    );
};

// Section Component
const Section = ({ title, children }) => (
    <div className="mt-8">
        <h3 className="mb-4 font-semibold text-gray-700 text-xl">{title}</h3>
        {children}
    </div>
);

export default AdminPage;
