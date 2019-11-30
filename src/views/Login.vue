<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Optimizar Rutas</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text class="pb-1">
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field
                label="Nombre de usuario"
                name="login"
                prepend-icon="person"
                type="text"
                :rules="nameRules"
                v-model="username"
                required
              ></v-text-field>

              <v-text-field
                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                id="password"
                label="Contraseña"
                name="password"
                prepend-icon="lock"
                :type="showPassword ? 'text' : 'password'"
                :rules="passwordRules"
                v-model="password"
                required
                @keyup.enter="login"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="aligin-center px-3">
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login" :loading="loading">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <router-view />
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      valid: true,
      username: null,
      password: null,
      loading: false,
      showPassword: false,
      nameRules: [text => !!text || 'Nombre de usuario es requerido'],
      passwordRules: [text => !!text || 'Contraseña es requerida'],
    };
  },
  methods: {
    ...mapMutations(['setRole']),
    login() {
      if (!this.$refs.form.validate()) return false;

      if (this.username === 'bankOperario') {
        this.setRole('bankOp');
      } else if (this.username === 'assetOperator') {
        this.setRole('assetOp');
      } else {
        return Swal.fire('Ops...', 'No eres un usuario autorizado.', 'error');
      }
      return this.$router.replace('/main');
    },
  },
};
</script>
<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
