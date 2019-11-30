import axios from 'axios';

class Api {
    constructor(credentials) {
        this.httpInstance = axios.create({
            baseURL: 'https://bluemixapi.com',
            headers: {
                authorization: credentials
            }
        })
    }

    async ask() {
        // TODO do cool logic
        const routePoints = [
            { lat: 57.3003, lng: 23.5003 },
            { lat: 67.30101, lng: -23.50209 },
            { lat: 60.30101, lng: -23.55609 },
            { lat: 52.20101, lng: 23.50209 },
            { lat: 54.30101, lng: 25.50209 }
        ];

        const cajeros = [
            { lat: 57.3, lng: 23.5 },
            { lat: 57.301, lng: 23.502 } 
        ];

        return { cajeros, routePoints };
    }

}

const api = new Api('cool credentials')

export default api;
