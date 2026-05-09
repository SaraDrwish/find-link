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
    <motion.div whileHover={{ y: -5 }} className="w-full max-w-sm bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
      <div className="h-32 bg-gradient-to-r from-[#150543] to-[#a46df6] relative">
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <span className="text-white text-4xl animate-float">🎨</span>
        </div>
      </div>
      <div className="p-6 text-center">
        <h3 className="text-2xl font-bold text-[#150543] mb-3">{theme.name}</h3>
        
        <div className="flex gap-3 justify-center mt-4">
          <Link to={`/theme/${theme.id}`} className="flex-1 bg-[#a46df6] text-white py-2.5 rounded-xl hover:bg-[#150543] transition text-center">
            عرض التفاصيل ←
          </Link>
          
          {themeLinks.length > 0 && (
            <button onClick={copyAllLinks} className="bg-gray-100 text-[#150543] px-4 py-2.5 rounded-xl hover:bg-[#a46df6] hover:text-white transition">
              {copied ? '✅' : '📋'}
            </button>
          )}
        </div>
        
        {themeLinks.length > 0 && (
          <p className="text-xs text-gray-400 mt-3">{themeLinks.length} رابط مرتبط</p>
        )}
      </div>
    </motion.div>
  );
}