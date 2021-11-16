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

export const destructureData = (payload: any) => {
  if (typeof payload !== 'object') {
    return payload
  }
  if (payload === null) {
    return payload
  }

  const data = payload.data

  const dataIsPlainObject =
    Object.prototype.toString.call(data) === '[object Object]'

  if (dataIsPlainObject && Object.keys(payload).length === 1) {
    const d = Object.assign({}, data)
    // attach raw onto new data
    payload.raw &&
      Object.defineProperty(d, 'raw', { value: payload.raw, enumerable: false })
    return d
  }

  return payload
}
