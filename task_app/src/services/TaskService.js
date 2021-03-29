import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getTasks() {
    return api.get("/tasks");
  },
  getTasksById(id) {
    return api.get(`/tasks/${id}`);
  },
  deleteTask(id) {
    return api.delete(`/tasks/${id}`);
  },
  addTask(task) {
    return api.post("/tasks", task);
  },
  addComment(payload) {
    const body = {
      comments: payload.comments,
    };
    return api.patch(`/tasks/${payload.id}`, body);
  },
  editTask(payload) {
    return api.put(`/tasks/${payload.id}`, payload.task);
  },
};
