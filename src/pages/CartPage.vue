// src/pages/CartPage.vue
<template>
  <v-container>
    <h1 class="text-h4 mb-6">Shopping Cart</h1>

    <v-alert v-if="cartItems.length === 0" type="info">
      Your cart is empty
    </v-alert>

    <v-row v-else>
      <v-col cols="12" md="8">
        <v-card>
          <v-list>
            <v-list-item v-for="item in cartItems" :key="item.id">
              <template #prepend>
                <div class="cart-image-container">
                  <v-img
                    :src="item.image"
                    width="100"
                    height="100"
                    :cover="false"
                    :contain="true"
                    class="bg-white"
                  />
                </div>
              </template>

              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <v-list-item-subtitle>
                ${{ item.price }} x {{ item.quantity }}
              </v-list-item-subtitle>

              <template #append>
                <v-btn
                  icon="mdi-delete"
                  variant="text"
                  color="error"
                  @click="removeFromCart(item.id)"
                />
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Order Summary</v-card-title>
          <v-card-text>
            <div class="d-flex justify-space-between mb-2">
              <span>Total:</span>
              <span>${{ totalAmount.toFixed(2) }}</span>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="checkout"> Checkout </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const { items: cartItems, totalAmount } = storeToRefs(cartStore)

const removeFromCart = (productId: number) => {
  cartStore.removeFromCart(productId)
}

const checkout = () => {
  console.log('Checkout clicked')
}
</script>
<style scoped>
.cart-image-container {
  background: white;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
}
</style>
