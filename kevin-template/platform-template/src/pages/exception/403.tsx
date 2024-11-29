import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function Pages403(props: any) {
  const { t } = useTranslation();
  return (
    <>
      <h1>Pages {t("403")}</h1>
    </>
  );
}
export default Pages403;
