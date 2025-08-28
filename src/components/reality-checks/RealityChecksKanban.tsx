import { Col, Row, Typography } from 'antd';
import { useRealityChecks } from '../../hooks/useRealityChecks';
import type { RealityCheckStatus } from '../../types/entities';
import { RealityCheckCard } from './RealityCheckCard';

const { Title, Text } = Typography;

interface RealityChecksKanbanProps {
  productIdeaId?: string;
}

const KANBAN_COLUMNS: RealityCheckStatus[] = ['New', 'In Progress', 'Proved', 'Disproved'];

export function RealityChecksKanban({ productIdeaId }: RealityChecksKanbanProps) {
  const { realityChecks } = useRealityChecks({ productIdeaId });

  const groupedChecks = realityChecks.reduce((acc, check) => {
    (acc[check.status] = acc[check.status] || []).push(check);
    return acc;
  }, {} as Record<RealityCheckStatus, typeof realityChecks>);

  return (
    <Row gutter={16}>
      {KANBAN_COLUMNS.map((status) => (
        <Col key={status} span={6}>
          <div style={{ backgroundColor: '#fafafa', padding: '8px 12px', borderRadius: 8 }}>
            <Title level={5} style={{ margin: 0, textTransform: 'uppercase', fontSize: 12 }}>
              {status} <Text type="secondary">({groupedChecks[status]?.length || 0})</Text>
            </Title>
          </div>
          <div style={{ marginTop: 16, minHeight: 200 }}>
            {(groupedChecks[status] || []).map((check) => (
              <RealityCheckCard
                key={check.id}
                realityCheck={check}
                onClick={() => console.log(`Clicked on check: ${check.id}`)} // Placeholder for edit
              />
            ))}
          </div>
        </Col>
      ))}
    </Row>
  );
}
