import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        // baseURL: 'http://123.207.32.32:8000',
        // baseURL: 'http://123.207.32.32:8000/api/v2',
        //baseURL: 'http://106.54.54.237:8000/api/v1,
        // https://adi-v3.dev/
        baseURL: 'http://152.136.185.210:8000/api/w6',
        timeout: 5000
    })

    //拦截器
    instance.interceptors.request.use(config => {
        console.log(config);
        //为什么要拦截
        //1.config中的信息不符合要求
        //2.显示请求图标
        //3.某些网络请求，比如登录必须携带特殊信息，此处拦截让用户先登录


        //这里把config拦截下来了，必须return出去
        return config
    }, err => {
        console.log(err);
    })

    //响应拦截
    instance.interceptors.response.use(res => {
        console.log(res);
        return res.data
    }, err => {
        console.log(err);
    })

    return instance(config)
}