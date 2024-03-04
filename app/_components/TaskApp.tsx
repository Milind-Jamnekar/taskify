"use client";
import { useOptimistic } from "react";
import TaskInput from "./TaskInput";
import { Database } from "@/utils/supabase.types";
import Task from "./Task";

interface TasksProps {
  tasks: Database["public"]["Tables"]["taskify"]["Row"][];
}

type Task = Database["public"]["Tables"]["taskify"]["Row"];

const TaskApp = ({ tasks }: TasksProps) => {
  // this hook all handled optimistic feature of form and network
  const [optimisticTask, addOptimisticTask] = useOptimistic(
    tasks,
    (state, newTodo: Task) => {
      return [...state, newTodo];
    }
  );

  return (
    <div className=" md:max-w-xl p-6">
      <TaskInput addOptimisticTask={addOptimisticTask} />
      {optimisticTask.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          name={task.name}
          isDone={task.is_done}
        />
      ))}
    </div>
  );
};

export default TaskApp;
