import TaskInput from "./_components/TaskInput";
import Task from "@/app/_components/Task";
import prisma from "@/prisma/db";

export default async function Home() {
  let tasks = await prisma.tasks.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div>
        <h1 className="text-center text-6xl pb-14">Taskify App</h1>
      </div>

      <div className=" md:max-w-xl p-6">
        <TaskInput />
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            name={task.name}
            isDone={task.isDone}
          />
        ))}
      </div>
    </main>
  );
}
