import React, { PureComponent } from "react";
import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("about")} Page</h1>
    </>
  );
};

export default AboutPage;
