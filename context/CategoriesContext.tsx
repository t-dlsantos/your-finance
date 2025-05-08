import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Category } from '~/dtos/transaction.dto';
import { getCategories } from '~/services/categories';

type CategoriesContextType = {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  reloadCategories: () => Promise<void>;
};

const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
  setCategories: () => {},
  reloadCategories: async () => {},
});

export function useCategories() {
  return useContext(CategoriesContext);
}

type Props = {
  children: ReactNode;
};

export function CategoriesProvider({ children }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  async function reloadCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  }

  useEffect(() => {
    reloadCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories, reloadCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
}