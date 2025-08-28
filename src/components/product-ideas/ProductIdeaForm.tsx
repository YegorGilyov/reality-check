import { Form, Input, Modal, Slider, Typography } from 'antd';
import { useProductIdeas } from '../../hooks/useProductIdeas';
import { useEffect } from 'react';

const { Title } = Typography;

interface ProductIdeaFormProps {
  isOpen: boolean;
  onClose: () => void;
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
          <div style={{ flex: 2 }}>
            <Form.Item name="impact" label="Impact">
              <Slider min={1} max={10} />
            </Form.Item>
            <Form.Item name="confidence" label="Confidence">
              <Slider min={1} max={10} />
            </Form.Item>
            <Form.Item name="ease" label="Ease">
              <Slider min={1} max={10} />
            </Form.Item>
          </div>
          <div style={{ flex: 1, textAlign: 'center', borderLeft: '1px solid #f0f0f0', paddingLeft: 16 }}>
            <Title level={5}>ICE score</Title>
            <Title level={2}>{iceScore}</Title>
          </div>
        </div>
      </Form>
    </Modal>
  );
}
