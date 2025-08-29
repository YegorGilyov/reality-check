import type { ProductIdea } from '../../types/entities';
import { Card, Col, Flex, Progress, Row, Typography } from 'antd';
import { RealityChecksSummary } from '../reality-checks/RealityChecksSummary';

const { Title, Paragraph } = Typography;

interface ProductIdeaCardProps {
  productIdea: ProductIdea;
  onClick: () => void;
}

const cardStyle: React.CSSProperties = {
  cursor: 'pointer',
  marginBottom: 16,
};

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

export function ProductIdeaCard({ productIdea, onClick }: ProductIdeaCardProps) {
  const { name, description, impact, confidence, ease, iceScore, id } = productIdea;

  return (
    <Card hoverable title={name} style={cardStyle} bodyStyle={{ padding: 0 }} onClick={onClick}>
      <Row align="stretch" style={{ minHeight: 150 }}>
        <Col span={12} style={{ padding: '24px' }}>
          <Paragraph type="secondary" ellipsis={{ rows: 4 }}>{description}</Paragraph>
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
    </Card>
  );
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  const textStyle: React.CSSProperties = {
    margin: 0,
    fontSize: '12px',
  };

  return (
    <div>
      <Flex justify="space-between" style={{ marginBottom: -4 }}>
        <Paragraph type="secondary" style={textStyle}>{label}</Paragraph>
        <Paragraph style={textStyle}>{value}</Paragraph>
      </Flex>
      <Progress
        percent={value * 10}
        showInfo={false}
        strokeLinecap="round"
        size="small"
        strokeColor="#673ab7"
        style={{ margin: 0 }}
      />
    </div>
  );
}
