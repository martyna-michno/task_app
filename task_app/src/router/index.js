import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AddTask from "../views/AddTask";
import EditTask from "../views/EditTask";
import List from "../views/List";
import Preview from "@/views/Preview";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/add",
    name: "AddTask",
    component: AddTask,
  },
  {
    path: "/list",
    name: "List",
    component: List,
  },
  {
    path: "/edit/:id",
    name: "EditTask",
    component: EditTask,
    props: true,
  },
  {
    path: "/preview/:id",
    name: "Preview",
    component: Preview,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

export default router;
