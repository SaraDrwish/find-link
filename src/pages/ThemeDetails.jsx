import { useParams } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ThemeDetails() {
  const { themeId } = useParams();
  const { themes, getCategoriesForTheme, getLinksForTheme, getLinksForCategory } = useAdmin();
  const theme = themes.find(t => t.id === themeId);
  const categories = getCategoriesForTheme(themeId);
  const themeLinks = getLinksForTheme(themeId);
  const [copiedText, setCopiedText] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 1500);
  };

  const copyAllThemeLinks = () => {
    const text = themeLinks.map(l => `${l.title}: ${l.url}`).join('\n');
    navigator.clipboard.writeText(text);
    alert('✅ تم نسخ جميع روابط الثيم');
  };

  const copyCategoryLinks = (categoryId, categoryName) => {
    const catLinks = getLinksForCategory(categoryId);
    const text = catLinks.map(l => `${l.title}: ${l.url}`).join('\n');
    navigator.clipboard.writeText(text);
    alert(`✅ تم نسخ روابط قسم: ${categoryName}`);
  };

  if (!theme) return <div className="text-center py-20">لم يتم العثور على الثيم</div>;

  // تجميع الروابط التي ليس لها فئة
  const uncategorizedLinks = themeLinks.filter(l => !l.categoryId);

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#150543] mb-3">{theme.name}</h1>
          <p className="text-gray-500 text-lg">كل الفئات والروابط المرتبطة بهذا الثيم</p>
          {themeLinks.length > 0 && (
            <button onClick={copyAllThemeLinks} className="mt-4 bg-[#a46df6]/20 text-[#150543] px-6 py-2 rounded-full text-sm hover:bg-[#a46df6] hover:text-white transition">
              📋 نسخ كل روابط الثيم
            </button>
          )}
        </motion.div>

        {/* الروابط بدون فئة */}
        {uncategorizedLinks.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-[#150543] mb-4 flex items-center gap-2">🔗 روابط سريعة (بدون فئة)</h2>
            <div className="space-y-3">
              {uncategorizedLinks.map(link => (
                <div key={link.id} className="bg-gray-50 rounded-xl p-4 flex justify-between items-center hover:shadow-md transition">
                  <button onClick={() => copyToClipboard(link.url, link.id)} className="text-gray-400 hover:text-[#a46df6] transition">
                    {copiedText === link.id ? '✅' : '📋'}
                  </button>
                  <div className="flex-1 text-right">
                    <div className="font-semibold text-[#150543]">{link.title}</div>
                    <a href={link.url} target="_blank" className="text-sm text-gray-500 hover:text-[#a46df6]">{link.url}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* الفئات والروابط داخلها */}
        {categories.map(category => {
          const categoryLinks = getLinksForCategory(category.id);
          if (categoryLinks.length === 0) return null;
          return (
            <motion.div key={category.id} className="mb-10 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#150543] to-[#a46df6] p-4 flex justify-between items-center">
                <button onClick={() => copyCategoryLinks(category.id, category.name)} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm hover:bg-white/30 transition">
                  📋 نسخ روابط القسم
                </button>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">📁 {category.name}</h2>
              </div>
              <div className="p-5 space-y-3">
                {categoryLinks.map(link => (
                  <div key={link.id} className="bg-gray-50 rounded-xl p-4 flex justify-between items-center hover:shadow-md transition">
                    <button onClick={() => copyToClipboard(link.url, link.id)} className="text-gray-400 hover:text-[#a46df6] transition">
                      {copiedText === link.id ? '✅' : '📋'}
                    </button>
                    <div className="flex-1 text-right">
                      <div className="font-semibold text-[#150543]">{link.title}</div>
                      <a href={link.url} target="_blank" className="text-sm text-gray-500 hover:text-[#a46df6]">{link.url}</a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}

        {themeLinks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">لا توجد روابط مرتبطة بهذا الثيم حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
}