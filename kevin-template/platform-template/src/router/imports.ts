import BaseLayout from "@/layout/base";
import BlankLayout from "@/layout/blank";
import { lazy } from "react";

// 页面路径前缀
export const VIEW_PREFIX = "pages.";
// 布局路径前缀
export const LAYOUT_PREFIX = "layout.";

/**
 * 布局映射
 */
export const LAYOUT_NAME_MAP = {
  base: BaseLayout,
  blank: BlankLayout,
};
/**
 * 页面路径映射
 */
export const ROUTER_NAME_TO_PAGES_MAP = {
  home: lazy(() => import(/* webpackChunkName: "home" */ "@/pages/home/index")),
  about: lazy(
    () => import(/* webpackChunkName: "about" */ "@/pages/about/index")
  ),
  login: lazy(
    () => import(/* webpackChunkName: "login" */ "@/pages/login/index")
  ),
  "exception.403": lazy(
    () => import(/* webpackChunkName: "403" */ "@/pages/exception/403")
  ),
  "exception.404": lazy(
    () => import(/* webpackChunkName: "404" */ "@/pages/exception/404")
  ),
  "exception.500": lazy(
    () => import(/* webpackChunkName: "500" */ "@/pages/exception/500")
  ),
};
