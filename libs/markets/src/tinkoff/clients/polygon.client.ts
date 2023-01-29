import axios from "axios";

const polygonClient = axios.create({
  baseURL: 'https://api.polygon.io/',
  timeout: 7000
})

polygonClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error);
});

export default polygonClient;
