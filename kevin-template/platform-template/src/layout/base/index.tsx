import React, { PureComponent } from "react";
import styles from "./index.module.scss";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { ConfigProvider, Layout, Menu, Tabs, theme } from "antd";
import { changeActiveTabKey, changeCollapsed } from "@/store/slice/LayoutSlice";
import "dayjs/locale/zh-cn";
import locale from "antd/locale/zh_CN";
import MenuComp from "./components/MenuComp";
import HeaderComp from "./components/HeaderComp";
import TabsComp from "./components/TabsComp";

const { Header, Content, Footer, Sider } = Layout;

const BaseLayout = ({ children, ...props }) => {
  const dispatch = useAppDispatch();
  const {
    theme,
    collapsed,
    header,
    content,
    tab,
    sider,
    footer,
    headerTabList,
    activeTabKey,
  } = useAppSelector((store: any) => {
    return store.Layout;
  });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={sider}
        collapsible
        breakpoint={sider.breakpoint}
        collapsed={collapsed}
        onCollapse={(value) => dispatch(changeCollapsed({ collapsed: value }))}
      >
        <div className={styles.sider}>
          <div className={styles.sider_logo}></div>
        </div>
        <MenuComp />
      </Sider>
      <Layout>
        <Header style={{ ...header }}>
          <HeaderComp />
        </Header>
        <TabsComp />
        <Content style={{ ...content }}>
          <div className={styles.main_context}>{children}</div>
        </Content>
        <Footer style={{ ...footer }}></Footer>
      </Layout>
    </Layout>
  );
};
export default React.memo(BaseLayout);
