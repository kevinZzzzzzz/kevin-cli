import { Drawer, DrawerProps } from "antd";
import React, { useState, useEffect } from "react";

function UseDraws() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("right");

  const showDrawer = () => {
    setDrawerOpen(true);
  };
  const onDrawerClose = () => {
    setDrawerOpen(false);
  };
  return { placement, drawerOpen, showDrawer, onDrawerClose };
}
export default UseDraws;
