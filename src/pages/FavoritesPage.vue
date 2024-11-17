<template>
  <v-container>
    <h1 class="text-h4 mb-6">Favorite Products</h1>

    <v-alert v-if="favorites.length === 0" type="info">
      You haven't added any products to your favorites yet
    </v-alert>

    <v-row>
      <v-col
        v-for="product in favorites"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card height="100%">
          <div class="favorite-image-container">
            <v-img
              :src="product.image"
              height="200"
              class="bg-grey-lighten-2"
              :cover="false"
              :contain="true"
            />
          </div>

          <v-card-title class="text-truncate">
            {{ product.title }}
          </v-card-title>

          <v-card-text> ${{ product.price }} </v-card-text>

          <v-card-actions>
            <v-btn variant="text" :to="`/products/${product.id}`">
              Details
            </v-btn>
            <v-spacer />
            <v-btn
              icon="mdi-heart"
              color="red"
              variant="text"
              @click="toggleFavorite(product)"
            />
            <v-btn
              icon="mdi-cart"
              variant="text"
              @click="addToCart(product)"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useFavoritesStore } from '@/stores/favorites'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/types/product'

const favoritesStore = useFavoritesStore()
const cartStore = useCartStore()

const { items: favorites } = storeToRefs(favoritesStore)

const toggleFavorite = (product: Product) => {
  favoritesStore.toggleFavorite(product)
}

const addToCart = (product: Product) => {
  cartStore.addToCart(product)
}
</script>

<style scoped>
.favorite-image-container {
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  height: 200px;
}
</style>
