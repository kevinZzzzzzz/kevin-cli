import React from "react";
import { message, Spin } from "antd";
// import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import "./index.css";
import { AxiosRequestConfig } from "axios";

// * 全局loading请求数
let needLoadingRequestCount = 0;

const Loading = ({ tip = "Loading" }: { tip?: string }) => {
	return <Spin tip={tip} size="large" className="request-loading" fullscreen />;
};
// * 显示loading
export const showFullScreenLoading = () => {
	if (needLoadingRequestCount === 0) {
		let dom = document.createElement("div");
		dom.setAttribute("id", "loading");
		document.body.appendChild(dom);
    // @ts-ignore
		// ReactDOM.render(<Loading />, dom);
		const root = createRoot(dom);
		root.render(<Loading />);
	}
	needLoadingRequestCount++;
}

// * 隐藏loading
export const tryHideFullScreenLoading = () => {
	if (needLoadingRequestCount <= 0) return;
	needLoadingRequestCount--;
	if (needLoadingRequestCount === 0) {
		document.body.removeChild(document.getElementById("loading") as HTMLElement);
	}
}

// * 生成请求key
export function generateReqKey(config: AxiosRequestConfig) {
  const { method, url } = config;
  return [method, url].join(
    "&"
  );
}