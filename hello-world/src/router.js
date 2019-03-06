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
  ],
});
