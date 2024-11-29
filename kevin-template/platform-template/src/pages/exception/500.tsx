import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function Pages500(props: any) {
  const { t } = useTranslation();
  return (
    <>
      <h1>Pages {t("500")}</h1>
    </>
  );
}
export default Pages500;
