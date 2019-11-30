<template>
  <v-card>
    <v-card-title>
      Hora óptima: {{displayedHour}}
    </v-card-title>
    <div ref="operatorMap" class="mapa"></div>
  </v-card>
</template>

<script>
import efficientRouteApi from "./../services/efficientRoute";
import directionsApi from "./../services/directions";
import geocoding from "./../services/geocode";
import moment from 'moment';

export default {
  computed: {
    displayedHour() {
      return moment(this.optimalTime).calendar();
    }
  },
  data() {
    return {
      map: null,
      cajeros: null,
      ruta: null,
      markers: [],
      polyline: null,
      optimalTime: new Date()
    };
  },
  methods: {
    boundMap() {
      let bounds = new google.maps.LatLngBounds();
      if (this.markers) {
        this.markers.forEach(({position}) => {
          bounds.extend(new google.maps.LatLng(position.lat(), position.lng()));
        });
      }

      if (this.polyline) {
        this.polyline.getPath().getArray().forEach(({ lat, lng }) => {
          bounds.extend(new google.maps.LatLng(lat(), lng()));
        });
      }

      this.map.fitBounds(bounds);
    },

    newPoint({ lat, lng }) {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: this.map
      });

      this.markers.push(marker);
    },

    removeCurrentRoute() {
      if (this.polyline) {
        this.polyline.setMap(null);
        this.polyline = null;
      }
    },

    drawRoute(points) {
      this.polyline = new google.maps.Polyline({
        path: points,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: this.map
      });
    }
  },
  async created() {
    
  },
  async mounted() {
    this.map = new google.maps.Map(this.$refs.operatorMap, {
      center: { lat: 4.6871453, lng: -74.0974137 },
      zoom: 8
    });
    

    const cajeros = [
      '4.726902,-74.060702',
      '4.711963,-74.070462',
      '4.593649,-74.124090',
      '4.672264,-74.153474',
      '4.666364,-74.120242'
    ]


    for (const cajero of cajeros) {
      const [lat, lng] = cajero.split(',')
      this.newPoint({
        lat: Number(lat),
        lng: Number(lng)
      })
    }

    this.boundMap();
  }
};
</script>
<style>
.mapa {
  height: calc(100vh - 200px);
  width: 100%;
}
</style>
