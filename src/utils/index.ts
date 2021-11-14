import { SortOrder } from '~/interfaces/options'

export const isPlainObject = (obj: any) =>
  typeof obj === 'object' &&
  Object.prototype.toString.call(obj) === '[object Object]'

export const sortOrderToNumber = (order: SortOrder) => {
  return (
    {
      asc: 1,
      desc: -1,
    }[order] || 1
  )
}
