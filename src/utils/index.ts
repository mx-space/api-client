export const isPlainObject = (obj: any) =>
  typeof obj === 'object' &&
  Object.prototype.toString.call(obj) === '[object Object]'
