import { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPanel() {
  const {
    themes, categories, links,
    addTheme, updateTheme, deleteTheme,
    addCategory, updateCategory, deleteCategory,
    addLink, updateLink, deleteLink,
  } = useAdmin();

  // حالات التعديل والإضافة
  const [editingTheme, setEditingTheme] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingLink, setEditingLink] = useState(null);
  const [showThemeForm, setShowThemeForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // نماذج الإضافة
  const [newTheme, setNewTheme] = useState({ name: '', platform: 'salla', buyLink: '', demoLink: '' });
  const [newCategory, setNewCategory] = useState({ name: '', themeId: '' });
  const [newLink, setNewLink] = useState({ title: '', url: '', themeId: '', categoryId: '' });

  // رابط سريع (يظهر عند الضغط على الزر بجوار الفئة)
  const [quickLinkCategory, setQuickLinkCategory] = useState(null);
  const [quickLinkTitle, setQuickLinkTitle] = useState('');
  const [quickLinkUrl, setQuickLinkUrl] = useState('');

  // ----- دوال الإضافة والتعديل والحذف -----
  const handleAddTheme = () => {
    if (!newTheme.name) return setErrorMsg('أدخل اسم الثيم');
    try {
      addTheme({ ...newTheme, createdAt: new Date().toISOString().split('T')[0] });
      setNewTheme({ name: '', platform: 'salla', buyLink: '', demoLink: '' });
      setShowThemeForm(false);
      setErrorMsg('');
    } catch (err) { setErrorMsg(err.message); }
  };

  const handleUpdateTheme = () => {
    if (!editingTheme.name) return setErrorMsg('اسم الثيم مطلوب');
    try {
      updateTheme(editingTheme.id, {
        name: editingTheme.name,
        platform: editingTheme.platform,
        buyLink: editingTheme.buyLink || '',
        demoLink: editingTheme.demoLink || '',
      });
      setEditingTheme(null);
      setErrorMsg('');
    } catch (err) { setErrorMsg(err.message); }
  };

  const handleAddCategory = () => {
    if (!newCategory.name) return setErrorMsg('أدخل اسم الفئة');
    if (!newCategory.themeId) return setErrorMsg('اختر الثيم (أو "للجميع")');
    try {
      addCategory({ ...newCategory, createdAt: new Date().toISOString().split('T')[0] });
      setNewCategory({ name: '', themeId: '' });
      setShowCategoryForm(false);
      setErrorMsg('');
    } catch (err) { setErrorMsg(err.message); }
  };

  const handleUpdateCategory = () => {
    if (!editingCategory.name) return setErrorMsg('اسم الفئة مطلوب');
    try {
      updateCategory(editingCategory.id, {
        name: editingCategory.name,
        themeId: editingCategory.themeId,
      });
      setEditingCategory(null);
      setErrorMsg('');
    } catch (err) { setErrorMsg(err.message); }
  };

  const handleAddLink = () => {
    if (!newLink.title) return setErrorMsg('أدخل عنوان المتجر');
    if (!newLink.url) return setErrorMsg('أدخل رابط المتجر');
    if (!newLink.themeId) return setErrorMsg('اختر الثيم');
    addLink({
      ...newLink,
      createdAt: new Date().toISOString().split('T')[0],
      categoryId: newLink.categoryId || null,
    });
    setNewLink({ title: '', url: '', themeId: '', categoryId: '' });
    setShowLinkForm(false);
    setErrorMsg('');
  };

  const handleUpdateLink = () => {
    if (!editingLink.title) return setErrorMsg('عنوان المتجر مطلوب');
    updateLink(editingLink.id, {
      title: editingLink.title,
      url: editingLink.url,
      themeId: editingLink.themeId,
      categoryId: editingLink.categoryId || null,
    });
    setEditingLink(null);
  };

  const handleQuickAddLink = () => {
    if (!quickLinkTitle) return alert('أدخل اسم المتجر');
    if (!quickLinkUrl) return alert('أدخل الرابط');
    addLink({
      title: quickLinkTitle,
      url: quickLinkUrl,
      themeId: quickLinkCategory.themeId,
      categoryId: quickLinkCategory.id,
      createdAt: new Date().toISOString().split('T')[0],
    });
    setQuickLinkCategory(null);
    setQuickLinkTitle('');
    setQuickLinkUrl('');
  };

  // فصل الثيمات حسب المنصة
  const sallaThemes = themes.filter(t => t.platform === 'salla');
  const zidThemes = themes.filter(t => t.platform === 'zid');

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">

        <h1 className="text-4xl font-bold text-center text-[#150543] mb-8">🔧 لوحة تحكم ثيمات كرافو</h1>
         <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center gap-1 text-[#150543] hover:text-[#a46df6] transition mb-4"
        >
          <span>←</span> رجوع
        </button>
        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-center mb-6">
            {errorMsg}
          </div>
        )}

        {/* أزرار الإضافة السريعة */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setShowThemeForm(!showThemeForm)}
            className="bg-[#a46df6] text-white px-6 py-2 rounded-xl hover:bg-[#150543] transition"
          >
            + إضافة ثيم
          </button>
          <button
            onClick={() => setShowCategoryForm(!showCategoryForm)}
            className="bg-[#9b92b3] text-white px-6 py-2 rounded-xl hover:bg-[#150543] transition"
          >
            + إضافة فئة
          </button>
          <button
            onClick={() => setShowLinkForm(!showLinkForm)}
            className="bg-[#150543] text-white px-6 py-2 rounded-xl hover:bg-[#a46df6] transition"
          >
            + إضافة رابط
          </button>
        </div>

        {/* النماذج المنبثقة للإضافة */}
        <AnimatePresence>
          {showThemeForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-gray-50 p-6 rounded-2xl mb-8 shadow"
            >
              <h3 className="text-xl font-bold mb-4">➕ إضافة ثيم جديد</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="اسم الثيم *"
                  value={newTheme.name}
                  onChange={(e) => setNewTheme({ ...newTheme, name: e.target.value })}
                  className="p-2 border rounded-xl"
                />
                <select
                  value={newTheme.platform}
                  onChange={(e) => setNewTheme({ ...newTheme, platform: e.target.value })}
                  className="p-2 border rounded-xl"
                >
                  <option value="salla">🛍️ منصة سلة</option>
                  <option value="zid">⚡ منصة زد</option>
                </select>
                <input
                  type="url"
                  placeholder="رابط شراء الثيم (اختياري)"
                  value={newTheme.buyLink}
                  onChange={(e) => setNewTheme({ ...newTheme, buyLink: e.target.value })}
                  className="p-2 border rounded-xl"
                />
                <input
                  type="url"
                  placeholder="رابط معاينة الثيم (اختياري)"
                  value={newTheme.demoLink}
                  onChange={(e) => setNewTheme({ ...newTheme, demoLink: e.target.value })}
                  className="p-2 border rounded-xl"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={handleAddTheme} className="bg-[#a46df6] text-white px-6 py-2 rounded-xl">حفظ</button>
                <button onClick={() => setShowThemeForm(false)} className="bg-gray-300 px-6 py-2 rounded-xl">إلغاء</button>
              </div>
            </motion.div>
          )}

          {showCategoryForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-gray-50 p-6 rounded-2xl mb-8 shadow"
            >
              <h3 className="text-xl font-bold mb-4">📂 إضافة فئة جديدة</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="اسم الفئة *"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="p-2 border rounded-xl"
                />
                <select
                  value={newCategory.themeId}
                  onChange={(e) => setNewCategory({ ...newCategory, themeId: e.target.value })}
                  className="p-2 border rounded-xl"
                >
                  <option value="">اختر الثيم *</option>
                  <option value="all">📌 لجميع الثيمات (سلة وزك)</option>
                  {themes.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.platform === 'salla' ? 'سلة' : 'زد'})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={handleAddCategory} className="bg-[#a46df6] text-white px-6 py-2 rounded-xl">حفظ</button>
                <button onClick={() => setShowCategoryForm(false)} className="bg-gray-300 px-6 py-2 rounded-xl">إلغاء</button>
              </div>
            </motion.div>
          )}

          {showLinkForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-gray-50 p-6 rounded-2xl mb-8 shadow"
            >
              <h3 className="text-xl font-bold mb-4">🔗 إضافة رابط متجر جديد</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="اسم المتجر *"
                  value={newLink.title}
                  onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                  className="p-2 border rounded-xl"
                />
                <input
                  type="url"
                  placeholder="رابط المتجر *"
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  className="p-2 border rounded-xl"
                />
                <select
                  value={newLink.themeId}
                  onChange={(e) => setNewLink({ ...newLink, themeId: e.target.value, categoryId: '' })}
                  className="p-2 border rounded-xl"
                >
                  <option value="">اختر الثيم *</option>
                  {themes.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.platform === 'salla' ? 'سلة' : 'زد'})
                    </option>
                  ))}
                </select>
                <select
                  value={newLink.categoryId}
                  onChange={(e) => setNewLink({ ...newLink, categoryId: e.target.value })}
                  className="p-2 border rounded-xl"
                >
                  <option value="">اختر الفئة (اختياري)</option>
                  {categories
                    .filter((c) => c.themeId === newLink.themeId || c.themeId === 'all')
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={handleAddLink} className="bg-[#a46df6] text-white px-6 py-2 rounded-xl">حفظ الرابط</button>
                <button onClick={() => setShowLinkForm(false)} className="bg-gray-300 px-6 py-2 rounded-xl">إلغاء</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========= جداول الثيمات (سلة وزد منفصلين) ========= */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* جدول سلة */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-[#150543] to-[#a46df6] p-4 text-center">
              <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                🛍️ منصة سلة
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-right">اسم الثيم</th>
                    <th className="p-3 text-center">تاريخ الإضافة</th>
                    <th className="p-3 text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {sallaThemes.map((theme) => (
                    <tr key={theme.id} className="border-b">
                      <td className="p-3">
                        {editingTheme?.id === theme.id ? (
                          <div className="flex flex-col gap-1">
                            <input
                              value={editingTheme.name}
                              onChange={(e) => setEditingTheme({ ...editingTheme, name: e.target.value })}
                              className="p-1 border rounded"
                            />
                            <input
                              value={editingTheme.buyLink || ''}
                              placeholder="رابط الشراء"
                              onChange={(e) => setEditingTheme({ ...editingTheme, buyLink: e.target.value })}
                              className="p-1 border rounded text-sm"
                            />
                            <input
                              value={editingTheme.demoLink || ''}
                              placeholder="رابط المعاينة"
                              onChange={(e) => setEditingTheme({ ...editingTheme, demoLink: e.target.value })}
                              className="p-1 border rounded text-sm"
                            />
                            <select
                              value={editingTheme.platform}
                              onChange={(e) => setEditingTheme({ ...editingTheme, platform: e.target.value })}
                              className="p-1 border rounded text-sm"
                            >
                              <option value="salla">سلة</option>
                              <option value="zid">زد</option>
                            </select>
                          </div>
                        ) : (
                          <>
                            {theme.name}
                            {theme.buyLink && <span className="text-xs text-green-600 mr-2">🛒</span>}
                            {theme.demoLink && <span className="text-xs text-blue-600 mr-1">👁️</span>}
                          </>
                        )}
                      </td>
                      <td className="p-3 text-center text-sm text-gray-500">{theme.createdAt}</td>
                      <td className="p-3 text-center whitespace-nowrap">
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
              {sallaThemes.length === 0 && <div className="p-4 text-center text-gray-400">لا توجد ثيمات</div>}
            </div>
          </div>

          {/* جدول زد */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-[#150543] to-[#a46df6] p-4 text-center">
              <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                ⚡ منصة زد
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-right">اسم الثيم</th>
                    <th className="p-3 text-center">تاريخ الإضافة</th>
                    <th className="p-3 text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {zidThemes.map((theme) => (
                    <tr key={theme.id} className="border-b">
                      <td className="p-3">
                        {editingTheme?.id === theme.id ? (
                          <div className="flex flex-col gap-1">
                            <input
                              value={editingTheme.name}
                              onChange={(e) => setEditingTheme({ ...editingTheme, name: e.target.value })}
                              className="p-1 border rounded"
                            />
                            <input
                              value={editingTheme.buyLink || ''}
                              placeholder="رابط الشراء"
                              onChange={(e) => setEditingTheme({ ...editingTheme, buyLink: e.target.value })}
                              className="p-1 border rounded text-sm"
                            />
                            <input
                              value={editingTheme.demoLink || ''}
                              placeholder="رابط المعاينة"
                              onChange={(e) => setEditingTheme({ ...editingTheme, demoLink: e.target.value })}
                              className="p-1 border rounded text-sm"
                            />
                            <select
                              value={editingTheme.platform}
                              onChange={(e) => setEditingTheme({ ...editingTheme, platform: e.target.value })}
                              className="p-1 border rounded text-sm"
                            >
                              <option value="salla">سلة</option>
                              <option value="zid">زد</option>
                            </select>
                          </div>
                        ) : (
                          <>
                            {theme.name}
                            {theme.buyLink && <span className="text-xs text-green-600 mr-2">🛒</span>}
                            {theme.demoLink && <span className="text-xs text-blue-600 mr-1">👁️</span>}
                          </>
                        )}
                      </td>
                      <td className="p-3 text-center text-sm text-gray-500">{theme.createdAt}</td>
                      <td className="p-3 text-center whitespace-nowrap">
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
              {zidThemes.length === 0 && <div className="p-4 text-center text-gray-400">لا توجد ثيمات</div>}
            </div>
          </div>
        </div>

        {/* ========= جدول الفئات ========= */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-[#9b92b3] p-4 text-center">
            <h2 className="text-xl font-bold text-white">📂 كل الفئات</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-right">اسم الفئة</th>
                  <th className="p-3 text-right">التابع لثيم</th>
                  <th className="p-3 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => {
                  const themeName =
                    cat.themeId === 'all'
                      ? '📌 لجميع الثيمات'
                      : themes.find((t) => t.id === cat.themeId)?.name || 'غير معروف';
                  return (
                    <tr key={cat.id} className="border-b">
                      <td className="p-3">
                        {editingCategory?.id === cat.id ? (
                          <input
                            value={editingCategory.name}
                            onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                            className="p-1 border rounded w-full"
                          />
                        ) : (
                          cat.name
                        )}
                      </td>
                      <td className="p-3">
                        {editingCategory?.id === cat.id ? (
                          <select
                            value={editingCategory.themeId}
                            onChange={(e) => setEditingCategory({ ...editingCategory, themeId: e.target.value })}
                            className="p-1 border rounded"
                          >
                            <option value="all">لجميع الثيمات</option>
                            {themes.map((t) => (
                              <option key={t.id} value={t.id}>
                                {t.name} ({t.platform === 'salla' ? 'سلة' : 'زد'})
                              </option>
                            ))}
                          </select>
                        ) : (
                          themeName
                        )}
                      </td>
                      <td className="p-3 text-center whitespace-nowrap">
                        {editingCategory?.id === cat.id ? (
                          <>
                            <button onClick={handleUpdateCategory} className="text-green-600 ml-2">💾 حفظ</button>
                            <button onClick={() => setEditingCategory(null)} className="text-gray-500">✖</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => setEditingCategory({ ...cat })} className="text-blue-600 ml-2">✏️</button>
                            <button onClick={() => deleteCategory(cat.id)} className="text-red-600 ml-2">🗑️</button>
                            <button
                              onClick={() => setQuickLinkCategory(cat)}
                              className="bg-[#a46df6]/20 text-[#150543] px-2 py-1 rounded text-sm"
                            >
                              + رابط سريع
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========= جدول الروابط ========= */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-[#150543] p-4 text-center">
            <h2 className="text-xl font-bold text-white">🔗 جميع الروابط</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-right">اسم المتجر</th>
                  <th className="p-3 text-right">الرابط</th>
                  <th className="p-3 text-right">الثيم</th>
                  <th className="p-3 text-right">الفئة</th>
                  <th className="p-3 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {links.map((link) => (
                  <tr key={link.id} className="border-b">
                    <td className="p-3">
                      {editingLink?.id === link.id ? (
                        <input
                          value={editingLink.title}
                          onChange={(e) => setEditingLink({ ...editingLink, title: e.target.value })}
                          className="p-1 border rounded w-full"
                        />
                      ) : (
                        link.title
                      )}
                    </td>
                    <td className="p-3">
                      {editingLink?.id === link.id ? (
                        <input
                          value={editingLink.url}
                          onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                          className="p-1 border rounded w-full"
                        />
                      ) : (
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[#a46df6] hover:underline">
                          {link.url}
                        </a>
                      )}
                    </td>
                    <td className="p-3">
                      {editingLink?.id === link.id ? (
                        <select
                          value={editingLink.themeId}
                          onChange={(e) => setEditingLink({ ...editingLink, themeId: e.target.value, categoryId: '' })}
                          className="p-1 border rounded"
                        >
                          {themes.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        themes.find((t) => t.id === link.themeId)?.name || 'غير معروف'
                      )}
                    </td>
                    <td className="p-3">
                      {editingLink?.id === link.id ? (
                        <select
                          value={editingLink.categoryId || ''}
                          onChange={(e) => setEditingLink({ ...editingLink, categoryId: e.target.value || null })}
                          className="p-1 border rounded"
                        >
                          <option value="">بدون فئة</option>
                          {categories
                            .filter((c) => c.themeId === editingLink.themeId || c.themeId === 'all')
                            .map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                        </select>
                      ) : (
                        categories.find((c) => c.id === link.categoryId)?.name || 'بدون فئة'
                      )}
                    </td>
                    <td className="p-3 text-center whitespace-nowrap">
                      {editingLink?.id === link.id ? (
                        <>
                          <button onClick={handleUpdateLink} className="text-green-600 ml-2">💾 حفظ</button>
                          <button onClick={() => setEditingLink(null)} className="text-gray-500">✖</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => setEditingLink({ ...link, categoryId: link.categoryId || '' })} className="text-blue-600 ml-2">✏️</button>
                          <button onClick={() => deleteLink(link.id)} className="text-red-600">🗑️</button>
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

      {/* مودال الإضافة السريعة للرابط تحت فئة */}
      {quickLinkCategory && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setQuickLinkCategory(null)}>
          <div className="bg-white p-6 rounded-2xl w-96 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">➕ إضافة رابط سريع لـ "{quickLinkCategory.name}"</h3>
            <input
              type="text"
              placeholder="اسم المتجر *"
              value={quickLinkTitle}
              onChange={(e) => setQuickLinkTitle(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="url"
              placeholder="رابط المتجر *"
              value={quickLinkUrl}
              onChange={(e) => setQuickLinkUrl(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex gap-3">
              <button onClick={handleQuickAddLink} className="bg-[#a46df6] text-white px-4 py-2 rounded-lg flex-1">حفظ</button>
              <button onClick={() => setQuickLinkCategory(null)} className="bg-gray-300 px-4 py-2 rounded-lg flex-1">إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}