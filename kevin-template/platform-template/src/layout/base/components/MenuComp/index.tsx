import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { flattenMenuList, MenuInitList } from "@/router";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  // changeActivePath,
  changeActiveTabKey,
  changeHeaderTabList,
} from "@/store/slice/LayoutSlice";
interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const MenuComp: React.FC = (props: any) => {
  const { headerTabList } = useAppSelector((store: any) => {
    return store.Layout;
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const [menuList, setMenuList] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(["0"]);
  const [stateOpenKeys, setStateOpenKeys] = useState(["0"]);
  const { pathname, search } = location;

  useEffect(() => {
    settingMenu(flattenMenuList, true);
  }, []);
  useEffect(() => {
    // 切换路由时 更新父子级菜单的激活状态
    if (flattenMenuList.length) {
      settingMenu(flattenMenuList);
    }
  }, [location]);
  useEffect(() => {
    setMenuList(MenuInitList);
  }, [props.collapsed]);

  /*
    初始化或者切换路由时, 保存menu组件的父子级菜单的激活状态
    @params:
      menu: 扁平后的菜单
      isInit: 是否为初始化
  */
  function settingMenu(menu: any, isInit = false) {
    const activeItem = menu.find(
      (d: any) => d.path == pathname || d.path == `${pathname}${search}`
    );
    if (activeItem) {
      setSelectedKeys(() => [activeItem.key]);
      setStateOpenKeys(() =>
        activeItem.fatherId ? [...activeItem.fatherId] : ["1"]
      );
      const obj = {
        label: t(activeItem.label || activeItem.name),
        key: activeItem.key,
        path: activeItem.path,
      };
      if (isInit) {
        // 初始化更新headerTabs
        dispatch(changeHeaderTabList({ headerTabList: [obj] }));
      } else {
        const newHeaderTabList = JSON.parse(JSON.stringify(headerTabList));
        // 先判断是否已打开过
        const isExist = newHeaderTabList.find((a: any) => a.key == obj.key);
        if (!isExist) {
          const item = {
            label: obj.label,
            key: obj.key,
            path: obj.path,
          };
          newHeaderTabList.push(item);
          // 更新headerTab组件的数据
          dispatch(changeHeaderTabList({ headerTabList: newHeaderTabList }));
          dispatch(changeActiveTabKey({ activeTabKey: item.key }));
        }
      }
      // 每次路由跳转都要更新tabs激活状态
      dispatch(changeActiveTabKey({ activeTabKey: obj.key }));
    }
  }
  const onClick: MenuProps["onClick"] = (e: any) => {
    setSelectedKeys(() => [e.key]);
    const obj = flattenMenuList.find((d: any) => d.key == e.key);
    obj?.path && navigate(obj.path);
  };
  const onOpenChange = (openKeysTemp: string[]) => {
    // console.log(openKeysTemp, "openKeysTemp--------");
    // if (!openKeysTemp.length) {
    //   setStateOpenKeys([]);
    //   return false
    // }
    // const keys = []
    // const
    if (openKeysTemp.length) {
      setStateOpenKeys(openKeysTemp);
    } else {
      setStateOpenKeys([]);
    }
  };
  return (
    <div className={styles.menuComp}>
      <Menu
        onClick={onClick}
        onOpenChange={onOpenChange}
        mode="inline"
        openKeys={stateOpenKeys}
        selectedKeys={selectedKeys}
        // onOpenChange={onOpenChange}
        items={menuList.map((d) => {
          return {
            ...d,
            label: t(d.label || d.name),
          };
        })}
      />
    </div>
  );
};

export default MenuComp;
