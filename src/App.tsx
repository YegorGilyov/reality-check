import { App as AntApp, ConfigProvider } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ProductDashboardPage from './pages/ProductDashboardPage';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ConfigProvider>
        <AntApp>
          <ProductDashboardPage />
        </AntApp>
      </ConfigProvider>
    </DndProvider>
  );
}

export default App;