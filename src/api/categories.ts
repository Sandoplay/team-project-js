import { api } from './index';
import type { Category } from '@/types/category';

export const categoriesApi = {
  async getCategories(): Promise<Category[]> {
    const { data } = await api.get('/categories');
    return data;
  },
};
