export interface ITask {
  id: number;
  state: "not_started" | "working_on_it" | "completed" | "hidden";
  task_category: string;
  title: string;
  description: string;
}
