<template>
  <div ref="operatorMap" class="mapa"></div>
</template>

<script>
export default {
  mounted() {
    console.log('mounted')
    this.map = new google.maps.Map(this.$refs.operatorMap, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    });
  }
};
</script>

<style>
.mapa {
  height: calc(100vh - 200px);
  width: 100vw;
}
</style>
