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

    <Footer />
  </v-app>
</template>

<script setup lang="ts">
import Footer from '@/components/Footer.vue'
</script>
