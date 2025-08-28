import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Progress, Row, Typography } from 'antd';
import { useProductIdeas } from '../../hooks/useProductIdeas';
import { RealityChecksSummary } from '../reality-checks/RealityChecksSummary';

const { Paragraph, Title } = Typography;

interface ProductIdeaOverviewProps {
  productIdeaId: string;
  onBack: () => void;
}

const metricBoxStyle: React.CSSProperties = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '16px',
  paddingTop: '48px',
  borderLeft: '1px solid #f0f0f0',
};

export function ProductIdeaOverview({ productIdeaId, onBack }: ProductIdeaOverviewProps) {
  const { productIdeasDict } = useProductIdeas();
  const productIdea = productIdeasDict[productIdeaId];

  if (!productIdea) {
    return <div>Product Idea not found.</div>;
  }

  const { name, description, impact, confidence, ease, iceScore, id } = productIdea;

  return (
    <div>
      <Flex align="center" style={{ marginBottom: 16 }}>
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={onBack}
          style={{ marginRight: 16 }}
        />
        <Title level={3} style={{ margin: 0 }}>
          {name}
        </Title>
      </Flex>
      <Row align="stretch" style={{ border: '1px solid #f0f0f0', borderRadius: 8, backgroundColor: '#fff' }}>
        <Col span={12} style={{ padding: '24px' }}>
          <Paragraph type="secondary">{description}</Paragraph>
        </Col>
        <Col span={12}>
          <Row style={{ height: '100%' }} align="stretch">
            <Col span={8} style={{ padding: '16px', borderLeft: '1px solid #f0f0f0' }}>
              <Flex vertical justify="center" gap={8} style={{ height: '100%' }}>
                <ScoreRow label="Impact" value={impact} />
                <ScoreRow label="Confidence" value={confidence} />
                <ScoreRow label="Ease" value={ease} />
              </Flex>
            </Col>
            <Col span={8}>
              <div style={metricBoxStyle}>
                <Paragraph style={{ margin: 0 }}>ICE score</Paragraph>
                <Title level={2} style={{ margin: 0 }}>
                  {iceScore}
                </Title>
              </div>
            </Col>
            <Col span={8}>
              <div style={metricBoxStyle}>
                <Paragraph style={{ margin: 0 }}>Reality Checks</Paragraph>
                <RealityChecksSummary productIdeaId={id} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <div style={{marginTop: 24}}>
        {/* Placeholder for RealityChecksKanban */}
        <Title level={4}>Reality Checks Kanban</Title>
      </div>
    </div>
  );
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  const textStyle: React.CSSProperties = {
    margin: 0,
    fontSize: '12px',
  };

  return (
    <div>
      <Flex justify="space-between">
        <Paragraph type="secondary" style={textStyle}>{label}</Paragraph>
        <Paragraph style={textStyle}>{value}</Paragraph>
      </Flex>
      <Progress
        percent={value * 10}
        showInfo={false}
        strokeLinecap="round"
        size="small"
        style={{ margin: 0 }}
      />
    </div>
  );
}
