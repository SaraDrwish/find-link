import { useParams } from 'react-router-dom';
import { mockThemes, mockCategories, mockLinks } from '../data/mockData';
import { motion } from 'framer-motion';

export default function ThemeDetails() {
  const { themeId } = useParams();
  const theme = mockThemes.find(t => t.id === themeId);
  const themeCategories = mockCategories.filter(c => c.themeId === themeId);
  const directLinks = mockLinks.filter(l => l.themeId === themeId && !l.categoryId);

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#150543] mb-3">{theme?.name}</h1>
          <p className="text-lg text-gray-500">تصفح الفئات والروابط المتاحة</p>
        </motion.div>

        {directLinks.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#150543] mb-4 flex items-center justify-center gap-2">🔗 روابط مباشرة</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {directLinks.map(link => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-gray-50 rounded-xl hover:bg-[#a46df6]/10 transition border border-gray-200 text-right"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[#a46df6] text-sm">← اضغط</span>
                    <span className="font-semibold text-[#150543]">{link.title}</span>
                  </div>
                  <span className="text-sm text-gray-400 block text-left">{link.url}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {themeCategories.map(category => {
          const categoryLinks = mockLinks.filter(l => l.categoryId === category.id);
          return (
            <motion.div
              key={category.id}
              className="mb-10 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-[#150543] to-[#a46df6] p-4 text-center">
                <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">📁 {category.name}</h2>
              </div>
              <div className="p-6 space-y-3">
                {categoryLinks.length > 0 ? (
                  categoryLinks.map(link => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-gray-50 rounded-xl hover:bg-[#a46df6]/10 transition group text-right"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[#a46df6] text-sm opacity-0 group-hover:opacity-100 transition">← اضغط</span>
                        <span className="font-semibold text-[#150543] group-hover:text-[#a46df6]">{link.title}</span>
                      </div>
                      <span className="text-sm text-gray-400 block text-left">{link.url}</span>
                    </a>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-4">لا توجد روابط في هذه الفئة حتى الآن</p>
                )}
              </div>
            </motion.div>
          );
        })}

        {themeCategories.length === 0 && directLinks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">لا توجد فئات أو روابط متاحة حتى الآن</p>
            <p className="text-gray-400">يمكنك إضافتها من لوحة التحكم</p>
          </div>
        )}
      </div>
    </div>
  );
}