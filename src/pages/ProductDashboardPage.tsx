import { FloatButton, Layout, Segmented } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { ProductIdeasView } from '../components/product-ideas/ProductIdeasView';
import { ProductIdeaForm } from '../components/product-ideas/ProductIdeaForm';
import { ProductIdeaOverview } from '../components/product-ideas/ProductIdeaOverview';
import { RealityChecksKanban } from '../components/reality-checks/RealityChecksKanban';
import { RealityCheckForm } from '../components/reality-checks/RealityCheckForm';

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
  backgroundColor: '#f5f5f5',
  minHeight: 'calc(100vh - 64px)',
};

const ProductDashboardPage: React.FC = () => {
  const [activeView, setActiveView] = useState<'ideas' | 'checks'>('ideas');
  const [selectedProductIdeaId, setSelectedProductIdeaId] = useState<string | null>(null);
  
  const [isProductIdeaFormOpen, setIsProductIdeaFormOpen] = useState(false);
  const [isRealityCheckFormOpen, setIsRealityCheckFormOpen] = useState(false);
  const [defaultProductIdeaId, setDefaultProductIdeaId] = useState<string | undefined>(undefined);

  const closeRealityCheckForm = () => {
    setIsRealityCheckFormOpen(false);
    setDefaultProductIdeaId(undefined);
  };

  const handleFloatButtonClick = () => {
    if (activeView === 'ideas') {
      if (selectedProductIdeaId) {
        // On Product Idea Overview, open Reality Check form with default ID
        setDefaultProductIdeaId(selectedProductIdeaId);
        setIsRealityCheckFormOpen(true);
      } else {
        // On Product Ideas list, open Product Idea form
        setIsProductIdeaFormOpen(true);
      }
    } else if (activeView === 'checks') {
      // On global Reality Checks view, open Reality Check form with no default
      setDefaultProductIdeaId(undefined);
      setIsRealityCheckFormOpen(true);
    }
  };

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
      return <RealityChecksKanban />;
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
            setSelectedProductIdeaId(null);
          }}
        />
      </Header>
      <Content style={contentStyle}>
        <div style={{ padding: 24, maxWidth: 1200, margin: 'auto' }}>
          {renderContent()}
        </div>
      </Content>
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        onClick={handleFloatButtonClick}
      />
      <ProductIdeaForm
        isOpen={isProductIdeaFormOpen}
        onClose={() => setIsProductIdeaFormOpen(false)}
      />
      <RealityCheckForm
        isOpen={isRealityCheckFormOpen}
        onClose={closeRealityCheckForm}
        defaultProductIdeaId={defaultProductIdeaId}
      />
    </Layout>
  );
};

export default ProductDashboardPage;
