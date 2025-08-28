import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProductIdea } from '../types/entities';
import { useRealityCheckStore } from './realityChecks';

interface ProductIdeaState {
  productIdeas: Record<string, ProductIdea>;
  addProductIdea: (data: Omit<ProductIdea, 'id' | 'createdAt' | 'updatedAt' | 'iceScore'>) => string;
  updateProductIdea: (id: string, data: Partial<Omit<ProductIdea, 'id' | 'createdAt' | 'updatedAt' | 'iceScore'>>) => void;
  removeProductIdea: (id: string) => void;
}

export const useProductIdeaStore = create<ProductIdeaState>()(
  persist(
    (set, get) => ({
      productIdeas: {},
      addProductIdea: (data) => {
        const { impact, confidence, ease } = data;
        const iceScore = impact * confidence * ease;
        const now = new Date().toISOString();
        const id = crypto.randomUUID();
        const newProductIdea: ProductIdea = {
          ...data,
          id,
          iceScore,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          productIdeas: { ...state.productIdeas, [id]: newProductIdea },
        }));
        return id;
      },
      updateProductIdea: (id, data) => {
        const { productIdeas } = get();
        const existingProductIdea = productIdeas[id];
        if (!existingProductIdea) {
          return;
        }

        const updatedProductIdea = { ...existingProductIdea, ...data };

        if (data.impact !== undefined || data.confidence !== undefined || data.ease !== undefined) {
          updatedProductIdea.iceScore =
            (data.impact ?? existingProductIdea.impact) *
            (data.confidence ?? existingProductIdea.confidence) *
            (data.ease ?? existingProductIdea.ease);
        }

        updatedProductIdea.updatedAt = new Date().toISOString();

        set((state) => ({
          productIdeas: { ...state.productIdeas, [id]: updatedProductIdea },
        }));
      },
      removeProductIdea: (id) => {
        const { productIdeas } = get();
        if (!productIdeas[id]) {
          return;
        }
        useRealityCheckStore.getState()._disassociateFromProductIdea(id);
        const newProductIdeas = { ...productIdeas };
        delete newProductIdeas[id];
        set({ productIdeas: newProductIdeas });
      },
    }),
    {
      name: 'product-ideas-storage',
    },
  ),
);
