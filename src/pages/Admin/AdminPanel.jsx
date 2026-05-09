import { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPanel() {
  const { themes, categories, links, addTheme, updateTheme, deleteTheme, addCategory, updateCategory, deleteCategory, addLink, updateLink, deleteLink } = useAdmin();
  
  // حالات العرض
  const [editingTheme, setEditingTheme] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingLink, setEditingLink] = useState(null);
  const [showThemeForm, setShowThemeForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showLinkForm, setShowLinkForm] = useState(false);

  // نماذج الإضافة
  const [newTheme, setNewTheme] = useState({ name: '', platform: 'salla' });
  const [newCategory, setNewCategory] = useState({ name: '', themeId: '' });
  const [newLink, setNewLink] = useState({ title: '', url: '', themeId: '', categoryId: '' });

  const handleAddTheme = () => {
    if (!newTheme.name) return alert('أدخل اسم الثيم');
    addTheme({ ...newTheme, createdAt: new Date().toISOString().split('T')[0] });
    setNewTheme({ name: '', platform: 'salla' });
    setShowThemeForm(false);
  };

  const handleUpdateTheme = () => {
    if (!editingTheme.name) return;
    updateTheme(editingTheme.id, { name: editingTheme.name, platform: editingTheme.platform });
    setEditingTheme(null);
  };

  const handleAddCategory = () => {
    if (!newCategory.name) return alert('أدخل اسم الفئة');
    if (!newCategory.themeId) return alert('اختر الثيم (أو "للجميع")');
    addCategory({ ...newCategory, createdAt: new Date().toISOString().split('T')[0] });
    setNewCategory({ name: '', themeId: '' });
    setShowCategoryForm(false);
  };

  const handleUpdateCategory = () => {
    if (!editingCategory.name) return;
    updateCategory(editingCategory.id, { name: editingCategory.name, themeId: editingCategory.themeId });
    setEditingCategory(null);
  };

  const handleAddLink = () => {
    if (!newLink.title) return alert('أدخل عنوان المتجر');
    if (!newLink.url) return alert('أدخل رابط المتجر');
    if (!newLink.themeId) return alert('اختر الثيم');
    addLink({ ...newLink, createdAt: new Date().toISOString().split('T')[0], categoryId: newLink.categoryId || null });
    setNewLink({ title: '', url: '', themeId: '', categoryId: '' });
    setShowLinkForm(false);
  };

  const handleUpdateLink = () => {
    if (!editingLink.title) return;
    updateLink(editingLink.id, { title: editingLink.title, url: editingLink.url, themeId: editingLink.themeId, categoryId: editingLink.categoryId || null });
    setEditingLink(null);
  };

  const sallaThemes = themes.filter(t => t.platform === 'salla');
  const zidThemes = themes.filter(t => t.platform === 'zid');

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl font-bold text-center text-[#150543] mb-8">🔧 لوحة تحكم ثيمات كرافو</h1>

        {/* أزرار الإضافة */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button onClick={() => setShowThemeForm(!showThemeForm)} className="bg-[#a46df6] text-white px-6 py-2 rounded-xl hover:bg-[#150543] transition">+ إضافة ثيم جديد</button>
          <button onClick={() => setShowCategoryForm(!showCategoryForm)} className="bg-[#9b92b3] text-white px-6 py-2 rounded-xl hover:bg-[#150543] transition">+ إضافة فئة جديدة</button>
          <button onClick={() => setShowLinkForm(!showLinkForm)} className="bg-[#150543] text-white px-6 py-2 rounded-xl hover:bg-[#a46df6] transition">+ إضافة رابط جديد</button>
        </div>

        {/* نماذج الإضافة */}
        <AnimatePresence>
          {showThemeForm && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-gray-50 p-6 rounded-2xl mb-8">
              <h3 className="text-xl font-bold mb-4">➕ إضافة ثيم</h3>
              <div className="flex gap-4 flex-wrap">
                <input type="text" placeholder="اسم الثيم" value={newTheme.name} onChange={e => setNewTheme({ ...newTheme, name: e.target.value })} className="p-2 border rounded-xl flex-1" />
                <select value={newTheme.platform} onChange={e => setNewTheme({ ...newTheme, platform: e.target.value })} className="p-2 border rounded-xl">
                  <option value="salla">منصة سلة</option>
                  <option value="zid">منصة زد</option>
                </select>
                <button onClick={handleAddTheme} className="bg-[#a46df6] text-white px-6 py-2 rounded-xl">حفظ</button>
                <button onClick={() => setShowThemeForm(false)} className="bg-gray-300 px-6 py-2 rounded-xl">إلغاء</button>
              </div>
            </motion.div>
          )}

          {showCategoryForm && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-gray-50 p-6 rounded-2xl mb-8">
              <h3 className="text-xl font-bold mb-4">📂 إضافة فئة</h3>
              <div className="flex gap-4 flex-wrap">
                <input type="text" placeholder="اسم الفئة" value={newCategory.name} onChange={e => setNewCategory({ ...newCategory, name: e.target.value })} className="p-2 border rounded-xl flex-1" />
                <select value={newCategory.themeId} onChange={e => setNewCategory({ ...newCategory, themeId: e.target.value })} className="p-2 border rounded-xl">
                  <option value="">اختر الثيم</option>
                  <option value="all">📌 لجميع الثيمات (سلة وزك)</option>
                  {themes.map(t => <option key={t.id} value={t.id}>{t.name} ({t.platform === 'salla' ? 'سلة' : 'زد'})</option>)}
                </select>
                <button onClick={handleAddCategory} className="bg-[#a46df6] text-white px-6 py-2 rounded-xl">حفظ</button>
                <button onClick={() => setShowCategoryForm(false)} className="bg-gray-300 px-6 py-2 rounded-xl">إلغاء</button>
              </div>
            </motion.div>
          )}

          {showLinkForm && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-gray-50 p-6 rounded-2xl mb-8">
              <h3 className="text-xl font-bold mb-4">🔗 إضافة رابط متجر</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="اسم المتجر" value={newLink.title} onChange={e => setNewLink({ ...newLink, title: e.target.value })} className="p-2 border rounded-xl" />
                <input type="url" placeholder="رابط المتجر" value={newLink.url} onChange={e => setNewLink({ ...newLink, url: e.target.value })} className="p-2 border rounded-xl" />
                <select value={newLink.themeId} onChange={e => setNewLink({ ...newLink, themeId: e.target.value, categoryId: '' })} className="p-2 border rounded-xl">
                  <option value="">اختر الثيم *</option>
                  {themes.map(t => <option key={t.id} value={t.id}>{t.name} ({t.platform === 'salla' ? 'سلة' : 'زد'})</option>)}
                </select>
                <select value={newLink.categoryId} onChange={e => setNewLink({ ...newLink, categoryId: e.target.value })} className="p-2 border rounded-xl">
                  <option value="">اختر الفئة (اختياري)</option>
                  {categories.filter(c => c.themeId === newLink.themeId || c.themeId === 'all').map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="mt-4 flex gap-3">
                <button onClick={handleAddLink} className="bg-[#a46df6] text-white px-6 py-2 rounded-xl">حفظ الرابط</button>
                <button onClick={() => setShowLinkForm(false)} className="bg-gray-300 px-6 py-2 rounded-xl">إلغاء</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* جدول الثيمات - سلة وزد منفصلين */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* سلة */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-[#150543] to-[#a46df6] p-4 text-center">
              <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">🛍️ منصة سلة</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100"><tr><th className="p-3 text-right">اسم الثيم</th><th>تاريخ الإضافة</th><th>إجراءات</th></tr></thead>
                <tbody>
                  {sallaThemes.map(theme => (
                    <tr key={theme.id} className="border-b">
                      <td className="p-3">
                        {editingTheme?.id === theme.id ? <input value={editingTheme.name} onChange={e => setEditingTheme({ ...editingTheme, name: e.target.value })} className="p-1 border rounded" /> : theme.name}
                      </td>
                      <td className="p-3 text-center text-sm text-gray-500">{theme.createdAt}</td>
                      <td className="p-3 text-center">
                        {editingTheme?.id === theme.id ? (
                          <>
                            <button onClick={handleUpdateTheme} className="text-green-600 ml-2">💾 حفظ</button>
                            <button onClick={() => setEditingTheme(null)} className="text-gray-500">✖</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => setEditingTheme({ ...theme })} className="text-blue-600 ml-2">✏️</button>
                            <button onClick={() => deleteTheme(theme.id)} className="text-red-600">🗑️</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* زد */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-[#150543] to-[#a46df6] p-4 text-center">
              <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">⚡ منصة زد</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100"><tr><th className="p-3 text-right">اسم الثيم</th><th>تاريخ الإضافة</th><th>إجراءات</th></tr></thead>
                <tbody>
                  {zidThemes.map(theme => (
                    <tr key={theme.id} className="border-b">
                      <td className="p-3">
                        {editingTheme?.id === theme.id ? <input value={editingTheme.name} onChange={e => setEditingTheme({ ...editingTheme, name: e.target.value })} className="p-1 border rounded" /> : theme.name}
                      </td>
                      <td className="p-3 text-center text-sm text-gray-500">{theme.createdAt}</td>
                      <td className="p-3 text-center">
                        {editingTheme?.id === theme.id ? (
                          <>
                            <button onClick={handleUpdateTheme} className="text-green-600 ml-2">💾 حفظ</button>
                            <button onClick={() => setEditingTheme(null)} className="text-gray-500">✖</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => setEditingTheme({ ...theme })} className="text-blue-600 ml-2">✏️</button>
                            <button onClick={() => deleteTheme(theme.id)} className="text-red-600">🗑️</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* جدول الفئات */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 mb-8">
          <div className="bg-[#9b92b3] p-4 text-center"><h2 className="text-xl font-bold text-white">📂 كل الفئات</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100"><tr><th className="p-3 text-right">اسم الفئة</th><th>التابع لثيم</th><th>تاريخ الإضافة</th><th>إجراءات</th></tr></thead>
              <tbody>
                {categories.map(cat => (
                  <tr key={cat.id} className="border-b">
                    <td className="p-3">{editingCategory?.id === cat.id ? <input value={editingCategory.name} onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })} className="p-1 border rounded" /> : cat.name}</td>
                    <td className="p-3">{cat.themeId === 'all' ? '📌 لجميع الثيمات' : themes.find(t => t.id === cat.themeId)?.name || 'غير معروف'}</td>
                    <td className="p-3 text-center text-sm text-gray-500">{cat.createdAt}</td>
                    <td className="p-3 text-center">
                      {editingCategory?.id === cat.id ? (
                        <><button onClick={handleUpdateCategory} className="text-green-600 ml-2">💾</button><button onClick={() => setEditingCategory(null)} className="text-gray-500">✖</button></>
                      ) : (
                        <><button onClick={() => setEditingCategory({ ...cat })} className="text-blue-600 ml-2">✏️</button><button onClick={() => deleteCategory(cat.id)} className="text-red-600">🗑️</button></>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* جدول الروابط */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="bg-[#150543] p-4 text-center"><h2 className="text-xl font-bold text-white">🔗 جميع الروابط</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100"><tr><th className="p-3 text-right">اسم المتجر</th><th>الرابط</th><th>الثيم</th><th>الفئة</th><th>إجراءات</th></tr></thead>
              <tbody>
                {links.map(link => (
                  <tr key={link.id} className="border-b">
                    <td className="p-3">{editingLink?.id === link.id ? <input value={editingLink.title} onChange={e => setEditingLink({ ...editingLink, title: e.target.value })} className="p-1 border rounded" /> : link.title}</td>
                    <td className="p-3">{editingLink?.id === link.id ? <input value={editingLink.url} onChange={e => setEditingLink({ ...editingLink, url: e.target.value })} className="p-1 border rounded" /> : <a href={link.url} target="_blank" className="text-[#a46df6]">{link.url}</a>}</td>
                    <td className="p-3">{themes.find(t => t.id === link.themeId)?.name || 'غير معروف'}</td>
                    <td className="p-3">{categories.find(c => c.id === link.categoryId)?.name || 'بدون فئة'}</td>
                    <td className="p-3 text-center">
                      {editingLink?.id === link.id ? (
                        <><button onClick={handleUpdateLink} className="text-green-600 ml-2">💾</button><button onClick={() => setEditingLink(null)} className="text-gray-500">✖</button></>
                      ) : (
                        <><button onClick={() => setEditingLink({ ...link, categoryId: link.categoryId || '' })} className="text-blue-600 ml-2">✏️</button><button onClick={() => deleteLink(link.id)} className="text-red-600">🗑️</button></>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}