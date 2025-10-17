import axios from 'axios';
import  {getCsrfToken} from '@/utils/csrf';

const request = axios.create({
  baseURL: ' http://127.0.0.1:8000', // 后端接口的基础路径
  timeout: 5000, // 请求超时时间（毫秒）
  withCredentials: true // 允许携带 Cookie（和后端 config.setAllowCredentials(true) 对应）
});
request.interceptors.request.use(
  (config) => {
    // 对所有非 GET 请求添加 CSRF Token（GET 请求通常不需要）
    if (config.method && !['get', 'head', 'options'].includes(config.method.toLowerCase())) {
      config.headers['X-CSRFToken'] = getCsrfToken(); 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;