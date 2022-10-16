import axios from './axios'
// 请求接口拦截设置
export const getMenu=(params)=>{
    return axios.request({
        url:'/permission/getMenu',
        method:'post',
        data:params
    })
}

export const getData=()=>{
    return axios.request({
        url:'/home/getData',
        method:'get',
    })
}

// 获取用户列表
export const getUser=(params)=>{
    return axios.request({
        // 当前请求路径需要和mock中设置的拦截路径一致
        url:'/user/getUser',
        method:'get',
        params
    })
}