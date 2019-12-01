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

    newPoint({ lat, lng , name, icon}) {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: this.map,
        label:name,
        icon:icon
      });
      this.markers.push(marker);
      //console.log(billetes);
      //const [billete50, billete20, billete10] = billetes.split(',')
      var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">'+name+'</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Scot</b>, tiene 47 de 50.000, de 20.000 y 36 de 10.000' +
      '</p>'+
      '</div>'+
      '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      marker.addListener('click', function() {
        if (name.includes('Scot')){
          infowindow.open(this.map, marker);
        }
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
      '4.726902,-74.060702, Scot 1',
      '4.711963,-74.070462, Scot 2',
      '4.593649,-74.124090, Scot 3',
      '4.672264,-74.153474, Scot 4',
      '4.666364,-74.120242, Scot 5'
    ]

    const centrosEfectivo=[
      '4.709867,-74.111879, Portal 80',
      '4.754351,-74.046478, Portal Norte',
      '4.595608,-74.169169, Portal Sur',
      '4.627144,-74.106822, Puente Aranda'
    ]

    const billetes = [
      '46,59,32',
      '52,33,41',
      '86,74,64',
      '65,59,30',
      '41,56,49'
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
      let color;
      //console.log(index)
      switch(index) {
        case 0:
          color = 'blue';
          break
        case 1:
          color = 'blue';
          break
        case 2:
          color = 'blue';
          break
        default:
          color = 'blue';
          break
      }
     // console.log(color, distance.text);
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
