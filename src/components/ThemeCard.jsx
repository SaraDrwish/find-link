import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ThemeCard({ theme, platform }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-sm bg-white rounded-2xl shadow-md overflow-hidden card-hover"
    >
      <div className="h-32 bg-gradient-to-r from-[#150543] to-[#a46df6]"></div>
      <div className="p-6 text-center">
        <h3 className="text-2xl font-bold text-[#150543] mb-2">{theme.name}</h3>
        <p className="text-gray-500 mb-4">{theme.nameEn || ''}</p>
        <Link
          to={`/theme/${platform}/${theme.id}`}
          className="inline-block w-full text-center bg-[#a46df6] text-white py-2.5 rounded-xl hover:bg-[#150543] transition-colors"
        >
          عرض التفاصيل ←
        </Link>
      </div>
    </motion.div>
  );
}