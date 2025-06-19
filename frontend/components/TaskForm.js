// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

// export default function TaskForm({ id }) {
//   const router = useRouter();
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   useEffect(() => {
//   if (id) {
//     fetch(`http://localhost:3001/tasks/${id}`)
//       .then((res) => res.json())
//       .then((task) => {
//         setTitle(task.title);
//         setDescription(task.description);
//       })
//       .catch((err) => console.error("Failed to fetch task:", err));
//   }
// }, [id]);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = { title, description, completed: false };

//     const url = id
//       ? `http://localhost:3001/tasks/${id}`
//       : "http://localhost:3001/tasks";
//     const method = id ? "PUT" : "POST";

//     await fetch(url, {
//       method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });

//     router.push("/");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
//       <input
//         className="border p-2 rounded"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Title"
//         required
//       />
//       <textarea
//         className="border p-2 rounded"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         placeholder="Description"
//         required
//       />
//       <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
//         {id ? "Update" : "Add"} Task
//       </button>
//     </form>
//   );
// }


import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function TaskForm({ id }) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/tasks/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
          return res.json();
        })
        .then((task) => {
          setTitle(task.title);
          setDescription(task.description);
          setStatus(task.status || "todo");
          setDueDate(task.dueDate ? task.dueDate.substring(0, 10) : "");
        })
        .catch((err) => console.error("Failed to fetch task:", err));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, description, status, dueDate: dueDate || null };

    const url = id
      ? `http://localhost:3001/tasks/${id}`
      : "http://localhost:3001/tasks";
    const method = id ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    router.push("/");
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        {id ? "Edit Task" : "Create a New Task"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            required
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
            required
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md h-28 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md"
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
        >
          {id ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
}
