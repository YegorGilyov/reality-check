import { useProductIdeas } from '../../hooks/useProductIdeas';
import { ProductIdeaCard } from './ProductIdeaCard';

interface ProductIdeasViewProps {
  onSelectIdea: (id: string) => void;
}

export function ProductIdeasView({ onSelectIdea }: ProductIdeasViewProps) {
  const { productIdeas } = useProductIdeas();

  return (
    <div>
      {productIdeas.map((idea) => (
        <ProductIdeaCard
          key={idea.id}
          productIdea={idea}
          onClick={() => onSelectIdea(idea.id)}
        />
      ))}
    </div>
  );
}
