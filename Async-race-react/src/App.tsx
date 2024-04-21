import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GaragePage from './pages/Garage';
import WinnersPage from './pages/Winners';
import ErrorPage from './pages/Error';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GaragePage />} />
        <Route path="winners" element={<WinnersPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
