import IconComp from "@/layout/base/components/Icon";
import {
  LAYOUT_NAME_MAP,
  LAYOUT_PREFIX,
  ROUTER_NAME_TO_PAGES_MAP,
  VIEW_PREFIX,
} from "./imports";
/**
 * 处理路由组件，根据页面路径获取页面组件
 * @param component 页面路径
 */
export const handleRouteComponent = (component: string, route) => {
  if (!component) {
    return <></>;
  }
  const pageName = component.replace(VIEW_PREFIX, "");
  if (!ROUTER_NAME_TO_PAGES_MAP[pageName]) {
    throw new Error(`Page ${pageName} not found`);
  }
  return ROUTER_NAME_TO_PAGES_MAP[pageName];
};
/**
 * 处理布局组件
 * @param layout 布局名称
 */
export const handleLayoutComponent = (layout) => {
  if (!layout) {
    return null;
  }
  const layoutName = layout.replace(LAYOUT_PREFIX, "");
  if (!LAYOUT_NAME_MAP[layoutName]) {
    throw new Error(`Layout ${layoutName} not found`);
  }
  return LAYOUT_NAME_MAP[layoutName];
};
/**
 * 处理路由
 * @param routesList 路由表
 * @returns
 */
export const handledRoutes = (routesList: GeneratedRoute[]) => {
  if (!routesList) {
    return [];
  }
  const result: GeneratedRoute[] = [];
  routesList.forEach((route) => {
    const item = {
      ...route,
      layout: handleLayoutComponent(route.layout),
      component: handleRouteComponent(route.component, route),
      children: handledRoutes(route.children),
    };
    result.push(item);
  });
  return result;
};

/**
 *扁平化处理路由
 * @param routerData 路由表
 */
export function handleFlattenRoutes(
  routerData: GeneratedRoute[],
  fatherIds = []
) {
  return routerData.reduce((prev, next) => {
    const route = {
      ...next,
      fatherId: fatherIds.length > 0 ? [...fatherIds] : null,
    };
    prev.push(route);
    if (route.children && route.children.length > 0) {
      prev.push(
        ...handleFlattenRoutes(route.children, [...fatherIds, route.key])
      );
    }

    return prev;
  }, []);
}

/**
 * 初始化菜单栏
 * @param data 路由表
 * @param isChild 是否是子菜单
 */
export const initMenuList = (data: any, isChild = false) => {
  let newMenuList: any = [];
  for (const e of data.filter((d) => d.meta.needShow)) {
    const obj = {
      key: e.key,
      icon: IconComp(e.meta.icon),
      path: e.path,
      children:
        e.children && e.children.length ? initMenuList(e.children, true) : null,
      disabled: !e.path && !(e.children && e.children.length),
      label: e.meta.i18nKey,
      title: e.name,
      type: null,
    };
    newMenuList.push(obj);
  }
  newMenuList = newMenuList.filter(
    (d: any) => !d.children || (d.children && d.children.length)
  );
  return newMenuList;
};
