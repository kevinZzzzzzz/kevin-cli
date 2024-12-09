import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { flattenRoutes as routes } from "./router/index";
import api from "@/api";
import { AliveScope } from "react-activation";
import KeepAliveComp from "@/components/KeepAliveComp";
import LoadingComp from "./components/Loading";
import { Spin, ConfigProvider, theme as Theme } from "antd";
import "dayjs/locale/zh-cn";
// import locale from "antd/locale/zh_CN";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { ColorByTheme } from "./constants/theme";
import "@/locales/config";
import { useTranslation, Trans } from "react-i18next";
import { setupNProgress } from "./router/imports";
setupNProgress();
declare global {
  interface Window {
    $api: any;
    NProgress: any;
  }
}
/* 
  设置全局变量
*/
window.$api = { ...api };

function App() {
  const { t, i18n } = useTranslation();
  const { theme, locale } = useAppSelector((store) => {
    return store.Layout;
  });
  useEffect(() => {
    window.NProgress?.start();
    window.NProgress?.done();
    i18n.changeLanguage(locale);
  }, [locale]);
  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === "light" ? Theme.defaultAlgorithm : Theme.darkAlgorithm,
        components: {
          Layout: {
            headerBg: ColorByTheme[theme]["headerBg"],
            siderBg: ColorByTheme[theme]["siderBg"],
            footerBg: ColorByTheme[theme]["footerBg"],
            triggerBg: ColorByTheme[theme]["triggerBg"],
            triggerColor: ColorByTheme[theme]["triggerColor"],
            triggerHeight: ColorByTheme[theme]["triggerHeight"],
          },
          Tabs: {
            cardBg: ColorByTheme[theme]["tabsCardBg"],
          },
        },
      }}
      // locale={locale}
    >
      <BrowserRouter>
        <AliveScope>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />}></Route>
            <Route
              path="/:notFoundPath"
              element={<Navigate to="/exception/404" />}
            ></Route>
            {routes.map((e: any) => {
              return (
                <Route
                  key={e.key}
                  path={e.path}
                  element={
                    <e.layout>
                      <Suspense fallback={<LoadingComp></LoadingComp>}>
                        <KeepAliveComp {...e}></KeepAliveComp>
                      </Suspense>
                    </e.layout>
                  }
                ></Route>
              );
            })}
          </Routes>
        </AliveScope>
      </BrowserRouter>
    </ConfigProvider>
  );
}
export default App;
