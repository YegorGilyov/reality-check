
export interface BaseEntity {
  id: string;
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
}

export interface ProductIdea extends BaseEntity {
  name: string;
  description: string;
  impact: number;
  confidence: number;
  ease: number;
  iceScore: number;
}

export type RealityCheckStatus = 'New' | 'In Progress' | 'Proved' | 'Disproved';

export interface RealityCheck extends BaseEntity {
  hypothesis: string;
  experiment: string;
  status: RealityCheckStatus;
  startDate: string; // ISO 8601 format
  endDate: string; // ISO 8601 format
  productIdeaId: string | null;
}
