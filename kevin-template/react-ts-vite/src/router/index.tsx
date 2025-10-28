import { lazy } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import LazyLoad from "./LazyLoad";
import { RouteObject as ReactRouterRouteObject } from "react-router-dom";

export interface MetaProps {
	keepAlive?: boolean;
	requiresAuth?: boolean;
	title: string;
	key?: string;
  needBack?: boolean;
}

export type RouteObject = ReactRouterRouteObject & {
	children?: RouteObject[];
	meta?: MetaProps;
	isLink?: string;
};


const Router = () => {
  const AllRouters: RouteObject[] = [
    {
      path: '/',
      element: <Navigate to='/home' />,
    },
    {
      path: '/home',
      element: LazyLoad(lazy(() => import(/* webpackChunkName: "home" */ '@/pages/Home/index'))),
      meta: {
        requiresAuth: true,
        title: '首页',
        key: 'home',
      }
    },
    {
      path: "/404",
      element: LazyLoad(lazy(() => import(/* webpackChunkName: "404" */ '@/pages/404/index'))),
      meta: {
        requiresAuth: false,
        title: "404",
        key: "404"
      }
    },
    {
      path: "*",
      element: <Navigate to="/404" />
    }
  ]
  const routes = useRoutes(AllRouters);
  return routes;
}

export default Router;