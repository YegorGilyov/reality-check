import type { RealityCheck, RealityCheckStatus } from '../../types/entities';
import { Card, Typography } from 'antd';
import { useProductIdeas } from '../../hooks/useProductIdeas';
import { FieldTimeOutlined } from '@ant-design/icons';
import { useDrag } from 'react-dnd';

const { Paragraph, Text } = Typography;

export const DND_ITEM_TYPES = {
  REALITY_CHECK: 'realityCheck',
};

interface RealityCheckCardProps {
  realityCheck: RealityCheck;
  onClick: () => void;
}

const statusColors: Record<RealityCheckStatus, string> = {
  New: '#d9d9d9',
  'In Progress': '#adc6ff',
  Proved: '#b7eb8f',
  Disproved: '#ffccc7',
};

export function RealityCheckCard({ realityCheck, onClick }: RealityCheckCardProps) {
  const { productIdeasDict } = useProductIdeas();
  const productIdea = realityCheck.productIdeaId ? productIdeasDict[realityCheck.productIdeaId] : null;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DND_ITEM_TYPES.REALITY_CHECK,
    item: { id: realityCheck.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const formatDate = (isoString: string) => new Date(isoString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card
        hoverable
        onClick={onClick}
        style={{ marginBottom: 12, borderTop: `3px solid ${statusColors[realityCheck.status]}` }}
        styles={{ body: { padding: 16 } }}
      >
        <Paragraph type="secondary" style={{ fontSize: 12, marginBottom: 2 }}>We believe that...</Paragraph>
        <Paragraph style={{ marginTop: 0, marginBottom: 16 }}>{realityCheck.hypothesis}</Paragraph>
        
        {productIdea && (
          <>
            <Paragraph type="secondary" style={{ fontSize: 12, marginBottom: 2 }}>Product Idea</Paragraph>
            <Paragraph style={{ marginTop: 0 }}>{productIdea.name}</Paragraph>
          </>
        )}
        
        {realityCheck.startDate && realityCheck.endDate && (
          <div style={{ marginTop: 16 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              <FieldTimeOutlined style={{ marginRight: 4 }} />
              {formatDate(realityCheck.startDate)} - {formatDate(realityCheck.endDate)}
            </Text>
          </div>
        )}
      </Card>
    </div>
  );
}