import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdmin } from '../contexts/AdminContext';
import { useState } from 'react';

export default function ThemeCard({ theme }) {
  const { getLinksForTheme } = useAdmin();
  const themeLinks = getLinksForTheme(theme.id);
  const [copied, setCopied] = useState(false);

  const copyAllLinks = async (e) => {
    e.preventDefault();
    const text = themeLinks.map(l => `${l.title}: ${l.url}`).join('\n');
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }} 
      className="w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
    >
      <div className="h-40 bg-gradient-to-r from-[#150543] to-[#a46df6] relative">
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <span className="text-white text-5xl animate-float">🎨</span>
        </div>
        {/* الأزرار العلوية السريعة */}
        <div className="absolute top-3 left-3 flex gap-3">
          {theme.buyLink && (
            <a 
              href={theme.buyLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white/95 hover:bg-white text-[#150543] rounded-full p-2 backdrop-blur-sm transition shadow-md"
              title="شراء الثيم"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M6 21h.01M18 21h.01" />
              </svg>
            </a>
          )}
          {theme.demoLink && (
            <a 
              href={theme.demoLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white/95 hover:bg-white text-[#150543] rounded-full p-2 backdrop-blur-sm transition shadow-md"
              title="معاينة الثيم"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </a>
          )}
        </div>
      </div>
      <div className="p-6 text-center">
        <h3 className="text-2xl font-bold text-[#150543] mb-3">{theme.name}</h3>
        <div className="flex gap-3 justify-center mt-4">
          <Link 
            to={`/theme/${theme.id}`} 
            className="flex-1 bg-[#a46df6] text-white py-3 rounded-xl text-md font-medium hover:bg-[#150543] transition"
          >
            عرض التفاصيل ←
          </Link>
          {themeLinks.length > 0 && (
            <button 
              onClick={copyAllLinks} 
              className="bg-gray-100 text-[#150543] px-5 py-3 rounded-xl text-md hover:bg-[#a46df6] hover:text-white transition"
              title="نسخ كل الروابط"
            >
              {copied ? '✅' : '📋'}
            </button>
          )}
        </div>
        <p className="text-sm text-gray-400 mt-3">
          {themeLinks.length} {themeLinks.length === 1 ? 'رابط مرتبط' : 'روابط مرتبطة'}
        </p>
      </div>
    </motion.div>
  );
}