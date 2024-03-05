import supabase from "@/utils/supabase";
import TaskInput from "./_components/TaskInput";
import Task from "@/app/_components/Task";

export default async function Home() {
  let { data: tasks } = await supabase
    .from("taskify")
    .select("*")
    .order("is_done");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div>
        <h1 className="text-center text-6xl pb-14">Taskify App</h1>
      </div>

      <div className=" md:max-w-xl p-6">
        <TaskInput />
        {tasks &&
          tasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              name={task.name}
              isDone={task.is_done}
            />
          ))}
      </div>
    </main>
  );
}
