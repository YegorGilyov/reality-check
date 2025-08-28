import { useMemo } from 'react';
import { useProductIdeaStore } from '../stores/productIdeas';
import type { ProductIdea } from '../types/entities';

interface UseProductIdeasReturn {
  productIdeas: ProductIdea[];
  productIdeasDict: Record<string, ProductIdea>;
  addProductIdea: (data: Omit<ProductIdea, 'id' | 'createdAt' | 'updatedAt' | 'iceScore'>) => string;
  updateProductIdea: (id: string, data: Partial<Omit<ProductIdea, 'id' | 'createdAt' | 'updatedAt' | 'iceScore'>>) => void;
  removeProductIdea: (id: string) => void;
}

export function useProductIdeas(): UseProductIdeasReturn {
  const productIdeasDict = useProductIdeaStore((state) => state.productIdeas);
  const { addProductIdea, updateProductIdea, removeProductIdea } = useProductIdeaStore();

  const productIdeas = useMemo(() => {
    return Object.values(productIdeasDict).sort((a, b) => b.iceScore - a.iceScore);
  }, [productIdeasDict]);

  return {
    productIdeas,
    productIdeasDict,
    addProductIdea,
    updateProductIdea,
    removeProductIdea,
  };
}
