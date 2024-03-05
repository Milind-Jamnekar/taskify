"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { onChangeTaskStatus, onDeleteTask } from "@/utils/actions";

import { XIcon } from "lucide-react";
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
  return (
    <label htmlFor={name}>
      <Card
        className={`mb-4 group outline-transparent hover:outline-slate-900 hover:outline outline-1`}
      >
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-4 ">
            <div className="flex gap-3 text-center">
              <Checkbox
                className={isDone ? "opacity-40" : ""}
                defaultChecked={isDone}
                id={name}
                onCheckedChange={async (checked: boolean) => {
                  await onChangeTaskStatus(checked, id);
                }}
              />
              <span
                className={cn(
                  "text-lg line-clamp-1 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none cursor-pointer",
                  isDone && "line-through opacity-40"
                )}
              >
                {name}
              </span>
            </div>

            <button
              onClick={async () => {
                const promise = onDeleteTask(id);

                toast.promise(promise, {
                  success: "Task is deleted",
                  error: "Failed to delete task",
                  loading: "Deleting task...",
                });
              }}
              type="submit"
              role="button"
              className="group-hover:opacity-100 opacity-0 m-0 hover:bg-secondary rounded-lg cursor-pointer"
            >
              <XIcon className="h-3 w-3 " />
            </button>
          </CardTitle>
        </CardHeader>
      </Card>
    </label>
  );
};

export default Task;
