import { generatedRoutes } from "@/router/routes";
import { handledRoutes, handleFlattenRoutes, initMenuList } from "./elegant";

// 路由信息表
const AllRouters: GeneratedRoute[] = handledRoutes(generatedRoutes);
// 扁平化路由信息
const flattenRoutes: GeneratedRoute[] = handleFlattenRoutes(AllRouters);

// 初始化菜单列表
const MenuInitList: GeneratedRoute[] = initMenuList(generatedRoutes);
// 扁平化菜单列表
const flattenMenuList: GeneratedRoute[] = handleFlattenRoutes(MenuInitList);

export { AllRouters, flattenRoutes, MenuInitList, flattenMenuList };
