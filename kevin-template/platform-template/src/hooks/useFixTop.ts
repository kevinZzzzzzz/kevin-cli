import React, { useState, useEffect, useLayoutEffect } from "react";

function UseFixTop() {
  // console.log(props);
  // const { element } = props;
  const [fixTopHeight, setFixTopHeight] = useState("0px");

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      const fixTopHeaderRef =
        document.getElementsByClassName("fixTopHeader")[0];
      setFixTopHeight(window.getComputedStyle(fixTopHeaderRef).height);
    }, 0);
    return () => clearTimeout(timer); // 清理定时器
  }, []);
  return {
    fixTopHeight,
  };
}
export default UseFixTop;
