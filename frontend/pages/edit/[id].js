import { useRouter } from "next/router";
import TaskForm from "../../components/TaskForm";

export default function EditTaskPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <TaskForm id={id} />
    </div>
  );
}
