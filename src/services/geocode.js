import axios from 'axios'

class GeocodeApi {
    constructor() {
        this.intance = axios.create({
            baseURL: 'https://maps.googleapis.com/maps/api/geocode/'
        })
    }

    /**
     * 
     * @param {Object} point
     */
    get(address) {
        return this.intance.get('', {
            params: {
                address: JSON.stringify(address),
                outputFormat: 'json',
                key: process.env.VUE_APP_GOOGLE_API_KEY
            },
        })
    }
}

const geocoding = new GeocodeApi();

export default geocoding;
