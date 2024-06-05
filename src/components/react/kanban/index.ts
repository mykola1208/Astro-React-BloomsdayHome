export interface ITask {
  id: number;
  status: "not-started" | "working-on-it" | "completed" | "hidden";
  category: string;
  title: string;
  content: string;
  index: number;
}
