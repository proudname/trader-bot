import axios from "axios";

export const traderBotApi = axios.create({
    baseURL: 'http://localhost:3000/api'
})

traderBotApi.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    return config;
})