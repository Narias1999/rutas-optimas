import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import store from './../store'

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/main',
    name: 'main',
    component: Dashboard,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});


// Authentication guard
router.beforeEach(function(to, from, next) {
  const authenticated = store.getters.authenticated;
  if (authenticated) {
    if (to.path === "/" || to.path === "/login") {
      return next("/main");
    }
  } else {
    if (to.path !== "/login") {
      return next("/login");
    }
  }
  next();
});

export default router;
