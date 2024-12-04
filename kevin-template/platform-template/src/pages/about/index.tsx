import React, { PureComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useActivate, useUnactivate } from "react-activation";

const AboutPage = () => {
  const { t } = useTranslation();
  const [count, setCount] = useState(1);

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
    </>
  );
};

export default AboutPage;
