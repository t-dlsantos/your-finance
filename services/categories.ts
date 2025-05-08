import { CreateCategoryDTO } from '~/dtos/category.dto';
import { api, getAuthHeaders } from './index';
import { Category } from '~/dtos/transaction.dto';

export async function getCategories(): Promise<Category[]> {
  const headers = await getAuthHeaders();
  const response = await api.get('/categories/', { headers });
  return response.data.results;
}

export async function createCategory(data: CreateCategoryDTO): Promise<Category> {
  const headers = await getAuthHeaders();
  const response = await api.post('/categories/', data, { headers });
  return response.data;
}