export interface ITask {
  id: number;
  state: "not_started" | "in_progress" | "completed" | "hidden";
  task_category: string;
  title: string;
  description: string;
}
