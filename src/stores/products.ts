import { defineStore } from 'pinia';
import { productsApi } from '@/api/products';
import type { Product } from '@/types/product';
import type { ProductFilter } from '@/types/filter';

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    filteredProducts: [] as Product[],
    categories: [] as string[],
    currentProduct: null as Product | null,
    loading: false,
    error: null as string | null,
    filter: {
      title: '',
      category: '',
      minPrice: 0,
      maxPrice: 1000,
      page: 1,
      limit: 12,
    } satisfies ProductFilter,
  }),

  getters: {
    paginatedProducts: (state) => {
      const start = (state.filter.page - 1) * state.filter.limit;
      const end = start + state.filter.limit;
      return state.filteredProducts.slice(start, end);
    },
    totalPages: (state) =>
      Math.ceil(state.filteredProducts.length / state.filter.limit),
  },

  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        this.products = await productsApi.getProducts();
        this.applyFilters();
      } catch (error) {
        this.error = 'Failed to fetch products';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchCategories() {
      this.loading = true;
      this.error = null;
      try {
        this.categories = await productsApi.getCategories();
      } catch (error) {
        this.error = 'Failed to fetch categories';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchProduct(id: number) {
      this.loading = true;
      this.error = null;
      try {
        this.currentProduct = await productsApi.getProduct(id);
      } catch (error) {
        this.error = 'Failed to fetch product';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    applyFilters() {
      let filtered = [...this.products];

      // Filter by title
      if (this.filter.title.length > 0) {
        filtered = filtered.filter(product =>
          product.title.toLowerCase().includes(this.filter.title.toLowerCase())
        );
      }

      // Filter by category
      if (this.filter.category.length > 0) {
        filtered = filtered.filter(product =>
          product.category === this.filter.category
        );
      }

      // Filter by price
      filtered = filtered.filter(product =>
        product.price >= this.filter.minPrice &&
        product.price <= this.filter.maxPrice
      );

      this.filteredProducts = filtered;
    },

    updateFilter(filter: Partial<ProductFilter>) {
      this.filter = {
        ...this.filter,
        ...filter
      };
      this.applyFilters();
    },

    setPage(page: number) {
      this.filter.page = page;
    },
  },
});
