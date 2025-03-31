import router from "@/routers";
import { defineStore } from "pinia";
import { getUrlWithParams } from "@/utils";
import { useKeepAliveStore } from "./keepAlive";
import { TabsState, TabsMenuProps } from "@/stores/interface";
import piniaPersistConfig from "@/stores/helper/persist";

const keepAliveStore = useKeepAliveStore();
function checkSysPath(str) {
  if (typeof str !== "string") {
    return "/";
  }
  if (str.startsWith("/sys")) {
    const parts = str.split("/");
    if (parts.length) {
      return parts[1].startsWith("sys") ? `/${parts[1]}/` : "/";
    } else {
      return "/";
    }
  } else {
    return "/";
  }
}
const pathname: string = checkSysPath(window.location.pathname);

export const useTabsStore = defineStore({
  id: "system-tabs",
  state: (): TabsState => ({
    tabsMenuList: {}
  }),
  getters: {
    getTabsMenuList(): TabsMenuProps[] {
      if (!this.tabsMenuList[pathname]) {
        this.tabsMenuList[pathname] = [];
      }
      return this.tabsMenuList[pathname];
    }
  },
  actions: {
    // Add Tabs
    async addTabs(tabItem: TabsMenuProps) {
      if (this.getTabsMenuList.every(item => item.path !== tabItem.path)) {
        this.getTabsMenuList.push(tabItem);
      }
      // add keepalive
      if (!keepAliveStore.keepAliveName.includes(tabItem.name) && tabItem.isKeepAlive) {
        keepAliveStore.addKeepAliveName(tabItem.path);
      }
    },
    // Remove Tabs
    async removeTabs(tabPath: string, isCurrent: boolean = true) {
      if (isCurrent) {
        this.getTabsMenuList.forEach((item, index) => {
          if (item.path !== tabPath) return;
          const nextTab = this.getTabsMenuList[index + 1] || this.getTabsMenuList[index - 1];
          if (!nextTab) return;
          router.push(nextTab.path);
        });
      }
      // remove keepalive
      const tabItem = this.getTabsMenuList.find(item => item.path === tabPath);
      tabItem?.isKeepAlive && keepAliveStore.removeKeepAliveName(tabItem.path);
      // set tabs
      this.tabsMenuList[pathname] = this.getTabsMenuList.filter(item => item.path !== tabPath);
    },
    // Close Tabs On Side
    async closeTabsOnSide(path: string, type: "left" | "right") {
      const currentIndex = this.getTabsMenuList.findIndex(item => item.path === path);
      if (currentIndex !== -1) {
        const range = type === "left" ? [0, currentIndex] : [currentIndex + 1, this.getTabsMenuList.length];
        this.tabsMenuList[pathname] = this.getTabsMenuList.filter((item, index) => {
          return index < range[0] || index >= range[1] || !item.close;
        });
      }
      // set keepalive
      const KeepAliveList = this.getTabsMenuList.filter(item => item.isKeepAlive);
      keepAliveStore.setKeepAliveName(KeepAliveList.map(item => item.path));
    },
    // Close MultipleTab
    async closeMultipleTab(tabsMenuValue?: string) {
      this.tabsMenuList[pathname] = this.getTabsMenuList.filter(item => {
        return item.path === tabsMenuValue || !item.close;
      });
      // set keepalive
      const KeepAliveList = this.getTabsMenuList.filter(item => item.isKeepAlive);
      keepAliveStore.setKeepAliveName(KeepAliveList.map(item => item.path));
    },
    // Set Tabs
    async setTabs(tabsMenuList: TabsMenuProps[]) {
      this.tabsMenuList[pathname] = tabsMenuList;
    },
    async clearTabs() {
      this.tabsMenuList = {};
    },
    // Set Tabs Title
    async setTabsTitle(title: string) {
      this.getTabsMenuList.forEach(item => {
        if (item.path == getUrlWithParams()) item.title = title;
      });
    }
  },
  persist: piniaPersistConfig("system-tabs", ["tabsMenuList"], sessionStorage)
});
