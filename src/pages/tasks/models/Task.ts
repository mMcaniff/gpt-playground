export interface Task {
  task: string;
  id: number;
  completed: boolean;
  importance: "high" | "medium" | "low";
}
