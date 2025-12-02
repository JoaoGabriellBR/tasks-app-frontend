import { useState, useEffect } from "react";
import { tasksApi } from "../services/api";
import type { Task } from "../types/task";

interface TaskListProps {
  refreshTrigger: number;
}

export default function TaskList({ refreshTrigger }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await tasksApi.getAllTasks();
        setTasks(data);
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || err.message || "Failed to fetch tasks";
        setError(
          Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [refreshTrigger]);

  const formatStatus = (status: string): string => {
    const statusMap: Record<string, string> = {
      TO_DO: "To Do",
      DOING: "Doing",
      DONE: "Done",
    };
    return statusMap[status] || status;
  };

  const getStatusClass = (status: string): string => {
    const classMap: Record<string, string> = {
      TO_DO: "status-todo",
      DOING: "status-doing",
      DONE: "status-done",
    };
    return classMap[status] || "status-default";
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="task-list-container">
        <h2>Tasks</h2>
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="task-list-container">
        <h2>Tasks</h2>
        <div className="message error-message" role="alert">
          ❌ {error}
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list-container">
        <h2>Tasks</h2>
        <div className="empty-state">
          <p>📝 No tasks yet. Create your first task above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <h2>Tasks ({tasks.length})</h2>

      <div className="task-table-wrapper">
        <table className="task-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td data-label="ID">{task.id}</td>
                <td data-label="Title" className="task-title">
                  {task.title}
                </td>
                <td data-label="Description" className="task-description">
                  {task.description || <em>No description</em>}
                </td>
                <td data-label="Status">
                  <span
                    className={`status-badge ${getStatusClass(task.status)}`}
                  >
                    {formatStatus(task.status)}
                  </span>
                </td>
                <td data-label="Created">{formatDate(task.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
