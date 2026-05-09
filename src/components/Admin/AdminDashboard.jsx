import { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const { themes, categories, links, addTheme, deleteTheme, addCategory, deleteCategory, addLink, deleteLink } = useAdmin();
  const [newThemeName, setNewThemeName] = useState('');
  const [newThemePlatform, setNewThemePlatform] = useState('salla');
  const [newCatName, setNewCatName] = useState('');
  const [newCatThemeId, setNewCatThemeId] = useState('');
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newLinkType, setNewLinkType] = useState('category'); // 'category' or 'theme'
  const [newLinkCategoryId, setNewLinkCategoryId] = useState('');
  const [newLinkThemeId, setNewLinkThemeId] = useState('');

  const handleAddTheme = (e) => {
    e.preventDefault();
    if (newThemeName.trim()) {
      addTheme(newThemeName.trim(), newThemePlatform);
      setNewThemeName('');
    }
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCatName.trim() && newCatThemeId) {
      addCategory(newCatName.trim(), newCatThemeId);
      setNewCatName('');
      setNewCatThemeId('');
    } else alert('اختر اسم الفئة و الثيم');
  };

  const handleAddLink = (e) => {
    e.preventDefault();
    if (!newLinkTitle.trim() || !newLinkUrl.trim()) return alert('املأ الحقول');
    if (newLinkType === 'category' && newLinkCategoryId) {
      addLink(newLinkTitle.trim(), newLinkUrl.trim(), newLinkCategoryId, null);
      setNewLinkTitle(''); setNewLinkUrl(''); setNewLinkCategoryId('');
    } else if (newLinkType === 'theme' && newLinkThemeId) {
      addLink(newLinkTitle.trim(), newLinkUrl.trim(), null, newLinkThemeId);
      setNewLinkTitle(''); setNewLinkUrl(''); setNewLinkThemeId('');
    } else alert('اختر فئة أو ثيماً للربط');
  };

  // فلترة لعرض السريع
  const sallaThemes = themes.filter(t => t.platform === 'salla');
  const zidThemes = themes.filter(t => t.platform === 'zid');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#150543] mb-6 text-center">لوحة تحكم الأدمن</h1>
      
      {/* إضافة ثيم جديد */}
      <div className="bg-white rounded-2xl shadow p-4 mb-6">
        <h2 className="text-xl font-bold mb-3">➕ إضافة ثيم جديد</h2>
        <form onSubmit={handleAddTheme} className="flex flex-wrap gap-3">
          <input type="text" placeholder="اسم الثيم (عربي)" value={newThemeName} onChange={e => setNewThemeName(e.target.value)} className="border p-2 rounded flex-1 min-w-[150px]" required />
          <select value={newThemePlatform} onChange={e => setNewThemePlatform(e.target.value)} className="border p-2 rounded">
            <option value="salla">سلة</option>
            <option value="zid">زد</option>
          </select>
          <button type="submit" className="bg-[#a46df6] text-white px-4 py-2 rounded">إضافة</button>
        </form>
      </div>
      
      {/* إضافة فئة جديدة */}
      <div className="bg-white rounded-2xl shadow p-4 mb-6">
        <h2 className="text-xl font-bold mb-3">📂 إضافة فئة جديدة</h2>
        <form onSubmit={handleAddCategory} className="flex flex-wrap gap-3">
          <input type="text" placeholder="اسم الفئة" value={newCatName} onChange={e => setNewCatName(e.target.value)} className="border p-2 rounded flex-1" required />
          <select value={newCatThemeId} onChange={e => setNewCatThemeId(e.target.value)} className="border p-2 rounded" required>
            <option value="">اختر الثيم</option>
            {themes.map(t => <option key={t.id} value={t.id}>{t.name} ({t.platform === 'salla' ? 'سلة' : 'زد'})</option>)}
          </select>
          <button type="submit" className="bg-[#a46df6] text-white px-4 py-2 rounded">إضافة فئة</button>
        </form>
      </div>
      
      {/* إضافة رابط جديد */}
      <div className="bg-white rounded-2xl shadow p-4 mb-6">
        <h2 className="text-xl font-bold mb-3">🔗 إضافة رابط متجر</h2>
        <form onSubmit={handleAddLink} className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <input type="text" placeholder="اسم المتجر" value={newLinkTitle} onChange={e => setNewLinkTitle(e.target.value)} className="border p-2 rounded flex-1" required />
            <input type="url" placeholder="الرابط" value={newLinkUrl} onChange={e => setNewLinkUrl(e.target.value)} className="border p-2 rounded flex-1" required />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-1"><input type="radio" name="linkType" value="category" checked={newLinkType === 'category'} onChange={() => setNewLinkType('category')} /> تحت فئة</label>
            <label className="flex items-center gap-1"><input type="radio" name="linkType" value="theme" checked={newLinkType === 'theme'} onChange={() => setNewLinkType('theme')} /> مباشر تحت الثيم</label>
          </div>
          {newLinkType === 'category' && (
            <select value={newLinkCategoryId} onChange={e => setNewLinkCategoryId(e.target.value)} className="border p-2 rounded w-full" required>
              <option value="">اختر الفئة</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          )}
          {newLinkType === 'theme' && (
            <select value={newLinkThemeId} onChange={e => setNewLinkThemeId(e.target.value)} className="border p-2 rounded w-full" required>
              <option value="">اختر الثيم</option>
              {themes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          )}
          <button type="submit" className="bg-[#a46df6] text-white px-4 py-2 rounded">إضافة رابط</button>
        </form>
      </div>
      
      {/* عرض الثيمات (مقسمة سلة / زد) مع إمكانية الحذف */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-bold bg-gray-100 p-2 rounded text-center">🚀 سلة</h3>
          {sallaThemes.map(theme => (
            <div key={theme.id} className="border rounded p-3 my-2 flex justify-between items-center">
              <span className="font-medium">{theme.name}</span>
              <button onClick={() => deleteTheme(theme.id)} className="text-red-500">🗑️ حذف</button>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-bold bg-gray-100 p-2 rounded text-center">⚡ زد</h3>
          {zidThemes.map(theme => (
            <div key={theme.id} className="border rounded p-3 my-2 flex justify-between items-center">
              <span className="font-medium">{theme.name}</span>
              <button onClick={() => deleteTheme(theme.id)} className="text-red-500">🗑️ حذف</button>
            </div>
          ))}
        </div>
      </div>
      
      {/* قائمة بالروابط لإدارة سريعة (اختياري) */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">جميع الروابط المسجلة</h3>
        <div className="space-y-2">
          {links.map(link => (
            <div key={link.id} className="border p-2 rounded flex justify-between items-center">
              <div>
                <span className="font-medium">{link.title}</span> - <span className="text-sm text-gray-500">{link.url}</span>
              </div>
              <button onClick={() => deleteLink(link.id)} className="text-red-500 text-sm">حذف</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}