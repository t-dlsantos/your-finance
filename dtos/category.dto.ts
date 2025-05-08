export interface Category {
  id: number;
  name: string;
  user: number;
}

export interface CreateCategoryDTO {
  name: string;
}