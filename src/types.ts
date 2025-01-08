export interface ITask {
  id: string;
  title: string;
  description: string;
  dueData: string;
  isCompleted: boolean;
  priority: "High" | "Medium" | "Low";
}
