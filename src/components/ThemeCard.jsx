import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ThemeCard({ theme, platform }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="h-32 bg-gradient-to-r from-[#0F172A] to-[#F59E0B] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/20 rounded-full animate-pulse"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{theme.name}</h3>
        <p className="text-gray-500 mb-4">{theme.nameEn}</p>
        
        <Link 
          to={`/theme/${platform}/${theme.id}`}
          className="inline-block w-full text-center bg-[#F59E0B] text-white py-2 rounded-lg hover:bg-[#D97706] transition btn-glow"
        >
          عرض التفاصيل ←
        </Link>
      </div>
    </motion.div>
  )
}