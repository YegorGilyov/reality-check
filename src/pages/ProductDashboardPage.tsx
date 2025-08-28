import { FloatButton, Layout, Segmented, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { ProductIdeasView } from '../components/product-ideas/ProductIdeasView';
import { ProductIdeaForm } from '../components/product-ideas/ProductIdeaForm';
import { ProductIdeaOverview } from '../components/product-ideas/ProductIdeaOverview';

const { Header, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#fff',
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: '1px solid #f0f0f0',
};

const contentStyle: React.CSSProperties = {
  padding: '0 48px',
  marginTop: 64,
};

const ProductDashboardPage: React.FC = () => {
  const [activeView, setActiveView] = useState<'ideas' | 'checks'>('ideas');
  const [selectedProductIdeaId, setSelectedProductIdeaId] = useState<string | null>(null);
  const [isProductIdeaFormOpen, setIsProductIdeaFormOpen] = useState(false);

  const renderContent = () => {
    if (activeView === 'ideas') {
      if (selectedProductIdeaId) {
        return (
          <ProductIdeaOverview
            productIdeaId={selectedProductIdeaId}
            onBack={() => setSelectedProductIdeaId(null)}
          />
        );
      }
      return <ProductIdeasView onSelectIdea={setSelectedProductIdeaId} />;
    }
    if (activeView === 'checks') {
      // This will be the RealityChecksKanban in a future task
      return <Typography.Title level={2}>Reality Checks View</Typography.Title>;
    }
    return null;
  };

  return (
    <Layout>
      <Header style={headerStyle}>
        <Segmented
          options={[
            { label: 'Product Ideas', value: 'ideas' },
            { label: 'Reality Checks', value: 'checks' },
          ]}
          value={activeView}
          onChange={(value) => {
            setActiveView(value as 'ideas' | 'checks');
            setSelectedProductIdeaId(null); // Reset selection when switching views
          }}
        />
      </Header>
      <Content style={contentStyle}>
        <div style={{ padding: 24, maxWidth: 900, margin: 'auto' }}>
          {renderContent()}
        </div>
      </Content>
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsProductIdeaFormOpen(true)}
      />
      <ProductIdeaForm
        isOpen={isProductIdeaFormOpen}
        onClose={() => setIsProductIdeaFormOpen(false)}
      />
    </Layout>
  );
};

export default ProductDashboardPage;