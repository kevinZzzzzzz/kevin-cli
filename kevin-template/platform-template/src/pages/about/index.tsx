import React, { memo, PureComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useActivate, useUnactivate } from "react-activation";
import { Button, Drawer } from "antd";
import UseDraws from "@/hooks/useDraw";

const AboutPage = (props) => {
  console.log(props, "props");
  const { t } = useTranslation();
  const [count, setCount] = useState(1);
  const { placement, drawerOpen, showDrawer, onDrawerClose } = UseDraws();

  const add = () => {
    setCount((pre) => ++pre);
  };
  return (
    <>
      <h1>{t("about")} Page</h1>
      <h2>{count}</h2>
      <button
        onClick={() => {
          add();
        }}
      >
        +
      </button>
      <hr />
      <Button
        type="primary"
        onClick={() => {
          showDrawer();
        }}
      >
        操作
      </Button>
      <Drawer
        title="操作"
        placement={placement}
        closable={false}
        open={drawerOpen}
        onClose={onDrawerClose}
        key={placement}
      >
        <EditComp />
      </Drawer>
    </>
  );
};

export default AboutPage;

const EditComp = memo((props: any) => {
  return (
    <>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </>
  );
});
