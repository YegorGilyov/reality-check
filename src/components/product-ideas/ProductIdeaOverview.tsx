import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Modal, Row, Slider, Typography, App } from 'antd';
import { useProductIdeas } from '../../hooks/useProductIdeas';
import { RealityChecksSummary } from '../reality-checks/RealityChecksSummary';
import { useEffect, useState } from 'react';

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
  justifyContent: 'center',
  padding: '16px',
  borderLeft: '1px solid #f0f0f0',
};

export function ProductIdeaOverview({ productIdeaId, onBack }: ProductIdeaOverviewProps) {
  const { productIdeasDict, updateProductIdea, removeProductIdea } = useProductIdeas();
  const productIdea = productIdeasDict[productIdeaId];
  const { modal } = App.useApp();

  const [name, setName] = useState(productIdea?.name);
  const [description, setDescription] = useState(productIdea?.description);
  const [impact, setImpact] = useState(productIdea?.impact);
  const [confidence, setConfidence] = useState(productIdea?.confidence);
  const [ease, setEase] = useState(productIdea?.ease);

  useEffect(() => {
    setName(productIdea?.name);
    setDescription(productIdea?.description);
    setImpact(productIdea?.impact);
    setConfidence(productIdea?.confidence);
    setEase(productIdea?.ease);
  }, [productIdea]);

  if (!productIdea) {
    return <div>Product Idea not found.</div>;
  }

  const iceScore = (impact ?? 0) * (confidence ?? 0) * (ease ?? 0);

  const handleDelete = () => {
    modal.confirm({
      title: 'Are you sure you want to delete this product idea?',
      content: 'This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      onOk: () => {
        removeProductIdea(productIdeaId);
        onBack();
      },
    });
  };

  return (
    <div>
      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <Flex align="center">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={onBack}
            style={{ marginRight: 16 }}
          />
          <Title
            level={3}
            style={{ margin: 0 }}
            editable={{
              onChange: (value) => {
                setName(value);
                updateProductIdea(productIdeaId, { name: value });
              },
            }}
          >
            {name}
          </Title>
        </Flex>
        <Button type="text" danger icon={<DeleteOutlined />} onClick={handleDelete} />
      </Flex>
      <Row align="stretch" style={{ border: '1px solid #f0f0f0', borderRadius: 8, backgroundColor: '#fff' }}>
        <Col span={12} style={{ padding: '24px' }}>
          <Paragraph
            type="secondary"
            editable={{
              onChange: (value) => {
                setDescription(value);
                updateProductIdea(productIdeaId, { description: value });
              },
            }}
          >
            {description}
          </Paragraph>
        </Col>
        <Col span={12}>
          <Row style={{ height: '100%' }} align="stretch">
            <Col span={8} style={{ padding: '16px', borderLeft: '1px solid #f0f0f0' }}>
              <Flex vertical justify="center" gap={16} style={{ height: '100%' }}>
                <ScoreSlider label="Impact" value={impact} onChange={(v) => { setImpact(v); updateProductIdea(productIdeaId, { impact: v })}} />
                <ScoreSlider label="Confidence" value={confidence} onChange={(v) => { setConfidence(v); updateProductIdea(productIdeaId, { confidence: v })}} />
                <ScoreSlider label="Ease" value={ease} onChange={(v) => { setEase(v); updateProductIdea(productIdeaId, { ease: v })}} />
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
                <RealityChecksSummary productIdeaId={productIdea.id} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <div style={{ marginTop: 24 }}>
        {/* Placeholder for RealityChecksKanban */}
        <Title level={4}>Reality Checks Kanban</Title>
      </div>
    </div>
  );
}

function ScoreSlider({ label, value, onChange }: { label: string; value?: number; onChange: (value: number) => void; }) {
  const textStyle: React.CSSProperties = {
    margin: 0,
    fontSize: '12px',
  };

  return (
    <div>
      <Flex justify="space-between" style={{ marginBottom: 2 }}>
        <Paragraph type="secondary" style={textStyle}>{label}</Paragraph>
        <Paragraph style={textStyle}>{value}</Paragraph>
      </Flex>
      <Slider
        min={1}
        max={10}
        value={value}
        onChange={onChange}
        style={{ margin: 0 }}
      />
    </div>
  );
}