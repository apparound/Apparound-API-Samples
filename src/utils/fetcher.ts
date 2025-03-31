import axios from 'axios'

export const SERVER_URL: string = import.meta.env.MODE === 'development' ? 'http://localhost:3000' : ''

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        const sessionId = localStorage.getItem('sessionId')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        if (sessionId) {
            config.headers['x-sessionid'] = sessionId
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export const fetchData = async (api: String, method: String, bodyRequest?: any, responseType: 'json' | 'blob' = 'json') => {
    if (!bodyRequest) bodyRequest = {}
    try {
        const config = {
            responseType: responseType,
        }

        switch (method) {
            case 'get':
                const responseGet = await axios.get(`${SERVER_URL}${api || ''}`, config)
                return responseGet.data
            case 'post':
                const responsePost = await axios.post(`${SERVER_URL}${api || ''}`, bodyRequest, config)
                return responsePost.data
            case 'put':
                const responsePut = await axios.put(`${SERVER_URL}${api || ''}`, bodyRequest, config)
                return responsePut.data
            case 'delete':
                const responseDelete = await axios.delete(`${SERVER_URL}${api || ''}`, config)
                return responseDelete.data
            default:
                break
        }
    } catch (error: any) {
        return Promise.reject(error)
    }
}
