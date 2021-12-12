export interface RequestOptions {
  method?: string
  data?: Record<string, any>
  params?: Record<string, any> | URLSearchParams
  headers?: Record<string, string>

  [key: string]: any
}

type RequestResponseType<P> = Promise<Record<string, any> & { data: P }>
export interface IRequestAdapter {
  get<P = unknown>(
    url: string,
    options?: RequestOptions,
  ): RequestResponseType<P>

  post<P = unknown>(
    url: string,
    options?: RequestOptions,
  ): RequestResponseType<P>

  patch<P = unknown>(
    url: string,
    options?: RequestOptions,
  ): RequestResponseType<P>

  delete<P = unknown>(
    url: string,
    options?: RequestOptions,
  ): RequestResponseType<P>

  put<P = unknown>(
    url: string,
    options?: RequestOptions,
  ): RequestResponseType<P>
}
