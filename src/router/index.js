import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "Dashboard",
        meta: { title: "Dashboard", icon: "dashboard", affix: true },
      },
    ],
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: "/issue",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/issues/index"),
        name: "Issues",
        meta: { title: "Issues", icon: "message", noCache: true },
      },
    ],
  },
  {
    path: "/article",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/article/index"),
        name: "Article",
        meta: { title: "Article", icon: "list", noCache: true },
      },
    ],
  },
  {
    path: "/writing",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/components-demo/tinymce"),
        name: "Writing",
        meta: { title: "Writing", icon: "edit", noCache: true },
      },
    ],
  },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // {
  //   path: "/example",
  //   component: Layout,
  //   redirect: "/example/list",
  //   name: "Example",
  //   meta: {
  //     title: "Example",
  //     icon: "el-icon-s-help",
  //   },
  //   children: [
  //     {
  //       path: "create",
  //       component: () => import("@/views/example/create"),
  //       name: "CreateArticle",
  //       meta: { title: "Create Article", icon: "edit" },
  //     },
  //     {
  //       path: "edit/:id(\\d+)",
  //       component: () => import("@/views/example/edit"),
  //       name: "EditArticle",
  //       meta: {
  //         title: "Edit Article",
  //         noCache: true,
  //         activeMenu: "/example/list",
  //       },
  //       hidden: true,
  //     },
  //     {
  //       path: "list",
  //       component: () => import("@/views/example/list"),
  //       name: "ArticleList",
  //       meta: { title: "Article List", icon: "list" },
  //     },
  //   ],
  // },

  // {
  //   path: "/tab",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "index",
  //       component: () => import("@/views/tab/index"),
  //       name: "Tab",
  //       meta: { title: "Tab", icon: "tab" },
  //     },
  //   ],
  // },

  // {
  //   path: "/error",
  //   component: Layout,
  //   redirect: "noRedirect",
  //   name: "ErrorPages",
  //   meta: {
  //     title: "Error Pages",
  //     icon: "404",
  //   },
  //   children: [
  //     {
  //       path: "401",
  //       component: () => import("@/views/error-page/401"),
  //       name: "Page401",
  //       meta: { title: "401", noCache: true },
  //     },
  //     {
  //       path: "404",
  //       component: () => import("@/views/error-page/404"),
  //       name: "Page404",
  //       meta: { title: "404", noCache: true },
  //     },
  //   ],
  // },

  // {
  //   path: "/error-log",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "log",
  //       component: () => import("@/views/error-log/index"),
  //       name: "ErrorLog",
  //       meta: { title: "Error Log", icon: "bug" },
  //     },
  //   ],
  // },
  {
    path: "/excel",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/excel/upload-excel"),
        name: "Excel",
        meta: {
          title: "Excel",
          icon: "excel",
        },
      },
    ],
  },

  // {
  //   path: "/zip",
  //   component: Layout,
  //   redirect: "/zip/download",
  //   alwaysShow: true,
  //   name: "Zip",
  //   meta: { title: "Zip", icon: "zip" },
  //   children: [
  //     {
  //       path: "download",
  //       component: () => import("@/views/zip/index"),
  //       name: "ExportZip",
  //       meta: { title: "Export Zip" },
  //     },
  //   ],
  // },

  // {
  //   path: "/pdf",
  //   component: Layout,
  //   redirect: "/pdf/index",
  //   children: [
  //     {
  //       path: "index",
  //       component: () => import("@/views/pdf/index"),
  //       name: "PDF",
  //       meta: { title: "PDF", icon: "pdf" },
  //     },
  //   ],
  // },
  // {
  //   path: "/pdf/download",
  //   component: () => import("@/views/pdf/download"),
  //   hidden: true,
  // },

  // {
  //   path: "/theme",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "index",
  //       component: () => import("@/views/theme/index"),
  //       name: "Theme",
  //       meta: { title: "Theme", icon: "theme" },
  //     },
  //   ],
  // },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
