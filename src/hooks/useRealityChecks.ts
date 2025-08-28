import { useMemo } from 'react';
import { useRealityCheckStore } from '../stores/realityChecks';
import type { RealityCheck, RealityCheckStatus } from '../types/entities';

interface RealityCheckFilter {
  productIdeaId?: string;
}

type RealityCheckSummary = Record<RealityCheckStatus, number> & { total: number };

interface UseRealityChecksReturn {
  realityChecks: RealityCheck[];
  realityChecksDict: Record<string, RealityCheck>;
  summary: RealityCheckSummary;
  addRealityCheck: (data: Omit<RealityCheck, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateRealityCheck: (id: string, data: Partial<Omit<RealityCheck, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  removeRealityCheck: (id: string) => void;
}

export function useRealityChecks({ productIdeaId }: RealityCheckFilter = {}): UseRealityChecksReturn {
  const allRealityChecksDict = useRealityCheckStore((state) => state.realityChecks);
  const { addRealityCheck, updateRealityCheck, removeRealityCheck } = useRealityCheckStore();

  const realityChecksDict = useMemo(() => {
    if (productIdeaId === undefined) {
      return allRealityChecksDict;
    }
    return Object.fromEntries(
      Object.entries(allRealityChecksDict).filter(([, check]) => check.productIdeaId === productIdeaId)
    );
  }, [allRealityChecksDict, productIdeaId]);

  const realityChecks = useMemo(() => {
    return Object.values(realityChecksDict).sort((a, b) => {
      const dateComparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      if (dateComparison !== 0) {
        return dateComparison;
      }
      return a.hypothesis.localeCompare(b.hypothesis);
    });
  }, [realityChecksDict]);

  const summary = useMemo(() => {
    const initialSummary: RealityCheckSummary = {
      'New': 0,
      'In Progress': 0,
      'Proved': 0,
      'Disproved': 0,
      total: 0,
    };

    return Object.values(realityChecksDict).reduce((acc, check) => {
      acc[check.status]++;
      acc.total++;
      return acc;
    }, initialSummary);
  }, [realityChecksDict]);

  return {
    realityChecks,
    realityChecksDict,
    summary,
    addRealityCheck,
    updateRealityCheck,
    removeRealityCheck,
  };
}
