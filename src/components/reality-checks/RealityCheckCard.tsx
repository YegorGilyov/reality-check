import type { RealityCheck, RealityCheckStatus } from '../../types/entities';
import { Card, Typography } from 'antd';
import { useProductIdeas } from '../../hooks/useProductIdeas';
import { FieldTimeOutlined } from '@ant-design/icons';

const { Paragraph, Text } = Typography;

interface RealityCheckCardProps {
  realityCheck: RealityCheck;
  onClick: () => void;
}

const statusColors: Record<RealityCheckStatus, string> = {
  New: '#d6e4ff',
  'In Progress': '#adc6ff',
  Proved: '#b7eb8f',
  Disproved: '#ffccc7',
};

export function RealityCheckCard({ realityCheck, onClick }: RealityCheckCardProps) {
  const { productIdeasDict } = useProductIdeas();
  const productIdea = realityCheck.productIdeaId ? productIdeasDict[realityCheck.productIdeaId] : null;

  const formatDate = (isoString: string) => new Date(isoString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <Card
      hoverable
      onClick={onClick}
      style={{ marginBottom: 12, borderTop: `3px solid ${statusColors[realityCheck.status]}` }}
      bodyStyle={{ padding: 16 }}
    >
      <Paragraph strong>{realityCheck.hypothesis}</Paragraph>
      {productIdea && <Text type="secondary">{productIdea.name}</Text>}
      <div style={{ marginTop: 8 }}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          <FieldTimeOutlined style={{ marginRight: 4 }} />
          {formatDate(realityCheck.startDate)} - {formatDate(realityCheck.endDate)}
        </Text>
      </div>
    </Card>
  );
}
