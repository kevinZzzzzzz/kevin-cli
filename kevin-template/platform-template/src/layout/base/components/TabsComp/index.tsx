import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  changeActiveTabKey,
  changeHeaderTabList,
} from "@/store/slice/LayoutSlice";
import { Tabs } from "antd";
import React, { useState, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useAliveController } from "react-activation";

function TabsComp(props: any) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { dropScope } = useAliveController();
  const { tab, headerTabList, activeTabKey } = useAppSelector((store: any) => {
    return store.Layout;
  });

  /*
    切换tabs栏
  */
  const onChange = (act: any) => {
    const obj = headerTabList.find((a: any) => a.key == act);
    if (obj) {
      dispatch(changeActiveTabKey({ activeTabkey: obj.key }));
      navigate(obj.path);
    }
  };
  /*
      关闭tab栏
    */
  const onEdit = (delId: any) => {
    if (headerTabList.length <= 1) return false;
    const newHeaderTabList = JSON.parse(JSON.stringify(headerTabList));
    const delIndex = newHeaderTabList.findIndex((e: any) => e.key == delId);
    if (delIndex <= -1) return false;

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

    if (delObj[0].path == "/chart/assetManage") {
      // !!特殊处理 图表页面需要
      sessionStorage.removeItem("chatState");
    }
    newActPath && navigate(newActPath);
  };
  return (
    <Tabs
      hideAdd
      type="editable-card"
      onChange={onChange}
      onEdit={onEdit}
      activeKey={activeTabKey}
      items={headerTabList}
      tabBarStyle={{ ...tab }}
    />
  );
}
export default memo(TabsComp);
