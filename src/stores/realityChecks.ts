import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RealityCheck } from '../types/entities';
import { useProductIdeaStore } from './productIdeas';

interface RealityCheckState {
  realityChecks: Record<string, RealityCheck>;
  addRealityCheck: (data: Omit<RealityCheck, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateRealityCheck: (id: string, data: Partial<Omit<RealityCheck, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  removeRealityCheck: (id: string) => void;
  _disassociateFromProductIdea: (productIdeaId: string) => void;
}

export const useRealityCheckStore = create<RealityCheckState>()(
  persist(
    (set, get) => ({
      realityChecks: {},
      addRealityCheck: (data) => {
        if (data.productIdeaId) {
          const productIdeaExists = useProductIdeaStore.getState().productIdeas[data.productIdeaId];
          if (!productIdeaExists) {
            // Fail the operation by not proceeding
            console.error(`ProductIdea with id ${data.productIdeaId} does not exist.`);
            return ''; // Return empty string or handle error as appropriate
          }
        }

        const now = new Date().toISOString();
        const id = crypto.randomUUID();
        const newRealityCheck: RealityCheck = {
          ...data,
          id,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          realityChecks: { ...state.realityChecks, [id]: newRealityCheck },
        }));
        return id;
      },
      updateRealityCheck: (id, data) => {
        const { realityChecks } = get();
        const existingRealityCheck = realityChecks[id];

        if (!existingRealityCheck) {
          return;
        }

        if (data.productIdeaId && data.productIdeaId !== existingRealityCheck.productIdeaId) {
          const productIdeaExists = useProductIdeaStore.getState().productIdeas[data.productIdeaId];
          if (!productIdeaExists) {
            console.error(`ProductIdea with id ${data.productIdeaId} does not exist.`);
            return;
          }
        }

        const updatedRealityCheck = {
          ...existingRealityCheck,
          ...data,
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          realityChecks: { ...state.realityChecks, [id]: updatedRealityCheck },
        }));
      },
      removeRealityCheck: (id) => {
        const { realityChecks } = get();
        if (!realityChecks[id]) {
          return;
        }
        const newRealityChecks = { ...realityChecks };
        delete newRealityChecks[id];
        set({ realityChecks: newRealityChecks });
      },
      _disassociateFromProductIdea: (productIdeaId) => {
        set((state) => {
          const newRealityChecks = { ...state.realityChecks };
          for (const id in newRealityChecks) {
            if (newRealityChecks[id].productIdeaId === productIdeaId) {
              newRealityChecks[id] = {
                ...newRealityChecks[id],
                productIdeaId: null,
                updatedAt: new Date().toISOString(),
              };
            }
          }
          return { realityChecks: newRealityChecks };
        });
      },
    }),
    {
      name: 'reality-checks-storage',
    },
  ),
);
