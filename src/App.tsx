import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HealthProvider } from './contexts/HealthContext';
import Home from './pages/Home';
import Food from './pages/Food';
import Liquid from './pages/Liquid';
import Sport from './pages/Sport';
import './css/reset.css';

function App() {
  return (
    <HealthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/food" element={<Food />} />
          <Route path="/liquid" element={<Liquid />} />
          <Route path="/sport" element={<Sport />} />
        </Routes>
      </Router>
    </HealthProvider>
  );
}

export default App; 