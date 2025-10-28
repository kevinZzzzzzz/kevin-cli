import { AxiosInstance, AxiosRequestConfig } from "axios";
interface Result {
    code: string;
    msg: string;
}
interface ResultData<T = any> extends Result {
    data?: T;
}
declare class RequestHttp {
    service: AxiosInstance;
    baseURL: string;
    timeOut: number;
    token: string;
    withCredentials: boolean;
    constructor(config: AxiosRequestConfig & {
        token: string;
    });
    get<T>(url: string, params?: object, _object?: {}): Promise<ResultData<T>>;
    post<T>(url: string, params?: object, _object?: {}): Promise<ResultData<T>>;
    put<T>(url: string, params?: object, _object?: {}): Promise<ResultData<T>>;
    delete<T>(url: string, params?: any, _object?: {}): Promise<ResultData<T>>;
}
export default RequestHttp;
//# sourceMappingURL=index.d.ts.map