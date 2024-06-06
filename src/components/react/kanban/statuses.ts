import type { ITask } from ".";

export const statusNames: Record<ITask["state"], string> = {
  "not_started": "Not Started",
  "working_on_it": "Working On It",
  "completed": "Completed",
  "hidden": "Hidden",
};

export const statuses: ITask["state"][] = [
  "not_started",
  "working_on_it",
  "completed",
  "hidden",
];

export type TasksByStatus = Record<ITask["state"], ITask[]>;

export const getTasksByStatus = (unorderedTasks: ITask[]) => {
  const tasksByStatus: TasksByStatus = unorderedTasks.reduce(
    (acc, task) => {
      acc[task.state].push(task);
      return acc;
    },
    statuses.reduce(
      (obj, status) => ({ ...obj, [status]: [] }),
      {} as TasksByStatus
    )
  );
  return tasksByStatus;
};
