import axios from 'axios'
import {useCallback, useState, useEffect} from 'react'
import {message} from 'antd'

// @ts-ignore
import config from '~/config'

// const MODE = import.meta.env.MODE // 环境变量

// 拦截请求，给所有的请求都带上token
if (process.browser) {
    axios.interceptors.request.use((request) => {
        const jwt_token = localStorage.getItem('jwt_token')
        if (jwt_token) {
            // request.headers['Authorization'] = `Bearer ${jwt_token}`
            request.headers['Authorization'] = `${jwt_token}`
        }
        return request
    })
}

// 添加响应拦截器
axios.interceptors.response.use(
    (res) => {
        let data = res.data
        if (data.code !== 0) {
            return Promise.reject(data.msg)
        } else {
            return data
        }
    },
    async (error) => {
        console.log('response',JSON.stringify(error))
        // 对响应错误做点什么
        return Promise.reject(JSON.stringify(error))
    }
)

const getRequest = (method: string) => {
    return (url: string, data: any = null, options: any = {}) => {
        // let base = config[MODE] // 获取环境变量相对应的属性值

        // @ts-ignore
        return axios({
            // baseURL: base.apiBaseUrl, // 请求域名地址
            baseURL: 'http://localhost:8080', // 请求域名地址
            // baseURL: 'https://api.jesse233.top:1234', // 请求域名地址
            method,
            url,
            ...(method === 'POST'
                ? {
                    // data: options.string ? stringify(data) : data,
                    data: data,
                }
                : {}),
            params: method === 'GET' ? data : options.params,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': options.string
                    ? 'application/x-www-form-urlencoded'
                    : 'application/json',
                ...options.headers,
            },
            withCredentials: true,
        })
            .then((res) => {
                return res.data
            })
            .catch((err) => {
                console.log(err)
                return Promise.reject(err)
            })
    }
}

export const get = getRequest('GET')

export const post = getRequest('POST')

export function useGetSize() {
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
    })

    const onResize = useCallback(() => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        })
    }, [])

    useEffect(() => {
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [onResize])

    return size
}