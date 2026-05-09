import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';

export default function Navbar() {
  const { isAdmin, logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100 shadow-sm w-full">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="https://craffo.com/wp-content/uploads/2025/10/CR-EN-WHITE.png" alt="Craffo" className="h-8 w-auto" onError={(e) => e.target.src = 'https://placehold.co/120x40/150543/white?text=CRAFFO'} />
        </Link>
        <div className="flex gap-6 items-center">
          <Link to="/salla/themes" className="flex flex-row-reverse items-center gap-1.5 text-[#150543] hover:text-[#a46df6] transition font-medium group relative">
            <span>سلة</span>
            <img src="https://asas-tools.com/u/uploads/sara_craffo/sallah-logo.png" alt="سلة" className="w-5 h-5 object-contain" />
            <span className="absolute bottom-0 right-0 w-full h-0.5 bg-[#a46df6] scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></span>
          </Link>
          <Link to="/zid/themes" className="flex flex-row-reverse items-center gap-1.5 text-[#150543] hover:text-[#a46df6] transition font-medium group relative">
            <span>زد</span>
            <img src="https://asas-tools.com/u/uploads/sara_craffo/zid-logo.png" alt="زد" className="w-5 h-5 object-contain" />
            <span className="absolute bottom-0 right-0 w-full h-0.5 bg-[#a46df6] scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></span>
          </Link>
          {isAdmin ? (
            <>
              <Link to="/admin" className="bg-[#a46df6]/10 text-[#150543] px-4 py-1.5 rounded-full hover:bg-[#a46df6] hover:text-white transition">لوحة التحكم</Link>
              <button onClick={handleLogout} className="text-red-500 text-sm px-2 py-1">تسجيل خروج</button>
            </>
          ) : (
            <Link to="/login" className="bg-gray-100 text-[#150543] px-4 py-1.5 rounded-full hover:bg-[#a46df6]/20 transition">تسجيل دخول</Link>
          )}
        </div>
      </div>
    </nav>
  );
}