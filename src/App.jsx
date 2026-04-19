import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import LabWorkspace from './pages/LabWorkspace';
import { I18nProvider, useI18n } from './i18n/I18nContext';
import './index.css';

function DocumentTitle() {
  const { t } = useI18n();
  useEffect(() => {
    document.title = t('meta.title');
  }, [t]);
  return null;
}

function AppRoutes() {
  return (
    <>
      <DocumentTitle />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/lab" element={<LabWorkspace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </I18nProvider>
  );
}
