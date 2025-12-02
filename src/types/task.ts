export type Status = "to-do" | "doing" | "done";

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// DTO para criar uma nova tarefa (corresponde ao back-end CreateTaskDto)
export interface CreateTaskPayload {
  title: string;
  description?: string;
  status: Status;
}
