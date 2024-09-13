import { useAuth } from '../context/AuthContext';
import { deleteTask } from '../services/taskService';

const TaskList = ({ tasks = [], refreshTasks, setEditingTask }) => {
  const { token } = useAuth();

  const handleDelete = async (taskId) => {
    await deleteTask(taskId, token);
    refreshTasks();
  };

  return (
    <div className="py-5">
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks available</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task._id} className="flex justify-between items-start border-gray-300 p-4 border rounded-lg">
              <div>
                <h3 className="font-medium text-gray-800 text-lg">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingTask(task._id)} // Set taskId for editing
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white transition duration-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
