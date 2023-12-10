import axios from "axios";

export const Endpoints = {
  api: "http://localhost:5000/",
  files: "http://localhost:5000/files/"
}

export const api = axios.create({
    baseURL: Endpoints.api
})

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem("access_token")
    config.headers.Authorization = `Bearer ${token}`
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


api.interceptors.response.use(function (config) {
  return config
})