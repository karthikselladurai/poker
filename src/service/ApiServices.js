
import axios from 'axios';
import api from './interceptor';

const ApiServices = {
    get(endpoint, data, config = {}) {
        console.log("data>>>>>>>>>" , data);
        return api.get(endpoint, data,  config);
    },
    post(endpoint, data, config = {}) {
        return api.post(endpoint, data, config);
    },
    put(endpoint, data, config = {}) {
        return api.put(endpoint, data, config);
    },
    delete(endpoint, data, config = {}) {
        return api.delete(endpoint, data, config);
    }
}
// const errorHandler = (err) => {
//     if (err.response.message) {
//         console.log("error >>>>>>>>>>> ", err.response.data.message);
//     }
//     return err.response
// }
export default ApiServices;