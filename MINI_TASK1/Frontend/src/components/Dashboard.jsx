import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

const Dashboard = () => {
    const { user, logout } = useAuth();

    // Task list state
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Create task form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("to-do");

    // ─── Fetch tasks on load ───────────────────────────────────────────
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await API.get("/task/get");
            setTasks(res.data.tasks);
        } catch (err) {
            setError("Failed to load tasks");
        } finally {
            setLoading(false);
        }
    };

    // ─── Create task ───────────────────────────────────────────────────
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/task/create", { title, description, status });
            setTasks([...tasks, res.data.task]);  // add to list without re-fetching
            setTitle("");
            setDescription("");
            setStatus("to-do");
        } catch (err) {
            setError("Failed to create task");
        }
    };

    // ─── Update task status ────────────────────────────────────────────
    const handleStatusChange = async (taskId, newStatus) => {
        try {
            const res = await API.put(`/task/update/${taskId}`, { status: newStatus });
            // Update that one task in the list
            setTasks(tasks.map(t => t._id === taskId ? res.data.task : t));
        } catch (err) {
            setError("Failed to update task");
        }
    };

    // ─── Delete task ───────────────────────────────────────────────────
    const handleDelete = async (taskId) => {
        try {
            await API.delete(`/task/delete/${taskId}`);
            setTasks(tasks.filter(t => t._id !== taskId));  // remove from list
        } catch (err) {
            setError("Failed to delete task");
        }
    };

    return (
        <div>
            {/* Header */}
            <div>
                <h1>Welcome, {user?.name}</h1>
                <button onClick={logout}>Logout</button>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Create Task Form */}
            <form onSubmit={handleCreate}>
                <h2>Create Task</h2>
                <input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="to-do">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <button type="submit">Add Task</button>
            </form>

            {/* Task List */}
            <h2>My Tasks</h2>
            {loading ? (
                <p>Loading...</p>
            ) : tasks.length === 0 ? (
                <p>No tasks yet. Create one above!</p>
            ) : (
                tasks.map((task) => (
                    <div key={task._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>

                        {/* Status dropdown to update inline */}
                        <select
                            value={task.status}
                            onChange={(e) => handleStatusChange(task._id, e.target.value)}
                        >
                            <option value="to-do">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>

                        <button onClick={() => handleDelete(task._id)}>Delete</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Dashboard;
