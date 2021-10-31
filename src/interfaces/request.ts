import { RequestOptions } from './instance'

export type Method = 'get' | 'delete' | 'post' | 'put' | 'patch'

export interface IRequestHandler<T = RequestOptions> {
  (id?: string): IRequestHandler
  // @ts-ignore
  get<P = unknown>(options?: T): RequestProxyResult<P>
  // @ts-ignore
  post<P = unknown>(options?: T): RequestProxyResult<P>
  // @ts-ignore
  patch<P = unknown>(options?: T): RequestProxyResult<P>
  // @ts-ignore
  delete<P = unknown>(options?: T): RequestProxyResult<P>
  // @ts-ignore
  put<P = unknown>(options?: T): RequestProxyResult<P>
  [key: string]: IRequestHandler
}

export type RequestProxyResult<
  T,
  R = { data: T; [key: string]: any },
> = Promise<T & { raw: R }>
