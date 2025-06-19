import TaskForm from "../components/TaskForm";

export default function AddPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Add New Task
        </h1>
        <TaskForm />
      </div>
    </div>
  );
}
