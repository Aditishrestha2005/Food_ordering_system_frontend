import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './components/public/Login';
import RegisterPage from './components/public/Register';
import DashboardPage from './components/private/Dashboard';
import MainPage from './components/public/Main';
import Header from './components/layout/Header';
import AboutUsPage from './components/public/AboutUs'; 
import ContactPage from './components/public/ContactUs'; 
import OfferPage from './/components/public/Offer';

// Create a new component that uses useLocation
function AppContent() {
    const currentLocation = useLocation();

    return (
        <>
            {currentLocation.pathname !== '/dashboard' && <Header />}
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/about" element={<AboutUsPage />} /> 
                <Route path="/contact" element={<ContactPage />} /> 
                <Route path="/offer" element={<OfferaPge />} />
            </Routes>
        </>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
