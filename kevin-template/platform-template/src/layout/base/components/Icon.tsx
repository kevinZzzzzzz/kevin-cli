import React from "react";
import Icon, * as icons from "@ant-design/icons";

const customIcon = {};
const IconComp = (icon: string) => {
  const antIcon: { [key: string]: any } = icons;
  return antIcon[icon] ? (
    React.createElement(antIcon[icon])
  ) : customIcon[icon] ? (
    <img
      style={{ width: "16px", height: "16px" }}
      src={customIcon[icon]}
      alt=""
    />
  ) : null;
};

export default IconComp;
