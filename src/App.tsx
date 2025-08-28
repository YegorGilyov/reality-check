import { App as AntApp, ConfigProvider } from 'antd';
import ProductDashboardPage from './pages/ProductDashboardPage';

function App() {
  return (
    <ConfigProvider>
      <AntApp>
        <ProductDashboardPage />
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
