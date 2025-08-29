import { App, Button, DatePicker, Form, Input, Modal, Segmented, Select } from 'antd';
import { useProductIdeas } from '../../hooks/useProductIdeas';
import { useRealityChecks } from '../../hooks/useRealityChecks';
import { useEffect } from 'react';
import type { RealityCheckStatus } from '../../types/entities';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

interface RealityCheckFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingCheckId?: string;
  defaultProductIdeaId?: string;
}

// A dedicated interface for the form's data shape, using Dayjs for the date range
interface RealityCheckFormValues {
  productIdeaId: string | null;
  hypothesis: string;
  experiment: string;
  status: RealityCheckStatus;
  dateRange: [Dayjs, Dayjs];
}

export function RealityCheckForm({ isOpen, onClose, editingCheckId, defaultProductIdeaId }: RealityCheckFormProps) {
  const [form] = Form.useForm<RealityCheckFormValues>();
  const { modal } = App.useApp();

  const { productIdeas } = useProductIdeas();
  const { realityChecksDict, addRealityCheck, updateRealityCheck, removeRealityCheck } = useRealityChecks({});

  const editingCheck = editingCheckId ? realityChecksDict[editingCheckId] : null;
  const isEditMode = !!editingCheck;

  useEffect(() => {
    // This effect runs when the modal opens or the check being edited changes.
    if (isOpen) {
      if (isEditMode && editingCheck) {
        // In edit mode, we must safely convert ISO strings to Dayjs objects.
        const startDate = dayjs(editingCheck.startDate);
        const endDate = dayjs(editingCheck.endDate);

        // Only set values if the dates are valid.
        if (startDate.isValid() && endDate.isValid()) {
          form.setFieldsValue({
            productIdeaId: editingCheck.productIdeaId,
            hypothesis: editingCheck.hypothesis,
            experiment: editingCheck.experiment,
            status: editingCheck.status,
            dateRange: [startDate, endDate],
          });
        } else {
          // If dates are invalid, log an error and don't set the date field.
          console.error('Invalid date format encountered in stored data:', editingCheck);
          form.setFieldsValue({
            productIdeaId: editingCheck.productIdeaId,
            hypothesis: editingCheck.hypothesis,
            experiment: editingCheck.experiment,
            status: editingCheck.status,
          });
        }
      } else {
        // In create mode, reset all fields and set defaults.
        form.resetFields();
        form.setFieldsValue({
          status: 'New',
          productIdeaId: defaultProductIdeaId || null,
        });
      }
    }
  }, [isOpen, editingCheck, isEditMode, defaultProductIdeaId, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      // Transform form values back to the entity shape for submission.
      const { dateRange, ...rest } = values;
      const [startDate, endDate] = dateRange;
      
      const submissionData = {
        ...rest,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };

      if (isEditMode && editingCheckId) {
        updateRealityCheck(editingCheckId, submissionData);
      } else {
        addRealityCheck(submissionData);
      }
      onClose();
    });
  };

  const handleDelete = () => {
    if (!editingCheckId) return;
    modal.confirm({
      title: 'Are you sure you want to delete this reality check?',
      okText: 'Delete',
      okType: 'danger',
      onOk: () => {
        removeRealityCheck(editingCheckId);
        onClose();
      },
    });
  };

  return (
    <Modal
      open={isOpen}
      title={isEditMode ? 'Edit Reality Check' : 'New Reality Check'}
      okText={isEditMode ? 'Update' : 'Create'}
      onCancel={onClose}
      onOk={handleSubmit}
      destroyOnClose // This is crucial to reset form state completely on close.
      style={{ top: 50 }}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          {isEditMode && (
            <Button danger onClick={handleDelete} style={{ float: 'left' }}>
              Delete
            </Button>
          )}
          <CancelBtn />
          <OkBtn />
        </>
      )}
    >
      <Form form={form} layout="vertical" name="reality_check_form" style={{ paddingTop: 24 }}>
        <Form.Item name="productIdeaId" label="Product Idea">
          <Select placeholder="Not connected to any idea">
            <Select.Option value={null}>Not connected to any idea</Select.Option>
            {productIdeas.map((idea) => (
              <Select.Option key={idea.id} value={idea.id}>
                {idea.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="hypothesis" label="We believe that..." rules={[{ required: true }]}>
          <Input.TextArea rows={3} placeholder="Describe your hypothesis..." />
        </Form.Item>
        <Form.Item name="experiment" label="To verify that, we will..." rules={[{ required: true }]}>
          <Input.TextArea rows={3} placeholder="Describe your experiment..." />
        </Form.Item>
        <Form.Item name="dateRange" label="Start date - End date" rules={[{ required: true }]}>
          <RangePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="status" label="Status">
          <Segmented<RealityCheckStatus>
            options={['New', 'In Progress', 'Proved', 'Disproved']}
            block
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
