const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Dashboard.vue') }],
    meta: { isProtected: true },
  },
  {
    path: '/tasks',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import(/* webpackChunkName: "fullApp" */ 'pages/tasks/Index.vue') }],
    meta: { isProtected: true },
  },
  {
    path: '/tasks/details/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import(/* webpackChunkName: "fullApp" */ 'pages/tasks/Details.vue') }],
    meta: { isProtected: true },
  },

  {
    path: '/settings',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import(/* webpackChunkName: "fullApp" */ 'pages/Settings.vue') }],
    meta: { isProtected: true },
  },
  {
    path: '/profile',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import(/* webpackChunkName: "fullApp" */ 'pages/Profile.vue') }],
    meta: { isProtected: true },
  },

  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/auth/Login.vue') }],
    meta: { isProtected: false },
  },
  {
    path: '/forgot-password',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/auth/ForgotPassword.vue') }],
    meta: { isProtected: false },
  },
  {
    path: '/auth/reset-password',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/auth/ResetPassword.vue') }],
    meta: { isProtected: false },
  },
  {
    path: '/auth/verify-email',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/auth/VerifyEmail.vue') }],
    meta: { isProtected: false },
  },
  {
    path: '/auth/verification-email-been-sent',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/auth/VerificationEmailBeenSent.vue'),
      },
    ],
    meta: { isProtected: false },
  },
  {
    path: '/auth/error-page',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/auth/ErrorPage.vue') }],
    meta: { isProtected: false },
  },
  {
    path: '/auth/password-confirm-message',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/auth/PasswordConfirmMessage.vue'),
      },
    ],
    meta: { isProtected: false },
  },
  {
    path: '/auth/link-expired',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/auth/LinkExpired.vue') }],
    meta: { isProtected: false },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
