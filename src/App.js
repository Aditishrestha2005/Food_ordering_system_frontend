import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Added import

import LoginPage from './components/public/Login';
import RegisterPage from './components/public/Register';
import DashboardPage from './components/private/Dashboard';
// import Header from './components/Header';

function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* { "/" && "LoginPage" && "RegisterPage" </Header>} */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
