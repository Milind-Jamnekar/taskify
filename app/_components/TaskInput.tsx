"use client";
import { Input } from "@/components/ui/input";
import { onCreateTask } from "@/utils/actions";
import { useRef } from "react";
import { toast } from "sonner";

const TaskInput = ({
  addOptimisticTask,
}: {
  addOptimisticTask: (action: {
    created_at: string;
    id: number;
    is_done: boolean;
    name: string;
    updated_at: string | null;
  }) => void;
}) => {
  const ref = useRef<HTMLFormElement>(null);

  const onSubmit = async (formData: FormData) => {
    ref.current?.reset();
    addOptimisticTask({
      created_at: "",
      updated_at: "",
      id: Math.random(),
      name: formData.get("name") as string,
      is_done: false,
    });
    const promise = onCreateTask(formData);

    toast.promise(promise, {
      success: "Task is created 🚀",
      error: "Failed to create task 💀",
      loading: "Creating Task",
    });
  };
  return (
    <form ref={ref} action={onSubmit}>
      <Input
        type="text"
        id="name"
        required
        placeholder="Enter task"
        className="mb-4 p-6"
        name="name"
      />
    </form>
  );
};

export default TaskInput;
