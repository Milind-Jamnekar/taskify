"use server";

import { revalidatePath } from "next/cache";
import supabase from "./supabase";

async function onCreateTask(formData: FormData) {
  const taskName = formData.get("name") as string;

  try {
    await supabase.from("taskify").insert({ name: taskName, is_done: false });
    revalidatePath("/");
    return { message: "Task created successfully" };
  } catch (error) {
    return { message: "Failed to create task" };
  }
}

async function onDeleteTask(formData: FormData) {
  const id = formData.get("id") as string;

  try {
    await supabase.from("taskify").delete().eq("id", id);
    revalidatePath("/");
    return { message: "Task deleted successfully" };
  } catch (error) {
    return { message: "Failed to delete task" };
  }
}
export { onCreateTask, onDeleteTask };
