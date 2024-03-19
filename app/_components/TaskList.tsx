"use client";
import { tasks } from "@prisma/client";
import Task from "./Task";
import TaskInput from "./TaskInput";
import { AnimatePresence, motion } from "framer-motion";

const TaskList = ({ tasks }: { tasks: tasks[] }) => {
  return (
    <>
      <TaskInput />
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            layout
            // initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={task.id}
          >
            <Task id={task.id} name={task.name} isDone={task.isDone} />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default TaskList;
