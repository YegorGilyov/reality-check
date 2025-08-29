import { useRealityChecks } from '../../hooks/useRealityChecks';
import type { RealityCheckStatus } from '../../types/entities';
import { Typography, Flex } from 'antd';

const { Title } = Typography;

interface RealityChecksSummaryProps {
  productIdeaId: string;
}

const statusColors: Record<RealityCheckStatus, string> = {
  New: '#d9d9d9', 
  'In Progress': '#1677ff', 
  Proved: '#52c41a',
  Disproved: '#ff4d4f',
};

export function RealityChecksSummary({ productIdeaId }: RealityChecksSummaryProps) {
  const { summary } = useRealityChecks({ productIdeaId });

  const statusBar = (
    <Flex style={{ width: '100%', height: 8, borderRadius: 4, overflow: 'hidden' }}>
      {summary.total > 0 ? (
        Object.entries(summary).map(([status, count]) => {
          if (status === 'total' || count === 0) return null;
          const width = `${(count / summary.total) * 100}%`;
          return (
            <div
              key={status}
              style={{
                width,
                backgroundColor: statusColors[status as RealityCheckStatus],
                height: '100%',
              }}
              title={`${status}: ${count}`}
            />
          );
        })
      ) : (
        <div style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0' }} />
      )}
    </Flex>
  );

  return (
    <Flex vertical align="center" style={{ width: '100%' }}>
      <Title level={2} style={{ margin: 0 }}>
        {summary.total}
      </Title>
      <div style={{ width: '100%', marginTop: 8 }}>{statusBar}</div>
    </Flex>
  );
}
