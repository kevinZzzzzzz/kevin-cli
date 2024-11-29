import React, { useState, useEffect, memo } from "react";
import KeepAlive, { AliveScope } from "react-activation";
import GuardRouteComp from "./GuardRouteComp";

function KeepAliveComp({ children, ...props }) {
  if (!props.meta.keepAlive) {
    return children;
  }
  return (
    <KeepAlive
      cacheKey={props.path}
      key={props.path}
      name={props.path}
      when={() => {
        return props.mate?.keepAlive;
      }}
      autoFreeze={true}
    >
      <GuardRouteComp {...props}>{children}</GuardRouteComp>
    </KeepAlive>
  );
}
export default memo(KeepAliveComp);
