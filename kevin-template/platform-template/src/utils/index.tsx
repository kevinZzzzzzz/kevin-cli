/**
 *
 * @method {*} getTargetElement 深入子级获取目标元素
 * @param {*} node 查询元素
 * @param {*} targetClass 目标元素类名
 */
export const getTargetElement = (node, targetClass) => {
  let ele = null;
  if (node) {
    ele =
      node.className !== targetClass
        ? getTargetElement(node?.parentNode, targetClass)
        : node;
  }
  return ele;
};
/**
 *
 * @method {*} getTargetIncludeElement 深入父级判断是否包含目标元素
 * @param {*} node 查询元素
 * @param {*} targetClass 目标元素类名
 */
export const getTargetIncludeElement = (node, targetClass) => {
  let ele = null;
  if (node) {
    ele = !node.className.includes(targetClass)
      ? getTargetElement(node?.parentNode, targetClass)
      : node;
  }
  return !!ele;
};
