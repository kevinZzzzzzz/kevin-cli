import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function Pages404(props: any) {
  const { t } = useTranslation();
  return (
    <>
      <h1>Pages {t("404")}</h1>
    </>
  );
}
export default Pages404;
