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
    //Resetting form
    ref.current?.reset();

    // adding optimistic task so user doesn't notice network latency
    // if task is failed to add in server it automatically handle removing from frontend
    addOptimisticTask({
      created_at: "",
      updated_at: "",
      id: Math.random(),
      name: formData.get("name") as string,
      is_done: false,
    });

    // i just learn about very good way to
    // handle loading,success,error notification through toast
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
