import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import DashboardLayout from './layouts/DashboardLayout';
import Loader from './components/loader/Loader';

const GaragePage = lazy(() => import('./pages/Garage'));
const WinnersPage = lazy(() => import('./pages/Winners'));
const ErrorPage = lazy(() => import('./pages/Error'));

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<GaragePage />} />
            <Route path="winners" element={<WinnersPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;
