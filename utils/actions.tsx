"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/prisma/db";

async function onCreateTask(formData: FormData) {
  const taskName = formData.get("name") as string;

  try {
    await prisma.tasks.create({ data: { name: taskName, isDone: false } });
    revalidatePath("/");
    return { message: "Task created successfully" };
  } catch (error) {
    return { message: "Failed to create task" };
  }
}

async function onDeleteTask(id: number) {
  try {
    await prisma.tasks.delete({ where: { id } });
    revalidatePath("/");
    return { message: "Task deleted successfully" };
  } catch (error) {
    return { message: "Failed to delete task" };
  }
}

async function onChangeTaskStatus(checked: boolean, id: number) {
  await prisma.tasks.update({ data: { isDone: checked }, where: { id } });
  revalidatePath("/");
}
export { onCreateTask, onDeleteTask, onChangeTaskStatus };
