import axios from 'axios';
// import StorageService from './StorageService';
// import  * as APICONST from '../constants/apiConstant' 

const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
});

// api.interceptors.request.use(
//   (config) => {
//     const token = StorageService.getToken(); 
//     if (token && config.url !== APICONST.SIGNIN && config.url !== APICONST.SIGNUP) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     console.log(config);
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
export default api;