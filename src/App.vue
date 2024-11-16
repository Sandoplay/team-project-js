<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>E-commerce App</v-app-bar-title>
      <v-spacer />
      <v-btn to="/">Home</v-btn>
      <v-btn to="/products">Products</v-btn>
      <v-btn to="/cart">Cart</v-btn>
      <v-btn to="/favorites">Favorites</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app>
      <span>&copy; 2024</span>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
// Component logic here
</script>
