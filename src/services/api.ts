import axios from "axios";
import type { Task, CreateTaskPayload } from "../types/task";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const tasksApi = {
  createTask: async (payload: CreateTaskPayload): Promise<Task> => {
    const response = await api.post<Task>("/tasks", payload);
    return response.data;
  },

  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get<Task[]>("/tasks");
    return response.data;
  },
};

export default api;
