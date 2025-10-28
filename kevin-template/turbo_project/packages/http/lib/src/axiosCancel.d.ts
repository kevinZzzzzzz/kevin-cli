import { AxiosRequestConfig } from "axios";
export declare const getPendingUrl: (config: AxiosRequestConfig) => string;
export declare const isFunction: (val: any) => boolean;
export declare class AxiosCanceler {
    /**
     * @description: 添加请求
     * @param {Object} config
     */
    addPending(config: AxiosRequestConfig): void;
    /**
     * @description: 移除请求
     * @param {Object} config
     */
    removePending(config: AxiosRequestConfig): void;
    /**
     * @description: 清空所有pending
     */
    removeAllPending(): void;
    /**
     * @description: 重置
     */
    reset(): void;
}
//# sourceMappingURL=axiosCancel.d.ts.map