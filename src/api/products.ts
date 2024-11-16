import { api } from './index';
import type { Product } from '@/types/product';

export const productsApi = {
  async getProducts(): Promise<Product[]> {
    const { data } = await api.get('/products');
    return data;
  },

  async getProduct(id: number): Promise<Product> {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    const { data } = await api.get(`/products/category/${category}`);
    return data;
  },

  async getCategories(): Promise<string[]> {
    const { data } = await api.get('/products/categories');
    return data;
  },
};
