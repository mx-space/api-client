import { RequestOptions } from './instance'
export type IAdaptorRequestResponseType<P> = Promise<
  Record<string, any> & { data: P }
>

export type IRequestAdapter<T = any> = Readonly<{
  default: T
  get<P = unknown>(
    url: string,
    options?: Omit<RequestOptions, 'data'>,
  ): IAdaptorRequestResponseType<P>

  post<P = unknown>(
    url: string,
    options: Partial<RequestOptions>,
  ): IAdaptorRequestResponseType<P>

  patch<P = unknown>(
    url: string,
    options: Partial<RequestOptions>,
  ): IAdaptorRequestResponseType<P>

  delete<P = unknown>(
    url: string,
    options?: Omit<RequestOptions, 'data'>,
  ): IAdaptorRequestResponseType<P>

  put<P = unknown>(
    url: string,
    options: Partial<RequestOptions>,
  ): IAdaptorRequestResponseType<P>
}>
