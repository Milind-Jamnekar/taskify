import TaskApp from "./_components/TaskApp";
import supabase from "@/utils/supabase";

export default async function Home() {
  let { data: tasks } = await supabase.from("taskify").select("*");
  if (!tasks) {
    return null;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div>
        <h1 className="text-center text-6xl pb-14">Taskify App</h1>
      </div>

      <TaskApp tasks={tasks} />
    </main>
  );
}
