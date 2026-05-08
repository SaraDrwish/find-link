import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockCategories, mockLinks } from '../data/mockData';

export default function ThemeCard({ theme, platform }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  // جلب الفئات والروابط الخاصة بهذا الثيم
  const themeCategories = mockCategories.filter(c => c.themeId === theme.id);
  const directLinks = mockLinks.filter(l => l.themeId === theme.id && !l.categoryId);
  
  // تجميع كل الروابط (مباشرة + من الفئات) لنسخها دفعة واحدة
  const allLinks = [
    ...directLinks.map(l => ({ title: l.title, url: l.url })),
    ...themeCategories.flatMap(cat => 
      mockLinks.filter(l => l.categoryId === cat.id).map(l => ({ title: l.title, url: l.url, category: cat.name }))
    )
  ];

  const copyAllLinks = async () => {
    const text = allLinks.map(link => `${link.title}: ${link.url}`).join('\n');
    await navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-white rounded-2xl shadow-md overflow-hidden card-hover cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="h-32 bg-gradient-to-r from-[#150543] to-[#a46df6]"></div>
        <div className="p-6 text-center">
          <h3 className="text-2xl font-bold text-[#150543] mb-2">{theme.name}</h3>
          <p className="text-gray-500 mb-4">{theme.nameEn || ''}</p>
          <button className="inline-block w-full text-center bg-[#a46df6] text-white py-2.5 rounded-xl hover:bg-[#150543] transition-colors">
            عرض الروابط ←
          </button>
        </div>
      </motion.div>

      {/* مودال عرض الروابط */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#150543]">{theme.name}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
              </div>

              <div className="p-6 space-y-6">
                {/* زر نسخ الكل */}
                {allLinks.length > 0 && (
                  <div className="flex justify-center">
                    <button
                      onClick={copyAllLinks}
                      className="flex items-center gap-2 bg-[#a46df6]/10 hover:bg-[#a46df6] text-[#150543] hover:text-white px-4 py-2 rounded-full transition text-sm"
                    >
                      {copiedAll ? '✅ تم النسخ!' : '📋 نسخ كل الروابط'}
                    </button>
                  </div>
                )}

                {/* الروابط المباشرة */}
                {directLinks.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-[#150543] mb-3 flex items-center gap-2">🔗 روابط مباشرة</h3>
                    <div className="space-y-2">
                      {directLinks.map(link => <SingleLink key={link.id} link={link} />)}
                    </div>
                  </div>
                )}

                {/* الفئات والروابط داخلها */}
                {themeCategories.map(category => {
                  const categoryLinks = mockLinks.filter(l => l.categoryId === category.id);
                  if (categoryLinks.length === 0) return null;
                  return (
                    <div key={category.id}>
                      <h3 className="text-lg font-bold text-[#150543] mb-3 flex items-center gap-2">📁 {category.name}</h3>
                      <div className="space-y-2 pr-4">
                        {categoryLinks.map(link => <SingleLink key={link.id} link={link} />)}
                      </div>
                    </div>
                  );
                })}

                {allLinks.length === 0 && (
                  <p className="text-gray-400 text-center py-8">لا توجد روابط لهذا الثيم حالياً</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// مكون الرابط الواحد مع زر نسخ
function SingleLink({ link }) {
  const [copied, setCopied] = useState(false);
  
  const copyLink = async () => {
    await navigator.clipboard.writeText(link.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center justify-between gap-2 p-3 bg-gray-50 rounded-xl hover:bg-[#a46df6]/5 transition group">
      <div className="flex-1 text-right">
        <div className="font-medium text-[#150543]">{link.title}</div>
        <div className="text-sm text-gray-400 truncate">{link.url}</div>
      </div>
      <button
        onClick={copyLink}
        className="text-gray-400 hover:text-[#a46df6] transition text-sm px-2 py-1 rounded"
        title="نسخ الرابط"
      >
        {copied ? '✅' : '📋'}
      </button>
    </div>
  );
}