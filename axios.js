import axios from "axios";
import { configs } from "eslint-plugin-react";

const http = axios.create({
     baseURL: "https://fn27.vimlc.uz/register"
})

http.interceptors.request.use(
     config => {
          const token = localStorage.getItem('token');
          if(token){
               config.headers.Authorization = `Bearer ${token}`
          }
          return config;
     },
     error=>{
          return Promise.reject(error)
     }

)

export default http;