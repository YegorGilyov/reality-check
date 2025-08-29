import { Flex, Form, Input, Modal, Slider, Typography } from 'antd';
import { useProductIdeas } from '../../hooks/useProductIdeas';
import { useEffect } from 'react';

const { Title, Paragraph } = Typography;

interface ProductIdeaFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const textStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '12px',
};

// Custom Form Control for the compact slider layout
// It receives `value` and `onChange` from Form.Item
interface CompactSliderProps {
  value?: number;
  onChange?: (value: number) => void;
  label: string;
  number: number;
}

function CompactSlider({ value, onChange, label, number }: CompactSliderProps) {
  return (
    <div style={{ marginBottom: 16 }}>
      <Flex justify="space-between" style={{ width: '100%' }}>
        <Paragraph type="secondary" style={textStyle}>{label}</Paragraph>
        <Paragraph style={textStyle}>{number}</Paragraph>
      </Flex>
      <Slider
        min={1}
        max={10}
        value={value}
        onChange={onChange}
        style={{ margin: 0 }}
        trackStyle={{ backgroundColor: '#673ab7' }}
      />
    </div>
  );
}

export function ProductIdeaForm({ isOpen, onClose }: ProductIdeaFormProps) {
  const [form] = Form.useForm();
  const { addProductIdea } = useProductIdeas();

  const impact = Form.useWatch('impact', form) ?? 5;
  const confidence = Form.useWatch('confidence', form) ?? 5;
  const ease = Form.useWatch('ease', form) ?? 5;
  const iceScore = impact * confidence * ease;

  useEffect(() => {
    if (!isOpen) {
      form.resetFields();
    }
  }, [isOpen, form]);

  const handleCreate = () => {
    form
      .validateFields()
      .then((values) => {
        addProductIdea(values);
        onClose();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      open={isOpen}
      title="New Product Idea"
      okText="Create"
      cancelText="Cancel"
      onCancel={onClose}
      onOk={handleCreate}
      style={{ top: 50 }}
    >
      <Form
        form={form}
        layout="vertical"
        name="product_idea_form"
        initialValues={{ impact: 5, confidence: 5, ease: 5 }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please give your idea a name...' }]}
        >
          <Input placeholder="Give your idea a name..." />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please describe your idea...' }]}
        >
          <Input.TextArea rows={4} placeholder="Describe your idea..." />
        </Form.Item>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <Form.Item name="impact" noStyle>
              <CompactSlider label="Impact" number={impact} />
            </Form.Item>
            <Form.Item name="confidence" noStyle>
              <CompactSlider label="Confidence" number={confidence} />
            </Form.Item>
            <Form.Item name="ease" noStyle>
              <CompactSlider label="Ease" number={ease} />
            </Form.Item>
          </div>
          <div style={{ flex: 1, textAlign: 'center', borderLeft: '1px solid #f0f0f0', paddingLeft: 16, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Paragraph type="secondary" style={{margin: 0}}>ICE score</Paragraph>
            <Title level={2} style={{margin: 0}}>{iceScore}</Title>
          </div>
        </div>
      </Form>
    </Modal>
  );
}