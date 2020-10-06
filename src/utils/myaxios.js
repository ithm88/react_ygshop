import axios from "axios"
//引入轻提示
import {Toast} from "antd-mobile";
const instance = axios.create({
    baseURL: 'https://www.linweiqin.cn/api/public/v1/',
});
// 请求的拦截
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    Toast.loading('Loading...', 30,null,true);
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 响应的拦截
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    Toast.hide();
    return response.data.message;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default instance