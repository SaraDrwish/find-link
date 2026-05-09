// src/pages/ZidThemes.jsx
import { useAdmin } from '../contexts/AdminContext';
import ThemeCard from '../components/ThemeCard';
import { motion } from 'framer-motion';

export default function ZidThemes() {
  const { themes } = useAdmin();
  const zidThemes = themes.filter(t => t.platform === 'zid');

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#150543] mb-4">
            ثيمات منصة زد
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            اضغط على أي ثيم لاستعراض فروعه وروابطه
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {zidThemes.map(theme => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        </div>

        {zidThemes.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">لا توجد ثيمات لمنصة زد حتى الآن</p>
            <p className="text-gray-400 mt-2">يمكنك إضافتها من لوحة التحكم</p>
          </div>
        )}
      </div>
    </div>
  );
}