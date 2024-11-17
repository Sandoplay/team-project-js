<template>
  <v-container>
    <h1 class="text-h2 mb-6">Welcome to Our Store</h1>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Latest Products</v-card-title>
          <v-card-text> Check out our newest arrivals </v-card-text>
          <v-card-actions>
            <v-btn color="primary" to="/products"> Browse Products </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// Component logic here
</script>
