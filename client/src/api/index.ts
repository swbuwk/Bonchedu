import axios from "axios";

export const Endpoints = {
  api: "https://bonchapi.hoa7mlishe.com/",
  files: "https://bonchapi.hoa7mlishe.com/files"
}

export const api = axios.create({
    baseURL: Endpoints.api
})

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem("accessToken")
    config.headers.Authorization = `Bearer ${token}`
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


api.interceptors.response.use(function (config) {
  return config
})