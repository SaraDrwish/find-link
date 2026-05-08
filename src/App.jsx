import { Routes, Route } from 'react-router-dom';
import { AdminProvider } from './contexts/AdminContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SallaThemes from './pages/SallaThemes';
import ZidThemes from './pages/ZidThemes';
import ThemeDetails from './pages/ThemeDetails';
import Dashboard from './pages/Admin/Dashboard';
import ManageThemes from './pages/Admin/ManageThemes';
import ManageCategories from './pages/Admin/ManageCategories';
import ManageLinks from './pages/Admin/ManageLinks';

export default function App() {
  return (
    <AdminProvider>
      <div className="bg-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/salla/themes" element={<SallaThemes />} />
            <Route path="/zid/themes" element={<ZidThemes />} />
            <Route path="/theme/:platform/:themeId" element={<ThemeDetails />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/themes" element={<ManageThemes />} />
            <Route path="/admin/categories" element={<ManageCategories />} />
            <Route path="/admin/links" element={<ManageLinks />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AdminProvider>
  );
}