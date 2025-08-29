import { Badge, Col, Flex, Row, Typography } from 'antd';
import { useRealityChecks } from '../../hooks/useRealityChecks';
import type { RealityCheck, RealityCheckStatus } from '../../types/entities';
import { DND_ITEM_TYPES, RealityCheckCard } from './RealityCheckCard';
import { useDrop } from 'react-dnd';
import { useState } from 'react';
import { RealityCheckForm } from './RealityCheckForm';

const { Title } = Typography;

interface RealityChecksKanbanProps {
  productIdeaId?: string;
}

const KANBAN_COLUMNS: RealityCheckStatus[] = ['New', 'In Progress', 'Proved', 'Disproved'];

const statusColors: Record<RealityCheckStatus, string> = {
  New: '#d6e4ff',
  'In Progress': '#adc6ff',
  Proved: '#b7eb8f',
  Disproved: '#ffccc7',
};

interface KanbanColumnProps {
  status: RealityCheckStatus;
  checks: RealityCheck[];
  onDrop: (checkId: string, newStatus: RealityCheckStatus) => void;
  onCardClick: (checkId: string) => void;
}

function KanbanColumn({ status, checks, onDrop, onCardClick }: KanbanColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: DND_ITEM_TYPES.REALITY_CHECK,
    drop: (item: { id: string }) => onDrop(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <Col ref={drop} span={6}>
      <div style={{ backgroundColor: '#fafafa', padding: '8px 12px', borderRadius: 8 }}>
        <Flex justify="space-between" align="center">
          <Title level={5} style={{ margin: 0, textTransform: 'uppercase', fontSize: 12 }}>
            {status}
          </Title>
          <Badge count={checks.length} color={statusColors[status]} />
        </Flex>
      </div>
      <div style={{ marginTop: 16, minHeight: 200, backgroundColor: isOver ? '#f0f2f5' : 'transparent', borderRadius: 8, padding: 4 }}>
        {checks.map((check) => (
          <RealityCheckCard
            key={check.id}
            realityCheck={check}
            onClick={() => onCardClick(check.id)}
          />
        ))}
      </div>
    </Col>
  );
}

export function RealityChecksKanban({ productIdeaId }: RealityChecksKanbanProps) {
  const { realityChecks, updateRealityCheck } = useRealityChecks({ productIdeaId });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCheckId, setEditingCheckId] = useState<string | undefined>(undefined);

  const groupedChecks = realityChecks.reduce((acc, check) => {
    (acc[check.status] = acc[check.status] || []).push(check);
    return acc;
  }, {} as Record<RealityCheckStatus, typeof realityChecks>);

  const handleDrop = (checkId: string, newStatus: RealityCheckStatus) => {
    updateRealityCheck(checkId, { status: newStatus });
  };

  const handleCardClick = (checkId: string) => {
    setEditingCheckId(checkId);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingCheckId(undefined);
  };

  return (
    <>
      <Row gutter={16}>
        {KANBAN_COLUMNS.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            checks={groupedChecks[status] || []}
            onDrop={handleDrop}
            onCardClick={handleCardClick}
          />
        ))}
      </Row>
      <RealityCheckForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        editingCheckId={editingCheckId}
      />
    </>
  );
}
