/**
 * defineField —— 定义实例字段
 *
 * 等价于 `this.name = value`，但强制走 Object.defineProperty，
 * 保证字段可枚举、可写、可配置（用于类字段语义）。
 *
 * 这是打包器（esbuild/Vite）注入的辅助函数，原文为：
 *   var r = (obj, key, value) => key in obj
 *     ? Object.defineProperty(obj, key, {enumerable:!0,configurable:!0,writable:!0,value})
 *     : obj[key] = value
 */
const defineProperty = Object.defineProperty;

export function defineField(obj, key, value) {
  if (typeof key === 'symbol') return setField(obj, key, value);
  return setField(obj, String(key), value);
}

function setField(obj, key, value) {
  if (key in obj) {
    defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      writable: true,
      value,
    });
  } else {
    obj[key] = value;
  }
  return value;
}
