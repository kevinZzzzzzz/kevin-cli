import React, { useState, useEffect } from "react";
import useTitle from "@/hooks/useTitle";
import { useLocation } from "react-router-dom";

function GuardRouteComp({ children, ...props }) {
  const location = useLocation();
  useTitle(props.meta.i18nKey);
  useEffect(() => {
    window.NProgress?.done();
  }, [location]);
  return <>{children}</>;
}
export default GuardRouteComp;
