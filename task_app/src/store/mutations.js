export default {
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
};
