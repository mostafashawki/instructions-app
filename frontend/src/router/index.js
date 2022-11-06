import { route } from 'quasar/wrappers';
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router';
import routes from './routes';
import store from '../store';
import { feathersClient } from '../plugins/feathers-client';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    try {
      // debugger;
      if (to.meta.isProtected && !store.state.isLoggedIn) {
        store.state.auth = { ...(await feathersClient.reAuthenticate()) };
        store.state.isLoggedIn = true;
      }

      if (store.isTokenExpired()) {
        store.state.isLoggedIn = false;
      }

      console.log('store.state.auth 🔑🔑🔑🔑🔑 ', store.state.auth);
    } catch (err) {
      console.log('❌❌❌❌❌', err.message);
      store.state.isLoggedIn = false;
    }

    next();
  });
  return Router;
});
