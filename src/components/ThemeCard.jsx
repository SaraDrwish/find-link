import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../contexts/AdminContext';

export default function ThemeCard({ theme }) {
  const { categories, links } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [copiedLinkId, setCopiedLinkId] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);

  // جلب جميع الفئات الخاصة بهذا الثيم
  const themeCategories = categories.filter(c => c.themeId === theme.id);
  // الروابط المباشرة (بدون فئة)
  const directLinks = links.filter(l => l.themeId === theme.id && !l.categoryId);
  // جميع روابط الثيم (من الفئات + المباشرة)
  const allLinks = [
    ...directLinks.map(l => ({ id: l.id, title: l.title, url: l.url, category: 'مباشر' })),
    ...themeCategories.flatMap(cat =>
      links.filter(l => l.categoryId === cat.id).map(l => ({ id: l.id, title: l.title, url: l.url, category: cat.name }))
    )
  ];

  // نسخ رابط واحد
  const copySingleLink = async (id, url) => {
    await navigator.clipboard.writeText(url);
    setCopiedLinkId(id);
    setTimeout(() => setCopiedLinkId(null), 1500);
  };

  // نسخ جميع روابط الثيم دفعة واحدة
  const copyAllLinks = async () => {
    const text = allLinks.map(link => `${link.title} [${link.category}]: ${link.url}`).join('\n');
    await navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  // روابط الفئة المختارة (إذا تم اختيار فئة)
  const selectedCategoryLinks = selectedCategory
    ? links.filter(l => l.categoryId === selectedCategory.id)
    : [];

  return (
    <>
      {/* بطاقة الثيم */}
      <motion.div
        whileHover={{ y: -5 }}
        className="w-full max-w-sm bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
      >
        <div className="h-32 bg-gradient-to-r from-[#150543] to-[#a46df6]"></div>
        <div className="p-6 text-center">
          <h3 className="text-2xl font-bold text-[#150543] mb-4">{theme.name}</h3>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-[#a46df6] text-white py-2.5 rounded-xl hover:bg-[#150543] transition"
            >
              عرض التفاصيل ←
            </button>
            <button
              onClick={copyAllLinks}
              className="w-full bg-gray-100 text-[#150543] py-2.5 rounded-xl hover:bg-[#a46df6]/20 transition flex items-center justify-center gap-1"
            >
              {copiedAll ? '✅ تم نسخ الكل' : '📋 نسخ جميع الروابط'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* مودال اختيار الفئة أو عرض الروابط */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => { setIsModalOpen(false); setSelectedCategory(null); }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* الرأس */}
              <div className="flex justify-between items-center mb-4 border-b pb-3">
                <h2 className="text-2xl font-bold text-[#150543]">
                  {selectedCategory ? selectedCategory.name : theme.name}
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedCategory(null);
                  }}
                  className="text-2xl text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* إذا لم يتم اختيار فئة: عرض قائمة الفئات */}
              {!selectedCategory && (
                <div className="space-y-3">
                  {themeCategories.length === 0 && directLinks.length === 0 && (
                    <p className="text-gray-400 text-center py-8">لا توجد فئات أو روابط لهذا الثيم.</p>
                  )}
                  {themeCategories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat)}
                      className="w-full text-right p-4 bg-gray-50 rounded-xl hover:bg-[#a46df6]/10 transition flex justify-between items-center"
                    >
                      <span className="text-[#a46df6]">←</span>
                      <span className="font-medium text-[#150543]">📁 {cat.name}</span>
                    </button>
                  ))}
                  {directLinks.length > 0 && (
                    <button
                      onClick={() => setSelectedCategory({ id: 'direct', name: 'روابط مباشرة' })}
                      className="w-full text-right p-4 bg-gray-50 rounded-xl hover:bg-[#a46df6]/10 transition flex justify-between items-center"
                    >
                      <span className="text-[#a46df6]">←</span>
                      <span className="font-medium text-[#150543]">🔗 روابط مباشرة (بدون تصنيف)</span>
                    </button>
                  )}
                </div>
              )}

              {/* إذا تم اختيار فئة: عرض روابطها مع زر نسخ لكل رابط */}
              {selectedCategory && (
                <div>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="mb-4 text-[#a46df6] hover:underline flex items-center gap-1"
                  >
                    → العودة إلى الفئات
                  </button>
                  <div className="space-y-3 mt-2">
                    {selectedCategoryLinks.length === 0 && selectedCategory.id !== 'direct' && (
                      <p className="text-gray-400 text-center py-8">لا توجد روابط في هذه الفئة.</p>
                    )}
                    {selectedCategory.id === 'direct' && directLinks.length === 0 && (
                      <p className="text-gray-400 text-center py-8">لا توجد روابط مباشرة.</p>
                    )}
                    {selectedCategory.id === 'direct'
                      ? directLinks.map(link => (
                          <div key={link.id} className="flex justify-between items-center p-3 border-b">
                            <button
                              onClick={() => copySingleLink(link.id, link.url)}
                              className="text-gray-400 hover:text-[#a46df6] transition text-lg"
                            >
                              {copiedLinkId === link.id ? '✅' : '📋'}
                            </button>
                            <div className="flex-1 text-right mr-3">
                              <div className="font-medium text-[#150543]">{link.title}</div>
                              <div className="text-sm text-gray-500 truncate">{link.url}</div>
                            </div>
                          </div>
                        ))
                      : selectedCategoryLinks.map(link => (
                          <div key={link.id} className="flex justify-between items-center p-3 border-b">
                            <button
                              onClick={() => copySingleLink(link.id, link.url)}
                              className="text-gray-400 hover:text-[#a46df6] transition text-lg"
                            >
                              {copiedLinkId === link.id ? '✅' : '📋'}
                            </button>
                            <div className="flex-1 text-right mr-3">
                              <div className="font-medium text-[#150543]">{link.title}</div>
                              <div className="text-sm text-gray-500 truncate">{link.url}</div>
                            </div>
                          </div>
                        ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}