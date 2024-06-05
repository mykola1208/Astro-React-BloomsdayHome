import type { ITask } from ".";

export const statusNames: Record<ITask["status"], string> = {
  "not-started": "Not Started",
  "working-on-it": "Working On It",
  "completed": "Completed",
  "hidden": "Hidden",
};

export const statuses: ITask["status"][] = [
  "not-started",
  "working-on-it",
  "completed",
  "hidden",
];

export type TasksByStatus = Record<ITask["status"], ITask[]>;

export const getTasksByStatus = (unorderedTasks: ITask[]) => {
  const tasksByStatus: TasksByStatus = unorderedTasks.reduce(
    (acc, task) => {
      acc[task.status].push(task);
      return acc;
    },
    statuses.reduce(
      (obj, status) => ({ ...obj, [status]: [] }),
      {} as TasksByStatus
    )
  );

  statuses.forEach((status) => {
    tasksByStatus[status] = tasksByStatus[status].sort(
      (recordA: ITask, recordB: ITask) => recordA.index - recordB.index
    );
  });
  return tasksByStatus;
};
