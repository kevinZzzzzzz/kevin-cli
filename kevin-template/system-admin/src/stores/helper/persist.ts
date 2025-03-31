import { PersistedStateOptions } from "pinia-plugin-persistedstate";

/**
 * @description pinia 持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @param {Array} paths 需要持久化的 state name
 * @param {Storage} storagePath 存储到持久化的 storage
 * @return persist
 * */
const piniaPersistConfig = (key: string, paths?: string[], storagePath = localStorage) => {
  const persist: PersistedStateOptions = {
    key,
    storage: storagePath,
    // storage: sessionStorage,
    paths
  };
  return persist;
};

export default piniaPersistConfig;
