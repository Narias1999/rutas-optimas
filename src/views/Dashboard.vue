<template>
  <div>
    <v-app-bar app clipped-left>
      <v-toolbar-title>
        <div class="title-box">
          <span class="title">{{title}}</span>
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="red" @click="logout" dark>Cerrar Sesión</v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-row>
            <v-col cols="12">
              <operario-bancario />
            </v-col>
          </v-row>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>
<style scoped>
.title-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.subtitle {
  font-size: 14px;
}
</style>
<script>
import { mapState } from 'vuex';
import OperarioBancario from "./../components/OperarioBancario";

export default {
  components: { OperarioBancario },
  computed: {
    ...mapState(['activeRole']),
    title() {
      return this.activeRole === 'bankOp' ? 'Operario Bancario' : 'Operario Logístico';
    }
  },
  data() {
    return {
    };
  },
  methods: {
    logout() {
      this.$router.replace('/login')
    }
  }
};
</script>