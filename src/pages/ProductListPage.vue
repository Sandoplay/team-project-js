<template>
  <v-container>
    <!-- Filters -->
    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
                v-model="searchTitle"
                label="Search products"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                density="comfortable"
                hide-details
                @update:model-value="updateFilters"
            />
          </v-col>

          <v-col cols="12" sm="4">
            <v-select
                v-model="selectedCategory"
                :items="categories"
                label="Category"
                variant="outlined"
                density="comfortable"
                hide-details
                clearable
                @update:model-value="updateFilters"
            />
          </v-col>

          <!-- Price range -->
          <v-col cols="12" sm="4">
            <v-range-slider
                v-model="priceRange"
                :min="0"
                :max="1000"
                :step="10"
                label="Price range"
                hide-details
                @update:model-value="updateFilters"
            >
              <template #prepend>
                <v-text-field
                    v-model="priceRange[0]"
                    type="number"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    style="width: 100px"
                />
              </template>
              <template #append>
                <v-text-field
                    v-model="priceRange[1]"
                    type="number"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    style="width: 100px"
                />
              </template>
            </v-range-slider>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Loading state -->
    <v-progress-circular
        v-if="loading"
        indeterminate
        color="primary"
        class="d-flex mx-auto my-8"
    />

    <v-alert v-if="error" type="error" class="mb-6">
      {{ error }}
    </v-alert>

    <v-row v-if="!loading && !error">
      <v-col
      v-for="product in paginatedProducts"
      :key="product.id"
      cols="12"
      sm="6"
      md="4"
      lg="3"
  >
    <v-card height="100%">
      <div class="product-image-container">
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

          <v-card-text>
            <div class="d-flex align-center justify-space-between">
              <span class="text-h6">${{ product.price }}</span>
              <v-rating
                  :model-value="product.rating.rate"
                  readonly
                  density="compact"
                  size="small"
              />
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn variant="text" :to="`/products/${product.id}`">
              Details
            </v-btn>
            <v-spacer />
            <v-btn
                icon="mdi-heart"
                variant="text"
                @click="toggleFavorite(product)"
            />
            <v-btn icon="mdi-cart" variant="text" @click="addToCart(product)" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Pagination -->
    <v-pagination
        v-if="totalPages > 1"
        v-model="currentPage"
        :length="totalPages"
        class="mt-6"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { useFavoritesStore } from '@/stores/favorites'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import type { Product } from '@/types/product'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

const { paginatedProducts, loading, error, categories, totalPages } =
    storeToRefs(productsStore)

const searchTitle = ref('')
const selectedCategory = ref('')
const priceRange = ref([0, 1000])
const currentPage = ref(1)

// Initialize filters from URL
onMounted(async () => {
  const { title, category, minPrice, maxPrice, page } = route.query

  if (title) searchTitle.value = title as string
  if (category) selectedCategory.value = category as string
  if (minPrice) priceRange.value[0] = Number(minPrice)
  if (maxPrice) priceRange.value[1] = Number(maxPrice)
  if (page) currentPage.value = Number(page)

  await Promise.all([
    productsStore.fetchProducts(),
    productsStore.fetchCategories(),
  ])
})

// Update URL when filters change
const addToCart = (product: Product) => {
  cartStore.addToCart(product)
}

const toggleFavorite = (product: Product) => {
  favoritesStore.toggleFavorite(product)
}

// updateFilters залишається таким самим, оскільки тут немає параметра product
const updateFilters = () => {
  router.push({
    query: {
      title: searchTitle.value || undefined,
      category: selectedCategory.value || undefined,
      minPrice: priceRange.value[0] || undefined,
      maxPrice: priceRange.value[1] || undefined,
      page: currentPage.value > 1 ? currentPage.value : undefined,
    },
  })

  productsStore.updateFilter({
    title: searchTitle.value,
    category: selectedCategory.value,
    minPrice: priceRange.value[0],
    maxPrice: priceRange.value[1],
    page: currentPage.value,
  })
}

// Watch page changes
watch(currentPage, newPage => {
  productsStore.setPage(newPage)
  updateFilters()
})
</script>
<style scoped>
.product-image-container {
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  height: 200px;
}
</style>
