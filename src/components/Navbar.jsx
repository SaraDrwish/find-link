import { Link } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';

export default function Navbar() {
  const { isAdmin } = useAdmin();

  return (
    <nav className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* لوجو كرافو فقط */}
        <Link to="/" className="flex items-center">
          <img
            src="https://craffo.com/wp-content/uploads/2025/10/CR-EN-WHITE.png"
            alt="Craffo"
            className="h-8 w-auto"
            onError={(e) => { e.target.src = 'https://placehold.co/120x40/150543/white?text=CRAFFO'; }}
          />
        </Link>

        <div className="flex gap-6 items-center">
          {/* سلة - أيقونة قبل النص */}
          <Link
            to="/salla/themes"
            className="flex flex-row-reverse items-center gap-1.5 text-[#150543] hover:text-[#a46df6] transition font-medium group relative"
          >
            <img src="https://asas-tools.com/u/uploads/sara_craffo/sallah-logo.png" alt="سلة" className="w-5 h-5 object-contain" />
            <span className="absolute bottom-0 right-0 w-full h-0.5 bg-[#a46df6] scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></span>
            <span>سلة</span>
          </Link>

          {/* زد - أيقونة قبل النص */}
          <Link
            to="/zid/themes"
            className="flex flex-row-reverse items-center gap-1.5 text-[#150543] hover:text-[#a46df6] transition font-medium group relative"
          >
            <img src="https://asas-tools.com/u/uploads/sara_craffo/zid-logo.png" alt="زد" className="w-5 h-5 object-contain" />
            <span className="absolute bottom-0 right-0 w-full h-0.5 bg-[#a46df6] scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></span>
            <span>زد</span>
          </Link>

          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="bg-[#a46df6]/10 text-[#150543] px-4 py-1.5 rounded-full hover:bg-[#a46df6] hover:text-white transition-all text-sm"
            >
             لوحة التحكم  🔧 
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}