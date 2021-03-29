import TaskService from "@/services/TaskService";
import Swal from "sweetalert2";

export default {
  addTask({ commit }, payload) {
    commit("CHANGE_LOADING_STATUS", true);
    return TaskService.addTask(payload).then(() => {
      commit("ADD_TASK", payload);
    });
  },
  addComment({ commit }, payload) {
    commit("CHANGE_LOADING_STATUS", true);
    return TaskService.addComment(payload).then(() => {
      commit("ADD_COMMENT", payload);
    });
  },
  getTasks({ commit }) {
    commit("CHANGE_LOADING_STATUS", true);
    TaskService.getTasks()
      .then(({ data }) => {
        commit("SET_TASKS", data);
      })
      .catch(() => {
        Swal.fire("Error", "Something went wrong", "error");
      })
      .finally(() => {
        commit("CHANGE_LOADING_STATUS", false);
      });
  },
  deleteTask({ commit }, payload) {
    commit("CHANGE_LOADING_STATUS", true);
    TaskService.deleteTask(payload)
      .then(() => {
        commit("SET_TASKS_AFTER_DELETE", payload);
      })
      .catch(() => {
        Swal.fire("Error", "Something went wrong", "error");
      })
      .finally(() => {
        commit("CHANGE_LOADING_STATUS", false);
      });
  },
  getTaskById({ commit }, payload) {
    commit("CHANGE_LOADING_STATUS", true);
    return TaskService.getTasksById(payload).then(({ data }) => {
      commit("SET_TASK", data);
    });
  },
  editTask({ commit }, payload) {
    commit("CHANGE_LOADING_STATUS", true);
    return TaskService.editTask(payload).then(({ data }) => {
      commit("EDIT_TASK", data);
    });
  },
};
