import { Routes, Route } from 'react-router-dom';
import { AdminProvider } from './contexts/AdminContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SallaThemes from './pages/SallaThemes';
import ZidThemes from './pages/ZidThemes';
import Login from './pages/Login';
import Dashboard from './pages/Admin/Dashboard';
import ManageThemes from './pages/Admin/ManageThemes';
import ManageCategories from './pages/Admin/ManageCategories';
import ManageLinks from './pages/Admin/ManageLinks';

export default function App() {
  return (
    <AdminProvider>
      <div className="bg-white min-h-screen flex flex-col relative bg-subtle-pattern">
        <div className="blob-bg w-96 h-96 -top-48 -left-48"></div>
        <div className="blob-bg w-[500px] h-[500px] bottom-0 -right-64 opacity-50"></div>
        <Navbar />
        <main className="flex-grow relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/salla/themes" element={<SallaThemes />} />
            <Route path="/zid/themes" element={<ZidThemes />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/themes" element={<ProtectedRoute><ManageThemes /></ProtectedRoute>} />
            <Route path="/admin/categories" element={<ProtectedRoute><ManageCategories /></ProtectedRoute>} />
            <Route path="/admin/links" element={<ProtectedRoute><ManageLinks /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AdminProvider>
  );
}