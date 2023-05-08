import axios from "axios"

export const baseURL = "http://localhost:4000"

const axiosInstance = axios.create({
    baseURL: baseURL
})

//配置拦截器
axiosInstance.interceptors.response.use(
    res => res.data,
    err => {
        console.log(`网络错误${err}`)
    }
)


export {
    axiosInstance
}
