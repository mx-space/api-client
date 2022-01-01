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

type CamelToSnake<T extends string, P extends string = ''> = string extends T
  ? string
  : T extends `${infer C0}${infer R}`
  ? CamelToSnake<
      R,
      `${P}${C0 extends Lowercase<C0> ? '' : '_'}${Lowercase<C0>}`
    >
  : P

type CamelKeysToSnake<T> = {
  [K in keyof T as CamelToSnake<Extract<K, string>>]: T[K]
}

export type ResponseProxyExtraRaw<
  T,
  RawData = unknown,
  Response = unknown,
> = T extends object
  ? T & {
      $raw: Response extends unknown
        ? {
            [i: string]: any
            data: RawData extends unknown ? CamelKeysToSnake<T> : RawData
          }
        : Response
      $request: { path: string; method: string; [k: string]: string }
    }
  : T
