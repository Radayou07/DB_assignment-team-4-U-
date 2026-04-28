// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideNavBar from './components/SideNavBar';
import TopNavBar from './components/TopNavBar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <SideNavBar />
        <TopNavBar />
        <main className="ml-60 pt-16 min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;