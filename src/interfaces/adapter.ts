import { RequestOptions } from './instance'
type RequestResponseType<P> = Promise<Record<string, any> & { data: P }>

export type IRequestAdapter<T = any> = Readonly<{
  default: T
  get<P = unknown>(
    url: string,
    options?: Omit<RequestOptions, 'data'>,
  ): RequestResponseType<P>

  post<P = unknown>(
    url: string,
    options: Partial<RequestOptions>,
  ): RequestResponseType<P>

  patch<P = unknown>(
    url: string,
    options: Partial<RequestOptions>,
  ): RequestResponseType<P>

  delete<P = unknown>(
    url: string,
    options?: Omit<RequestOptions, 'data'>,
  ): RequestResponseType<P>

  put<P = unknown>(
    url: string,
    options: Partial<RequestOptions>,
  ): RequestResponseType<P>
}>
