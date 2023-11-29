import React from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { AppRouter } from './components/routes/AppRouter';
import './styles/global.css';
import { MainProvider } from './providers/MainProvider';
import { ErrorBoundary } from './components/error/ErrorBoundary';

function App() {
  return (
    <MainProvider>
      <MainLayout>
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
      </MainLayout>
    </MainProvider>
  );
}

export default App;
