import type { RequestOptions } from './instance'
type NoStringIndex<T> = { [K in keyof T as string extends K ? never : K]: T[K] }

export type Method = 'get' | 'delete' | 'post' | 'put' | 'patch'

export interface IRequestHandler {
  (path?: string | number): IRequestHandler
  // @ts-ignore
  get<P = unknown>(
    options?: Omit<NoStringIndex<RequestOptions>, 'data'>,
  ): RequestProxyResult<P>
  // @ts-ignore
  post<P = unknown>(options?: RequestOptions): RequestProxyResult<P>
  // @ts-ignore
  patch<P = unknown>(options?: RequestOptions): RequestProxyResult<P>
  // @ts-ignore
  delete<P = unknown>(
    options?: Omit<NoStringIndex<RequestOptions>, 'data'>,
  ): RequestProxyResult<P>
  // @ts-ignore
  put<P = unknown>(options?: RequestOptions): RequestProxyResult<P>
  [key: string]: IRequestHandler
}

export type RequestProxyResult<
  T,
  R = { data: T; [key: string]: any },
> = Promise<ResponseProxyExtraRaw<T, R>>

export type ResponseProxyExtraRaw<T, R = any> = T & {
  $raw: R
  $request: { path: string; method: string; [k: string]: string }
}
