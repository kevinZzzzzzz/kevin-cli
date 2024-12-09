import React, { useState, useEffect, memo } from "react";
import KeepAlive, { AliveScope } from "react-activation";
import GuardRouteComp from "./GuardRouteComp";

function KeepAliveComp({ ...props }) {
  const Component = props.component;
  useEffect(() => {
    window.NProgress?.done();
  }, []);
  if (!Component) {
    return <></>;
  }
  if (!props.meta.keepAlive) {
    return <Component />;
  }
  return (
    <KeepAlive
      cacheKey={props.path}
      saveScrollPosition="screen"
      key={props.path}
      name={props.path}
      when={() => {
        return props.meta?.keepAlive;
      }}
      autoFreeze={true}
    >
      <GuardRouteComp {...props}>
        <Component />
      </GuardRouteComp>
    </KeepAlive>
  );
}
export default memo(KeepAliveComp);
