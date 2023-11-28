import React from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { AppRouter } from './components/routes/AppRouter';
import './styles/global.css';
import { MainProvider } from './providers/MainProvider';

function App() {
  return (
    <MainProvider>
      <MainLayout>
        <AppRouter />
      </MainLayout>
    </MainProvider>
  );
}

export default App;
