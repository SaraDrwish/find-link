import { Routes, Route } from 'react-router-dom';
import { AdminProvider } from './contexts/AdminContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SallaThemes from './pages/SallaThemes';
import ZidThemes from './pages/ZidThemes';
import ThemeDetails from './pages/ThemeDetails';
import Login from './pages/Login';
import AdminPanel from './pages/Admin/AdminPanel';

export default function App() {
  return (
    <AdminProvider>
      <div className="bg-[#F8F6F4] min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/salla/themes" element={<SallaThemes />} />
            <Route path="/zid/themes" element={<ZidThemes />} />
            <Route path="/theme/:themeId" element={<ThemeDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AdminProvider>
  );
}