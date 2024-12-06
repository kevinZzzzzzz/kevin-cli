import React, { useState, useEffect } from "react";
import useTitle from "@/hooks/useTitle";

function GuardRouteComp({ children, ...props }) {
  useTitle(props.meta.i18nKey);
  useEffect(() => {
    window.NProgress?.done();
  }, []);
  return <>{children}</>;
}
export default GuardRouteComp;
