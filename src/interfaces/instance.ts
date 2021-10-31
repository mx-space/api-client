export interface RequestOptions {
  method?: string
  data?: string
  params?: Record<string, any>

  [key: string]: any
}

export interface RequestInstance {
  get<P = unknown>(url: string, options?: RequestOptions): Promise<P>

  post<P = unknown>(url: string, options?: RequestOptions): Promise<P>

  patch<P = unknown>(url: string, options?: RequestOptions): Promise<P>

  delete<P = unknown>(url: string, options?: RequestOptions): Promise<P>

  put<P = unknown>(url: string, options?: RequestOptions): Promise<P>
}
