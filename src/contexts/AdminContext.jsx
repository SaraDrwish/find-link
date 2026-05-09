import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

// البيانات الأولية
const initialThemes = [
  { id: '1', name: 'ثيم دارك', platform: 'salla', createdAt: '2025-01-15' },
  { id: '2', name: 'ثيم عبايات', platform: 'salla', createdAt: '2025-01-16' },
  { id: '3', name: 'ثيم كيان', platform: 'zid', createdAt: '2025-01-17' },
  { id: '4', name: 'ثيم علا', platform: 'zid', createdAt: '2025-01-18' },
];

const initialCategories = [
  { id: '1', name: 'متاجر الزينة', themeId: '1', createdAt: '2025-01-15' },
  { id: '2', name: 'متاجر العطور', themeId: '1', createdAt: '2025-01-15' },
  { id: '3', name: 'متاجر العبايات', themeId: '2', createdAt: '2025-01-16' },
  { id: '4', name: 'متاجر الإكسسوارات', themeId: 'all', createdAt: '2025-01-17' }, // 'all' تعني لكل الثيمات
];

const initialLinks = [
  { id: '1', title: 'متجر زينة ليان', url: 'https://example.com/store1', themeId: '1', categoryId: '1', createdAt: '2025-01-15' },
  { id: '2', title: 'عطور دينا', url: 'https://example.com/store2', themeId: '1', categoryId: '2', createdAt: '2025-01-15' },
  { id: '3', title: 'عبايات الأصيل', url: 'https://example.com/store3', themeId: '2', categoryId: '3', createdAt: '2025-01-16' },
  { id: '4', title: 'إكسسوارات نورة', url: 'https://example.com/store4', themeId: '3', categoryId: '4', createdAt: '2025-01-17' },
  { id: '5', title: 'متجر سريع', url: 'https://example.com/quick', themeId: '1', categoryId: null, createdAt: '2025-01-18' },
];

const loadData = (key, defaultData) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultData;
};

export function AdminProvider({ children }) {
  const [themes, setThemes] = useState(() => loadData('craffo_themes', initialThemes));
  const [categories, setCategories] = useState(() => loadData('craffo_categories', initialCategories));
  const [links, setLinks] = useState(() => loadData('craffo_links', initialLinks));
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('craffo_admin') === 'true');

  useEffect(() => localStorage.setItem('craffo_themes', JSON.stringify(themes)), [themes]);
  useEffect(() => localStorage.setItem('craffo_categories', JSON.stringify(categories)), [categories]);
  useEffect(() => localStorage.setItem('craffo_links', JSON.stringify(links)), [links]);
  useEffect(() => localStorage.setItem('craffo_admin', isAdmin), [isAdmin]);

  const login = (password) => {
    if (password === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };
  const logout = () => setIsAdmin(false);

  // دوال الثيمات
  const addTheme = (newTheme) => setThemes([...themes, { ...newTheme, id: Date.now().toString() }]);
  const updateTheme = (id, updated) => setThemes(themes.map(t => t.id === id ? { ...t, ...updated } : t));
  const deleteTheme = (id) => {
    if (window.confirm('سيتم حذف الفئات والروابط المرتبطة؟')) {
      setThemes(themes.filter(t => t.id !== id));
      setCategories(categories.filter(c => c.themeId !== id && c.themeId !== 'all'));
      setLinks(links.filter(l => l.themeId !== id));
    }
  };

  // دوال الفئات
  const addCategory = (newCategory) => setCategories([...categories, { ...newCategory, id: Date.now().toString() }]);
  const updateCategory = (id, updated) => setCategories(categories.map(c => c.id === id ? { ...c, ...updated } : c));
  const deleteCategory = (id) => {
    if (window.confirm('سيتم حذف الروابط المرتبطة بهذه الفئة؟')) {
      setCategories(categories.filter(c => c.id !== id));
      setLinks(links.filter(l => l.categoryId !== id));
    }
  };

  // دوال الروابط
  const addLink = (newLink) => setLinks([...links, { ...newLink, id: Date.now().toString() }]);
  const updateLink = (id, updated) => setLinks(links.map(l => l.id === id ? { ...l, ...updated } : l));
  const deleteLink = (id) => setLinks(links.filter(l => l.id !== id));

  // الحصول على فئات ثيم معين (تشمل الفئات العامة themeId = 'all')
  const getCategoriesForTheme = (themeId) => {
    return categories.filter(c => c.themeId === themeId || c.themeId === 'all');
  };

  // الحصول على روابط ثيم معين
  const getLinksForTheme = (themeId) => {
    return links.filter(l => l.themeId === themeId);
  };

  // الحصول على روابط فئة معينة
  const getLinksForCategory = (categoryId) => {
    return links.filter(l => l.categoryId === categoryId);
  };

  return (
    <AdminContext.Provider value={{
      isAdmin, themes, categories, links,
      login, logout,
      addTheme, updateTheme, deleteTheme,
      addCategory, updateCategory, deleteCategory,
      addLink, updateLink, deleteLink,
      getCategoriesForTheme, getLinksForTheme, getLinksForCategory,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() { return useContext(AdminContext); }