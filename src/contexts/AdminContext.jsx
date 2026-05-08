import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

// البيانات الأولية (تستخدم فقط إذا كانت localStorage فارغة)
const defaultThemes = [
  { id: '1', name: 'ثيم دارك', nameEn: 'Dark Theme', platform: 'salla', createdAt: '2025-01-15' },
  { id: '2', name: 'ثيم عبايات', nameEn: 'Abayas Theme', platform: 'salla', createdAt: '2025-01-16' },
  { id: '3', name: 'ثيم كيان', nameEn: 'Kayan Theme', platform: 'zid', createdAt: '2025-01-17' },
  { id: '4', name: 'ثيم علا', nameEn: 'Ola Theme', platform: 'zid', createdAt: '2025-01-18' },
];

const defaultCategories = [
  { id: '1', name: 'متاجر الزينة', themeId: '1', createdAt: '2025-01-15' },
  { id: '2', name: 'متاجر العطور', themeId: '1', createdAt: '2025-01-15' },
  { id: '3', name: 'متاجر العبايات', themeId: '2', createdAt: '2025-01-16' },
  { id: '4', name: 'متاجر الإكسسوارات', themeId: '3', createdAt: '2025-01-17' },
];

const defaultLinks = [
  { id: '1', title: 'متجر زينة ليان', url: 'https://example.com/store1', categoryId: '1', themeId: null, createdAt: '2025-01-15' },
  { id: '2', title: 'عطور دينا الفاخرة', url: 'https://example.com/store2', categoryId: '2', themeId: null, createdAt: '2025-01-15' },
  { id: '3', title: 'عبايات الأصيل', url: 'https://example.com/store3', categoryId: '3', themeId: null, createdAt: '2025-01-16' },
  { id: '4', title: 'إكسسوارات نورة', url: 'https://example.com/store4', categoryId: '4', themeId: null, createdAt: '2025-01-17' },
  { id: '5', title: 'متجر سريع بدون فئة', url: 'https://example.com/quick', categoryId: null, themeId: '1', createdAt: '2025-01-18' },
];

// تحميل البيانات من localStorage أو استخدام الافتراضية
const loadData = (key, defaultData) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultData;
};

export function AdminProvider({ children }) {
  const [themes, setThemes] = useState(() => loadData('craffo_themes', defaultThemes));
  const [categories, setCategories] = useState(() => loadData('craffo_categories', defaultCategories));
  const [links, setLinks] = useState(() => loadData('craffo_links', defaultLinks));
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('craffo_admin') === 'true');

  // حفظ أي تغيير في localStorage
  useEffect(() => localStorage.setItem('craffo_themes', JSON.stringify(themes)), [themes]);
  useEffect(() => localStorage.setItem('craffo_categories', JSON.stringify(categories)), [categories]);
  useEffect(() => localStorage.setItem('craffo_links', JSON.stringify(links)), [links]);
  useEffect(() => localStorage.setItem('craffo_admin', isAdmin), [isAdmin]);

  // دوال الإدارة
  const login = (password) => {
    if (password === 'admin123') { // يمكنك تغيير كلمة المرور هنا
      setIsAdmin(true);
      return true;
    }
    return false;
  };
  const logout = () => setIsAdmin(false);

  const addTheme = (newTheme) => setThemes([...themes, { ...newTheme, id: Date.now().toString() }]);
  const updateTheme = (id, updated) => setThemes(themes.map(t => t.id === id ? { ...t, ...updated } : t));
  const deleteTheme = (id) => {
    if (window.confirm('سيتم حذف الفئات والروابط المرتبطة. متأكدة؟')) {
      setThemes(themes.filter(t => t.id !== id));
      setCategories(categories.filter(c => c.themeId !== id));
      setLinks(links.filter(l => l.themeId !== id && !categories.some(c => c.id === l.categoryId && c.themeId === id)));
    }
  };

  const addCategory = (newCat) => setCategories([...categories, { ...newCat, id: Date.now().toString() }]);
  const deleteCategory = (id) => {
    if (window.confirm('سيتم حذف الروابط المرتبطة')) {
      setCategories(categories.filter(c => c.id !== id));
      setLinks(links.filter(l => l.categoryId !== id));
    }
  };

  const addLink = (newLink) => setLinks([...links, { ...newLink, id: Date.now().toString() }]);
  const deleteLink = (id) => setLinks(links.filter(l => l.id !== id));

  return (
    <AdminContext.Provider value={{
      isAdmin,
      themes, categories, links,
      login, logout,
      addTheme, updateTheme, deleteTheme,
      addCategory, deleteCategory,
      addLink, deleteLink,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() { return useContext(AdminContext); }