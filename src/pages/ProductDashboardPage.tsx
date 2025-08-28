import { Layout, Segmented, Typography } from 'antd';
import React, { useState } from 'react';
import { RealityChecksSummary } from '../components/reality-checks/RealityChecksSummary';

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
        <div style={{ padding: 24 }}>
          {activeView === 'ideas' ? (
            <div>
              <Typography.Title level={2}>Product Ideas View</Typography.Title>
              <div style={{ maxWidth: 200, margin: 'auto', border: '1px solid #f0f0f0', padding: 16, borderRadius: 8 }}>
                <Typography.Title level={4}>Test: RealityChecksSummary</Typography.Title>
                <RealityChecksSummary productIdeaId="26a501f5-18c0-476c-954a-c6a30fbcf10e" />
              </div>
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
