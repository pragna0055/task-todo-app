import { useState, useEffect } from "react";
import API from "../services/api";

function Dashboard() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async () => {
    if (!task.trim()) return;

    try {
      await API.post("/tasks", {
        title: task,
        stage: "Todo",
      });

      setTask("");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const moveTask = async (id, stage) => {
    try {
      const currentTask = tasks.find((task) => task._id === id);

      await API.put(`/tasks/${id}`, {
        title: currentTask.title,
        stage,
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async (id) => {
    const updatedTitle = prompt("Edit Task");

    if (!updatedTitle) return;

    try {
      const currentTask = tasks.find((task) => task._id === id);

      await API.put(`/tasks/${id}`, {
        title: updatedTitle,
        stage: currentTask.stage,
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-900">
          Task Manager
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full"
        >
          Logout
        </button>
      </div>

      {/* Hero */}
      <div className="bg-teal-100 py-12 px-8">
        <h2 className="text-5xl font-bold text-gray-900">
          Manage Your Tasks
        </h2>

        <p className="mt-3 text-gray-600 text-lg">
          Organize, track and complete your work efficiently.
        </p>

        <div className="flex gap-3 mt-8">
          <input
            type="text"
            placeholder="Enter New Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border bg-white p-4 rounded-xl w-[400px]"
          />

          <button
            onClick={addTask}
            className="bg-indigo-900 hover:bg-indigo-800 text-white px-8 rounded-xl"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Task Columns */}
      <div className="grid md:grid-cols-3 gap-6 p-8">
        {["Todo", "In Progress", "Done"].map((column) => (
          <div
            key={column}
            className="bg-white rounded-3xl shadow-lg p-5"
          >
            <h2 className="text-2xl font-bold text-center mb-5 text-indigo-900">
              {column}
            </h2>

            {tasks
              .filter((task) => task.stage === column)
              .map((task) => (
                <div
                  key={task._id}
                  className="bg-gray-50 border rounded-2xl p-4 mb-4 hover:shadow-md transition"
                >
                  <p className="font-semibold text-gray-800">
                    {task.title}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {column !== "Todo" && (
                      <button
                        onClick={() => moveTask(task._id, "Todo")}
                        className="bg-gray-200 px-3 py-1 rounded-lg text-sm"
                      >
                        Todo
                      </button>
                    )}

                    {column !== "In Progress" && (
                      <button
                        onClick={() =>
                          moveTask(task._id, "In Progress")
                        }
                        className="bg-yellow-300 px-3 py-1 rounded-lg text-sm"
                      >
                        Progress
                      </button>
                    )}

                    {column !== "Done" && (
                      <button
                        onClick={() => moveTask(task._id, "Done")}
                        className="bg-green-300 px-3 py-1 rounded-lg text-sm"
                      >
                        Done
                      </button>
                    )}

                    <button
                      onClick={() => editTask(task._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteTask(task._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;