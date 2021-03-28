import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AddTask from "../views/AddTask";
import EditTask from "../views/EditTask";
import List from "../views/List";
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;