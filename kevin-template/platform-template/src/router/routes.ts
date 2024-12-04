export const generatedRoutes: GeneratedRoute[] = [
  {
    key: "0",
    name: "Home",
    path: "/home",
    layout: "layout.base",
    component: "pages.home",
    meta: {
      title: "home",
      i18nKey: "home",
      icon: "AppstoreOutlined",
      keepAlive: true,
      order: 0,
      needShow: true,
    },
  },
  {
    key: "1",
    name: "About",
    path: "/about",
    layout: "layout.base",
    component: "pages.about",
    meta: {
      title: "about",
      i18nKey: "about",
      icon: "DesktopOutlined",
      keepAlive: true,
      order: 1,
      needShow: true,
    },
  },
  {
    key: "2",
    name: "Exception",
    path: "/exception",
    layout: "layout.base",
    meta: {
      title: "exception",
      i18nKey: "exception",
      icon: "RocketOutlined",
      order: 2,
      needShow: true,
    },
    children: [
      {
        key: "201",
        name: "403",
        path: "/exception/403",
        layout: "layout.base",
        component: "pages.exception.403",
        meta: {
          title: "403",
          i18nKey: "403",
          icon: "ExclamationCircleOutlined",
          keepAlive: true,
          order: 0,
          needShow: true,
        },
      },
      {
        key: "202",
        name: "404",
        path: "/exception/404",
        layout: "layout.base",
        component: "pages.exception.404",
        meta: {
          title: "404",
          i18nKey: "404",
          icon: "CloseCircleOutlined",
          keepAlive: true,
          order: 1,
          needShow: true,
        },
      },
      {
        key: "203",
        name: "500",
        path: "/exception/500",
        layout: "layout.base",
        component: "pages.exception.500",
        meta: {
          title: "500",
          i18nKey: "500",
          icon: "IssuesCloseOutlined",
          keepAlive: true,
          order: 2,
          needShow: true,
        },
      },
    ],
  },
  {
    key: "3",
    name: "Exception1",
    path: "/exception1",
    layout: "layout.base",
    meta: {
      title: "exception",
      i18nKey: "exception",
      icon: "RocketOutlined",
      order: 2,
      needShow: true,
    },
    children: [
      {
        key: "301",
        name: "403",
        path: "/exception1/403",
        layout: "layout.base",
        component: "pages.exception.403",
        meta: {
          title: "403",
          i18nKey: "403",
          icon: "ExclamationCircleOutlined",
          keepAlive: true,
          order: 0,
          needShow: true,
        },
      },
      {
        key: "302",
        name: "404",
        path: "/exception1/404",
        layout: "layout.base",
        component: "pages.exception.404",
        meta: {
          title: "404",
          i18nKey: "404",
          icon: "CloseCircleOutlined",
          keepAlive: true,
          order: 1,
          needShow: true,
        },
      },
      {
        key: "303",
        name: "500",
        path: "/exception1/500",
        layout: "layout.base",
        component: "pages.exception.500",
        meta: {
          title: "500",
          i18nKey: "500",
          icon: "IssuesCloseOutlined",
          keepAlive: true,
          order: 2,
          needShow: true,
        },
      },
    ],
  },
  {
    key: "99",
    name: "Login",
    path: "/login",
    layout: "layout.blank",
    component: "pages.login",
    meta: {
      title: "login",
      i18nKey: "login",
      keepAlive: false,
      icon: "null",
      order: 0,
      needShow: false,
    },
  },
];
