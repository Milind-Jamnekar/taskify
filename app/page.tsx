import TaskInput from "./_components/TaskInput";
import Task from "@/app/_components/Task";
import prisma from "@/prisma/db";
import TaskList from "./_components/TaskList";

export default async function Home() {
  let tasks = await prisma.tasks.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div>
        <h1 className="text-center text-6xl pb-14">Taskify App</h1>
      </div>

      <div className=" md:max-w-xl p-6">
        <TaskList tasks={tasks} />
      </div>
    </main>
  );
}
