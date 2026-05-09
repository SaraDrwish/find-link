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
  const [copied, setCopied] = useState(null);

  const copy = (text, id) => { navigator.clipboard.writeText(text); setCopied(id); setTimeout(() => setCopied(null), 1500); };
  const copyAll = (linksArray, name) => {
    const text = linksArray.map(l => `${l.title}: ${l.url}`).join('\n');
    navigator.clipboard.writeText(text);
    alert(`✅ تم نسخ روابط ${name}`);
  };

  if (!theme) return <div className="text-center py-20">لم يتم العثور على الثيم</div>;

  const uncategorized = themeLinks.filter(l => !l.categoryId);
  const categorized = themeLinks.filter(l => l.categoryId);

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-[#150543] mb-3">{theme.name}</h1>
          <div className="flex justify-center gap-4 mt-2">
            {theme.buyLink && (
              <a href={theme.buyLink} target="_blank" rel="noopener noreferrer" 
                 className="inline-flex items-center gap-2 bg-[#a46df6] text-white px-5 py-2 rounded-full hover:bg-[#150543] transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M6 21h.01M18 21h.01" /></svg>
                شراء الثيم
              </a>
            )}
            {theme.demoLink && (
              <a href={theme.demoLink} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 bg-gray-200 text-[#150543] px-5 py-2 rounded-full hover:bg-[#a46df6] hover:text-white transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                معاينة الثيم
              </a>
            )}
            {themeLinks.length > 0 && (
              <button onClick={() => copyAll(themeLinks, 'كل الروابط')} className="bg-[#a46df6]/20 text-[#150543] px-5 py-2 rounded-full">
                📋 نسخ كل الروابط
              </button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* العمود الأيمن: روابط مصنفة */}
          <div>
            <h2 className="text-2xl font-bold text-[#150543] mb-4 border-b-2 border-[#a46df6] pb-2">📂 روابط مصنفة</h2>
            {categories.map(cat => {
              const catLinks = getLinksForCategory(cat.id);
              if (catLinks.length === 0) return null;
              return (
                <div key={cat.id} className="mb-6 bg-[#F8F6F4] rounded-xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <button onClick={() => copyAll(catLinks, cat.name)} className="text-sm text-[#a46df6]">📋 نسخ الكل</button>
                    <h3 className="text-xl font-bold text-[#150543]">{cat.name}</h3>
                  </div>
                  <div className="space-y-2">
                    {catLinks.map(link => (
                      <div key={link.id} className="bg-white rounded-lg p-3 flex justify-between items-center">
                        <button onClick={() => copy(link.url, link.id)} className="text-gray-400 hover:text-[#a46df6]">{copied === link.id ? '✅' : '📋'}</button>
                        <div className="flex-1 text-right">
                          <div className="font-semibold">{link.title}</div>
                          <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500">{link.url}</a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* العمود الأيسر: روابط مباشرة */}
          <div>
            <h2 className="text-2xl font-bold text-[#150543] mb-4 border-b-2 border-[#a46df6] pb-2">🔗 روابط مباشرة</h2>
            {uncategorized.length > 0 ? (
              <div className="space-y-3">
                {uncategorized.map(link => (
                  <div key={link.id} className="bg-[#F8F6F4] rounded-xl p-4 flex justify-between items-center">
                    <button onClick={() => copy(link.url, link.id)} className="text-gray-400 hover:text-[#a46df6]">{copied === link.id ? '✅' : '📋'}</button>
                    <div className="flex-1 text-right">
                      <div className="font-semibold">{link.title}</div>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500">{link.url}</a>
                    </div>
                  </div>
                ))}
                <button onClick={() => copyAll(uncategorized, 'الروابط المباشرة')} className="mt-2 text-sm text-[#a46df6]">📋 نسخ الكل</button>
              </div>
            ) : (
              <p className="text-gray-400">لا توجد روابط مباشرة</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}