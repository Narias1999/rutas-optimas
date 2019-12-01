<template>
  <v-card>
    <v-card-title>
      Hora óptima: {{displayedHour}}
    </v-card-title>
    <div ref="operatorMap" class="mapa"></div>
  </v-card>
</template>

<script>
import api from "./../services/Api";
import moment from 'moment';
import polylineUtil from "google-polyline";

export default {
  computed: {
    displayedHour() {
      return moment(this.optimalTime).add(9, 'hours').calendar();
    }
  },
  data() {
    return {
      map: null,
      cajeros: null,
      ruta: null,
      markers: [],
      polyline: null,
      optimalTime: new Date() + 12000
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



    newPoint({ lat, lng , name, icon}) {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: this.map,
        label:name,
        icon:icon
      });
      this.markers.push(marker);
          var contentString = '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">Scot</h1>'+
          '<div id="bodyContent">'+
          '<p><b>Scot</b>, tiene 58 billetes de 50,  is a large ' +
          '(last visited June 22, 2009).</p>'+
          '</div>'+
          '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      marker.addListener('click', function() {
        infowindow.open(this.map, marker);
      });
    },

    removeCurrentRoute() {
      if (this.polyline) {
        this.polyline.setMap(null);
        this.polyline = null;
      }
    },

    drawRoute(points, color) {
      this.polyline = new google.maps.Polyline({
        path: points,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 1.0,
        strokeWeight: 4,
        map: this.map
      });
    }
  },
  async mounted() {
    this.map = new google.maps.Map(this.$refs.operatorMap, {
      center: { lat: 4.6871453, lng: -74.0974137 },
      zoom: 8
    });
    

    const cajeros = [
      '4.726902,-74.060702, Cajero 1',
      '4.711963,-74.070462, Cajero 2',
      '4.593649,-74.124090, Cajero 3',
      '4.672264,-74.153474, Cajero 4',
      '4.666364,-74.120242, Cajero 5'
    ]

    const centrosEfectivo=[
      '4.709867,-74.111879, Portal 80',
      '4.754351,-74.046478, Portal Norte',
      '4.595608,-74.169169, Portal Sur',
      '4.627144,-74.106822, Puente Aranda'
    ]

    for (const cajero of cajeros) {
      const [lat, lng, name] = cajero.split(',')
      this.newPoint({
        lat: Number(lat),
        lng: Number(lng),
        name: String (name)
      })
    }

    for (const centro of centrosEfectivo) {
      const [lat, lng, name] = centro.split(',')
      const urlIcon = 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png';
      this.newPoint({
        lat: Number(lat),
        lng: Number(lng),
        name: String (name), 
        icon:urlIcon
      })
    }
    const { data } = await api.getRecoroutes();

    data.forEach(({points, distance}, index) => {
      let color = '#3333FF';
      // console.log(index)
      // switch(index) {
      //   case 0:
      //     color = 'black';
      //     break
      //   case 1:
      //     color = 'blue';
      //     break
      //   case 2:
      //     color = 'red';
      //     break
      //   default:
      //     color = 'yellow';
      //     break
      // }
      const pointsResult = polylineUtil.decode(points).map(([lat, lng]) => ({ lat, lng }));
      this.drawRoute(pointsResult, color);
    })

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
