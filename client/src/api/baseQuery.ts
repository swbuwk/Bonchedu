import { AxiosError, AxiosRequestConfig } from "axios"
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import { api } from "."

export const apiBaseQuery = (): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await api({
        url,
        method,
        data,
        params
      })
      .then(res => res.data)
      return { data: result }
    } catch (axiosError) {
      let err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        }
      }
    }
  }
  

export interface ApiErrorData {
  message: string
  statusCode: number
}

export interface ApiError extends AxiosError<ApiErrorData> {}