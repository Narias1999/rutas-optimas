import axios from 'axios';

class Api {
    constructor() {
        this.instance = axios.create({
            baseURL: 'http://192.168.128.58:5000/'
        })
    }

    /**
     * 
     * @param {Object[]} points 
     */
    getRecoroutes() {
       return this.instance.get('recoroutes');
    }
}

const api = new Api();

export default api;
