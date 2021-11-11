export interface RequestOptions {
  method?: string
  data?: Record<string, any>
  params?: Record<string, any> | URLSearchParams
  headers?: Record<string, string>

  [key: string]: any
}

export interface IRequestAdapter {
  get<P = unknown>(url: string, options?: RequestOptions): Promise<P>

  post<P = unknown>(url: string, options?: RequestOptions): Promise<P>

  patch<P = unknown>(url: string, options?: RequestOptions): Promise<P>

  delete<P = unknown>(url: string, options?: RequestOptions): Promise<P>

  put<P = unknown>(url: string, options?: RequestOptions): Promise<P>
}
