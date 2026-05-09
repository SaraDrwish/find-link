import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import ThemeCard from '../components/ThemeCard';
import { motion } from 'framer-motion';

export default function SallaThemes() {
  const navigate = useNavigate();
  const { themes } = useAdmin();
  const sallaThemes = themes.filter(t => t.platform === 'salla');

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-1 text-[#150543] hover:text-[#a46df6] transition"
        >
          <span>←</span> رجوع
        </button>
        <motion.div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#150543] mb-4">ثيمات منصة سلة</h1>
          <p className="text-gray-500">اختر ثيماً لترى جميع الروابط المرتبطة به</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {sallaThemes.map(theme => <ThemeCard key={theme.id} theme={theme} />)}
        </div>
      </div>
    </div>
  );
}