import { SPORT_CATEGORIES, STATUSES } from "@/consts";

export default {
  taskWithCategoryAndStatusValues: (state) => {
    const category = SPORT_CATEGORIES.find(
      (el) => el.value === state.task.category
    );
    const status = STATUSES.find((el) => el.value === state.task.status);
    return { ...state.task, category, status };
  },
};
