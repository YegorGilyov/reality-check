import { Layout, Segmented, Typography } from 'antd';
import React, { useState } from 'react';
import { ProductIdeaCard } from '../components/product-ideas/ProductIdeaCard';
import { useProductIdeas } from '../hooks/useProductIdeas';

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
  const { productIdeas } = useProductIdeas();

  // For testing Task 3, we display the first product idea from the pre-populated store.
  const firstProductIdea = productIdeas[1];

  return (
    <Layout>
      <Header style={headerStyle}>
        <Segmented
          options={[
            { label: 'Product Ideas', value: 'ideas' },
            { label: 'Reality Checks', value: 'checks' },
          ]}
          value={activeView}
          onChange={(value) => setActiveView(value as 'ideas' | 'checks')}
        />
      </Header>
      <Content style={contentStyle}>
        <div style={{ padding: 24, maxWidth: 900, margin: 'auto' }}>
          {activeView === 'ideas' ? (
            <div>
              <Typography.Title level={2} style={{ textAlign: 'center' }}>
                Product Ideas View (Testing Task 3)
              </Typography.Title>
              {firstProductIdea ? (
                <ProductIdeaCard
                  productIdea={firstProductIdea}
                  onClick={() => console.log(`Card for ${firstProductIdea.name} clicked!`)}
                />
              ) : (
                <p>Loading product ideas...</p>
              )}
            </div>
          ) : (
            <Typography.Title level={2}>Reality Checks View</Typography.Title>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default ProductDashboardPage;
