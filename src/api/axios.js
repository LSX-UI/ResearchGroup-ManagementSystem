import axios from 'axios';
import config from '../apiconfig/index';

// env.MODE_ENV用于确定开发环境与配置环境中的基础路径,获取当前环境变量
const basUrl=process.env.MODE_ENV==='development'?config.basUrl.dev:config.basUrl.pro;

// 接口请求的工具类,对原生的axios进行简单的封装。
class HttpRequest{
    constructor(basUrl){
        this.basUrl=basUrl;
    }
    // 获取内部配置的方法
    getInsideConfig(){
        const config={
            basUrl:this.basUrl,
            timeout:5000,
            headers:{}
        }
        return config;
    }

    //请求和相应拦截器相关内容，由axios所创造的实例instance
    interceptors(instance){
         // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么,比如添加token进行验证
            if(localStorage.getItem('token')){
                config.headers.token=localStorage.getItem('token')
            }
            return config;
        }, function (error) {
        // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
        // 对响应数据做点什么
            return response;
        }, function (error) {
        // 对响应错误做点什么
            console.log(error,'请求出现了错误返回')
            return Promise.reject(error);
        });
    }

//   发送请求的接口api
   request(options){
      const instance=axios.create()
    //   对于传进来的数据对象进行解构赋值
      options={...this.getInsideConfig,...options}
      this.interceptors(instance);
      return instance(options);
   }
}

export default new HttpRequest(basUrl);