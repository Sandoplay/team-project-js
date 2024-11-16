// src/pages/ProductDetailPage.vue
<template>
  <v-container>
    <div v-if="product">
      <v-breadcrumbs :items="breadcrumbs" />

      <v-row>
        <v-col cols="12" md="6">
          <v-img
              :src="product.image"
              height="400"
              cover
              class="bg-grey-lighten-2"
          />
        </v-col>

        <v-col cols="12" md="6">
          <h1 class="text-h4 mb-4">{{ product.title }}</h1>
          <div class="text-h5 mb-4">${{ product.price }}</div>
          <p class="mb-4">{{ product.description }}</p>

          <v-btn color="primary" class="mr-2" @click="addToCart(product)">
            Add to Cart
          </v-btn>

          <v-btn
              :color="isFavorite ? 'red' : undefined"
              variant="outlined"
              @click="toggleFavorite(product)"
          >
            {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { useFavoritesStore } from '@/stores/favorites'
import { storeToRefs } from 'pinia'
import type { Product } from '@/types/product'

const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

const { currentProduct: product } = storeToRefs(productsStore)

const breadcrumbs = computed(() => [
  {
    title: 'Products',
    to: '/products',
  },
  {
    title: product.value?.title || '',
    disabled: true,
  },
])

const isFavorite = computed(() =>
    product.value ? favoritesStore.isFavorite(product.value.id) : false,
)

onMounted(async () => {
  const productId = Number(route.params.id)
  await productsStore.fetchProduct(productId)
})

const addToCart = (product: Product) => {
  cartStore.addToCart(product)
}

const toggleFavorite = (product: Product) => {
  favoritesStore.toggleFavorite(product)
}
</script>
