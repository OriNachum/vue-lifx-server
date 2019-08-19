import Vue from 'vue';
import Router from 'vue-router';
import MainPage from './views/MainPage.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: MainPage,
    },
    {
      path: '/bulb',
      name: 'bulb',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/BulbPage.vue'),
      /*
        beforeEnter: ( to, next, from ) => {
        let a = a;
      },
      */
    },
    {
      path: '/schedule',
      name: 'schedule',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ './views/Schedule/SchedulePage.vue'),
    },
    {
      path: '/schedule/defineAction',
      name: 'defineAction',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ './views/Schedule/DefineAction.vue'),
    },
    {
      path: '/schedule/scheduleAction',
      name: 'scheduleAction',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ './views/Schedule/ScheduleAction.vue'),
    },
    {
      path: '/schedule/editSchedule',
      name: 'editSchedule',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ './views/Schedule/EditSchedule.vue'),
    },
  ],
});
