import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import GrammarView from "../views/GrammarView.vue";
import GrammarDetailsView from "../views/GrammarDetailsView.vue";
import VocabView from "../views/VocabView.vue";
import VocabDetailsView from "../views/VocabDetailsView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/grammar",
    name: "grammar",
    component: GrammarView,
  },
  {
    path: "/grammar/:id",
    name: "GrammarDetails",
    component: GrammarDetailsView,
    props: true,
  },
  { path: "/vocab", name: "vocab", component: VocabView },
  {
    path: "/vocab/:id",
    name: "VocabDetails",
    component: VocabDetailsView,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
