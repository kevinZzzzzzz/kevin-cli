import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ColorByTheme, ThemeSetting } from "@/constants/theme";
export const LayoutSlice = createSlice({
  name: "Layout",
  initialState: {
    ...ThemeSetting,
    collapsed: false,
    fullScreen: false,
    // { label: "首页", path: "/home", key: "0" }
    headerTabList: [], // 顶部tab栏
    activeTabKey: "1", // 当前激活的页面key
    activePathInfo: {}, // 当前激活的页面信息
  },
  reducers: {
    // 张开闭合sider
    changeCollapsed(state: any, { payload }) {
      state.collapsed = payload.collapsed;
    },
    // 全屏
    changeFullScreen(state: any, { payload }) {
      state.fullScreen = payload.fullScreen;
      if (!payload.fullScreen) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    },
    // 切换主题
    changeTheme(state: any, { payload }) {
      state.theme = payload.theme;
    },
    // 切换语言
    changeLocale(state: any, { payload }) {
      state.locale = payload.locale;
    },
    changeActivePath(state: any, { payload }) {
      state.activePathInfo = payload.activePathInfo;
    },
    changeActiveTabKey(state: any, { payload }) {
      state.activeTabKey = payload.activeTabKey;
    },
    changeHeaderTabList(state, { payload }) {
      if (payload.headerTabList) {
        state.headerTabList = payload.headerTabList;
      }
    },
  },
});

export const {
  changeCollapsed,
  changeTheme,
  changeFullScreen,
  changeLocale,
  changeActivePath,
  changeActiveTabKey,
  changeHeaderTabList,
} = LayoutSlice.actions;
export default LayoutSlice.reducer;
