import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  changeActiveTabKey,
  changeHeaderTabList,
} from "@/store/slice/LayoutSlice";
import { Dropdown, Menu, Tabs, TabsProps } from "antd";
import React, { useState, useEffect, memo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAliveController } from "react-activation";
import { MenuProps } from "antd/lib";
import {
  CloseOutlined,
  ColumnWidthOutlined,
  EllipsisOutlined,
  MinusOutlined,
  SwapLeftOutlined,
  SwapRightOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";
import { getTargetElement, getTargetIncludeElement } from "@/utils";

type TabsSubMenu = "one" | "other" | "left" | "right" | "all";
function TabsComp(props: any) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { dropScope } = useAliveController();
  const { tab, headerTabList, activeTabKey } = useAppSelector((store: any) => {
    return store.Layout;
  });

  const tabsRef = useRef(null);
  const [showMenu, setShowMenu] = useState({
    show: false,
    top: 0,
    showIndex: null,
    left: 0,
  });

  const items: MenuProps["items"] = [
    {
      label: (
        <div
          className={styles.tabs_item}
          onClick={() => {
            onClose(showMenu.showIndex, "one");
          }}
        >
          <CloseOutlined />
          <p className={styles.tabs_item_text}>关闭</p>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div
          className={styles.tabs_item}
          onClick={() => {
            onClose(showMenu.showIndex, "other");
          }}
        >
          <ColumnWidthOutlined />
          <p className={styles.tabs_item_text}>关闭其他</p>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div
          className={styles.tabs_item}
          onClick={() => {
            onClose(showMenu.showIndex, "left");
          }}
        >
          <SwapLeftOutlined />
          <p className={styles.tabs_item_text}>关闭左侧</p>
        </div>
      ),
      key: "2",
    },
    {
      label: (
        <div
          className={styles.tabs_item}
          onClick={() => {
            onClose(showMenu.showIndex, "right");
          }}
        >
          <SwapRightOutlined />
          <p className={styles.tabs_item_text}>关闭右侧</p>
        </div>
      ),
      key: "3",
    },
    {
      label: (
        <div
          className={styles.tabs_item}
          onClick={() => {
            onClose(showMenu.showIndex, "all");
          }}
        >
          <MinusOutlined />
          <p className={styles.tabs_item_text}>关闭全部</p>
        </div>
      ),
      key: "4",
    },
  ];
  /*
    切换tabs栏
  */
  const onChange = (act) => {
    const obj = headerTabList.find((a: any) => a.key == act);
    if (obj) {
      dispatch(changeActiveTabKey({ activeTabkey: obj.key }));
      navigate(obj.path);
    }
  };
  /**
   * 关闭tab栏
   * @param delId tab key值
   */
  const onEdit = (delId) => {
    if (headerTabList.length <= 1) return false;
    const newHeaderTabList = JSON.parse(JSON.stringify(headerTabList));
    const delIndex = newHeaderTabList.findIndex((e: any) => e.key == delId);
    if (!newHeaderTabList[delIndex].closable) return false;

    let newActkey = ""; // 新选中tab的key
    let newActPath = ""; // 新选中tab的path
    let delObj: any = {}; // 关掉的tab对象信息
    if (delId == activeTabKey) {
      // 关闭的tab为当前激活的tab
      if (!delIndex) {
        // tab在第一位的情况,关闭后激活状态和路由完后一个tab过度
        newActkey = newHeaderTabList[delIndex + 1].key;
        newActPath = newHeaderTabList[delIndex + 1].path;
        delObj = newHeaderTabList.splice(0, 1);
      } else {
        // tab不在第一位的情况,关闭后激活状态和路由完前一个tab过度
        newActkey = newHeaderTabList[delIndex - 1].key;
        newActPath = newHeaderTabList[delIndex - 1].path;
        delObj = newHeaderTabList.splice(delIndex, 1);
      }
      // 更新激活的tabKey
      dispatch(changeActiveTabKey({ activeTabKey: newActkey }));
    } else {
      delObj = newHeaderTabList.splice(delIndex, 1);
      newActPath = "";
    }
    // 更新激活的headerTabs栏
    dispatch(changeHeaderTabList({ headerTabList: newHeaderTabList }));
    dropScope(delObj[0].path); // 关掉tabs需要清掉缓存

    newActPath && navigate(newActPath);
  };
  /** tabs子菜单列表操作
   * @param index tabs索引
   * @param type 操作类型
   */
  const onClose = (index: number, type: TabsSubMenu) => {
    let newHeaderTabList = JSON.parse(JSON.stringify(headerTabList));
    let newActkey = "";
    let newActPath = "";

    setShowMenu((pre) => {
      return {
        ...pre,
        show: false,
      };
    });
    switch (type) {
      case "one":
        const id = newHeaderTabList[index].key;
        onEdit(id);
        break;
      case "other":
        newActkey = newHeaderTabList[index].key;
        newActPath = newHeaderTabList[index].path;
        newHeaderTabList = newHeaderTabList.filter(
          (d, idx) => !+d.key || idx == index
        );
        // 更新激活的tabKey
        dispatch(changeActiveTabKey({ activeTabKey: newActkey }));
        dispatch(changeHeaderTabList({ headerTabList: newHeaderTabList }));
        newActPath && navigate(newActPath);
        break;
      case "left":
        newActkey = newHeaderTabList[index].key;
        newActPath = newHeaderTabList[index].path;
        newHeaderTabList = newHeaderTabList.filter(
          (d, idx) => !+d.key || idx >= index
        );
        // 更新激活的tabKey
        dispatch(changeActiveTabKey({ activeTabKey: newActkey }));
        dispatch(changeHeaderTabList({ headerTabList: newHeaderTabList }));
        newActPath && navigate(newActPath);
        break;
      case "right":
        newActkey = newHeaderTabList[index].key;
        newActPath = newHeaderTabList[index].path;
        newHeaderTabList = newHeaderTabList.filter(
          (d, idx) => !+d.key || idx <= index
        );
        // 更新激活的tabKey
        dispatch(changeActiveTabKey({ activeTabKey: newActkey }));
        dispatch(changeHeaderTabList({ headerTabList: newHeaderTabList }));
        newActPath && navigate(newActPath);
        break;
      case "all":
        newHeaderTabList = newHeaderTabList.filter((d, idx) => !+d.key);
        // 更新激活的tabKey
        dispatch(changeActiveTabKey({ activeTabKey: "0" }));
        dispatch(changeHeaderTabList({ headerTabList: newHeaderTabList }));
        newActPath && navigate("/home");
        break;
      default:
        break;
    }
  };
  // 菜单组件
  const MenuContext = () => (
    <div
      className={styles.tabs}
      style={{ top: showMenu.top, left: showMenu.left }}
    >
      {items.map((d: any, idx) => {
        return <span key={idx}>{d.label}</span>;
      })}
    </div>
  );
  /**
   * 处理子菜单时间
   * @param e 元素
   */
  const handleSubMenu = (e) => {
    const bool = getTargetElement(e.target, styles.tabs);
    if (!bool) {
      setShowMenu((pre) => {
        return {
          ...pre,
          show: false,
        };
      });
    }
  };

  useEffect(() => {
    tabsRef.current.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
    document.addEventListener("click", (e) => {
      handleSubMenu(e);
    });
    return () => {
      document.removeEventListener("click", (e) => {
        handleSubMenu(e);
      });
    };
  }, []);
  return (
    <div ref={tabsRef}>
      <Tabs
        hideAdd
        type="editable-card"
        onChange={onChange}
        onEdit={onEdit}
        activeKey={activeTabKey}
        items={headerTabList.map((d, idx) => {
          return {
            ...d,
            label: (
              <div
                className={styles.customLabel}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setShowMenu(() => {
                    return {
                      top: e.clientY,
                      left: e.clientX,
                      showIndex: idx,
                      show: true,
                    };
                  });
                }}
              >
                {d.label}
              </div>
            ),
          };
        })}
        tabBarStyle={{ ...tab }}
      />
      {showMenu.show ? <MenuContext /> : null}
    </div>
  );
}
export default memo(TabsComp);
