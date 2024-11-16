import { defineStore } from 'pinia';
import type { Product } from '@/types/product';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    items: [] as Product[],
  }),

  actions: {
    toggleFavorite(product: Product) {
      const index = this.items.findIndex(item => item.id === product.id);
      if (index === -1) {
        this.items.push(product);
      } else {
        this.items.splice(index, 1);
      }
      this.saveToLocalStorage();
    },

    isFavorite(productId: number): boolean {
      return this.items.some(item => item.id === productId);
    },

    saveToLocalStorage() {
      localStorage.setItem('favorites', JSON.stringify(this.items));
    },

    loadFromLocalStorage() {
      const saved = localStorage.getItem('favorites');
      if (saved) {
        this.items = JSON.parse(saved);
      }
    },
  },
});
