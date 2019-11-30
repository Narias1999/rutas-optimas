import axios from 'axios';

class Directions {
    constructor() {
        this.intance = axios.create({
            baseURL: 'https://maps.googleapis.com/maps/api/directions/json'
        })
    }

    /**
     * 
     * @param {Object[]} points 
     */
    get(points) {
        const totalPoints = points.length;
        const origin = points[0];
        const destination = points[totalPoints - 1];

        points.slice(0,1);
        points.splice(totalPoints - 1, 1);

        const waypoints = points.reduce((prev, { lat, lng }) => prev + `via:${lat}%,${lng}|` , '');

        console.log('waypoints', waypoints);
        // &waypoints=via:-37.81223%2C144.96254%7Cvia:-34.92788%2C138.60008

        return this.intance.get('', {
            params: {
                origin: `${origin.lat},${origin.lng}`,
                destination: `${destination.lat},${destination.lng}`,
                key: process.env.VUE_APP_GOOGLE_API_KEY
            }
        })
    }
}

const directions = new Directions();

export default directions;
