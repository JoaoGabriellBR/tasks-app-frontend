import { useState, FormEvent } from "react";
import { tasksApi } from "../services/api";
import type { Status } from "../types/task";

interface TaskFormProps {
  onTaskCreated: () => void;
}

export default function TaskForm({ onTaskCreated }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("to-do");

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(false);

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (title.length > 255) {
      setError("Title must be 255 characters or less");
      return;
    }

    setLoading(true);

    try {
      await tasksApi.createTask({
        title: title.trim(),
        description: description.trim() || undefined,
        status,
      });

      setTitle("");
      setDescription("");
      setStatus("to-do");
      setSuccess(true);
      onTaskCreated();

      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to create task";
      setError(
        Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form-container">
      <h2>Create New Task</h2>

      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">
            Title <span className="required">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            disabled={loading}
            maxLength={255}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (optional)"
            disabled={loading}
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">
            Status <span className="required">*</span>
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            disabled={loading}
            required
          >
            <option value="to-do">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>

        {error && (
          <div className="message error-message" role="alert">
            ❌ {error}
          </div>
        )}

        {success && (
          <div className="message success-message" role="status">
            ✅ Task created successfully!
          </div>
        )}

        <button
          type="submit"
          className="btn-primary"
          disabled={loading || !title.trim()}
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
}
