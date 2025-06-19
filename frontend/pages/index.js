import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/tasks")
      .then((res) => res.json())
      .then(setTasks)
      .catch(console.error);
  }, []);

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3001/tasks/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Task List</h1>
          <Link
            href="/add"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Add Task
          </Link>
        </div>

        {tasks.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No tasks available.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="bg-white dark:bg-gray-800 p-6 rounded shadow hover:shadow-lg transition"
              >
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  {task.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">{task.description}</p>

                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <p><strong>Status:</strong> {task.status.replace(/_/g, " ")}</p>
                  <p>
                    <strong>Due Date:</strong>{" "}
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "Not set"}
                  </p>
                </div>

                <div className="flex gap-4 mt-4">
                  <Link
                    href={`/edit/${task.id}`}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
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
