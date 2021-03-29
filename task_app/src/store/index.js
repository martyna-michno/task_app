import Vue from "vue";
import Vuex from "vuex";
import TaskService from "@/services/TaskService.js";
import router from "@/router";
import { SPORT_CATEGORIES, STATUSES } from "@/consts";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    loading: false,
    task: {},
  },
  getters: {
    taskWithCategoryAndStatusValues: (state) => {
      const category = SPORT_CATEGORIES.find(
        (el) => el.value === state.task.category
      );
      const status = STATUSES.find((el) => el.value === state.task.status);
      return { ...state.task, category, status };
    },
  },
  mutations: {
    CHANGE_LOADING_STATUS(state, payload) {
      state.loading = payload;
    },
    ADD_TASK(state, payload) {
      state.tasks.push(payload);
    },
    EDIT_TASK(state, payload) {
      state.tasks = state.tasks.map((el) =>
        el.id === payload.id ? payload : el
      );
    },
    ADD_COMMENT(state, payload) {
      state.tasks = state.tasks.map((el) =>
        el.id === payload.id
          ? Object.assign({}, el, { comments: payload.comments })
          : el
      );
    },
    SET_TASKS(state, payload) {
      state.tasks = payload;
    },
    SET_TASK(state, payload) {
      state.task = payload;
    },
    SET_TASKS_AFTER_DELETE(state, payload) {
      state.tasks = state.tasks.filter((el) => el.id !== payload);
    },
  },
  actions: {
    addTask({ commit }, payload) {
      commit("CHANGE_LOADING_STATUS", true);
      return TaskService.addTask(payload)
        .then(() => {
          commit("ADD_TASK", payload);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          commit("CHANGE_LOADING_STATUS", false);
        });
    },
    addComment({ commit }, payload) {
      commit("CHANGE_LOADING_STATUS", true);
      return TaskService.addComment(payload)
        .then(() => {
          commit("ADD_COMMENT", payload);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          commit("CHANGE_LOADING_STATUS", false);
        });
    },
    getTasks({ commit }) {
      commit("CHANGE_LOADING_STATUS", true);
      TaskService.getTasks()
        .then(({ data }) => {
          commit("SET_TASKS", data);
        })
        .catch((err) => {
          console.log(err);
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
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          commit("CHANGE_LOADING_STATUS", false);
        });
    },
    getTaskById({ commit }, payload) {
      commit("CHANGE_LOADING_STATUS", true);
      return TaskService.getTasksById(payload)
        .then(({ data }) => {
          commit("SET_TASK", data);
        })
        .catch((err) => {
          console.log(err);
          router.push({
            name: "List",
          });
        })
        .finally(() => {
          commit("CHANGE_LOADING_STATUS", false);
        });
    },
    editTask({ commit }, payload) {
      commit("CHANGE_LOADING_STATUS", true);
      return TaskService.editTask(payload)
        .then(({ data }) => {
          commit("EDIT_TASK", data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          commit("CHANGE_LOADING_STATUS", false);
        });
    },
  },
});
