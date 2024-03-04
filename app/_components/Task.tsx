"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { onChangeTaskStatus, onDeleteTask } from "@/utils/actions";
import { XIcon } from "lucide-react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

const Task = ({
  name,
  isDone,
  id,
}: {
  id: number;
  name: string;
  isDone: boolean;
}) => {
  const { pending } = useFormStatus();

  const onDelete = async (formData: FormData) => {
    // TODO:I don't know how to add optimistic removal of task
    const promise = onDeleteTask(formData);

    toast.promise(promise, {
      success: "Task is deleted",
      error: "Failed to delete task",
      loading: "Deleting task...",
    });
  };

  return (
    <label htmlFor={name}>
      <Card
        className={`${
          pending ? "opacity-80" : "opacity-100"
        } mb-4 group outline-transparent hover:outline-slate-900 hover:outline outline-1`}
      >
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-4 ">
            <div className="flex gap-3 text-center">
              <Checkbox defaultChecked={isDone} id={name} />
              <span className="text-lg line-clamp-1 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none cursor-pointer">
                {name}
              </span>
            </div>

            <form action={onDelete}>
              <input type="hidden" name="id" value={id} />
              <button
                type="submit"
                role="button"
                className="group-hover:opacity-100 opacity-0 m-0 hover:bg-secondary rounded-lg cursor-pointer"
              >
                <XIcon className="h-3 w-3 " />
              </button>
            </form>
          </CardTitle>
        </CardHeader>
      </Card>
    </label>
  );
};

export default Task;
